import React, { useState, useRef, useEffect } from 'react';
import useDataLoader from '../../hooks/useDataLoader';
import { formatDuration, formatMemory, formatCpuUsage, formatDurationShort, calculateEC2Cost, formatCost, formatFrequency } from '../../utils/dataTransforms';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ErrorBar } from 'recharts';

const formatProofSize = (bytes) => {
  if (!bytes && bytes !== 0) return 'N/A';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

const calculateThroughput = (cycles, timing, proofType) => {
  if (!cycles || !timing) return 0;
  const totalNanos = proofType === 'core' 
    ? ((timing.core_prove_duration?.secs || 0) * 1000000000 + (timing.core_prove_duration?.nanos || 0))
    : (((timing.core_prove_duration?.secs || 0) + (timing.compress_prove_duration?.secs || 0)) * 1000000000 + 
       (timing.core_prove_duration?.nanos || 0) + (timing.compress_prove_duration?.nanos || 0));
  return totalNanos > 0 ? (cycles / (totalNanos / 1000000000)) : 0;
};

const getProofDuration = (timing, proofType) => {
  if (!timing) return null;
  
  if (proofType === 'core') {
    return timing.core_prove_duration;
  } else {
    // For compressed proofs, combine core prove and compress prove times
    return {
      secs: (timing.core_prove_duration?.secs || 0) + (timing.compress_prove_duration?.secs || 0),
      nanos: (timing.core_prove_duration?.nanos || 0) + (timing.compress_prove_duration?.nanos || 0)
    };
  }
};

const ColumnSelector = ({ columns, visibleColumns, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span>Columns</span>
        <span className="text-gray-500">({visibleColumns.length})</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="p-2 space-y-1">
            {columns.map(column => (
              <label key={column.key} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={visibleColumns.includes(column.key)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...visibleColumns, column.key]);
                    } else {
                      onChange(visibleColumns.filter(key => key !== column.key));
                    }
                  }}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{column.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const FilterLabel = ({ label, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const labelRef = useRef(null);
  
  return (
    <div className="relative inline-block" ref={labelRef}>
      <label 
        className="text-sm font-medium text-gray-700 flex items-center gap-1 cursor-help group"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {label}
        <span className="text-gray-400 group-hover:text-gray-600">ⓘ</span>
      </label>
      {showTooltip && (
        <div 
          className="absolute z-50 bottom-full left-0 mb-2 w-64 transform"
        >
          <div className="bg-gray-900 text-white text-xs rounded py-2 px-3">
            {tooltip}
            <div className="absolute top-full left-4 -mt-px">
              <div className="w-2 h-2 bg-gray-900 transform rotate-45" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MultiSelect = ({ label, tooltip, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <FilterLabel label={label} tooltip={tooltip} />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 w-full form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm text-left"
      >
        {selected.length === 0 && 'All'}
        {selected.length === 1 && selected[0]}
        {selected.length > 1 && `${selected.length} selected`}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="p-2 space-y-1 max-h-60 overflow-auto">
            <label className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={selected.length === 0}
                onChange={() => onChange([])}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">All</span>
            </label>
            {options.map(option => (
              <label key={option} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...selected, option]);
                    } else {
                      onChange(selected.filter(item => item !== option));
                    }
                  }}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MetricsTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8" aria-label="Metrics">
        <button
          onClick={() => onTabChange('table')}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'table'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Metrics
        </button>
        <button
          onClick={() => onTabChange('graphs')}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'graphs'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Graphs
        </button>
      </nav>
    </div>
  );
};

const LeaderboardGraphs = ({ data, proofType }) => {
  const [chartType, setChartType] = useState('performance');
  const [primaryGroupBy, setPrimaryGroupBy] = useState('program');
  const [secondaryGroupBy, setSecondaryGroupBy] = useState(null);
  const [metric, setMetric] = useState('throughput');

  const chartTypes = [
    { id: 'performance', label: 'Performance Comparison', 
      description: 'Compare performance metrics across different dimensions' },
    { id: 'resources', label: 'Resource Usage', 
      description: 'Analyze memory and CPU utilization' },
    { id: 'timing', label: 'Timing Breakdown', 
      description: 'Detailed view of proof generation phases' },
  ];

  const metrics = {
    performance: [
      { id: 'throughput', label: 'Throughput (cycles/s)', 
        getValue: entry => calculateThroughput(entry.zk_metrics.cycles, entry.timing, proofType),
        format: formatFrequency },
      { id: 'cycles', label: 'Cycles', 
        getValue: entry => entry.zk_metrics.cycles,
        format: val => val?.toLocaleString() },
      { id: 'proofTime', label: 'Proof Time', 
        getValue: entry => {
          const duration = getProofDuration(entry.timing, proofType);
          return duration ? duration.secs + duration.nanos / 1e9 : null;
        },
        format: val => `${val?.toFixed(2)}s` },
    ],
    resources: [
      { id: 'memory', label: 'Memory Usage', 
        getValue: entry => entry.resources.avg_memory_kb,
        format: formatMemory },
      { id: 'cpu', label: 'CPU Usage', 
        getValue: entry => entry.resources.avg_cpu_percent,
        format: formatCpuUsage },
      { id: 'proofSize', label: 'Proof Size', 
        getValue: entry => proofType === 'core' ? entry.zk_metrics.core_proof_size : entry.zk_metrics.recursive_proof_size,
        format: formatProofSize },
    ],
    timing: [
      { id: 'setup', label: 'Setup', 
        getValue: entry => entry.timing.workspace_setup_duration.secs + entry.timing.workspace_setup_duration.nanos / 1e9,
        format: val => `${val?.toFixed(2)}s` },
      { id: 'compilation', label: 'Compilation', 
        getValue: entry => entry.timing.compilation_duration.secs + entry.timing.compilation_duration.nanos / 1e9,
        format: val => `${val?.toFixed(2)}s` },
      { id: 'proving', label: 'Proving', 
        getValue: entry => {
          const duration = getProofDuration(entry.timing, proofType);
          return duration ? duration.secs + duration.nanos / 1e9 : null;
        },
        format: val => `${val?.toFixed(2)}s` },
    ],
  };

  const groupings = [
    { id: 'program', label: 'Program', 
      getValue: entry => entry.program.file_name },
    { id: 'system', label: 'Proving System', 
      getValue: entry => entry.proving_system },
    { id: 'instance', label: 'Instance Type', 
      getValue: entry => entry.system_info?.ec2_instance_type || 'Local' },
    { id: 'acceleration', label: 'Acceleration', 
      getValue: entry => entry.gpu_enabled ? 'GPU' : 'CPU' },
  ];

  const prepareChartData = () => {
    const currentMetrics = metrics[chartType];
    const primaryGrouping = groupings.find(g => g.id === primaryGroupBy);
    const secondaryGrouping = secondaryGroupBy ? groupings.find(g => g.id === secondaryGroupBy) : null;
    
    // First level grouping
    const primaryGroups = new Map();
    data.forEach(entry => {
      const primaryKey = primaryGrouping.getValue(entry);
      if (!primaryGroups.has(primaryKey)) {
        primaryGroups.set(primaryKey, []);
      }
      primaryGroups.get(primaryKey).push(entry);
    });

    const chartData = [];
    primaryGroups.forEach((entries, primaryKey) => {
      if (secondaryGrouping) {
        // Second level grouping
        const secondaryGroups = new Map();
        entries.forEach(entry => {
          const secondaryKey = secondaryGrouping.getValue(entry);
          if (!secondaryGroups.has(secondaryKey)) {
            secondaryGroups.set(secondaryKey, []);
          }
          secondaryGroups.get(secondaryKey).push(entry);
        });

        secondaryGroups.forEach((subEntries, secondaryKey) => {
          const dataPoint = {
            name: primaryKey,
            subgroup: secondaryKey,
          };
          currentMetrics.forEach(m => {
            const values = subEntries.map(e => m.getValue(e)).filter(v => v != null);
            if (values.length > 0) {
              dataPoint[`${m.id}_${secondaryKey}`] = {
                min: Math.min(...values),
                max: Math.max(...values),
                avg: values.reduce((a, b) => a + b, 0) / values.length,
              };
            }
          });
          chartData.push(dataPoint);
        });
      } else {
        // Single level grouping
        const dataPoint = { name: primaryKey };
        currentMetrics.forEach(m => {
          const values = entries.map(e => m.getValue(e)).filter(v => v != null);
          if (values.length > 0) {
            dataPoint[m.id] = {
              min: Math.min(...values),
              max: Math.max(...values),
              avg: values.reduce((a, b) => a + b, 0) / values.length,
            };
          }
        });
        chartData.push(dataPoint);
      }
    });

    return chartData.sort((a, b) => {
      if (secondaryGrouping) {
        const aValue = a[`${metric}_${a.subgroup}`]?.avg || 0;
        const bValue = b[`${metric}_${b.subgroup}`]?.avg || 0;
        return bValue - aValue;
      }
      const aValue = a[metric]?.avg || 0;
      const bValue = b[metric]?.avg || 0;
      return bValue - aValue;
    });
  };

  const currentMetric = metrics[chartType].find(m => m.id === metric);
  const chartData = prepareChartData();

  const getBarColor = (subgroup) => {
    const colors = {
      'SP1': '#60a5fa',
      'RISC0': '#4ade80',
      'GPU': '#f59e0b',
      'CPU': '#6366f1',
      'Local': '#d946ef',
    };
    return colors[subgroup] || '#60a5fa';
  };

  return (
    <div className="space-y-8">
      {/* Chart Type Selection */}
      <div className="grid grid-cols-3 gap-4">
        {chartTypes.map(type => (
          <button
            key={type.id}
            onClick={() => {
              setChartType(type.id);
              setMetric(metrics[type.id][0].id);
            }}
            className={`p-4 rounded-lg border text-left transition-colors ${
              chartType === type.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <h3 className="font-medium text-gray-900">{type.label}</h3>
            <p className="text-sm text-gray-500 mt-1">{type.description}</p>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Group</label>
          <select
            value={primaryGroupBy}
            onChange={(e) => {
              setPrimaryGroupBy(e.target.value);
              if (e.target.value === secondaryGroupBy) {
                setSecondaryGroupBy(null);
              }
            }}
            className="w-full form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {groupings.map(group => (
              <option key={group.id} value={group.id}>{group.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Group</label>
          <select
            value={secondaryGroupBy || ''}
            onChange={(e) => setSecondaryGroupBy(e.target.value || null)}
            className="w-full form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">None</option>
            {groupings
              .filter(group => group.id !== primaryGroupBy)
              .map(group => (
                <option key={group.id} value={group.id}>{group.label}</option>
              ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Metric</label>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="w-full form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {metrics[chartType].map(m => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80} 
                interval={0}
              />
              <YAxis 
                tickFormatter={(value) => currentMetric.format(value)}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (typeof value === 'object') {
                    return [
                      `Avg: ${currentMetric.format(value.avg)}
Min: ${currentMetric.format(value.min)}
Max: ${currentMetric.format(value.max)}`,
                      name.split('_').pop() // Extract subgroup from metric name
                    ];
                  }
                  return [currentMetric.format(value), name];
                }}
              />
              {secondaryGroupBy ? (
                // Render grouped bars
                Array.from(new Set(chartData.map(d => d.subgroup))).map(subgroup => (
                  <Bar 
                    key={subgroup}
                    dataKey={`${metric}_${subgroup}.avg`}
                    name={subgroup}
                    fill={getBarColor(subgroup)}
                    isAnimationActive={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fillOpacity={0.8} />
                    ))}
                  </Bar>
                ))
              ) : (
                // Render single bars
                <Bar 
                  dataKey={`${metric}.avg`}
                  fill="#60a5fa"
                  isAnimationActive={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fillOpacity={0.8} />
                  ))}
                </Bar>
              )}
              {!secondaryGroupBy && (
                <ErrorBar
                  dataKey={metric}
                  width={4}
                  strokeWidth={2}
                  stroke="#94a3b8"
                  direction="y"
                  data={chartData.map(entry => ({
                    x: entry.name,
                    y: entry[metric]?.avg,
                    error: [
                      entry[metric]?.avg - entry[metric]?.min,
                      entry[metric]?.max - entry[metric]?.avg
                    ]
                  }))}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const GanttTooltip = ({ content, visible, x, y }) => {
  if (!visible) return null;
  
  return (
    <div 
      className="absolute bg-gray-900 text-white px-4 py-2 rounded shadow-lg text-sm"
      style={{
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -100%)',
        pointerEvents: 'none',
        whiteSpace: 'pre-line',
        zIndex: 1000,
      }}
    >
      {content}
    </div>
  );
};

const TimingGantt = ({ timing, proofType }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: '',
    x: 0,
    y: 0
  });
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });

      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  // Calculate durations in nanoseconds
  const setupNanos = timing.workspace_setup_duration.secs * 1000000000 + timing.workspace_setup_duration.nanos;
  const compilationNanos = timing.compilation_duration.secs * 1000000000 + timing.compilation_duration.nanos;
  const coreProveNanos = timing.core_prove_duration.secs * 1000000000 + timing.core_prove_duration.nanos;
  const coreVerifyNanos = timing.core_verify_duration.secs * 1000000000 + timing.core_verify_duration.nanos;
  const compressProveNanos = timing.compress_prove_duration.secs * 1000000000 + timing.compress_prove_duration.nanos;
  const compressVerifyNanos = timing.compress_verify_duration.secs * 1000000000 + timing.compress_verify_duration.nanos;

  // Calculate total time based on proof type
  const totalNanos = setupNanos + compilationNanos + 
    (proofType === 'core' 
      ? (coreProveNanos + coreVerifyNanos)
      : (coreProveNanos + compressProveNanos + compressVerifyNanos));
  
  // Define all phases
  const allPhases = [
    { key: 'workspace_setup_duration', label: 'Setup', color: '#e3f2fd', duration: setupNanos },
    { key: 'compilation_duration', label: 'Compile', color: '#bbdefb', duration: compilationNanos },
    ...(proofType === 'core' ? [
      { key: 'core_prove_duration', label: 'Core Prove', color: '#64b5f6', duration: coreProveNanos },
      { key: 'core_verify_duration', label: 'Core Verify', color: '#81c784', duration: coreVerifyNanos }
    ] : [
      { key: 'core_prove_duration', label: 'Core Prove', color: '#64b5f6', duration: coreProveNanos },
      { key: 'compress_prove_duration', label: 'Compress', color: '#2196f3', duration: compressProveNanos },
      { key: 'compress_verify_duration', label: 'Verify', color: '#4caf50', duration: compressVerifyNanos }
    ])
  ];

  // Calculate widths with minimum segment size
  const getWidth = (duration) => {
    const MIN_SEGMENT_WIDTH = 50; // reduced minimum width for better mobile layout
    const TOTAL_MIN_WIDTH = MIN_SEGMENT_WIDTH * allPhases.length;
    
    // Calculate the remaining width after ensuring minimum widths
    const remainingWidth = Math.max(0, containerWidth - TOTAL_MIN_WIDTH);
    
    // Calculate the proportional width from the remaining space
    const proportionalWidth = (duration / totalNanos) * remainingWidth;
    
    // Return the minimum width plus any proportional extra width
    return MIN_SEGMENT_WIDTH + proportionalWidth;
  };

  // Format percentage for tooltip
  const getPercentage = (duration) => {
    return ((duration / totalNanos) * 100).toFixed(1);
  };

  const handleMouseEnter = (e, phase, durationNanos) => {
    const percentage = getPercentage(durationNanos);
    const duration = { secs: Math.floor(durationNanos / 1000000000), nanos: durationNanos % 1000000000 };
    const content = `${phase}\nDuration: ${formatDurationShort(duration)}\n${percentage}% of total`;
    
    setTooltip({
      visible: true,
      content,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e) => {
    if (tooltip.visible) {
      setTooltip(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY
      }));
    }
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="w-full space-y-4">
      <GanttTooltip {...tooltip} />
      
      {/* Timeline */}
      <div className="w-full" ref={containerRef}>
        <div className="flex items-center mb-2">
          <div className="w-24 text-sm font-medium text-gray-600">Timeline</div>
          <div className="text-sm text-gray-500">
            {formatDurationShort({ secs: totalNanos / 1000000000, nanos: totalNanos % 1000000000 })}
          </div>
        </div>
        <div className="relative h-12 flex rounded-lg overflow-hidden bg-gray-100">
          {allPhases.map(({ key, label, color, duration }) => (
            <div
              key={key}
              className="h-full relative group hover:brightness-95 transition-all"
              style={{
                width: containerWidth ? `${getWidth(duration)}px` : '0',
                backgroundColor: color,
                minWidth: '50px', // reduced for better mobile layout
              }}
              onMouseEnter={(e) => handleMouseEnter(e, label, duration)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700 px-1 text-center break-words">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-2">
        {allPhases.map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: color }}></div>
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const getZkVMVersion = (entry) => {
  const deps = entry.program.host_metadata?.dependencies;
  if (!deps) return 'N/A';

  // Look for SP1 or RISC0 package
  const sp1Package = deps.find(([name]) => name === 'sp1-sdk');
  const risc0Package = deps.find(([name]) => name === 'risc0-zkvm');

  if (sp1Package) {
    const [, version] = sp1Package;
    // Extract tag from git dependency
    const tagMatch = version.match(/tag:([^,\s}]+)/);
    return tagMatch ? tagMatch[1] : version;
  }
  if (risc0Package) {
    const [, version] = risc0Package;
    // Extract tag from git dependency
    const tagMatch = version.match(/tag:([^,\s}]+)/);
    return tagMatch ? tagMatch[1] : version;
  }

  return 'N/A';
};

const SMART_FILTERS = {
  SAME_PROGRAM: {
    id: 'same_program',
    label: 'Same Program Only',
    description: 'Only show results from the same program',
    filter: (data, entry) => data.filter(e => e.program.file_name === entry.program.file_name)
  },
  SAME_SYSTEM: {
    id: 'same_system',
    label: 'Same System Only',
    description: 'Only show results from the same proving system',
    filter: (data, entry) => data.filter(e => e.proving_system === entry.proving_system)
  },
  SAME_INSTANCE: {
    id: 'same_instance',
    label: 'Same Instance Type',
    description: 'Only show results from the same instance type',
    filter: (data, entry) => data.filter(e => e.system_info?.ec2_instance_type === entry.system_info?.ec2_instance_type)
  },
  SAME_VERSION: {
    id: 'same_version',
    label: 'Same Version',
    description: 'Only show results from the same zkVM version',
    filter: (data, entry) => data.filter(e => getZkVMVersion(e) === getZkVMVersion(entry))
  }
};

const ComparisonModal = ({ entries, onClose, proofType, getZkVMVersion, calculateThroughput, getProofDuration }) => {
  const [swapped, setSwapped] = useState(false);
  if (entries.length !== 2) return null;
  
  const [base, compare] = entries;
  const currentBase = swapped ? compare : base;
  const currentCompare = swapped ? base : compare;

  const handleSwap = () => {
    setSwapped(!swapped);
  };

  const calculateDiff = (value1, value2) => {
    if (!value1 || !value2) return null;
    return ((value2 - value1) / value1) * 100;
  };

  const formatPercentage = (percentage, improvedWhen) => {
    if (percentage === null) return 'N/A';
    const isPositive = percentage > 0;
    
    // Invert the color logic based on whether higher or lower is better
    const isImproved = improvedWhen === 'lower' ? !isPositive : isPositive;
    const color = isImproved ? 'text-green-600' : 'text-red-600';
    
    return (
      <span className={color}>
        {isPositive ? '+' : ''}{percentage.toFixed(2)}%
      </span>
    );
  };

  const metrics = [
    {
      label: 'Cycles',
      base: currentBase.zk_metrics.cycles,
      compare: currentCompare.zk_metrics.cycles,
      format: (v) => v?.toLocaleString() || 'N/A',
      improvedWhen: 'lower'
    },
    {
      label: 'Throughput',
      base: calculateThroughput(currentBase.zk_metrics.cycles, currentBase.timing, proofType),
      compare: calculateThroughput(currentCompare.zk_metrics.cycles, currentCompare.timing, proofType),
      format: formatFrequency,
      improvedWhen: 'higher'
    },
    {
      label: 'Proof Time',
      base: getProofDuration(currentBase.timing, proofType),
      compare: getProofDuration(currentCompare.timing, proofType),
      format: formatDuration,
      improvedWhen: 'lower',
      getValue: (v) => v ? v.secs + v.nanos / 1e9 : null
    },
    {
      label: 'Peak Memory',
      base: currentBase.resources.max_memory_kb,
      compare: currentCompare.resources.max_memory_kb,
      format: formatMemory,
      improvedWhen: 'lower'
    },
    {
      label: 'Peak CPU',
      base: currentBase.resources.max_cpu_percent,
      compare: currentCompare.resources.max_cpu_percent,
      format: formatCpuUsage,
      improvedWhen: 'lower'
    },
    {
      label: 'Average Memory',
      base: currentBase.resources.avg_memory_kb,
      compare: currentCompare.resources.avg_memory_kb,
      format: formatMemory,
      improvedWhen: 'lower'
    },
    {
      label: 'Average CPU',
      base: currentBase.resources.avg_cpu_percent,
      compare: currentCompare.resources.avg_cpu_percent,
      format: formatCpuUsage,
      improvedWhen: 'lower'
    }
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-4/5 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Benchmark Comparison</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSwap}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md flex items-center space-x-1"
            >
              <span>Swap</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="col-span-2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Base</h4>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm">{currentBase.program.file_name} ({currentBase.proving_system})</p>
              <p className="text-xs text-gray-500 mt-1">
                {currentBase.system_info?.ec2_instance_type || 'Local'} • 
                Version: {getZkVMVersion(currentBase)}
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Compare</h4>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm">{currentCompare.program.file_name} ({currentCompare.proving_system})</p>
              <p className="text-xs text-gray-500 mt-1">
                {currentCompare.system_info?.ec2_instance_type || 'Local'} • 
                Version: {getZkVMVersion(currentCompare)}
              </p>
            </div>
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compare</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {metrics.map((metric) => {
              const baseValue = metric.getValue ? metric.getValue(metric.base) : metric.base;
              const compareValue = metric.getValue ? metric.getValue(metric.compare) : metric.compare;
              const diff = calculateDiff(baseValue, compareValue);

              return (
                <tr key={metric.label}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {metric.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.format(metric.base)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.format(metric.compare)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatPercentage(diff, metric.improvedWhen)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LeaderboardTable = () => {
  const { data, loading, error } = useDataLoader();
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedMetadata, setExpandedMetadata] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'zk_metrics.execution_speed',
    direction: 'desc'
  });
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [cpuBrandFilter, setCpuBrandFilter] = useState('');
  const [coreCountFilter, setCoreCountFilter] = useState('');
  const [instanceTypeFilter, setInstanceTypeFilter] = useState('');
  const [proofType, setProofType] = useState('core');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('table');
  const ITEMS_PER_PAGE = 10;
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedSystems, setSelectedSystems] = useState([]);
  const [gpuEnabled, setGpuEnabled] = useState(null); // null means "all"
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [smartFilters, setSmartFilters] = useState([]);
  const [baselineEntry, setBaselineEntry] = useState(null);

  const columns = [
    { key: 'proving_system', label: 'System', defaultVisible: true },
    { key: 'zkvm_version', label: 'zkVM Version', defaultVisible: true },
    { key: 'program.file_name', label: 'Program', defaultVisible: true },
    { key: 'zk_metrics.cycles', label: 'Cycles', defaultVisible: true },
    { key: 'zk_metrics.execution_speed', label: 'Throughput', defaultVisible: true },
    { key: 'timing.proof_generation', label: 'Proof Time', defaultVisible: true },
    { key: 'cost', label: 'Cost', defaultVisible: true },
    { key: 'system_info.ec2_instance_type', label: 'Instance Type', defaultVisible: true },
    { key: 'gpu_enabled', label: 'GPU Enabled', defaultVisible: true },
    { key: 'zk_metrics.num_segments', label: 'Segments', defaultVisible: false },
    { key: 'system_info.cpu_brand', label: 'CPU', defaultVisible: false },
    { key: 'resources.avg_memory_kb', label: 'Memory', defaultVisible: false },
    { key: 'resources.avg_cpu_percent', label: 'CPU Usage', defaultVisible: false },
    { key: 'zk_metrics.core_proof_size', label: 'Proof Size', defaultVisible: true },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    columns.filter(col => col.defaultVisible).map(col => col.key)
  );

  const isColumnVisible = (key) => visibleColumns.includes(key);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
  if (error) return <div>Error: {error}</div>;

  // Get unique values for filters
  const uniqueCpuBrands = [...new Set(data.map(entry => entry.system_info.cpu_brand).filter(Boolean))];
  const uniqueCoreCounts = [...new Set(data.map(entry => entry.system_info.cpu_count).filter(Boolean))].sort((a, b) => a - b);
  const uniqueInstanceTypes = [...new Set(data.map(entry => entry.system_info?.ec2_instance_type).filter(Boolean))].sort();
  const uniquePrograms = [...new Set(data.map(entry => entry.program.file_name))].sort();
  const uniqueSystems = [...new Set(data.map(entry => entry.proving_system))].sort();

  const getSmartFilteredData = (data) => {
    if (!baselineEntry || smartFilters.length === 0) return data;
    
    return smartFilters.reduce((filteredData, filterId) => {
      const filter = Object.values(SMART_FILTERS).find(f => f.id === filterId);
      return filter ? filter.filter(filteredData, baselineEntry, getZkVMVersion) : filteredData;
    }, data);
  };

  const filteredData = getSmartFilteredData(data.filter(entry => {
    const matchesCpuBrand = !cpuBrandFilter || entry.system_info.cpu_brand === cpuBrandFilter;
    const matchesCoreCount = !coreCountFilter || entry.system_info.cpu_count.toString() === coreCountFilter;
    const matchesInstanceType = !instanceTypeFilter || entry.system_info?.ec2_instance_type === instanceTypeFilter;
    const matchesProgram = selectedPrograms.length === 0 || selectedPrograms.includes(entry.program.file_name);
    const matchesSystem = selectedSystems.length === 0 || selectedSystems.includes(entry.proving_system);
    const matchesGpu = gpuEnabled === null || (gpuEnabled === true ? entry.gpu_enabled === true : !entry.gpu_enabled);
    return matchesCpuBrand && matchesCoreCount && matchesInstanceType && matchesProgram && matchesSystem && matchesGpu;
  }));

  const handleRowClick = (index, e) => {
    // Don't expand if clicking on a checkbox or button
    if (e.target.type === 'checkbox' || e.target.tagName === 'BUTTON') {
      return;
    }
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getProofSize = (entry) => {
    return proofType === 'core' ? entry.zk_metrics.core_proof_size : entry.zk_metrics.recursive_proof_size;
  };

  const getSortedData = () => {
    const sortedData = [...filteredData];
    return sortedData.sort((a, b) => {
      let aValue, bValue;

      if (sortConfig.key === 'timing.proof_generation') {
        const aProofGen = getProofDuration(a.timing, proofType);
        const bProofGen = getProofDuration(b.timing, proofType);
        aValue = aProofGen.secs * 1000000000 + aProofGen.nanos;
        bValue = bProofGen.secs * 1000000000 + bProofGen.nanos;
      } else if (sortConfig.key === 'zk_metrics.execution_speed') {
        aValue = calculateThroughput(a.zk_metrics.cycles, a.timing, proofType);
        bValue = calculateThroughput(b.zk_metrics.cycles, b.timing, proofType);
      } else if (sortConfig.key === 'system_info.cpu_brand') {
        aValue = a.system_info.cpu_brand || '';
        bValue = b.system_info.cpu_brand || '';
      } else {
        aValue = sortConfig.key.split('.').reduce((obj, key) => obj[key], a);
        bValue = sortConfig.key.split('.').reduce((obj, key) => obj[key], b);

        if (typeof aValue === 'object' && 'secs' in aValue) {
          aValue = aValue.secs * 1000000000 + aValue.nanos;
          bValue = bValue.secs * 1000000000 + bValue.nanos;
        }
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const paginatedData = () => {
    const sortedData = getSortedData();
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setExpandedRow(null); // Close expanded row when changing pages
    setCurrentPage(page);
  };

  const Pagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredData.length)}
            </span>
            {' '}-{' '}
            <span className="font-medium">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}
            </span>
            {' '}of{' '}
            <span className="font-medium">{filteredData.length}</span>
            {' '}results
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`px-2 py-1 text-sm rounded ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-2 py-1 text-sm rounded ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            ←
          </button>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === number
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 text-sm rounded ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            →
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 text-sm rounded ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            Last
          </button>
        </div>
      </div>
    );
  };

  // Add comparison selection handler
  const handleComparisonSelect = (entry) => {
    setSelectedForComparison(prev => {
      if (prev.includes(entry)) {
        return prev.filter(e => e !== entry);
      }
      if (prev.length >= 2) {
        return [prev[1], entry];
      }
      return [...prev, entry];
    });
  };

  const handleSetBaseline = (entry, e) => {
    e.stopPropagation();
    setBaselineEntry(entry);
  };

  // Move SmartFiltersControl inside LeaderboardTable
  const SmartFiltersControl = () => {
    if (!baselineEntry) return null;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-700">Smart Filters</h4>
            <p className="text-xs text-gray-500">Filter relative to baseline:</p>
            <p className="text-xs font-medium text-gray-600">
              {baselineEntry.program.file_name} ({baselineEntry.proving_system})
            </p>
          </div>
          <button
            onClick={() => {
              setBaselineEntry(null);
              setSmartFilters([]);
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear Baseline
          </button>
        </div>
        <div className="space-y-2">
          {Object.values(SMART_FILTERS).map(filter => (
            <label key={filter.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={smartFilters.includes(filter.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSmartFilters([...smartFilters, filter.id]);
                  } else {
                    setSmartFilters(smartFilters.filter(id => id !== filter.id));
                  }
                }}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <div>
                <span className="text-sm text-gray-700">{filter.label}</span>
                <p className="text-xs text-gray-500">{filter.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="text-xl mr-2">🤔</span>
          <span className="text-lg font-medium">Confused?</span>
          <span className={`ml-2 transition-transform duration-200 ${isHelpOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {isHelpOpen && (
          <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <p className="text-gray-700 mb-4">
              ProofLab is a benchmarking platform for Zero Knowledge Virtual Machines (zkVMs). 
              We help you compare different zkVM implementations using real-world code examples.
            </p>
            <Link 
              to="/faq" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              Learn more in our FAQ
              <span className="ml-1">→</span>
            </Link>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4">ZK Proof Benchmarks</h2>
      <MetricsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filters</h3>
          {activeTab !== 'graphs' && (
            <ColumnSelector
              columns={columns}
              visibleColumns={visibleColumns}
              onChange={setVisibleColumns}
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Existing filters in first 3 columns */}
          <div className="md:col-span-1">
            <SmartFiltersControl />
          </div>

          {/* Proof System Selection */}
          <div className="space-y-1">
            <MultiSelect
              label="Proof Systems"
              tooltip="Select one or more proof systems to compare. Each system has different characteristics and trade-offs."
              options={uniqueSystems}
              selected={selectedSystems}
              onChange={setSelectedSystems}
            />
          </div>

          {/* Proof Type Selection */}
          <div className="space-y-1">
            <FilterLabel 
              label="Proof Type" 
              tooltip="Choose between Core proofs (faster generation, size scales with computation) or Compressed proofs (slower generation, constant size). Core proofs are typically used during development, while Compressed proofs are used in production."
            />
            <select
              className="mt-1 w-full form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={proofType}
              onChange={(e) => setProofType(e.target.value)}
            >
              <option value="core">Core (Size ∝ Computation)</option>
              <option value="compress">Compressed (Fixed Size)</option>
            </select>
          </div>

          {/* Program Selection */}
          <div className="space-y-1">
            <MultiSelect
              label="Programs"
              tooltip="Select one or more benchmark programs to compare. Each program tests different aspects of the zkVM: Fibonacci (basic computation), SHA (cryptographic hashing), ECDSA (elliptic curve operations), JSON (parsing), etc."
              options={uniquePrograms}
              selected={selectedPrograms}
              onChange={setSelectedPrograms}
            />
          </div>

          {/* Instance Type Selection */}
          <div className="space-y-1">
            <FilterLabel 
              label="Instance Type" 
              tooltip="Filter by AWS EC2 instance type. The instance type determines the available compute resources and cost per hour. For example, c7a.16xlarge provides 64 vCPUs at $2.448/hour."
            />
            <select
              className="mt-1 w-full form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={instanceTypeFilter}
              onChange={(e) => setInstanceTypeFilter(e.target.value)}
            >
              <option value="">All</option>
              {uniqueInstanceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* CPU Brand Selection */}
          <div className="space-y-1">
            <FilterLabel 
              label="CPU Brand" 
              tooltip="Filter by CPU manufacturer and model. Different CPU architectures can impact proving performance. For example, AMD EPYC vs Intel Xeon processors may show different characteristics."
            />
            <select
              className="mt-1 w-full form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={cpuBrandFilter}
              onChange={(e) => setCpuBrandFilter(e.target.value)}
            >
              <option value="">All</option>
              {uniqueCpuBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* CPU Count Selection */}
          <div className="space-y-1">
            <FilterLabel 
              label="# CPUs" 
              tooltip="Filter by the number of virtual CPUs (vCPUs) available to the instance. More CPUs generally allow for faster proof generation, though the scaling isn't always linear due to the nature of the computation."
            />
            <select
              className="mt-1 w-full form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={coreCountFilter}
              onChange={(e) => setCoreCountFilter(e.target.value)}
            >
              <option value="">All</option>
              {uniqueCoreCounts.map(count => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </div>

          {/* GPU Filter */}
          <div className="space-y-1">
            <FilterLabel 
              label="Acceleration" 
              tooltip="Filter benchmarks based on acceleration type. GPU-accelerated proving can significantly improve performance for certain operations."
            />
            <select
              className="mt-1 w-full form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={gpuEnabled === null ? '' : gpuEnabled.toString()}
              onChange={(e) => setGpuEnabled(e.target.value === '' ? null : e.target.value === 'true')}
            >
              <option value="">All</option>
              <option value="true">GPU</option>
              <option value="false">CPU</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Controls */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {selectedForComparison.length}/2 selected for comparison
          </span>
          {selectedForComparison.length === 2 && (
            <button
              onClick={() => setShowComparison(true)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            >
              Compare Selected
            </button>
          )}
          {selectedForComparison.length > 0 && (
            <button
              onClick={() => setSelectedForComparison([])}
              className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800"
            >
              Clear Selection
            </button>
          )}
        </div>
      </div>

      {showComparison && (
        <ComparisonModal
          entries={selectedForComparison}
          onClose={() => setShowComparison(false)}
          proofType={proofType}
          getZkVMVersion={getZkVMVersion}
          calculateThroughput={calculateThroughput}
          getProofDuration={getProofDuration}
        />
      )}

      {activeTab === 'table' ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compare
                </th>
                {columns.map(column => (
                  isColumnVisible(column.key) && (
                    <th
                      key={column.key}
                      className={`px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer ${
                        column.key === 'proving_system' ? 'sticky left-0 bg-gray-50' : ''
                      }`}
                      onClick={(e) => handleSort(column.key)}
                    >
                      {column.key === 'timing.proof_generation' 
                        ? (proofType === 'core' ? 'Core Prove Time' : 'Compress Time')
                        : column.label} {getSortIcon(column.key)}
                    </th>
                  )
                ))}
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData().map((entry, index) => {
                const proofDuration = getProofDuration(entry.timing, proofType);
                const throughput = calculateThroughput(entry.zk_metrics.cycles, entry.timing, proofType);
                const cost = calculateEC2Cost(proofDuration, entry.system_info?.ec2_instance_type);
                
                return (
                  <React.Fragment key={index}>
                    <tr 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={(e) => handleRowClick(index, e)}
                    >
                      <td className="px-3 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedForComparison.includes(entry)}
                          onChange={() => handleComparisonSelect(entry)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      {isColumnVisible('proving_system') && (
                        <td className="sticky left-0 bg-white px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {entry.proving_system}
                        </td>
                      )}
                      {isColumnVisible('zkvm_version') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getZkVMVersion(entry)}
                        </td>
                      )}
                      {isColumnVisible('program.file_name') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.program.file_name}
                        </td>
                      )}
                      {isColumnVisible('zk_metrics.cycles') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.zk_metrics.cycles?.toLocaleString() || 'N/A'}
                        </td>
                      )}
                      {isColumnVisible('zk_metrics.execution_speed') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatFrequency(throughput)}
                        </td>
                      )}
                      {isColumnVisible('timing.proof_generation') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDuration(proofDuration)}
                        </td>
                      )}
                      {isColumnVisible('cost') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCost(cost)}
                        </td>
                      )}
                      {isColumnVisible('system_info.ec2_instance_type') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.system_info?.ec2_instance_type || 'N/A'}
                        </td>
                      )}
                      {isColumnVisible('gpu_enabled') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.gpu_enabled === true ? 'GPU' : 'CPU'}
                        </td>
                      )}
                      {isColumnVisible('zk_metrics.num_segments') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.zk_metrics.num_segments?.toLocaleString() || 'N/A'}
                        </td>
                      )}
                      {isColumnVisible('system_info.cpu_brand') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.system_info.cpu_brand || 'N/A'}
                        </td>
                      )}
                      {isColumnVisible('resources.avg_memory_kb') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatMemory(entry.resources.avg_memory_kb)}
                        </td>
                      )}
                      {isColumnVisible('resources.avg_cpu_percent') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCpuUsage(entry.resources.avg_cpu_percent)}
                        </td>
                      )}
                      {isColumnVisible('zk_metrics.core_proof_size') && (
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatProofSize(getProofSize(entry))}
                        </td>
                      )}
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500" onClick={(e) => e.stopPropagation()}>
                        <div className="flex space-x-2">
                          <button 
                            className="text-blue-500 hover:text-blue-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(index, e);
                            }}
                          >
                            {expandedRow === index ? '▼' : '▶'}
                          </button>
                          {!baselineEntry && (
                            <button
                              onClick={(e) => handleSetBaseline(entry, e)}
                              className="text-gray-500 hover:text-gray-700"
                              title="Set as baseline for comparison"
                            >
                              📌
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedRow === index && (
                      <tr>
                        <td colSpan={visibleColumns.length + 2} className="px-6 py-4">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900 mb-4">Timing Breakdown</h3>
                              <TimingGantt timing={entry.timing} proofType={proofType} />
                            </div>

                            <div className="border-t pt-4 grid grid-cols-4 gap-x-12 gap-y-6 justify-items-start">
                              <div className="space-y-2 w-full">
                                <h3 className="text-sm font-semibold text-gray-900">ZK Metrics</h3>
                                <ul className="space-y-1 text-sm text-gray-600 list-none">
                                  <li>Cycles: {entry.zk_metrics.cycles?.toLocaleString()}</li>
                                  <li>Segments: {entry.zk_metrics.num_segments}</li>
                                  <li>Core Proof Size: {formatProofSize(entry.zk_metrics.core_proof_size)}</li>
                                  <li>Recursive Proof Size: {formatProofSize(entry.zk_metrics.recursive_proof_size)}</li>
                                  <li>Throughput: {formatFrequency(throughput)}</li>
                                </ul>
                              </div>
                              
                              <div className="space-y-2 w-full">
                                <h3 className="text-sm font-semibold text-gray-900">Resource Usage</h3>
                                <ul className="space-y-1 text-sm text-gray-600 list-none">
                                  <li>Peak Memory: {formatMemory(entry.resources.max_memory_kb)}</li>
                                  <li>Average Memory: {formatMemory(entry.resources.avg_memory_kb)}</li>
                                  <li>Peak CPU: {formatCpuUsage(entry.resources.max_cpu_percent)}</li>
                                  <li>Average CPU: {formatCpuUsage(entry.resources.avg_cpu_percent)}</li>
                                  <li>Samples: {entry.resources.samples}</li>
                                </ul>
                              </div>

                              <div className="space-y-2 w-full">
                                <h3 className="text-sm font-semibold text-gray-900">Timing Details</h3>
                                <ul className="space-y-1 text-sm text-gray-600 list-none">
                                  <li>Total Duration: {formatDuration(entry.timing.total_duration)}</li>
                                  <li>Setup: {formatDuration(entry.timing.workspace_setup_duration)}</li>
                                  <li>Compilation: {formatDuration(entry.timing.compilation_duration)}</li>
                                  <li>Core Prove: {formatDuration(entry.timing.core_prove_duration)}</li>
                                  <li>Core Verify: {formatDuration(entry.timing.core_verify_duration)}</li>
                                  <li>Compress Prove: {formatDuration(entry.timing.compress_prove_duration)}</li>
                                  <li>Compress Verify: {formatDuration(entry.timing.compress_verify_duration)}</li>
                                </ul>
                              </div>

                              <div className="space-y-2 w-full">
                                <h3 className="text-sm font-semibold text-gray-900">Compute Environment</h3>
                                <ul className="space-y-1 text-sm text-gray-600 list-none">
                                  <li>OS: {entry.system_info.os_name} {entry.system_info.os_version}</li>
                                  {entry.system_info.cpu_brand && (
                                    <li>CPU: {entry.system_info.cpu_brand}</li>
                                  )}
                                  <li>CPU Cores: {entry.system_info.cpu_count}</li>
                                  {entry.system_info.cpu_frequency_mhz > 0 && (
                                    <li>CPU Frequency: {(entry.system_info.cpu_frequency_mhz / 1000).toFixed(2)} GHz</li>
                                  )}
                                  <li>Total Memory: {formatMemory(entry.system_info.total_memory_kb)}</li>
                                  {entry.system_info.is_ec2 && (
                                    <>
                                      <li>Instance Type: {entry.system_info.ec2_instance_type}</li>
                                      <li>Estimated Cost: {formatCost(cost)}</li>
                                    </>
                                  )}
                                </ul>
                              </div>
                            </div>

                            {/* Program Metadata */}
                            <div className="border-t pt-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedMetadata(expandedMetadata === index ? null : index);
                                }}
                                className="flex items-center justify-between w-full text-left"
                              >
                                <h3 className="text-sm font-semibold text-gray-900">Program Metadata</h3>
                                <span className="text-gray-500">
                                  {expandedMetadata === index ? '▼' : '▶'}
                                </span>
                              </button>
                              
                              {expandedMetadata === index && (
                                <div className="mt-4 space-y-6">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Guest Program</h4>
                                    <div className="bg-gray-50 rounded p-4">
                                      <pre className="text-xs text-gray-600 overflow-x-auto">
                                        {JSON.stringify(entry.program.guest_metadata, null, 2)}
                                      </pre>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Host Program</h4>
                                    <div className="bg-gray-50 rounded p-4">
                                      <pre className="text-xs text-gray-600 overflow-x-auto">
                                        {JSON.stringify(entry.program.host_metadata, null, 2)}
                                      </pre>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-700">File Details</h4>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                      <li>Path: {entry.program.file_path}</li>
                                      <li>Name: {entry.program.file_name}</li>
                                      <li>Absolute Path: {entry.program.absolute_path}</li>
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          <Pagination />
        </div>
      ) : (
        <LeaderboardGraphs 
          data={filteredData}
          proofType={proofType}
        />
      )}
    </div>
  );
};

export default LeaderboardTable; 