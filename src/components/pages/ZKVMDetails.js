import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useTopBenchmarks from '../../hooks/useTopBenchmarks';

const formatFrequency = (cyclesPerSecond) => {
  if (cyclesPerSecond >= 1_000_000) {
    return `${(cyclesPerSecond / 1_000_000).toFixed(2)} MHz`;
  } else if (cyclesPerSecond >= 1_000) {
    return `${(cyclesPerSecond / 1_000).toFixed(2)} kHz`;
  }
  return `${Math.round(cyclesPerSecond)} Hz`;
};

const BenchmarkCard = ({ program, throughput, cycles, provingTime, maxMemory, instanceType, gpuEnabled, version }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-sm font-medium text-gray-900 capitalize">
          {program.replace(/-/g, ' ')}
        </h4>
        <div className="mt-1">
          <span className="text-sm font-medium text-gray-900">
            {formatFrequency(throughput)}
          </span>
          <span className="text-xs text-gray-500 ml-1">
            throughput
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-gray-500">
            v{version}
          </span>
          <span className="text-xs text-gray-500">
            {instanceType}
          </span>
          {gpuEnabled && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
              GPU
            </span>
          )}
        </div>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-4">
      <div>
        <p className="text-xs text-gray-500">Cycles</p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {cycles.toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Proving Time</p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {provingTime.toFixed(2)}s
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Max Memory</p>
        <p className="mt-1 text-sm font-medium text-gray-900">
          {Math.round(maxMemory)}MB
        </p>
      </div>
    </div>
  </div>
);

const BenchmarkSection = ({ title, benchmarks, loading }) => (
  <div className="mt-8">
    <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
    {loading ? (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    ) : benchmarks.length > 0 ? (
      <div className="grid grid-cols-1 gap-4">
        {benchmarks.map((benchmark, index) => (
          <BenchmarkCard key={index} {...benchmark} />
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-500 text-center py-4">
        No benchmark data available
      </p>
    )}
  </div>
);

const ZKVMDetails = () => {
  const { id } = useParams();
  const [zkvm, setZkvm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cpuBenchmarks, gpuBenchmarks, loading: benchmarksLoading } = useTopBenchmarks(id);

  useEffect(() => {
    fetch('/data/zkvms.json')
      .then(response => response.json())
      .then(data => {
        const foundZkvm = data.zkvms.find(z => z.id === id);
        if (!foundZkvm) {
          throw new Error('zkVM not found');
        }
        setZkvm(foundZkvm);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !zkvm) {
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
                <p>{error || 'zkVM not found'}</p>
              </div>
              <div className="mt-4">
                <Link
                  to="/zkvms"
                  className="text-sm font-medium text-red-800 hover:text-red-900"
                >
                  ← Back to zkVMs
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
            <h1 className="text-3xl font-bold text-gray-900">{zkvm.name}</h1>
            <p className="mt-2 text-sm text-gray-700">{zkvm.description}</p>
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            zkvm.performance === 'high' ? 'bg-green-100 text-green-800' :
            zkvm.performance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {zkvm.performance} performance
          </span>
        </div>

        {/* Quick Links */}
        <div className="mt-4 flex space-x-4">
          {zkvm.documentation && (
            <a
              href={zkvm.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Documentation
            </a>
          )}
          {zkvm.github && (
            <a
              href={zkvm.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Benchmark Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Latest Benchmark Results</h2>
            <p className="mt-1 text-sm text-gray-500">
              Performance metrics from the most recent benchmark runs
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <BenchmarkSection 
                title="CPU Benchmarks (r7i.16xlarge)" 
                benchmarks={cpuBenchmarks} 
                loading={benchmarksLoading} 
              />
              <BenchmarkSection 
                title="GPU Benchmarks (g6.16xlarge)" 
                benchmarks={gpuBenchmarks} 
                loading={benchmarksLoading} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Technical Specifications</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Proof Generation */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Proof Generation</h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {zkvm.technicalSpecs.proofGeneration.map((spec, index) => (
                  <div key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6`}>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{spec}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Verification */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Verification</h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                {zkvm.technicalSpecs.verification.map((spec, index) => (
                  <div key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6`}>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{spec}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      {zkvm.additionalResources && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Additional Resources</h2>
          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {zkvm.additionalResources.map(resource => (
                <li key={resource.url} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {resource.title}
                      </h4>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View →
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZKVMDetails; 