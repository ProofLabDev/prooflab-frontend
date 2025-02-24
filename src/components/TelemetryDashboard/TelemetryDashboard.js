import React, { useState, useMemo, useEffect } from 'react';
import { useTelemetryData, formatDuration, formatBytes, formatDate } from '../../utils/dataFetching';
import TelemetryChart from './TelemetryChart';
import { calculateEC2Cost, formatCost } from '../../utils/dataTransforms';

const TelemetryDashboard = () => {
  const { telemetryData, loading, error } = useTelemetryData();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedInstances, setSelectedInstances] = useState([]);
  const [selectedVersions, setSelectedVersions] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [comparisonType, setComparisonType] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Compute available instances and versions for the selected program and system
  const { availableInstances, availableSdkVersions } = useMemo(() => {
    if (!selectedProgram || !selectedSystem || !telemetryData[selectedProgram]?.[selectedSystem]) {
      return { availableInstances: [], availableSdkVersions: [] };
    }

    const instances = new Set();
    const versions = new Set();

    Object.entries(telemetryData[selectedProgram][selectedSystem]).forEach(([instance, runs]) => {
      instances.add(instance);
      runs.forEach(run => {
        if (run.sdkVersion) {
          versions.add(run.sdkVersion);
        }
      });
    });

    const sortedVersions = Array.from(versions).sort((a, b) => b.localeCompare(a)); // Sort versions descending

    return {
      availableInstances: Array.from(instances).sort(),
      availableSdkVersions: sortedVersions
    };
  }, [selectedProgram, selectedSystem, telemetryData]);

  // Set default version when system changes
  useEffect(() => {
    if (availableSdkVersions.length > 0) {
      if (comparisonType === 'version') {
        setSelectedVersions(availableSdkVersions);
        setSelectedInstances([availableInstances[0]]);
      } else if (comparisonType === 'instance') {
        setSelectedInstances(availableInstances);
        setSelectedVersions([availableSdkVersions[0]]);
      } else {
        setSelectedVersions([availableSdkVersions[0]]);
        setComparisonType('version');
      }
    }
  }, [selectedSystem, availableSdkVersions, availableInstances, comparisonType]);

  // Add available metrics constant
  const AVAILABLE_METRICS = [
    { id: 'total_duration', label: 'Total Duration' },
    { id: 'compilation_duration', label: 'Compilation Duration' },
    { id: 'proof_generation_duration', label: 'Proof Generation Duration' },
    { id: 'max_memory', label: 'Max Memory' },
    { id: 'avg_cpu', label: 'Avg CPU' },
    { id: 'cycles', label: 'Cycles' },
    { id: 'cost', label: 'Estimated Cost' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading telemetry data</h3>
            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const programs = Object.keys(telemetryData);

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
    setSelectedSystem(null);
    setSelectedInstances([]);
    setSelectedVersions([]);
    setComparisonType(null);
  };

  const handleSystemSelect = (system) => {
    setSelectedSystem(system);
    setSelectedInstances([]);
    setSelectedVersions([]);
    setComparisonType(null);
  };

  const handleComparisonTypeSelect = (type) => {
    setComparisonType(type);
    
    if (type === 'version') {
      // When switching to version comparison:
      // - Select all versions (primary axis)
      // - Select the first instance (secondary axis)
      setSelectedVersions(availableSdkVersions);
      setSelectedInstances([availableInstances[0]]);
    } else {
      // When switching to instance comparison:
      // - Select all instances (primary axis)
      // - Select the latest version (secondary axis)
      setSelectedInstances(availableInstances);
      setSelectedVersions([availableSdkVersions[0]]);
    }
  };

  const handleInstanceSelect = (instance) => {
    if (comparisonType === 'version') {
      // In version comparison mode, only allow one instance
      setSelectedInstances([instance]);
    } else {
      // In instance comparison mode, allow multiple instances
      setSelectedInstances(prev => {
        if (prev.includes(instance)) {
          // Don't allow deselecting if it's the only instance selected
          return prev.length === 1 ? prev : prev.filter(i => i !== instance);
        }
        return [...prev, instance];
      });
    }
  };

  const handleSdkVersionSelect = (version) => {
    if (comparisonType === 'instance') {
      // In instance comparison mode, only allow one version
      setSelectedVersions([version]);
    } else {
      // In version comparison mode, allow multiple versions
      setSelectedVersions(prev => {
        if (prev.includes(version)) {
          // Don't allow deselecting if it's the only version selected
          return prev.length === 1 ? prev : prev.filter(v => v !== version);
        }
        return [...prev, version];
      });
    }
  };

  const handleMetricSelect = (metricId) => {
    setSelectedMetrics(metricId ? [metricId] : []);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortedData = () => {
    if (!selectedProgram || !selectedSystem) return [];

    let allRuns = Object.entries(telemetryData[selectedProgram][selectedSystem]).flatMap(
      ([instance, runs]) => runs.map(run => ({ ...run, instance }))
    );

    // Apply filters based on comparison type and selections
    if (comparisonType === 'instance') {
      if (selectedInstances.length > 0) {
        allRuns = allRuns.filter(run => selectedInstances.includes(run.instance));
      }
      if (selectedVersions.length > 0) {
        allRuns = allRuns.filter(run => selectedVersions.includes(run.sdkVersion));
      }
    } else if (comparisonType === 'version') {
      if (selectedVersions.length > 0) {
        allRuns = allRuns.filter(run => selectedVersions.includes(run.sdkVersion));
      }
      if (selectedInstances.length > 0) {
        allRuns = allRuns.filter(run => selectedInstances.includes(run.instance));
      }
    }

    return allRuns.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortConfig.key) {
        case 'date':
          return sortConfig.direction === 'asc' 
            ? a.date.localeCompare(b.date)
            : b.date.localeCompare(a.date);
        case 'instance':
          aValue = a.instance;
          bValue = b.instance;
          break;
        case 'total_duration':
          aValue = a.timing.total_duration.secs + a.timing.total_duration.nanos / 1e9;
          bValue = b.timing.total_duration.secs + b.timing.total_duration.nanos / 1e9;
          break;
        case 'compilation':
          aValue = a.timing.compilation_duration.secs + a.timing.compilation_duration.nanos / 1e9;
          bValue = b.timing.compilation_duration.secs + b.timing.compilation_duration.nanos / 1e9;
          break;
        case 'proof_generation':
          aValue = a.timing.proof_generation_duration.secs + a.timing.proof_generation_duration.nanos / 1e9;
          bValue = b.timing.proof_generation_duration.secs + b.timing.proof_generation_duration.nanos / 1e9;
          break;
        case 'max_memory':
          aValue = a.resources.max_memory_kb;
          bValue = b.resources.max_memory_kb;
          break;
        case 'avg_cpu':
          aValue = a.resources.avg_cpu_percent;
          bValue = b.resources.avg_cpu_percent;
          break;
        case 'cycles':
          aValue = a.zk_metrics.cycles;
          bValue = b.zk_metrics.cycles;
          break;
        case 'cost':
          aValue = calculateEC2Cost(a.timing.proof_generation_duration, a.instance) || 0;
          bValue = calculateEC2Cost(b.timing.proof_generation_duration, b.instance) || 0;
          break;
        case 'sdkVersion':
          aValue = a.sdkVersion;
          bValue = b.sdkVersion;
          break;
        default:
          return 0;
      }

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const renderSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return (
      <span className="ml-1">
        {sortConfig.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Program Selection */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Select Program</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {programs.map(program => (
              <button
                key={program}
                onClick={() => handleProgramSelect(program)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedProgram === program
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {program}
              </button>
            ))}
          </div>
        </div>

        {/* System Selection */}
        {selectedProgram && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select System</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.keys(telemetryData[selectedProgram]).map(system => (
                <button
                  key={system}
                  onClick={() => handleSystemSelect(system)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedSystem === system
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {system.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        {selectedSystem && (
          <div className="space-y-6">
            {/* Comparison Type Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compare By</h3>
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <button
                  onClick={() => handleComparisonTypeSelect('version')}
                  className={`px-4 py-3 rounded-lg text-sm font-medium border-2 ${
                    comparisonType === 'version'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold">SDK Version</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Compare performance across different instance types for a specific SDK version
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleComparisonTypeSelect('instance')}
                  className={`px-4 py-3 rounded-lg text-sm font-medium border-2 ${
                    comparisonType === 'instance'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold">Instance Type</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Compare performance across different SDK versions for a specific instance type
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Version Selection */}
            {comparisonType === 'version' && availableSdkVersions.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Select {selectedSystem.toUpperCase()} Versions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableSdkVersions.map(version => (
                    <button
                      key={version}
                      onClick={() => handleSdkVersionSelect(version)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedVersions.includes(version)
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      v{version}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Instance Type Selection */}
            {comparisonType === 'version' && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Select Instance Type
                </h3>
                <select
                  value={selectedInstances[0] || availableInstances[0] || ''}
                  onChange={(e) => handleInstanceSelect(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {availableInstances.map(instance => (
                    <option key={instance} value={instance}>
                      {instance}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Instance Type Selection (Multiple) */}
            {comparisonType === 'instance' && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Select Instance Types
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableInstances.map(instance => (
                    <button
                      key={instance}
                      onClick={() => handleInstanceSelect(instance)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedInstances.includes(instance)
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {instance}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Version Selection (Single) */}
            {comparisonType === 'instance' && availableSdkVersions.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Select {selectedSystem.toUpperCase()} Version
                </h3>
                <select
                  value={selectedVersions[0] || availableSdkVersions[0] || ''}
                  onChange={(e) => handleSdkVersionSelect(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {availableSdkVersions.map(version => (
                    <option key={version} value={version}>
                      v{version}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Metric Selection */}
            {comparisonType && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Select Metric to Plot</h3>
                <select
                  value={selectedMetrics[0] || ''}
                  onChange={(e) => handleMetricSelect(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select a metric</option>
                  {AVAILABLE_METRICS.map(metric => (
                    <option key={metric.id} value={metric.id}>
                      {metric.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Chart */}
            {selectedMetrics.length > 0 && selectedMetrics[0] && (
              <div className="bg-white p-4 rounded-lg shadow">
                <TelemetryChart
                  data={getSortedData()}
                  selectedMetrics={selectedMetrics}
                  comparisonType={comparisonType}
                />
              </div>
            )}

            {/* Telemetry Data Table */}
            <div className="mt-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                        Date {renderSortArrow('date')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('instance')}>
                        Instance {renderSortArrow('instance')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('total_duration')}>
                        Total Duration {renderSortArrow('total_duration')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('compilation')}>
                        Compilation {renderSortArrow('compilation')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('proof_generation')}>
                        Proof Generation {renderSortArrow('proof_generation')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('max_memory')}>
                        Max Memory {renderSortArrow('max_memory')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('avg_cpu')}>
                        Avg CPU {renderSortArrow('avg_cpu')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('cycles')}>
                        Cycles {renderSortArrow('cycles')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('cost')}>
                        Est. Cost {renderSortArrow('cost')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('sdkVersion')}>
                        SDK Version {renderSortArrow('sdkVersion')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getSortedData().map((run, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(run.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {run.instance}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDuration(run.timing.total_duration)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDuration(run.timing.compilation_duration)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDuration(run.timing.proof_generation_duration)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatBytes(run.resources.max_memory_kb * 1024)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {run.resources.avg_cpu_percent.toFixed(2)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {run.zk_metrics.cycles.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCost(calculateEC2Cost(run.timing.proof_generation_duration, run.instance))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {run.sdkVersion ? `v${run.sdkVersion}` : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelemetryDashboard; 