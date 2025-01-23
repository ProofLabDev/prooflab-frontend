import React, { useState } from 'react';
import useTelemetry from '../../hooks/useTelemetry';

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

const formatSize = (bytes) => {
  const kb = bytes / 1024;
  if (kb >= 1024) {
    return `${(kb / 1024).toFixed(1)}MB`;
  }
  return `${kb.toFixed(0)}KB`;
};

const MetricCard = ({ title, value, subValue, trend }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <div className="text-sm text-gray-600 mb-1">{title}</div>
    <div className="text-2xl font-semibold text-gray-900">{value}</div>
    {subValue && (
      <div className="mt-1 text-sm text-gray-500">
        {subValue}
        {trend && (
          <span className={`ml-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    )}
  </div>
);

const InstanceTypeSelector = ({ instances, selected, onChange }) => (
  <div className="flex space-x-4 mb-6">
    {instances.map(instance => (
      <button
        key={instance}
        onClick={() => onChange(instance)}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          selected === instance
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        {instance}
      </button>
    ))}
  </div>
);

const ProgramMetrics = ({ program, zkvm }) => {
  const { telemetry, loading, error } = useTelemetry(program, zkvm);
  const [selectedInstance, setSelectedInstance] = useState('g6.16xlarge');

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">{error}</div>
      </div>
    );
  }

  if (!telemetry) {
    return null;
  }

  const data = telemetry[selectedInstance];
  if (!data) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">No data available for this instance type</div>
      </div>
    );
  }

  return (
    <div>
      <InstanceTypeSelector
        instances={Object.keys(telemetry)}
        selected={selectedInstance}
        onChange={setSelectedInstance}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Proving Time"
          value={formatDuration(data.timing.proving)}
          subValue={`${data.metrics.cycles.toLocaleString()} cycles`}
        />
        <MetricCard
          title="Verification Time"
          value={formatDuration(data.timing.verification)}
          subValue={`${data.metrics.segments} segments`}
        />
        <MetricCard
          title="Memory Usage"
          value={formatMemory(data.resources.maxMemory)}
          subValue={`Avg: ${formatMemory(data.resources.avgMemory)}`}
        />
        <MetricCard
          title="Program Size"
          value={formatSize(data.metrics.programSize)}
          subValue={`Proof: ${formatSize(data.metrics.coreProofSize)}`}
        />
      </div>

      <div className="mt-6 bg-white rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Instance Type:</span>
            <span className="ml-2 text-gray-900">{data.system.instanceType}</span>
          </div>
          <div>
            <span className="text-gray-600">CPU Model:</span>
            <span className="ml-2 text-gray-900">{data.system.cpuModel}</span>
          </div>
          <div>
            <span className="text-gray-600">GPU Enabled:</span>
            <span className="ml-2 text-gray-900">{data.system.gpuEnabled ? 'Yes' : 'No'}</span>
          </div>
          <div>
            <span className="text-gray-600">Execution Speed:</span>
            <span className="ml-2 text-gray-900">
              {data.metrics.executionSpeed.toFixed(2)} cycles/second
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramMetrics; 