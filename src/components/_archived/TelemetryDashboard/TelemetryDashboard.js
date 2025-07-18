import React, { useState, useMemo, useEffect } from 'react';
import { useTelemetryData, formatDuration, formatBytes, formatDate } from '../../utils/dataFetching';
import { calculateEC2Cost, formatCost } from '../../utils/dataTransforms';
import TelemetryChart from './TelemetryChart';

const BenchmarkCard = ({ program, systems, onClick, isActive, isPending }) => {
  // Get the number of data points across all systems for this program
  const dataPointCount = Object.values(systems).reduce((count, instances) => {
    return count + Object.values(instances).reduce((subCount, runs) => {
      return subCount + runs.length;
    }, 0);
  }, 0);

  // Get a list of available systems for this program
  const availableZkVMs = Object.keys(systems).map(system => system.toUpperCase()).join(', ');

  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden
        border rounded-lg p-5 shadow-sm cursor-pointer transition-all
        ${isActive ? 'border-indigo-500 shadow-md bg-indigo-50' : 'border-gray-200 hover:shadow hover:border-indigo-200'}
        ${isPending ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-2">{program}</h3>
        {isActive && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Selected
          </span>
        )}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        <span className="font-medium">{dataPointCount}</span> benchmark runs
      </div>
      <div className="text-sm text-gray-500 mb-2">
        Available on: {availableZkVMs}
      </div>
      {isPending ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="text-indigo-600 text-sm font-medium">
            View Benchmarks →
          </div>
        </div>
      )}
    </div>
  );
};

const BenchmarkFilterPanel = ({ 
  initialFilters,
  allSystems,
  allInstances,
  allVersions,
  metrics,
  onFilterChange
}) => {
  const [filters, setFilters] = useState(initialFilters);
  
  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Benchmarks</h3>
        <p className="text-sm text-gray-500 mb-6">
          Customize your view of benchmark data with the following filters.
        </p>
      </div>
      
      {/* System Selection */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Reports</h4>
        <div className="flex flex-wrap gap-2">
          {allSystems.map(system => (
            <button
              key={system}
              onClick={() => {
                const newSystems = filters.systems.includes(system)
                  ? filters.systems.filter(s => s !== system)
                  : [...filters.systems, system];
                // Don't allow deselecting all systems
                if (newSystems.length > 0) {
                  handleChange('systems', newSystems);
                }
              }}
              className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${filters.systems.includes(system)
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'}
              `}
            >
              {system.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      {/* Instance Types */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Hardware Types</h4>
        <div className="flex flex-wrap gap-2">
          {allInstances.map(instance => (
            <button
              key={instance}
              onClick={() => {
                const newInstances = filters.instances.includes(instance)
                  ? filters.instances.filter(i => i !== instance)
                  : [...filters.instances, instance];
                handleChange('instances', newInstances);
              }}
              className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${filters.instances.includes(instance)
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'}
              `}
            >
              {instance}
            </button>
          ))}
        </div>
      </div>
      
      {/* SDK Versions */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">SDK Versions</h4>
        <div className="flex flex-wrap gap-2">
          {allVersions.map(version => (
            <button
              key={version}
              onClick={() => {
                const newVersions = filters.versions.includes(version)
                  ? filters.versions.filter(v => v !== version)
                  : [...filters.versions, version];
                handleChange('versions', newVersions);
              }}
              className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${filters.versions.includes(version)
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'}
              `}
            >
              v{version}
            </button>
          ))}
        </div>
      </div>
      
      {/* Metrics Selection */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Chart Metric</h4>
        <select
          value={filters.metric || ''}
          onChange={(e) => handleChange('metric', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select a metric</option>
          {metrics.map(metric => (
            <option key={metric.id} value={metric.id}>
              {metric.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Group By */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Group By</h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleChange('groupBy', 'system')}
            className={`
              px-3 py-2 rounded-md text-sm font-medium text-center
              ${filters.groupBy === 'system'
                ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'}
            `}
          >
            Report System
          </button>
          <button
            onClick={() => handleChange('groupBy', 'instance')}
            className={`
              px-3 py-2 rounded-md text-sm font-medium text-center
              ${filters.groupBy === 'instance'
                ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'}
            `}
          >
            Hardware Type
          </button>
          <button
            onClick={() => handleChange('groupBy', 'version')}
            className={`
              px-3 py-2 rounded-md text-sm font-medium text-center
              ${filters.groupBy === 'version'
                ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'}
            `}
          >
            SDK Version
          </button>
          <button
            onClick={() => handleChange('groupBy', 'date')}
            className={`
              px-3 py-2 rounded-md text-sm font-medium text-center
              ${filters.groupBy === 'date'
                ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'}
            `}
          >
            Date
          </button>
        </div>
      </div>
      
      {/* Sorting */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Sort By</h4>
        <div className="flex">
          <select
            value={filters.sortKey}
            onChange={(e) => handleChange('sortKey', e.target.value)}
            className="block w-full rounded-l-md border-gray-300 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="date">Date</option>
            <option value="total_duration">Total Duration</option>
            <option value="compilation">Compilation</option>
            <option value="proof_generation">Proving Time</option>
            <option value="max_memory">Max Memory</option>
            <option value="avg_cpu">Avg CPU</option>
            <option value="cycles">Cycles</option>
            <option value="cost">Est. Cost</option>
            <option value="instance">Instance</option>
            <option value="sdkVersion">SDK Version</option>
          </select>
          <button
            onClick={() => handleChange('sortDirection', filters.sortDirection === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 bg-gray-100 rounded-r-md border border-l-0 border-gray-300"
          >
            {filters.sortDirection === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
      
      {/* Reset */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => onFilterChange({
            systems: allSystems,
            instances: [],
            versions: [],
            metric: '',
            groupBy: 'system',
            sortKey: 'date',
            sortDirection: 'desc'
          })}
          className="px-4 py-2 w-full rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

// Available metrics constant
const AVAILABLE_METRICS = [
  { id: 'total_duration', label: 'Total Duration' },
  { id: 'compilation_duration', label: 'Compilation Duration' },
  { id: 'proving_duration', label: 'Proving Duration' },
  { id: 'max_memory', label: 'Max Memory' },
  { id: 'avg_cpu', label: 'Avg CPU' },
  { id: 'cycles', label: 'Cycles' }
];

const TelemetryDashboard = () => {
  const { telemetryData, loading, error } = useTelemetryData();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loadingProgram, setLoadingProgram] = useState(false);
  const [filters, setFilters] = useState({
    systems: [],
    instances: [],
    versions: [],
    metric: '',
    groupBy: 'system',
    sortKey: 'date',
    sortDirection: 'desc'
  });

  // Get unique systems, instances, and versions across all programs
  const { allSystems, allInstances, allVersions } = useMemo(() => {
    const systems = new Set();
    const instances = new Set();
    const versions = new Set();

    if (!telemetryData) return { allSystems: [], allInstances: [], allVersions: [] };

    Object.values(telemetryData).forEach(programData => {
      Object.keys(programData).forEach(system => {
        systems.add(system);
        Object.entries(programData[system]).forEach(([instance, runs]) => {
          instances.add(instance);
          runs.forEach(run => {
            if (run.sdkVersion) {
              versions.add(run.sdkVersion);
            }
          });
        });
      });
    });

    return {
      allSystems: Array.from(systems),
      allInstances: Array.from(instances),
      allVersions: Array.from(versions).sort((a, b) => b.localeCompare(a))
    };
  }, [telemetryData]);

  // When data loads, set default systems filter
  useEffect(() => {
    if (!loading && allSystems.length > 0 && filters.systems.length === 0) {
      setFilters(prev => ({ ...prev, systems: allSystems }));
    }
  }, [loading, allSystems, filters.systems]);

  // Simulate loading when changing programs
  const handleProgramSelect = (program) => {
    setLoadingProgram(true);
    setSelectedProgram(program);
    
    // Simulate loading delay
    setTimeout(() => {
      setLoadingProgram(false);
    }, 500);
  };

  const renderSortArrow = (key) => {
    if (filters.sortKey !== key) return null;
    return (
      <span className="ml-1">
        {filters.sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const getSortedData = () => {
    if (!selectedProgram) return [];

    let allRuns = [];
    const programData = telemetryData[selectedProgram];

    // Apply system filter
    filters.systems.forEach(system => {
      if (programData[system]) {
        Object.entries(programData[system]).forEach(([instance, runs]) => {
          // Apply instance filter
          if (filters.instances.length === 0 || filters.instances.includes(instance)) {
            // Apply version filter
            const filteredRuns = filters.versions.length === 0
              ? runs
              : runs.filter(run => filters.versions.includes(run.sdkVersion));
            
            allRuns = [...allRuns, ...filteredRuns.map(run => ({ ...run, system, instance }))];
          }
        });
      }
    });

    // Sort data
    return allRuns.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortKey) {
        case 'date':
          return filters.sortDirection === 'asc' 
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
          aValue = (a.timing.core_prove_duration.secs + a.timing.core_prove_duration.nanos / 1e9) +
                  (a.timing.compress_prove_duration.secs + a.timing.compress_prove_duration.nanos / 1e9);
          bValue = (b.timing.core_prove_duration.secs + b.timing.core_prove_duration.nanos / 1e9) +
                  (b.timing.compress_prove_duration.secs + b.timing.compress_prove_duration.nanos / 1e9);
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
          aValue = calculateEC2Cost(a.timing.total_duration, a.instance) || 0;
          bValue = calculateEC2Cost(b.timing.total_duration, b.instance) || 0;
          break;
        case 'sdkVersion':
          aValue = a.sdkVersion;
          bValue = b.sdkVersion;
          break;
        case 'system':
          aValue = a.system;
          bValue = b.system;
          break;
        default:
          return 0;
      }

      if (filters.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const getLabel = (run) => {
    switch (filters.groupBy) {
      case 'system':
        return run.system.toUpperCase();
      case 'instance':
        return run.instance;
      case 'version':
        return `v${run.sdkVersion}`;
      case 'date':
        return formatDate(run.date);
      default:
        return run.system.toUpperCase();
    }
  };

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
  const sortedData = selectedProgram ? getSortedData() : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Benchmark Dashboard</h1>
        <p className="mt-2 text-xl text-gray-600">
          Explore performance comparisons across programs, ZK systems, and hardware configurations
        </p>
      </div>
      
      {/* Program Selection or Results View */}
      {!selectedProgram ? (
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-900">Select a Program to Benchmark</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(program => (
              <BenchmarkCard
                key={program}
                program={program}
                systems={telemetryData[program]}
                onClick={() => handleProgramSelect(program)}
                isActive={selectedProgram === program}
                isPending={selectedProgram === program && loadingProgram}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Program Details with Back Button */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-900"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Programs
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedProgram} Benchmarks</h2>
            </div>
            <div className="text-sm text-gray-500">
              {sortedData.length} benchmark runs
            </div>
          </div>
          
          {/* Two-column layout for results */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with filters */}
            <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
              <BenchmarkFilterPanel
                initialFilters={filters}
                allSystems={allSystems}
                allInstances={allInstances}
                allVersions={allVersions}
                metrics={AVAILABLE_METRICS}
                onFilterChange={setFilters}
              />
            </div>
            
            {/* Main content with visualizations and table */}
            <div className="w-full lg:w-3/4 space-y-8">
              {/* Chart */}
              {filters.metric && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {AVAILABLE_METRICS.find(m => m.id === filters.metric)?.label || 'Metric'} 
                    {' '}by{' '}
                    {filters.groupBy === 'system' ? 'Report System' : 
                     filters.groupBy === 'instance' ? 'Hardware Type' : 
                     filters.groupBy === 'version' ? 'SDK Version' : 'Date'}
                  </h3>
                  <TelemetryChart
                    data={sortedData}
                    selectedMetrics={[filters.metric]}
                    groupBy={filters.groupBy}
                    getLabel={getLabel}
                  />
                </div>
              )}
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sortedData.length > 0 && (
                  <>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Fastest Run</h4>
                      <div className="text-2xl font-bold text-gray-900">
                        {formatDuration(sortedData.reduce((fastest, run) => {
                          const duration = run.timing.total_duration.secs + run.timing.total_duration.nanos / 1e9;
                          const fastestDuration = fastest.secs + fastest.nanos / 1e9;
                          return duration < fastestDuration ? run.timing.total_duration : fastest;
                        }, sortedData[0].timing.total_duration))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Total Duration
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Average Memory</h4>
                      <div className="text-2xl font-bold text-gray-900">
                        {formatBytes(sortedData.reduce((sum, run) => sum + run.resources.max_memory_kb, 0) / sortedData.length * 1024)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Max Memory Usage
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Average Cost</h4>
                      <div className="text-2xl font-bold text-gray-900">
                        {formatCost(sortedData.reduce((sum, run) => 
                          sum + (calculateEC2Cost(run.timing.total_duration, run.instance) || 0), 0) / sortedData.length
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Estimated EC2 Cost
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Results Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Benchmark Results</h3>
                </div>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th onClick={() => setFilters({...filters, sortKey: 'date', sortDirection: filters.sortKey === 'date' && filters.sortDirection === 'asc' ? 'desc' : 'asc'})} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Date {renderSortArrow('date')}
                        </th>
                        <th onClick={() => setFilters({...filters, sortKey: 'system', sortDirection: filters.sortKey === 'system' && filters.sortDirection === 'asc' ? 'desc' : 'asc'})} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          System {renderSortArrow('system')}
                        </th>
                        <th onClick={() => setFilters({...filters, sortKey: 'instance', sortDirection: filters.sortKey === 'instance' && filters.sortDirection === 'asc' ? 'desc' : 'asc'})} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Instance {renderSortArrow('instance')}
                        </th>
                        <th onClick={() => setFilters({...filters, sortKey: 'total_duration', sortDirection: filters.sortKey === 'total_duration' && filters.sortDirection === 'asc' ? 'desc' : 'asc'})} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Total Duration {renderSortArrow('total_duration')}
                        </th>
                        <th onClick={() => setFilters({...filters, sortKey: 'compilation', sortDirection: filters.sortKey === 'compilation' && filters.sortDirection === 'asc' ? 'desc' : 'asc'})} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Compilation {renderSortArrow('compilation')}
                        </th>
                        <th onClick={() => setFilters({...filters, sortKey: 'proof_generation', sortDirection: filters.sortKey === 'proof_generation' && filters.sortDirection === 'asc' ? 'desc' : 'asc'})} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Proving Time {renderSortArrow('proof_generation')}
                        </th>
                        <th onClick={() => setFilters({...filters, sortKey: 'max_memory', sortDirection: filters.sortKey === 'max_memory' && filters.sortDirection === 'asc' ? 'desc' : 'asc'})} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Max Memory {renderSortArrow('max_memory')}
                        </th>
                        <th onClick={() => setFilters({...filters, sortKey: 'avg_cpu', sortDirection: filters.sortKey === 'avg_cpu' && filters.sortDirection === 'asc' ? 'desc' : 'asc'})} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Avg CPU {renderSortArrow('avg_cpu')}
                        </th>
                        <th onClick={() => setFilters({...filters, sortKey: 'cycles', sortDirection: filters.sortKey === 'cycles' && filters.sortDirection === 'asc' ? 'desc' : 'asc'})} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Cycles {renderSortArrow('cycles')}
                        </th>
                        <th onClick={() => setFilters({...filters, sortKey: 'cost', sortDirection: filters.sortKey === 'cost' && filters.sortDirection === 'asc' ? 'desc' : 'asc'})} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          Est. Cost {renderSortArrow('cost')}
                        </th>
                        <th onClick={() => setFilters({...filters, sortKey: 'sdkVersion', sortDirection: filters.sortKey === 'sdkVersion' && filters.sortDirection === 'asc' ? 'desc' : 'asc'})} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                          SDK Version {renderSortArrow('sdkVersion')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedData.map((run, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(run.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {run.system.toUpperCase()}
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
                            {formatDuration({
                              secs: run.timing.core_prove_duration.secs + run.timing.compress_prove_duration.secs,
                              nanos: run.timing.core_prove_duration.nanos + run.timing.compress_prove_duration.nanos
                            })}
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
                            {formatCost(calculateEC2Cost(run.timing.total_duration, run.instance))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {run.sdkVersion ? `v${run.sdkVersion}` : 'N/A'}
                          </td>
                        </tr>
                      ))}
                      {sortedData.length === 0 && (
                        <tr>
                          <td colSpan="11" className="px-6 py-12 text-center text-gray-500">
                            <div className="flex flex-col items-center">
                              <svg className="h-10 w-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-lg font-medium">No results found</p>
                              <p className="text-sm mt-1">Try adjusting your filters to see more data</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelemetryDashboard;