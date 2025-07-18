import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

// Scoring functions to convert metrics to numerical values for the radar chart
const scoreMetric = (metricName, value) => {
  if (value === undefined || value === null) return 0;

  // Performance metrics
  if (metricName === 'proof_generation_time') {
    // Lower is better - values might be like "42.34s (CPU), 8.67s (GPU)"
    if (typeof value === 'string') {
      const timeMatch = value.match(/(\d+\.\d+)s/);
      if (timeMatch) {
        const time = parseFloat(timeMatch[1]);
        // Invert score since lower time is better
        return 10 - Math.min(Math.max(time / 10, 0), 10);
      }
    }
    return 5; // Default midpoint
  }

  if (metricName === 'verification_cost') {
    // Lower is better - values might be like "~300k gas (PLONK)"
    if (typeof value === 'string') {
      const gasMatch = value.match(/~(\d+)k\s*gas/);
      if (gasMatch) {
        const gas = parseInt(gasMatch[1]);
        // Invert score since lower gas is better
        return 10 - Math.min(Math.max(gas / 100, 0), 10);
      }
    }
    return 5;
  }

  if (metricName === 'throughput') {
    // Higher is better - values might be like "0.024 proofs/s (CPU), 0.115 proofs/s (GPU)"
    if (typeof value === 'string') {
      const throughputMatch = value.match(/(\d+\.\d+)\s*proofs\/s/);
      if (throughputMatch) {
        const throughput = parseFloat(throughputMatch[1]);
        return Math.min(throughput * 50, 10);
      }
    }
    return 5;
  }

  if (metricName === 'latency') {
    // Lower is better
    if (typeof value === 'string') {
      const latencyMatch = value.match(/(\d+\.\d+)s/);
      if (latencyMatch) {
        const latency = parseFloat(latencyMatch[1]);
        // Invert score since lower latency is better
        return 10 - Math.min(Math.max(latency / 10, 0), 10);
      }
    }
    return 5;
  }

  // Security metrics
  if (metricName === 'formal_verification') {
    // Higher is better - values might be like "15% of critical components"
    if (typeof value === 'string') {
      const percentMatch = value.match(/(\d+)%/);
      if (percentMatch) {
        const percent = parseInt(percentMatch[1]);
        return Math.min(percent / 10, 10);
      }
    }
    return 5;
  }

  if (metricName === 'code_coverage') {
    // Higher is better - values might be like "92% unit tests, 74% integration tests"
    if (typeof value === 'string') {
      const percentMatch = value.match(/(\d+)%/);
      if (percentMatch) {
        const percent = parseInt(percentMatch[1]);
        return Math.min(percent / 10, 10);
      }
    }
    return 5;
  }

  if (metricName === 'vulnerability_history') {
    // Lower is better - values might be like "8 critical/high (all fixed)"
    if (typeof value === 'string') {
      const vulnerabilitiesMatch = value.match(/(\d+)\s*critical/);
      if (vulnerabilitiesMatch) {
        const count = parseInt(vulnerabilitiesMatch[1]);
        // Invert score since fewer vulnerabilities is better
        return 10 - Math.min(count, 10);
      }
    }
    return 5;
  }

  if (metricName === 'auditability') {
    // Higher is better - values might be like "High"
    if (typeof value === 'string') {
      if (value.toLowerCase().includes('high')) return 10;
      if (value.toLowerCase().includes('medium')) return 6;
      if (value.toLowerCase().includes('low')) return 3;
    }
    return 5;
  }

  // Holistic metrics
  if (metricName === 'development_effort') {
    // Lower is better - values might be like "Medium to Low"
    if (typeof value === 'string') {
      if (value.toLowerCase().includes('low')) return 8;
      if (value.toLowerCase().includes('medium')) return 5;
      if (value.toLowerCase().includes('high')) return 2;
    }
    return 5;
  }

  if (metricName === 'tooling_ecosystem') {
    // Higher is better - values might be like "Strong and Growing"
    if (typeof value === 'string') {
      if (value.toLowerCase().includes('strong')) return 9;
      if (value.toLowerCase().includes('comprehensive')) return 8;
      if (value.toLowerCase().includes('basic')) return 4;
      if (value.toLowerCase().includes('limited')) return 2;
    }
    return 5;
  }

  if (metricName === 'security_under_composition') {
    // Higher is better - values might be like "Strong"
    if (typeof value === 'string') {
      if (value.toLowerCase().includes('strong')) return 9;
      if (value.toLowerCase().includes('good')) return 7;
      if (value.toLowerCase().includes('moderate')) return 5;
      if (value.toLowerCase().includes('weak')) return 2;
    }
    return 5;
  }

  // Feature metrics
  if (metricName === 'unbounded' || 
      metricName === 'libraries' || 
      metricName === 'evm' || 
      metricName === 'hardware' ||
      metricName === 'features' ||
      metricName === 'precompiles' ||
      metricName === 'tooling' ||
      metricName === 'audit' ||
      metricName === 'production') {
    // Boolean or checkmark values
    if (typeof value === 'string') {
      if (value.includes('✅')) return 10;
      if (value.toLowerCase().includes('no') || value.includes('❌')) return 2;
    }
    return 5;
  }

  // Default for other metrics - try to extract numerical values if available
  if (typeof value === 'string') {
    const numberMatch = value.match(/(\d+(\.\d+)?)/);
    if (numberMatch) {
      return Math.min(parseFloat(numberMatch[1]), 10);
    }
  }

  return 5; // Default midpoint
};

const getMetricLabel = (metricName, metricInfo) => {
  return metricInfo[metricName]?.label || metricName.replace(/_/g, ' ');
};

const RadarChart = ({ category, metrics, systems, comparisons, metricInfo, colors }) => {
  // Don't render if there's no data to display
  if (!metrics || !systems || systems.length === 0 || metrics.length === 0) {
    return null;
  }

  // Prepare data for radar chart
  const data = metrics.map(metric => {
    const dataPoint = {
      metric: getMetricLabel(metric, metricInfo),
    };

    // Add values for each system
    systems.forEach(system => {
      const metricData = 
        comparisons[system]?.features?.[metric]?.value || 
        comparisons[system]?.[category]?.[metric]?.value;
      
      if (metricData) {
        dataPoint[system] = scoreMetric(metric, metricData);
      } else {
        dataPoint[system] = 0; // No data
      }
    });

    return dataPoint;
  });

  // Generate keys for the radar chart
  const keys = systems;

  // Use provided colors or generate defaults
  const defaultColors = ['#6366f1', '#ef4444', '#22c55e', '#eab308', '#8b5cf6'];
  const chartColors = colors || {};
  
  // If any system is missing a color, assign one from defaults
  systems.forEach((system, index) => {
    if (!chartColors[system]) {
      chartColors[system] = defaultColors[index % defaultColors.length];
    }
  });

  return (
    <div className="h-96 w-full">
      <ResponsiveRadar
        data={data}
        keys={keys}
        indexBy="metric"
        maxValue={10}
        margin={{ top: 80, right: 80, bottom: 40, left: 80 }}
        borderWidth={2}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={systems.map(system => chartColors[system])}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
          {
            anchor: 'top',
            direction: 'row',
            translateY: -65,
            translateX: 0,
            itemWidth: 95,
            itemHeight: 20,
            itemTextColor: '#666',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
};

export default RadarChart;