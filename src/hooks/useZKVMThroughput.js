import { useState, useEffect } from 'react';

const calculateThroughput = (cycles, timing) => {
  if (!cycles || !timing) return 0;
  const totalNanos = (timing.core_prove_duration?.secs || 0) * 1000000000 + (timing.core_prove_duration?.nanos || 0);
  return totalNanos > 0 ? (cycles / (totalNanos / 1000000000)) : 0;
};

const formatThroughput = (throughput) => {
  if (throughput >= 1_000_000) {
    return `${(throughput / 1_000_000).toFixed(2)} MHz`;
  } else if (throughput >= 1_000) {
    return `${(throughput / 1_000).toFixed(2)} kHz`;
  }
  return `${Math.round(throughput)} Hz`;
};

const useZKVMThroughput = (zkvmId) => {
  const [throughput, setThroughput] = useState({
    cpu: { value: 0, formatted: '0 Hz' },
    gpu: { value: 0, formatted: '0 Hz' }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThroughput = async () => {
      if (!zkvmId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const indexResponse = await fetch('/data/telemetry/index.json');
        if (!indexResponse.ok) {
          throw new Error('Failed to fetch telemetry index');
        }
        const indexData = await indexResponse.json();

        // Get all telemetry files for this ZKVM
        const telemetryFiles = indexData.files.filter(file => 
          file.includes(zkvmId.toLowerCase()) && 
          file.includes('success')
        );

        // Fetch and process all telemetry files
        const results = await Promise.all(
          telemetryFiles.map(async file => {
            const response = await fetch(`/data/telemetry/${file}`);
            if (!response.ok) return null;
            const data = await response.json();

            // Only process r7i.16xlarge and g6.16xlarge instances
            if (!['r7i.16xlarge', 'g6.16xlarge'].includes(data.system_info?.ec2_instance_type)) {
              return null;
            }

            const throughput = calculateThroughput(data.zk_metrics.cycles, data.timing);
            
            return {
              throughput,
              instanceType: data.system_info.ec2_instance_type,
              gpuEnabled: data.gpu_enabled,
              sdkVersion: data.program?.host_metadata?.dependencies?.find(dep => 
                dep[0] === 'sp1-sdk' || dep[0] === 'risc0-zkvm'
              )?.[1]?.match(/tag:v([\d.]+)/)?.[1] || 'unknown'
            };
          })
        );

        // Filter out nulls and group by instance type and GPU status
        const validResults = results.filter(Boolean);
        
        // Get the latest version
        const versions = validResults.map(r => r.sdkVersion).filter(v => v !== 'unknown');
        const latestVersion = versions.sort((a, b) => b.localeCompare(a))[0];

        // Filter for latest version only
        const latestResults = validResults.filter(r => r.sdkVersion === latestVersion);

        // Calculate averages
        const cpuResults = latestResults.filter(r => r.instanceType === 'r7i.16xlarge' && !r.gpuEnabled);
        const gpuResults = latestResults.filter(r => r.instanceType === 'g6.16xlarge' && r.gpuEnabled);

        const avgCpuThroughput = cpuResults.length > 0
          ? cpuResults.reduce((sum, r) => sum + r.throughput, 0) / cpuResults.length
          : 0;

        const avgGpuThroughput = gpuResults.length > 0
          ? gpuResults.reduce((sum, r) => sum + r.throughput, 0) / gpuResults.length
          : 0;

        setThroughput({
          cpu: {
            value: avgCpuThroughput,
            formatted: formatThroughput(avgCpuThroughput)
          },
          gpu: {
            value: avgGpuThroughput,
            formatted: formatThroughput(avgGpuThroughput)
          },
          version: latestVersion
        });
        setError(null);
      } catch (err) {
        console.error('Error in useZKVMThroughput:', err);
        setError(err.message);
        setThroughput({
          cpu: { value: 0, formatted: '0 Hz' },
          gpu: { value: 0, formatted: '0 Hz' }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchThroughput();
  }, [zkvmId]);

  return { throughput, loading, error };
};

export default useZKVMThroughput; 