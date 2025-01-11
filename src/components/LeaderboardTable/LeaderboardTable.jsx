import React, { useState, useRef, useEffect } from 'react';
import useDataLoader from '../../hooks/useDataLoader';
import { formatDuration, formatMemory, formatCpuUsage, formatDurationShort, calculateEC2Cost, formatCost, formatFrequency } from '../../utils/dataTransforms';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  if (!cycles) return 0;
  const totalNanos = proofType === 'core' 
    ? (timing.core_prove_duration.secs * 1000000000 + timing.core_prove_duration.nanos)
    : ((timing.core_prove_duration.secs + timing.compress_prove_duration.secs) * 1000000000 + 
       timing.core_prove_duration.nanos + timing.compress_prove_duration.nanos);
  return totalNanos > 0 ? (cycles / (totalNanos / 1000000000)) : 0;
};

const getProofDuration = (timing, proofType) => {
  if (proofType === 'core') {
    return timing.core_prove_duration;
  } else {
    // For compressed proofs, combine core prove and compress prove times
    return {
      secs: timing.core_prove_duration.secs + timing.compress_prove_duration.secs,
      nanos: timing.core_prove_duration.nanos + timing.compress_prove_duration.nanos
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
          CPU Metrics
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
        <div className="relative group">
          <button
            className="border-transparent text-gray-400 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-not-allowed"
            disabled
          >
            GPU Metrics
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Coming soon!
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const LeaderboardGraphs = ({ data, proofType, selectedPrograms, comparisonAxis }) => {
  // Helper function to prepare data based on comparison axis
  const prepareData = (data, valueExtractor) => {
    return data.reduce((acc, entry) => {
      const program = entry.program.file_name;
      const key = comparisonAxis === 'system' ? entry.proving_system : entry.system_info?.ec2_instance_type || 'Unknown';
      const value = valueExtractor(entry);
      
      if (!acc[program]) {
        acc[program] = { name: program };
      }
      if (!acc[program][key]) {
        acc[program][key] = value;
      } else if (value > acc[program][key]) {
        // For same program + key combination, keep the better value
        acc[program][key] = value;
      }
      return acc;
    }, {});
  };

  // Prepare data for charts
  const throughputData = prepareData(data, entry => 
    calculateThroughput(entry.zk_metrics.cycles, entry.timing, proofType)
  );

  const proofTimeData = prepareData(data, entry => {
    const duration = getProofDuration(entry.timing, proofType);
    return duration.secs + duration.nanos / 1e9;
  });

  const costData = prepareData(data, entry => 
    calculateEC2Cost(entry.timing.total_duration, entry.system_info?.ec2_instance_type)
  );

  const memoryData = prepareData(data, entry => 
    entry.resources.avg_memory_kb / 1024 / 1024
  );

  // Get unique comparison keys for the legend
  const comparisonKeys = [...new Set(data.map(entry => 
    comparisonAxis === 'system' ? entry.proving_system : entry.system_info?.ec2_instance_type
  ))].filter(Boolean).sort();

  // Color scale for the bars
  const colors = ['#60a5fa', '#34d399', '#f87171', '#a78bfa', '#fbbf24', '#ec4899'];

  const CustomTooltip = ({ active, payload, label, valueFormatter }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {valueFormatter(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Throughput Comparison */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Throughput Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.values(throughputData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => formatFrequency(value).split(' ')[0]} />
                <Tooltip content={(props) => (
                  <CustomTooltip {...props} valueFormatter={(value) => formatFrequency(value)} />
                )} />
                <Legend />
                {comparisonKeys.map((key, index) => (
                  <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Proof Time Comparison */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Proof Time Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.values(proofTimeData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value.toFixed(1)}s`} />
                <Tooltip content={(props) => (
                  <CustomTooltip {...props} valueFormatter={(value) => `${value.toFixed(2)}s`} />
                )} />
                <Legend />
                {comparisonKeys.map((key, index) => (
                  <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.values(costData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value.toFixed(3)}`} />
                <Tooltip content={(props) => (
                  <CustomTooltip {...props} valueFormatter={(value) => formatCost(value)} />
                )} />
                <Legend />
                {comparisonKeys.map((key, index) => (
                  <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Memory Usage */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Memory Usage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.values(memoryData)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value.toFixed(1)} GB`} />
                <Tooltip content={(props) => (
                  <CustomTooltip {...props} valueFormatter={(value) => `${value.toFixed(2)} GB`} />
                )} />
                <Legend />
                {comparisonKeys.map((key, index) => (
                  <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
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
  const [comparisonAxis, setComparisonAxis] = useState('system'); // 'system' or 'instance'

  const columns = [
    { key: 'proving_system', label: 'System', defaultVisible: true },
    { key: 'zkvm_version', label: 'zkVM Version', defaultVisible: true },
    { key: 'program.file_name', label: 'Program', defaultVisible: true },
    { key: 'zk_metrics.cycles', label: 'Cycles', defaultVisible: true },
    { key: 'zk_metrics.execution_speed', label: 'Throughput', defaultVisible: true },
    { key: 'timing.proof_generation', label: 'Proof Time', defaultVisible: true },
    { key: 'cost', label: 'Cost', defaultVisible: true },
    { key: 'system_info.ec2_instance_type', label: 'Instance Type', defaultVisible: true },
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

  const filteredData = data.filter(entry => {
    const matchesCpuBrand = !cpuBrandFilter || entry.system_info.cpu_brand === cpuBrandFilter;
    const matchesCoreCount = !coreCountFilter || entry.system_info.cpu_count.toString() === coreCountFilter;
    const matchesInstanceType = !instanceTypeFilter || entry.system_info?.ec2_instance_type === instanceTypeFilter;
    const matchesProgram = selectedPrograms.length === 0 || selectedPrograms.includes(entry.program.file_name);
    return matchesCpuBrand && matchesCoreCount && matchesInstanceType && matchesProgram;
  });

  const toggleRowExpansion = (index) => {
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
          {activeTab === 'table' && (
            <ColumnSelector
              columns={columns}
              visibleColumns={visibleColumns}
              onChange={setVisibleColumns}
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Comparison Axis Selection */}
          <div className="space-y-1">
            <FilterLabel 
              label="Compare By" 
              tooltip="Choose the axis of comparison for the graphs. Compare between different zkVM systems or between instance types."
            />
            <select
              className="mt-1 w-full form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={comparisonAxis}
              onChange={(e) => setComparisonAxis(e.target.value)}
            >
              <option value="system">System (SP1 vs RISC0)</option>
              <option value="instance">Instance Type</option>
            </select>
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
        </div>
      </div>

      {activeTab === 'table' ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map(column => (
                  isColumnVisible(column.key) && (
                    <th
                      key={column.key}
                      className={`px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer ${
                        column.key === 'proving_system' ? 'sticky left-0 bg-gray-50' : ''
                      }`}
                      onClick={() => handleSort(column.key)}
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
                    <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRowExpansion(index)}>
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
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-500 hover:text-blue-700">
                          {expandedRow === index ? '▼' : '▶'}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === index && (
                      <tr>
                        <td colSpan={visibleColumns.length + 1} className="px-6 py-4">
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
          selectedPrograms={selectedPrograms}
          comparisonAxis={comparisonAxis}
        />
      )}
    </div>
  );
};

export default LeaderboardTable; 