import React, { useState } from 'react';
import './LeaderboardTable.css';
import useDataLoader from '../../hooks/useDataLoader';
import { formatDuration, formatMemory, formatCpuUsage, formatDurationShort } from '../../utils/dataTransforms';

const LeaderboardTable = () => {
  const { data, loading, error } = useDataLoader();
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'timing.total_duration',
    direction: 'asc'
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleRowExpansion = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortedData = () => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => {
      let aValue = sortConfig.key.split('.').reduce((obj, key) => obj[key], a);
      let bValue = sortConfig.key.split('.').reduce((obj, key) => obj[key], b);

      // Handle duration objects
      if (typeof aValue === 'object' && 'secs' in aValue) {
        aValue = aValue.secs * 1000000000 + aValue.nanos;
        bValue = bValue.secs * 1000000000 + bValue.nanos;
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
    <div className="leaderboard-container">
      <h2>ZK Proof Benchmarks</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('proving_system')}>
              Proving System {getSortIcon('proving_system')}
            </th>
            <th onClick={() => handleSort('program.file_name')}>
              Program {getSortIcon('program.file_name')}
            </th>
            <th onClick={() => handleSort('timing.total_duration')}>
              Total Duration {getSortIcon('timing.total_duration')}
            </th>
            <th onClick={() => handleSort('resources.avg_memory_kb')}>
              Memory Usage {getSortIcon('resources.avg_memory_kb')}
            </th>
            <th onClick={() => handleSort('resources.avg_cpu_percent')}>
              CPU Usage {getSortIcon('resources.avg_cpu_percent')}
            </th>
            <th onClick={() => handleSort('zk_metrics.core_proof_size')}>
              Proof Size {getSortIcon('zk_metrics.core_proof_size')}
            </th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {getSortedData().map((entry, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleRowExpansion(index)}>
                <td>{entry.proving_system}</td>
                <td>{entry.program.file_name}</td>
                <td>{formatDuration(entry.timing.total_duration)}</td>
                <td>{formatMemory(entry.resources.avg_memory_kb)}</td>
                <td>{formatCpuUsage(entry.resources.avg_cpu_percent)}</td>
                <td>{formatMemory(entry.zk_metrics.core_proof_size)}</td>
                <td>
                  <button className="expand-button">
                    {expandedRow === index ? '▼' : '▶'}
                  </button>
                </td>
              </tr>
              {expandedRow === index && (
                <tr className="expanded-row">
                  <td colSpan="7">
                    <div className="metrics-grid">
                      <div className="metrics-section">
                        <h3>ZK Metrics</h3>
                        <ul>
                          <li>Cycles: {entry.zk_metrics.cycles}</li>
                          <li>Segments: {entry.zk_metrics.num_segments}</li>
                          <li>Core Proof Size: {formatMemory(entry.zk_metrics.core_proof_size)}</li>
                          <li>Recursive Proof Size: {formatMemory(entry.zk_metrics.recursive_proof_size)}</li>
                          <li>Execution Speed: {entry.zk_metrics.execution_speed.toFixed(2)} cycles/second</li>
                        </ul>
                      </div>
                      
                      <div className="metrics-section">
                        <h3>Resource Usage</h3>
                        <ul>
                          <li>Peak Memory: {formatMemory(entry.resources.max_memory_kb)}</li>
                          <li>Average Memory: {formatMemory(entry.resources.avg_memory_kb)}</li>
                          <li>Peak CPU: {formatCpuUsage(entry.resources.max_cpu_percent)}</li>
                          <li>Average CPU: {formatCpuUsage(entry.resources.avg_cpu_percent)}</li>
                          <li>Samples: {entry.resources.samples}</li>
                        </ul>
                      </div>

                      <div className="metrics-section timing-section">
                        <h3>Timing Breakdown</h3>
                        <TimingGantt timing={entry.timing} />
                        <ul className="timing-details">
                          <li>Total Duration: {formatDuration(entry.timing.total_duration)}</li>
                          <li>Setup: {formatDuration(entry.timing.workspace_setup_duration)}</li>
                          <li>Compilation: {formatDuration(entry.timing.compilation_duration)}</li>
                          <li>Proof Generation: {formatDuration(entry.timing.proof_generation_duration)}</li>
                          <li>Core Prove: {formatDuration(entry.timing.core_prove_duration)}</li>
                          <li>Core Verify: {formatDuration(entry.timing.core_verify_duration)}</li>
                          <li>Compress Prove: {formatDuration(entry.timing.compress_prove_duration)}</li>
                          <li>Compress Verify: {formatDuration(entry.timing.compress_verify_duration)}</li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TimingGantt = ({ timing }) => {
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

  return (
    <div className="timing-gantt">
      <div className="gantt-row">
        <div className="gantt-label-column">
          <div>Proving</div>
          <div className="gantt-duration">
            {formatDurationShort({ secs: totalProvingNanos / 1000000000, nanos: totalProvingNanos % 1000000000 })}
          </div>
        </div>
        <div className="gantt-chart">
          {provingPhases.map(({ key, label, color }) => (
            <div
              key={key}
              className="gantt-bar"
              style={{
                width: `${getProvingWidth(timing[key])}%`,
                backgroundColor: color,
              }}
              title={`${label}: ${formatDurationShort(timing[key])}`}
            >
              <span className="gantt-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="gantt-row">
        <div className="gantt-label-column">
          <div>Verifying</div>
          <div className="gantt-duration">
            {formatDurationShort({ secs: totalVerifyNanos / 1000000000, nanos: totalVerifyNanos % 1000000000 })}
          </div>
        </div>
        <div className="gantt-chart">
          {verifyPhases.map(({ key, label, color }) => (
            <div
              key={key}
              className="gantt-bar"
              style={{
                width: `${getVerifyWidth(timing[key])}%`,
                backgroundColor: color,
              }}
              title={`${label}: ${formatDurationShort(timing[key])}`}
            >
              <span className="gantt-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTable; 