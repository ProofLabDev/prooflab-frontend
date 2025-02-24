import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HealthIndicator from './HealthIndicator';
import useTopBenchmarks from '../../hooks/useTopBenchmarks';

const DetailSection = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

const MetricCard = ({ title, value, trend }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{title}</span>
      {trend && (
        <span className={`text-xs font-medium ${
          trend > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
  </div>
);

const formatFrequency = (cyclesPerSecond) => {
  if (cyclesPerSecond >= 1_000_000) {
    return `${(cyclesPerSecond / 1_000_000).toFixed(2)} MHz`;
  } else if (cyclesPerSecond >= 1_000) {
    return `${(cyclesPerSecond / 1_000).toFixed(2)} kHz`;
  }
  return `${Math.round(cyclesPerSecond)} Hz`;
};

const BenchmarkCard = ({ program, throughput, cycles, provingTime, maxMemory, instanceType, gpuEnabled }) => (
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
            {instanceType}
          </span>
          {gpuEnabled && (
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
    <div className="mt-4 grid grid-cols-2 gap-4">
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

const ZKVMDetails = () => {
  const { id } = useParams();
  const [zkvm, setZkvm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accelerationType, setAccelerationType] = useState('cpu'); // 'cpu' or 'gpu'
  const { benchmarks: allBenchmarks, loading: benchmarksLoading } = useTopBenchmarks(id);

  // Filter benchmarks based on acceleration type
  const benchmarks = allBenchmarks.filter(benchmark => 
    accelerationType === 'gpu' ? benchmark.gpuEnabled : !benchmark.gpuEnabled
  );

  useEffect(() => {
    fetch('/data/zkvms.json')
      .then(response => response.json())
      .then(data => {
        const foundZkvm = data.zkvms.find(vm => vm.id === id);
        if (foundZkvm) {
          delete foundZkvm.metrics;
          setZkvm(foundZkvm);
        } else {
          setError('ZKVM not found');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const getBestMetric = (metricFn) => {
    if (!benchmarks || benchmarks.length === 0) return null;
    return Math.min(...benchmarks.map(metricFn));
  };

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

  const bestProvingTime = getBestMetric(b => b.provingTime);
  const bestMemory = getBestMetric(b => b.maxMemory);
  const bestCycles = getBestMetric(b => b.cycles);
  const bestThroughput = getBestMetric(b => -b.throughput);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DetailSection title="Overview">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{zkvm.name}</h1>
              <p className="mt-2 text-gray-600">{zkvm.description}</p>
              <div className="mt-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${
                  zkvm.status === 'production' ? 'bg-green-100 text-green-800' : 
                  zkvm.status === 'alpha' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {zkvm.status.charAt(0).toUpperCase() + zkvm.status.slice(1)}
                </span>
              </div>
            </div>
          </DetailSection>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <DetailSection title="Architecture">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Type</h4>
                  <p className="mt-1 text-sm text-gray-600">{zkvm.architecture.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Proof System</h4>
                  <p className="mt-1 text-sm text-gray-600">{zkvm.architecture.proofSystem}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Memory Model</h4>
                  <p className="mt-1 text-sm text-gray-600">{zkvm.architecture.memoryModel}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Runtime Language</h4>
                  <p className="mt-1 text-sm text-gray-600">{zkvm.runtimeLanguage}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Supported Languages</h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {zkvm.supportedLanguages.map((lang, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </DetailSection>

            <DetailSection title="Performance Metrics">
              <div className="mb-4 flex justify-end">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    onClick={() => setAccelerationType('cpu')}
                    className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                      accelerationType === 'cpu'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    } border border-gray-200`}
                  >
                    CPU
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccelerationType('gpu')}
                    className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                      accelerationType === 'gpu'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    } border border-l-0 border-gray-200`}
                  >
                    GPU
                  </button>
                </div>
              </div>
              {benchmarksLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : benchmarks.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <MetricCard
                      title="Best Proving Time"
                      value={bestProvingTime ? formatDuration(bestProvingTime) : 'N/A'}
                    />
                    <MetricCard
                      title="Best Throughput"
                      value={bestThroughput ? `${(-bestThroughput / 1_000_000).toFixed(1)} MHz` : 'N/A'}
                    />
                    <MetricCard
                      title="Min Memory Usage"
                      value={bestMemory ? formatMemory(bestMemory) : 'N/A'}
                    />
                    <MetricCard
                      title="Min Cycles"
                      value={bestCycles ? bestCycles.toLocaleString() : 'N/A'}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    * Metrics shown are the best results across all {accelerationType.toUpperCase()} benchmark programs
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No {accelerationType.toUpperCase()} benchmark data available
                </p>
              )}
            </DetailSection>
          </div>

          <div className="mt-8">
            <DetailSection title="Top Program Benchmarks">
              {benchmarksLoading ? (
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
            </DetailSection>
          </div>

          <div className="mt-8">
            <DetailSection title="Technical Details">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Category</h4>
                  <p className="mt-1 text-sm text-gray-600">{zkvm.category}</p>
                </div>
                {zkvm.technicalSpecs && (
                  <>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Proof Generation</h4>
                      <ul className="mt-2 space-y-2 text-sm text-gray-600">
                        {zkvm.technicalSpecs.proofGeneration.map((spec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-indigo-400 rounded-full"></span>
                            <span className="ml-3">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Verification Process</h4>
                      <ul className="mt-2 space-y-2 text-sm text-gray-600">
                        {zkvm.technicalSpecs.verification.map((spec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-indigo-400 rounded-full"></span>
                            <span className="ml-3">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </DetailSection>
          </div>
        </div>

        <div className="space-y-8">
          <DetailSection title="Health Status">
            <div className="flex items-center justify-center py-16">
              <HealthIndicator metrics={zkvm.healthMetrics} size="normal" />
            </div>
          </DetailSection>

          <DetailSection title="Features">
            <ul className="space-y-4">
              {zkvm.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-indigo-400 rounded-full"></span>
                  <span className="ml-3 text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="Resources">
            <div className="space-y-4">
              <a
                href={zkvm.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                Documentation →
              </a>
              <a
                href={zkvm.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                GitHub Repository →
              </a>
              {zkvm.additionalResources?.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  {resource.title} →
                </a>
              ))}
            </div>
          </DetailSection>
        </div>
      </div>
    </div>
  );
};

export default ZKVMDetails; 