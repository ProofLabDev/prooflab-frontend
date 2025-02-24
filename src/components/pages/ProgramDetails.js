import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useTopBenchmarks from '../../hooks/useTopBenchmarks';

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

const BenchmarkCard = ({ benchmark }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-medium text-gray-900 capitalize">
            {benchmark.program.replace(/-/g, ' ')}
          </h4>
          <div className="mt-1">
            <span className="text-sm font-medium text-gray-900">
              {(benchmark.throughputMHz).toFixed(2)} MHz
            </span>
            <span className="text-xs text-gray-500 ml-1">
              throughput
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-gray-500">
              v{benchmark.version}
            </span>
            <span className="text-xs text-gray-500">
              {benchmark.instanceType}
            </span>
            {benchmark.gpuEnabled && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                GPU
              </span>
            )}
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
          Top Performance
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500">Cycles</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {benchmark.cycles.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Proving Time</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {formatDuration(benchmark.provingTime)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Max Memory</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {formatMemory(benchmark.maxMemory)}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ProgramDetails = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [zkvms, setZkvms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [implementations, setImplementations] = useState([]);

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

  return (
    <div className="py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{program.name}</h1>
            <p className="mt-2 text-sm text-gray-700">{program.description}</p>
          </div>
          <Link
            to="/programs"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            ← Back to Programs
          </Link>
        </div>
      </div>

      {/* Program Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Program Details</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Complexity</h4>
                  <p className="mt-1 text-sm text-gray-900">{program.complexity}</p>
                </div>
                {program.tags && program.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Tags</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
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
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Implementations</h3>
              <div className="mt-5 space-y-4">
                {implementations.map(implementation => {
                  const zkvm = zkvms.find(z => z.id === implementation.zkvm);
                  return (
                    <div key={implementation.zkvm} className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{zkvm?.name || implementation.zkvm}</h4>
                        <p className="mt-1 text-sm text-gray-500">{zkvm?.description || 'No description available'}</p>
                      </div>
                      <Link
                        to={`/zkvms/${implementation.zkvm}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View Details →
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Performance Comparison</h2>
        <p className="mt-2 text-sm text-gray-700">
          Compare the latest performance metrics of different zkVM implementations.
        </p>
        <div className="mt-6">
          {implementations.map((implementation, index) => {
            const zkvm = zkvms.find(z => z.id === implementation.zkvm);
            const benchmarkData = getBenchmarkData(index);
            const { loading: benchmarkLoading, error: benchmarkError, cpuBenchmarks, gpuBenchmarks } = benchmarkData;

            return (
              <div key={implementation.zkvm} className="mb-12">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {zkvm?.name || implementation.zkvm}
                </h3>
                {benchmarkLoading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-48 bg-gray-200 rounded"></div>
                  </div>
                ) : benchmarkError ? (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{benchmarkError}</p>
                      </div>
                    </div>
                  </div>
                ) : (cpuBenchmarks.length === 0 && gpuBenchmarks.length === 0) ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 text-center">
                      No benchmark data available
                    </p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* CPU Benchmarks */}
                    {cpuBenchmarks.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-4">CPU Benchmarks (r7i.16xlarge)</h4>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {cpuBenchmarks.map((benchmark, idx) => (
                            <BenchmarkCard key={`cpu-${idx}`} benchmark={benchmark} />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* GPU Benchmarks */}
                    {gpuBenchmarks.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-4">GPU Benchmarks (g6.16xlarge)</h4>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {gpuBenchmarks.map((benchmark, idx) => (
                            <BenchmarkCard key={`gpu-${idx}`} benchmark={benchmark} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Additional Resources</h2>
        <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Documentation
                    </p>
                    <p className="text-sm text-gray-500">
                      Learn more about implementing and using this program.
                    </p>
                  </div>
                  <div>
                    <Link
                      to={`/docs/programs/${id}`}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View Docs
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails; 