import { useState, useEffect } from 'react';

const extractSdkVersion = (data) => {
  const deps = data.program.host_metadata.dependencies;
  if (!deps) return null;

  if (data.proving_system === 'RISC0') {
    const risc0Dep = deps.find(dep => dep[0] === 'risc0-zkvm');
    if (risc0Dep) {
      const gitUrl = risc0Dep[1];
      const tagMatch = gitUrl.match(/tag:v([\d.]+)/);
      return tagMatch ? tagMatch[1] : null;
    }
  } else if (data.proving_system === 'SP1') {
    const sp1Dep = deps.find(dep => dep[0] === 'sp1-sdk');
    if (sp1Dep) {
      const gitUrl = sp1Dep[1];
      const tagMatch = gitUrl.match(/tag:v([\d.]+)/);
      return tagMatch ? tagMatch[1] : null;
    }
  }
  return null;
};

export const useTelemetryData = () => {
  const [telemetryIndex, setTelemetryIndex] = useState(null);
  const [telemetryData, setTelemetryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTelemetryData = async () => {
      try {
        // Fetch the index file first
        const indexResponse = await fetch('/data/telemetry/index.json');
        const indexData = await indexResponse.json();
        setTelemetryIndex(indexData);

        // Fetch all telemetry files
        const telemetryPromises = indexData.files.map(filename =>
          fetch(`/data/telemetry/${filename}`).then(res => res.json())
        );

        const results = await Promise.all(telemetryPromises);
        
        // Process and organize the data
        const processedData = results.reduce((acc, data, index) => {
          const filename = indexData.files[index];
          const system = data.proving_system.toLowerCase();
          const program = data.program.file_name;
          const instance = data.system_info?.ec2_instance_type || 'unknown';
          const sdkVersion = extractSdkVersion(data);
          
          if (!acc[program]) {
            acc[program] = {};
          }
          if (!acc[program][system]) {
            acc[program][system] = {};
          }
          if (!acc[program][system][instance]) {
            acc[program][system][instance] = [];
          }
          
          // Extract date and timestamp from filename
          const dateMatch = filename.match(/(\d{8})_(\d{6})_success/);
          const date = dateMatch ? dateMatch[1] : 'unknown';
          
          acc[program][system][instance].push({
            ...data,
            date,
            filename,
            sdkVersion
          });
          
          return acc;
        }, {});

        setTelemetryData(processedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTelemetryData();
  }, []);

  return { telemetryData, telemetryIndex, loading, error };
};

export const useComparisonData = () => {
  const [comparisons, setComparisons] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        // First fetch available systems from the index
        const indexResponse = await fetch('/data/comparisons/index.json').catch(() => {
          // If index doesn't exist, fall back to known systems
          return { json: () => Promise.resolve({ systems: ['sp1', 'risc0'] }) };
        });
        
        const indexData = await indexResponse.json();
        const systems = indexData.systems || ['sp1', 'risc0'];
        
        // Fetch data for each system
        const systemPromises = systems.map(system =>
          fetch(`/data/comparisons/${system}.json`)
            .then(res => res.json())
            .catch(() => null) // Gracefully handle missing files
        );

        const results = await Promise.all(systemPromises);
        
        // Build comparison data object
        const comparisonsData = results.reduce((acc, data, index) => {
          if (data) {
            const system = systems[index];
            acc[system] = data;
          }
          return acc;
        }, {});

        // Check if we have performance metrics data
        const metricsPromises = [
          fetch('/data/metrics/performance.json').catch(() => null),
          fetch('/data/metrics/security.json').catch(() => null),
          fetch('/data/metrics/holistic.json').catch(() => null)
        ];
        
        const [performanceData, securityData, holisticData] = await Promise.all(
          metricsPromises.map(p => p.then(res => res?.json()).catch(() => null))
        );
        
        // Incorporate metrics data if available
        if (performanceData || securityData || holisticData) {
          Object.keys(comparisonsData).forEach(system => {
            if (performanceData && performanceData[system]) {
              comparisonsData[system].performance = performanceData[system];
            }
            if (securityData && securityData[system]) {
              comparisonsData[system].security = securityData[system];
            }
            if (holisticData && holisticData[system]) {
              comparisonsData[system].holistic = holisticData[system];
            }
          });
        }

        setComparisons(comparisonsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, []);

  return { comparisons, loading, error };
};

export const formatDuration = (duration) => {
  if (!duration) return '0s';
  const totalSeconds = duration.secs + duration.nanos / 1_000_000_000;
  
  if (totalSeconds < 60) {
    return `${totalSeconds.toFixed(2)}s`;
  }
  
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds.toFixed(2)}s`;
};

export const formatBytes = (bytes) => {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

export const formatDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string' || dateStr === 'unknown') {
    return 'Unknown Date';
  }

  try {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    
    // Create a date object to handle formatting
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr;
  }
};

// Helper to format throughput values with appropriate units
export const formatThroughput = (value) => {
  if (value === undefined || value === null) return 'N/A';
  
  if (value === 0) return '0 Hz';
  
  if (value < 1000) {
    return `${value.toFixed(2)} Hz`;
  } else if (value < 1000000) {
    return `${(value / 1000).toFixed(2)} kHz`;
  } else {
    return `${(value / 1000000).toFixed(2)} MHz`;
  }
};

// Helper to format percentages
export const formatPercentage = (value) => {
  if (value === undefined || value === null) return 'N/A';
  return `${value.toFixed(2)}%`;
};

// Helper to format hardware utilization
export const formatUtilization = (data) => {
  if (!data) return 'N/A';
  
  const { cpu, memory, disk } = data;
  let result = [];
  
  if (cpu !== undefined) result.push(`CPU: ${formatPercentage(cpu)}`);
  if (memory !== undefined) result.push(`Memory: ${formatBytes(memory)}`);
  if (disk !== undefined) result.push(`Disk: ${formatBytes(disk)}/s`);
  
  return result.join(', ');
};