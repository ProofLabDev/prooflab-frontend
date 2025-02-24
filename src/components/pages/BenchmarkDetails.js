import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BenchmarkDetails = () => {
  const { id } = useParams();
  const [benchmark, setBenchmark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    // In a real app, this would fetch from /data/telemetry/{id}.json
    // For now, we'll just simulate loading
    setLoading(false);
    setBenchmark({
      id,
      timestamp: new Date().toISOString(),
      program: {
        name: "Example Program",
        version: "1.0.0"
      },
      zkvm: {
        name: "Example zkVM",
        version: "2.0.0"
      },
      metrics: {
        timing: {
          workspaceSetup: "2.3s",
          compilation: "5.1s",
          proofGeneration: "10.2s",
          verification: "0.5s",
          total: "18.1s"
        },
        resources: {
          peakMemory: "4.2GB",
          cpuUtilization: "85%",
          diskUsage: "1.5GB"
        },
        proofSize: {
          core: "2.1MB",
          recursive: "500KB"
        }
      },
      system: {
        os: "Ubuntu 20.04",
        cpu: "AMD EPYC 7763 64-Core",
        memory: "256GB",
        instanceType: "c5.4xlarge",
        llvmVersion: "14.0.0"
      }
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !benchmark) {
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
                <p>{error || 'Benchmark not found'}</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Benchmark Results</h1>
            <p className="mt-2 text-sm text-gray-700">
              Detailed performance metrics for {benchmark.program.name} on {benchmark.zkvm.name}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(benchmark.timestamp).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Time</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{benchmark.metrics.timing.total}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Peak Memory</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{benchmark.metrics.resources.peakMemory}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">CPU Utilization</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{benchmark.metrics.resources.cpuUtilization}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Proof Size</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {benchmark.metrics.proofSize.core}
              </dd>
            </div>
          </div>
        </div>
      </div>

      {/* Timing Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Timing Breakdown</h2>
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {Object.entries(benchmark.metrics.timing).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">
                      {key.split(/(?=[A-Z])/).join(' ')}
                    </div>
                    <div className="text-sm text-gray-500">{value}</div>
                  </div>
                  <div className="mt-2 relative">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{
                          width: `${(parseFloat(value) / parseFloat(benchmark.metrics.timing.total)) * 100}%`
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900">System Information</h2>
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              {Object.entries(benchmark.system).map(([key, value]) => (
                <div key={key} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    {key.toUpperCase()}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Download Raw Data
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkDetails; 