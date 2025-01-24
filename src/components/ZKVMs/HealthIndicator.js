import React, { useState } from 'react';
import { ResponsiveRadar } from '@nivo/radar';

const getStatusValue = (status) => {
  switch (status) {
    case 'optimal':
      return 100;
    case 'warning':
      return 50;
    case 'critical':
      return 25;
    default:
      return 0;
  }
};

const HealthIndicator = ({ metrics }) => {
  const [hoveredMetric, setHoveredMetric] = useState(null);

  // Transform metrics into radar format
  const data = [
    {
      metric: "System",
      value: getStatusValue(metrics.systemUptime.status),
      key: 'systemUptime'
    },
    {
      metric: "Proof Generation",
      value: getStatusValue(metrics.proofGeneration.status),
      key: 'proofGeneration'
    },
    {
      metric: "Memory Usage",
      value: getStatusValue(metrics.memoryUsage.status),
      key: 'memoryUsage'
    },
    {
      metric: "Verification Time",
      value: getStatusValue(metrics.verificationTime.status),
      key: 'verificationTime'
    },
    {
      metric: "Compiler Status",
      value: getStatusValue(metrics.compilerStatus.status),
      key: 'compilerStatus'
    }
  ];

  return (
    <div className="relative w-[272px] h-[272px]" onMouseLeave={() => setHoveredMetric(null)}>
      <ResponsiveRadar
        data={data}
        keys={['value']}
        indexBy="metric"
        maxValue={100}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ theme: 'background' }}
        gridLevels={4}
        gridShape="circular"
        gridLabelOffset={12}
        enableDots={true}
        dotSize={8}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        colors={['#4ade80']}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        isInteractive={true}
        gridLabel={() => ''}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        theme={{
          grid: {
            line: {
              stroke: '#e2e8f0',
              strokeWidth: 1
            }
          },
          dots: {
            text: {
              fontSize: 0
            }
          }
        }}
        onClick={(point) => {
          const metric = data.find(d => d.metric === point.indexValue);
          if (metric) {
            setHoveredMetric(metrics[metric.key]);
          }
        }}
      />
      
      {/* Tooltip */}
      {hoveredMetric && (
        <div className="absolute z-20 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200 left-1/2 transform -translate-x-1/2 mt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">{hoveredMetric.title}</h3>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              hoveredMetric.status === 'optimal'
                ? 'bg-green-100 text-green-800'
                : hoveredMetric.status === 'warning'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {hoveredMetric.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{hoveredMetric.description}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Current: {hoveredMetric.value}</span>
            <span className="text-gray-500">Threshold: {hoveredMetric.threshold}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthIndicator; 