import { useState, useEffect } from 'react';

const processTelemetryData = (data) => {
  const {
    timing,
    resources,
    zk_metrics,
    system_info
  } = data;

  return {
    timing: {
      proving: timing.proof_generation_duration.secs + timing.proof_generation_duration.nanos / 1e9,
      verification: (timing.core_verify_duration.secs + timing.core_verify_duration.nanos / 1e9) +
                   (timing.compress_verify_duration.secs + timing.compress_verify_duration.nanos / 1e9),
      total: timing.total_duration.secs + timing.total_duration.nanos / 1e9
    },
    resources: {
      maxMemory: resources.max_memory_kb / 1024, // Convert to MB
      avgMemory: resources.avg_memory_kb / 1024,
      maxCpu: resources.max_cpu_percent,
      avgCpu: resources.avg_cpu_percent
    },
    metrics: {
      cycles: zk_metrics.cycles,
      segments: zk_metrics.num_segments,
      coreProofSize: zk_metrics.core_proof_size,
      recursiveProofSize: zk_metrics.recursive_proof_size,
      executionSpeed: zk_metrics.execution_speed,
      programSize: zk_metrics.compiled_program_size
    },
    system: {
      instanceType: system_info.ec2_instance_type,
      cpuModel: system_info.cpu_brand,
      gpuEnabled: system_info.gpu_enabled
    }
  };
};

export const useTelemetry = (programId, zkvmId) => {
  const [telemetryData, setTelemetryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTelemetryData = async () => {
      if (!programId || !zkvmId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // First, fetch the telemetry index
        const indexResponse = await fetch('/data/telemetry/index.json');
        if (!indexResponse.ok) {
          throw new Error('Failed to fetch telemetry index');
        }
        const indexData = await indexResponse.json();

        // Find the latest telemetry file for this program and ZKVM combination
        const telemetryFiles = indexData.files.filter(file => 
          file.includes(zkvmId.toLowerCase()) && 
          file.includes(programId.toLowerCase()) &&
          file.includes('success')
        );

        if (telemetryFiles.length === 0) {
          setTelemetryData(null);
          return;
        }

        // Sort by timestamp (assuming filename format includes timestamp)
        const latestFile = telemetryFiles.sort().reverse()[0];

        // Fetch the actual telemetry data
        const telemetryResponse = await fetch(`/data/telemetry/${latestFile}`);
        if (!telemetryResponse.ok) {
          throw new Error('Failed to fetch telemetry data');
        }
        const rawData = await telemetryResponse.json();
        
        // Process the telemetry data
        const processedData = processTelemetryData(rawData);
        setTelemetryData(processedData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTelemetryData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTelemetryData();
  }, [programId, zkvmId]);

  return { telemetryData, loading, error };
};

export default useTelemetry; 