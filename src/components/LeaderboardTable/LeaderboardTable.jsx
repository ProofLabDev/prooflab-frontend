import React, { useState } from 'react';
import useDataLoader from '../../hooks/useDataLoader';
import { formatDuration, formatMemory, formatCpuUsage, formatDurationShort } from '../../utils/dataTransforms';
import { Link } from 'react-router-dom';

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

const formatFrequency = (hz) => {
  if (!hz && hz !== 0) return 'N/A';
  const units = ['Hz', 'kHz', 'MHz', 'GHz'];
  let freq = hz;
  let unitIndex = 0;
  
  while (freq >= 1000 && unitIndex < units.length - 1) {
    freq /= 1000;
    unitIndex++;
  }
  
  return `${freq.toFixed(2)} ${units[unitIndex]}`;
};

const LeaderboardTable = () => {
  const { data, loading, error } = useDataLoader();
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'timing.proof_generation',
    direction: 'asc'
  });
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [cpuBrandFilter, setCpuBrandFilter] = useState('');
  const [coreCountFilter, setCoreCountFilter] = useState('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Get unique CPU brands and core counts for filters
  const uniqueCpuBrands = [...new Set(data.map(entry => entry.system_info.cpu_brand).filter(Boolean))];
  const uniqueCoreCounts = [...new Set(data.map(entry => entry.system_info.cpu_count).filter(Boolean))].sort((a, b) => a - b);

  const filteredData = data.filter(entry => {
    const matchesCpuBrand = !cpuBrandFilter || entry.system_info.cpu_brand === cpuBrandFilter;
    const matchesCoreCount = !coreCountFilter || entry.system_info.cpu_count.toString() === coreCountFilter;
    return matchesCpuBrand && matchesCoreCount;
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

  const calculateProofGeneration = (timing) => {
    return {
      secs: timing.core_prove_duration.secs + timing.compress_prove_duration.secs,
      nanos: timing.core_prove_duration.nanos + timing.compress_prove_duration.nanos
    };
  };

  const calculateThroughput = (cycles, timing) => {
    if (!cycles) return 0;
    const proofGen = calculateProofGeneration(timing);
    const totalNanos = proofGen.secs * 1000000000 + proofGen.nanos;
    return totalNanos > 0 ? (cycles / (totalNanos / 1000000000)) : 0;
  };

  const getSortedData = () => {
    const sortedData = [...filteredData];
    return sortedData.sort((a, b) => {
      let aValue, bValue;

      if (sortConfig.key === 'timing.proof_generation') {
        const aProofGen = calculateProofGeneration(a.timing);
        const bProofGen = calculateProofGeneration(b.timing);
        aValue = aProofGen.secs * 1000000000 + aProofGen.nanos;
        bValue = bProofGen.secs * 1000000000 + bProofGen.nanos;
      } else if (sortConfig.key === 'zk_metrics.execution_speed') {
        aValue = calculateThroughput(a.zk_metrics.cycles, a.timing);
        bValue = calculateThroughput(b.zk_metrics.cycles, b.timing);
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
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
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

      <h2 className="text-2xl font-bold mb-6">ZK Proof Benchmarks</h2>
      
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">CPU Brand:</label>
          <select
            className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={cpuBrandFilter}
            onChange={(e) => setCpuBrandFilter(e.target.value)}
          >
            <option value="">All</option>
            {uniqueCpuBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">CPU Cores:</label>
          <select
            className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="sticky left-0 bg-gray-50 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" 
                  onClick={() => handleSort('proving_system')}>
                System {getSortIcon('proving_system')}
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('program.file_name')}>
                Program {getSortIcon('program.file_name')}
              </th>
              <th className="hidden md:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('zk_metrics.cycles')}>
                Cycles {getSortIcon('zk_metrics.cycles')}
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('zk_metrics.execution_speed')}>
                Throughput {getSortIcon('zk_metrics.execution_speed')}
              </th>
              <th className="hidden lg:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('timing.proof_generation')}>
                Proof Gen {getSortIcon('timing.proof_generation')}
              </th>
              <th className="hidden xl:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('system_info.cpu_brand')}>
                CPU {getSortIcon('system_info.cpu_brand')}
              </th>
              <th className="hidden xl:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('resources.avg_memory_kb')}>
                Memory {getSortIcon('resources.avg_memory_kb')}
              </th>
              <th className="hidden xl:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('resources.avg_cpu_percent')}>
                CPU Usage {getSortIcon('resources.avg_cpu_percent')}
              </th>
              <th className="hidden lg:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('zk_metrics.core_proof_size')}>
                Proof Size {getSortIcon('zk_metrics.core_proof_size')}
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getSortedData().map((entry, index) => {
              const proofGeneration = calculateProofGeneration(entry.timing);
              const throughput = calculateThroughput(entry.zk_metrics.cycles, entry.timing);
              
              return (
                <React.Fragment key={index}>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRowExpansion(index)}>
                    <td className="sticky left-0 bg-white px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.proving_system}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.program.file_name}
                    </td>
                    <td className="hidden md:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.zk_metrics.cycles?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatFrequency(throughput)}
                    </td>
                    <td className="hidden lg:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDuration(proofGeneration)}
                    </td>
                    <td className="hidden xl:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.system_info.cpu_brand || 'N/A'}
                    </td>
                    <td className="hidden xl:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatMemory(entry.resources.avg_memory_kb)}
                    </td>
                    <td className="hidden xl:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCpuUsage(entry.resources.avg_cpu_percent)}
                    </td>
                    <td className="hidden lg:table-cell px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatProofSize(entry.zk_metrics.core_proof_size)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-500 hover:text-blue-700">
                        {expandedRow === index ? '▼' : '▶'}
                      </button>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan="9" className="px-6 py-4">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Timing Breakdown</h3>
                            <TimingGantt timing={entry.timing} />
                          </div>

                          <div className="border-t pt-4 grid grid-cols-4 gap-x-12 gap-y-6 justify-items-start">
                            <div className="space-y-2 w-full">
                              <h3 className="text-sm font-semibold text-gray-900">ZK Metrics</h3>
                              <ul className="space-y-1 text-sm text-gray-600 list-none">
                                <li>Cycles: {entry.zk_metrics.cycles?.toLocaleString()}</li>
                                <li>Segments: {entry.zk_metrics.num_segments}</li>
                                <li>Core Proof Size: {formatProofSize(entry.zk_metrics.core_proof_size)}</li>
                                <li>Recursive Proof Size: {formatProofSize(entry.zk_metrics.recursive_proof_size)}</li>
                                <li>Execution Speed: {formatFrequency(entry.zk_metrics.execution_speed)}</li>
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
                                <li>Proof Generation: {formatDuration(proofGeneration)}</li>
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
                              </ul>
                            </div>
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
      </div>
    </div>
  );
};

const Tooltip = ({ content, visible, x, y }) => {
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

const TimingGantt = ({ timing }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: '',
    x: 0,
    y: 0
  });

  // Calculate total proving duration for proving scale
  const totalProvingNanos = 
    timing.workspace_setup_duration.secs * 1000000000 + timing.workspace_setup_duration.nanos +
    timing.compilation_duration.secs * 1000000000 + timing.compilation_duration.nanos +
    timing.core_prove_duration.secs * 1000000000 + timing.core_prove_duration.nanos +
    timing.compress_prove_duration.secs * 1000000000 + timing.compress_prove_duration.nanos;

  // Calculate total verification duration for verification scale
  const totalVerifyNanos = 
    timing.core_verify_duration.secs * 1000000000 + timing.core_verify_duration.nanos +
    timing.compress_verify_duration.secs * 1000000000 + timing.compress_verify_duration.nanos;
  
  // Separate width calculations for proving and verifying
  const getProvingWidth = (duration) => {
    const nanos = duration.secs * 1000000000 + duration.nanos;
    return (nanos / totalProvingNanos) * 100;
  };

  const getVerifyWidth = (duration) => {
    const nanos = duration.secs * 1000000000 + duration.nanos;
    return (nanos / totalVerifyNanos) * 100;
  };

  // Define proving phases and their colors
  const provingPhases = [
    { key: 'workspace_setup_duration', label: 'Setup', color: '#e3f2fd' },
    { key: 'compilation_duration', label: 'Compilation', color: '#bbdefb' },
    { key: 'core_prove_duration', label: 'Core Prove', color: '#64b5f6' },
    { key: 'compress_prove_duration', label: 'Compress Prove', color: '#2196f3' }
  ];

  // Define verification phases
  const verifyPhases = [
    { key: 'core_verify_duration', label: 'Core Verify', color: '#81c784' },
    { key: 'compress_verify_duration', label: 'Compress Verify', color: '#4caf50' }
  ];

  // Format percentage for tooltip
  const getPercentage = (duration, total) => {
    const durationNanos = duration.secs * 1000000000 + duration.nanos;
    return ((durationNanos / total) * 100).toFixed(1);
  };

  const handleMouseEnter = (e, phase, duration, totalNanos) => {
    const percentage = getPercentage(duration, totalNanos);
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
      <Tooltip {...tooltip} />
      <div className="w-full">
        <div className="flex items-center mb-2">
          <div className="w-24 text-sm font-medium text-gray-600">Proving</div>
          <div className="text-sm text-gray-500">
            {formatDurationShort({ secs: totalProvingNanos / 1000000000, nanos: totalProvingNanos % 1000000000 })}
          </div>
        </div>
        <div className="relative h-8 flex rounded-lg overflow-hidden bg-gray-100">
          {provingPhases.map(({ key, label, color }) => {
            const width = getProvingWidth(timing[key]);
            return width > 0 ? (
              <div
                key={key}
                className="h-full relative group hover:brightness-95 transition-all"
                style={{
                  width: `${width}%`,
                  backgroundColor: color,
                }}
                onMouseEnter={(e) => handleMouseEnter(e, label, timing[key], totalProvingNanos)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {width > 10 && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                    {label}
                  </span>
                )}
              </div>
            ) : null;
          })}
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center mb-2">
          <div className="w-24 text-sm font-medium text-gray-600">Verifying</div>
          <div className="text-sm text-gray-500">
            {formatDurationShort({ secs: totalVerifyNanos / 1000000000, nanos: totalVerifyNanos % 1000000000 })}
          </div>
        </div>
        <div className="relative h-8 flex rounded-lg overflow-hidden bg-gray-100">
          {verifyPhases.map(({ key, label, color }) => {
            const width = getVerifyWidth(timing[key]);
            return width > 0 ? (
              <div
                key={key}
                className="h-full relative group hover:brightness-95 transition-all"
                style={{
                  width: `${width}%`,
                  backgroundColor: color,
                }}
                onMouseEnter={(e) => handleMouseEnter(e, label, timing[key], totalVerifyNanos)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {width > 10 && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                    {label}
                  </span>
                )}
              </div>
            ) : null;
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        {[...provingPhases, ...verifyPhases].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: color }}></div>
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable; 