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
        const [sp1Response, risc0Response] = await Promise.all([
          fetch('/data/comparisons/sp1.json'),
          fetch('/data/comparisons/risc0.json')
        ]);

        const sp1Data = await sp1Response.json();
        const risc0Data = await risc0Response.json();

        setComparisons({
          sp1: sp1Data,
          risc0: risc0Data
        });
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