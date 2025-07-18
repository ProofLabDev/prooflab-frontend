import React from 'react';

const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds.toFixed(2)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds.toFixed(2)}s`;
};

const formatMemory = (bytes) => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

const MetricCard = ({ title, value, trend, description }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-medium text-gray-900">{title}</h4>
      {trend && (
        <span className={`inline-flex items-center text-xs font-medium ${
          trend > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
    {description && (
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    )}
  </div>
);

const ProgramMetrics = ({ programId, zkvmId, telemetryData, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading metrics</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!telemetryData) {
    return (
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">No metrics available</h3>
            <p className="mt-1 text-sm text-yellow-700">
              No telemetry data found for this program and ZKVM combination.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MetricCard
            title="Total Execution Time"
            value={formatDuration(telemetryData.timing.total)}
            description="End-to-end execution duration"
          />
          <MetricCard
            title="Proof Generation Time"
            value={formatDuration(telemetryData.timing.proofGeneration)}
            description="Time spent generating the proof"
          />
          <MetricCard
            title="Peak Memory Usage"
            value={formatMemory(telemetryData.resources.memory.max)}
            description="Maximum memory consumption"
          />
          <MetricCard
            title="Average CPU Usage"
            value={`${telemetryData.resources.cpu.average.toFixed(1)}%`}
            description="Average CPU utilization"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Instance Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{telemetryData.system.instanceType}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">CPU</dt>
              <dd className="mt-1 text-sm text-gray-900">{telemetryData.system.cpu}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Operating System</dt>
              <dd className="mt-1 text-sm text-gray-900">{telemetryData.system.os}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(telemetryData.metadata.timestamp).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProgramMetrics; 