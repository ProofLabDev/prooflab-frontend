import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useTopBenchmarks from '../../hooks/useTopBenchmarks';
import * as d3 from 'd3';

const formatDuration = (seconds) => {
  if (seconds < 1) {
    return `${(seconds * 1000).toFixed(0)}ms`;
  }
  return `${seconds.toFixed(1)}s`;
};

const formatMemory = (mb) => {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)}GB`;
  }
  return `${mb.toFixed(0)}MB`;
};

const BenchmarkMetricRow = ({ title, items }) => (
  <tr>
    <td className="px-4 py-3 text-sm font-medium text-gray-900">{title}</td>
    {items.map((item, index) => (
      <td key={index} className="px-4 py-3 text-sm text-gray-600">
        {item || '—'}
      </td>
    ))}
  </tr>
);

const ProgramHeader = ({ program, implementations, zkvms }) => {
  const statusColors = {
    production: 'bg-green-100 text-green-800',
    alpha: 'bg-yellow-100 text-yellow-800',
    development: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight flex items-center">
            {program.name}
            {program.complexity && (
              <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                ${program.complexity === 'high' ? 'bg-red-100 text-red-800' : 
                  program.complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'}`}>
                {program.complexity} complexity
              </span>
            )}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{program.description}</p>
        </div>
        <div className="mt-4 flex-shrink-0 md:mt-0 md:ml-4">
          <Link
            to="/programs"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            ← Back to Programs
          </Link>
        </div>
      </div>

      {program.tags && program.tags.length > 0 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {program.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {implementations.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-500">Implementations</h3>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {implementations.map(impl => {
              const zkvm = zkvms.find(z => z.id === impl.zkvm);
              return (
                <div key={impl.zkvm} className="flex items-center space-x-3 text-sm">
                  <Link 
                    to={`/zkvms/${impl.zkvm}`}
                    className="text-indigo-600 font-medium hover:text-indigo-500"
                  >
                    {zkvm?.name || impl.zkvm}
                  </Link>
                  <span className="text-gray-400">|</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    statusColors[zkvm?.status] || 'bg-gray-100 text-gray-800'
                  }`}>
                    {zkvm?.status || 'unknown'}
                  </span>
                  <span className="text-gray-500">{impl.language}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Throughput Comparison Chart Component
const ThroughputChart = ({ cpuData, gpuData }) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (!chartRef.current || !cpuData || !gpuData) return;
    
    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();
    
    // Combine and process data
    const combinedData = [];
    
    // CPU Data
    Object.keys(cpuData).forEach(zkvm => {
      const throughput = cpuData[zkvm]?.throughput || 0;
      console.log(`Preparing chart data for ${zkvm} CPU: ${throughput} Hz`);
      combinedData.push({
        zkvm,
        type: 'CPU',
        throughput: throughput  // Use the Hz value directly here
      });
    });
    
    // GPU Data
    Object.keys(gpuData).forEach(zkvm => {
      const throughput = gpuData[zkvm]?.throughput || 0;
      console.log(`Preparing chart data for ${zkvm} GPU: ${throughput} Hz`);
      combinedData.push({
        zkvm,
        type: 'GPU',
        throughput: throughput  // Use the Hz value directly here
      });
    });
    
    // Filter out entries with zero throughput
    const filteredData = combinedData.filter(d => d.throughput > 0);
    
    if (filteredData.length === 0) return;
    
    // Set dimensions and margins for chart
    const margin = { top: 30, right: 80, bottom: 40, left: 80 };
    const width = 650 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    // Create SVG container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Group data by zkvm
    const groupedData = d3.group(filteredData, d => d.zkvm);
    
    // Create scales
    const x0 = d3.scaleBand()
      .domain(Array.from(groupedData.keys()))
      .rangeRound([0, width])
      .paddingInner(0.2);
    
    const x1 = d3.scaleBand()
      .domain(['CPU', 'GPU'])
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.throughput) * 1.1])
      .nice()
      .rangeRound([height, 0]);
    
    // Colors
    const color = d3.scaleOrdinal()
      .domain(['CPU', 'GPU'])
      .range(['#4f46e5', '#ec4899']);
    
    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0).tickSize(0))
      .selectAll('text')
      .style('font-weight', '600')
      .style('font-size', '12px');
    
    // Add Y axis with dynamic units
    svg.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => {
        // Log the Y-axis values to debug
        console.log(`Y-axis value: ${d}`);
        
        if (d >= 1_000_000) {
          return `${(d / 1_000_000).toFixed(1)} MHz`;
        } else if (d >= 1_000) {
          return `${(d / 1_000).toFixed(1)} kHz`;
        } else {
          return `${Math.round(d)} Hz`;
        }
      }))
      .selectAll('text')
      .style('font-size', '11px');
    
    // Y axis title
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -60)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text('Throughput (cycles/second)');
    
    // Add the bars
    const zkvmGroup = svg.selectAll('.zkvm-group')
      .data(groupedData)
      .join('g')
      .attr('class', 'zkvm-group')
      .attr('transform', d => `translate(${x0(d[0])},0)`);
    
    zkvmGroup.selectAll('rect')
      .data(d => d[1])
      .join('rect')
      .attr('x', d => x1(d.type))
      .attr('y', d => y(d.throughput))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.throughput))
      .attr('fill', d => color(d.type))
      .attr('rx', 2);
    
    // Add values on top of bars with dynamic units
    zkvmGroup.selectAll('text')
      .data(d => d[1])
      .join('text')
      .attr('x', d => x1(d.type) + x1.bandwidth() / 2)
      .attr('y', d => y(d.throughput) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('fill', d => d3.color(color(d.type)).darker())
      .text(d => {
        // Format with appropriate unit based on magnitude
        // Log the value to debug
        console.log(`Chart value for ${d.zkvm} ${d.type}: ${d.throughput}`);
        
        if (d.throughput >= 1_000_000) {
          return `${(d.throughput / 1_000_000).toFixed(2)} MHz`;
        } else if (d.throughput >= 1_000) {
          return `${(d.throughput / 1_000).toFixed(2)} kHz`;
        } else {
          return `${Math.round(d.throughput)} Hz`;
        }
      });
    
    // Add a legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width},10)`)
      .attr('font-size', '10px');
    
    ['CPU', 'GPU'].forEach((type, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);
      
      legendRow.append('rect')
        .attr('x', 0)
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', color(type))
        .attr('rx', 2);
      
      legendRow.append('text')
        .attr('x', 18)
        .attr('y', 9)
        .attr('alignment-baseline', 'middle')
        .text(type);
    });
  }, [cpuData, gpuData]);

  return (
    <div className="mt-6">
      <div ref={chartRef} className="mx-auto" style={{ maxWidth: '650px' }}></div>
    </div>
  );
};

// Main Component
const ProgramDetails = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [zkvms, setZkvms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [implementations, setImplementations] = useState([]);
  const [compareMetric, setCompareMetric] = useState('throughput');

  // Fetch program and zkvm data
  useEffect(() => {
    Promise.all([
      fetch('/data/programs.json'),
      fetch('/data/zkvms.json')
    ])
      .then(([programsRes, zkvmsRes]) => Promise.all([
        programsRes.json(),
        zkvmsRes.json()
      ]))
      .then(([programsData, zkvmsData]) => {
        const foundProgram = programsData.programs.find(p => p.id === id);
        if (!foundProgram) {
          throw new Error('Program not found');
        }
        setProgram(foundProgram);
        setZkvms(zkvmsData.zkvms);
        setImplementations(foundProgram.implementations || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Create a separate hook call for each implementation
  const benchmarkData0 = useTopBenchmarks(implementations[0]?.zkvm, program?.crateName);
  const benchmarkData1 = useTopBenchmarks(implementations[1]?.zkvm, program?.crateName);
  const benchmarkData2 = useTopBenchmarks(implementations[2]?.zkvm, program?.crateName);
  const benchmarkData3 = useTopBenchmarks(implementations[3]?.zkvm, program?.crateName);

  // Map implementation index to its benchmark data
  const getBenchmarkData = (index) => {
    switch (index) {
      case 0: return benchmarkData0;
      case 1: return benchmarkData1;
      case 2: return benchmarkData2;
      case 3: return benchmarkData3;
      default: return { loading: false, error: null, cpuBenchmarks: [], gpuBenchmarks: [] };
    }
  };

  // Process benchmark data for comparison
  const processedData = implementations.reduce((result, impl, index) => {
    const { cpuBenchmarks, gpuBenchmarks } = getBenchmarkData(index);
    
    // CPU data
    if (cpuBenchmarks.length > 0) {
      // Assuming benchmarks are already sorted by performance
      const bestCpu = {
        ...cpuBenchmarks[0],
        // Calculate actual throughput in Hz from the MHz value
        throughput: cpuBenchmarks[0].throughput || (cpuBenchmarks[0].throughputMHz * 1_000_000)
      };
      
      // Log for debugging
      console.log(`Processing CPU benchmark for ${impl.zkvm}:`, {
        originalValue: cpuBenchmarks[0].throughput,
        throughputMHz: cpuBenchmarks[0].throughputMHz,
        calculatedThroughput: bestCpu.throughput
      });
      
      result.cpu[impl.zkvm] = bestCpu;
    }
    
    // GPU data
    if (gpuBenchmarks.length > 0) {
      const bestGpu = {
        ...gpuBenchmarks[0],
        // Calculate actual throughput in Hz from the MHz value
        throughput: gpuBenchmarks[0].throughput || (gpuBenchmarks[0].throughputMHz * 1_000_000)
      };
      
      // Log for debugging
      console.log(`Processing GPU benchmark for ${impl.zkvm}:`, {
        originalValue: gpuBenchmarks[0].throughput,
        throughputMHz: gpuBenchmarks[0].throughputMHz,
        calculatedThroughput: bestGpu.throughput
      });
      
      result.gpu[impl.zkvm] = bestGpu;
    }
    
    return result;
  }, { cpu: {}, gpu: {} });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error || 'Program not found'}</p>
              </div>
              <div className="mt-4">
                <Link
                  to="/programs"
                  className="text-sm font-medium text-red-800 hover:text-red-900"
                >
                  ← Back to Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Are all benchmark data loaded?
  const allBenchmarksLoaded = implementations.every((_, index) => {
    const { loading } = getBenchmarkData(index);
    return !loading;
  });

  // Does any implementation have data?
  const hasAnyBenchmarkData = allBenchmarksLoaded && (
    Object.keys(processedData.cpu).length > 0 || 
    Object.keys(processedData.gpu).length > 0
  );

  return (
    <div className="py-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Program Header with details */}
        <ProgramHeader 
          program={program} 
          implementations={implementations}
          zkvms={zkvms}
        />
        
        {/* Benchmark Visualization Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Performance Comparison</h2>
            
            <div className="flex items-center">
              <label htmlFor="compareMetric" className="text-sm text-gray-600 mr-2">Compare:</label>
              <select
                id="compareMetric"
                className="rounded-md border-gray-300 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={compareMetric}
                onChange={(e) => setCompareMetric(e.target.value)}
              >
                <option value="throughput">Throughput</option>
                <option value="provingTime">Proving Time</option>
                <option value="memory">Memory Usage</option>
              </select>
            </div>
          </div>
          
          {!allBenchmarksLoaded ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : !hasAnyBenchmarkData ? (
            <div className="text-center py-16 px-4 rounded-lg border border-gray-200 bg-gray-50">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No benchmark data</h3>
              <p className="mt-1 text-sm text-gray-500">
                There are no benchmark results available for this program yet.
              </p>
            </div>
          ) : (
            <>
              {/* D3 Chart */}
              <ThroughputChart 
                cpuData={processedData.cpu} 
                gpuData={processedData.gpu} 
              />
              
              {/* Comparison Table */}
              <div className="mt-6 overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      {implementations.map((impl, index) => {
                        const zkvm = zkvms.find(z => z.id === impl.zkvm);
                        return (
                          <th key={impl.zkvm} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {zkvm?.name || impl.zkvm}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* CPU Throughput */}
                    <BenchmarkMetricRow 
                      title="CPU Throughput" 
                      items={implementations.map(impl => {
                        const benchmark = processedData.cpu[impl.zkvm];
                        if (!benchmark) return null;
                        
                        const throughput = benchmark.throughput; // Original value in Hz
                        // Log table values for debugging
                        console.log(`Table CPU value for ${impl.zkvm}: ${throughput} (throughputMHz: ${benchmark.throughputMHz})`);
                        
                        if (throughput >= 1_000_000) {
                          return `${(throughput / 1_000_000).toFixed(2)} MHz`;
                        } else if (throughput >= 1_000) {
                          return `${(throughput / 1_000).toFixed(2)} kHz`;
                        }
                        return `${Math.round(throughput)} Hz`;
                      })}
                    />
                    
                    {/* GPU Throughput */}
                    <BenchmarkMetricRow 
                      title="GPU Throughput" 
                      items={implementations.map(impl => {
                        const benchmark = processedData.gpu[impl.zkvm];
                        if (!benchmark) return null;
                        
                        const throughput = benchmark.throughput; // Original value in Hz
                        // Log table values for debugging
                        console.log(`Table GPU value for ${impl.zkvm}: ${throughput} (throughputMHz: ${benchmark.throughputMHz})`);
                        
                        if (throughput >= 1_000_000) {
                          return `${(throughput / 1_000_000).toFixed(2)} MHz`;
                        } else if (throughput >= 1_000) {
                          return `${(throughput / 1_000).toFixed(2)} kHz`;
                        }
                        return `${Math.round(throughput)} Hz`;
                      })}
                    />
                    
                    {/* Proving Time */}
                    <BenchmarkMetricRow 
                      title="CPU Proving Time" 
                      items={implementations.map(impl => {
                        const benchmark = processedData.cpu[impl.zkvm];
                        return benchmark ? formatDuration(benchmark.provingTime) : null;
                      })}
                    />
                    
                    {/* Memory Usage */}
                    <BenchmarkMetricRow 
                      title="CPU Memory Usage" 
                      items={implementations.map(impl => {
                        const benchmark = processedData.cpu[impl.zkvm];
                        return benchmark ? formatMemory(benchmark.maxMemory) : null;
                      })}
                    />
                    
                    {/* Cycles */}
                    <BenchmarkMetricRow 
                      title="Cycles" 
                      items={implementations.map(impl => {
                        const benchmark = processedData.cpu[impl.zkvm];
                        return benchmark ? benchmark.cycles.toLocaleString() : null;
                      })}
                    />
                    
                    {/* SDK Version */}
                    <BenchmarkMetricRow 
                      title="SDK Version" 
                      items={implementations.map(impl => {
                        const cpuBenchmark = processedData.cpu[impl.zkvm];
                        const gpuBenchmark = processedData.gpu[impl.zkvm];
                        const benchmark = cpuBenchmark || gpuBenchmark;
                        return benchmark ? `v${benchmark.version}` : null;
                      })}
                    />
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        
        {/* Resources Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Resources</h2>
          
          {/* zkRust Implementation Box */}
          <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
            <div className="sm:flex sm:items-start">
              <div className="flex-shrink-0 sm:mr-6">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 sm:mt-0">
                <h3 className="text-md font-medium text-indigo-900">Cross-ZKVM Implementation with zkRust</h3>
                <p className="mt-2 text-sm text-indigo-800">
                  This program is implemented using the zkRust framework, which provides a single, unified codebase that works across multiple zero-knowledge virtual machines without any ZKVM-specific implementations.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a 
                    href={`https://github.com/ProofLabDev/zkRust/tree/main/examples/${program.crateName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-indigo-600 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Source Code
                  </a>
                  <a 
                    href="https://github.com/ProofLabDev/zkRust"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-indigo-200 text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
                  >
                    zkRust Repository
                  </a>
                  <a 
                    href="https://github.com/ProofLabDev/zkRust/tree/main/examples"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-indigo-200 text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
                  >
                    All Examples
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* ZKVM Links */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {implementations.map(impl => {
              const zkvm = zkvms.find(z => z.id === impl.zkvm);
              return (
                <Link
                  key={impl.zkvm}
                  to={`/zkvms/${impl.zkvm}`}
                  className="flex items-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {zkvm?.name || impl.zkvm}
                    </h4>
                    <p className="text-xs text-gray-500">View ZKVM details and benchmarks</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails; 