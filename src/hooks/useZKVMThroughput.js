import { useState, useEffect } from 'react';

const calculateThroughput = (cycles, timing, provingSystem) => {
  if (!cycles || !timing) return 0;
  
  // Properly access the fields from the timing object
  const coreProvingSeconds = timing.core_prove_duration?.secs || 0;
  const coreProvingNanos = timing.core_prove_duration?.nanos || 0;
  
  // Calculate total duration in seconds
  const totalSeconds = coreProvingSeconds + (coreProvingNanos / 1000000000);
  
  // Return cycles per second (Hz)
  return totalSeconds > 0 ? (cycles / totalSeconds) : 0;
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

            // Debug SP1 specific issues
            if (file.includes('sp1')) {
              console.log(`Processing ${file}:`);
              console.log('- ZK Metrics:', data.zk_metrics);
              console.log('- GPU enabled:', data.gpu_enabled);
              console.log('- Instance type:', data.system_info.ec2_instance_type);
              console.log('- Core prove duration:', data.timing.core_prove_duration);
              console.log('- Cycles:', data.zk_metrics.cycles);
            }
            
            const throughput = calculateThroughput(data.zk_metrics.cycles, data.timing);
            
            // Debug the calculated throughput
            if (file.includes('sp1') && data.system_info.ec2_instance_type === 'r7i.16xlarge') {
                console.log(`Calculated throughput for ${file}: ${throughput}`);
            }
            
            return {
              throughput,
              instanceType: data.system_info.ec2_instance_type,
              gpuEnabled: data.gpu_enabled,
              isCpu: data.system_info.ec2_instance_type === 'r7i.16xlarge',
              isGpu: data.system_info.ec2_instance_type === 'g6.16xlarge',
              provingSystem: data.proving_system,
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
        
        // For SP1, we need to handle CPU and GPU instance types separately
        // because they might be on different SDK versions
        let latestResults;
        
        if (zkvmId.toLowerCase() === 'sp1') {
          // Group by instance type first
          const cpuInstances = validResults.filter(r => r.isCpu);
          const gpuInstances = validResults.filter(r => r.isGpu);
          
          // Get latest version for each instance type
          const cpuVersions = cpuInstances.map(r => r.sdkVersion).filter(v => v !== 'unknown');
          const latestCpuVersion = cpuVersions.sort((a, b) => b.localeCompare(a))[0];
          
          // Filter each instance type by its own latest version
          const latestCpuResults = cpuInstances.filter(r => r.sdkVersion === latestCpuVersion);
          const latestGpuResults = gpuInstances.filter(r => r.sdkVersion === latestVersion);
          
          // Combine results
          latestResults = [...latestCpuResults, ...latestGpuResults];
          
          console.log('SP1 latest CPU version:', latestCpuVersion);
          console.log('SP1 latest GPU version:', latestVersion);
        } else {
          // For other systems, filter all results by the latest version
          latestResults = validResults.filter(r => r.sdkVersion === latestVersion);
        }
        
        if (zkvmId.toLowerCase() === 'sp1') {
          console.log('SP1 valid results:', validResults);
          console.log('SP1 latest version:', latestVersion);
          console.log('SP1 latest results:', latestResults);
        }

        // Use the new isCpu and isGpu flags to filter results
        // For CPU results, we simply want r7i.16xlarge instances (SP1 or RISC0)
        const cpuResults = latestResults.filter(r => r.isCpu);
        
        // For GPU results, we want g6.16xlarge instances with GPU enabled
        const gpuResults = latestResults.filter(r => r.isGpu && r.gpuEnabled);

        const avgCpuThroughput = cpuResults.length > 0
          ? cpuResults.reduce((sum, r) => sum + r.throughput, 0) / cpuResults.length
          : 0;

        const avgGpuThroughput = gpuResults.length > 0
          ? gpuResults.reduce((sum, r) => sum + r.throughput, 0) / gpuResults.length
          : 0;

        // Log detailed info about the data
        if (zkvmId.toLowerCase() === 'sp1') {
          console.log('SP1 CPU results:', cpuResults);
          console.log('SP1 GPU results:', gpuResults);
          console.log('SP1 Average CPU throughput:', avgCpuThroughput);
          console.log('SP1 Average GPU throughput:', avgGpuThroughput);
        }
        
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

  // Check if there are no benchmarks available
  const hasBenchmarks = throughput.cpu.value > 0 || throughput.gpu.value > 0;
  
  return { 
    throughput, 
    loading, 
    error,
    hasBenchmarks, 
    isIntegrating: !loading && !error && !hasBenchmarks
  };
};

export default useZKVMThroughput; 