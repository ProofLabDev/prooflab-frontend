import { useState, useEffect } from 'react';

const calculateThroughput = (cycles, timing) => {
  if (!cycles || !timing) return 0;
  const totalNanos = (timing.core_prove_duration?.secs || 0) * 1000000000 + (timing.core_prove_duration?.nanos || 0);
  return totalNanos > 0 ? (cycles / (totalNanos / 1000000000)) : 0;
};

const extractSdkVersion = (data) => {
  const dependencies = data.program?.host_metadata?.dependencies;
  if (!dependencies) return 'unknown';

  // For SP1
  const sp1SdkDep = dependencies.find(dep => dep[0] === 'sp1-sdk');
  if (sp1SdkDep) {
    const gitUrl = sp1SdkDep[1];
    const tagMatch = gitUrl.match(/tag:v([\d.]+)/);
    if (tagMatch) return tagMatch[1];
  }

  // For RISC0
  const risc0Dep = dependencies.find(dep => dep[0] === 'risc0-zkvm');
  if (risc0Dep) {
    const gitUrl = risc0Dep[1];
    const tagMatch = gitUrl.match(/tag:v([\d.]+)/);
    if (tagMatch) return tagMatch[1];
  }

  return 'unknown';
};

const useTopBenchmarks = (zkvmId, programId = null) => {
  const [cpuBenchmarks, setCpuBenchmarks] = useState([]);
  const [gpuBenchmarks, setGpuBenchmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBenchmarks = async () => {
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
        console.log('Telemetry files for', zkvmId, ':', telemetryFiles);

        // Fetch and process all telemetry files
        const allBenchmarks = await Promise.all(
          telemetryFiles.map(async file => {
            const response = await fetch(`/data/telemetry/${file}`);
            if (!response.ok) return null;
            const data = await response.json();

            // Only process r7i.16xlarge and g6.16xlarge instances
            if (!['r7i.16xlarge', 'g6.16xlarge'].includes(data.system_info?.ec2_instance_type)) {
              return null;
            }

            const program = data.program.file_name;
            
            // If programId is specified, skip other programs
            if (programId && program !== programId) {
              return null;
            }

            const throughput = calculateThroughput(data.zk_metrics.cycles, data.timing);
            const throughputMHz = throughput / 1_000_000;

            return {
              program,
              throughput,
              throughputMHz,
              cycles: data.zk_metrics.cycles,
              provingTime: (data.timing.core_prove_duration.secs + 
                           data.timing.core_prove_duration.nanos / 1e9),
              maxMemory: data.resources.max_memory_kb / 1024,
              instanceType: data.system_info.ec2_instance_type,
              gpuEnabled: data.gpu_enabled,
              version: extractSdkVersion(data)
            };
          })
        );

        // Filter out nulls and group by instance type
        const validBenchmarks = allBenchmarks.filter(Boolean);
        const cpuResults = validBenchmarks.filter(b => b.instanceType === 'r7i.16xlarge');
        const gpuResults = validBenchmarks.filter(b => b.instanceType === 'g6.16xlarge');

        // Group by program and take the best performing run for each instance type
        const groupBenchmarks = (benchmarks) => {
          return Object.values(
            benchmarks.reduce((groups, benchmark) => {
              if (!groups[benchmark.program] || 
                  benchmark.throughputMHz > groups[benchmark.program].throughputMHz) {
                groups[benchmark.program] = benchmark;
              }
              return groups;
            }, {})
          );
        };

        // Get the top benchmarks for each instance type
        const topCpuBenchmarks = groupBenchmarks(cpuResults)
          .sort((a, b) => b.throughputMHz - a.throughputMHz)
          .slice(0, 3);

        const topGpuBenchmarks = groupBenchmarks(gpuResults)
          .sort((a, b) => b.throughputMHz - a.throughputMHz)
          .slice(0, 3);

        console.log('Top CPU benchmarks:', topCpuBenchmarks);
        console.log('Top GPU benchmarks:', topGpuBenchmarks);

        setCpuBenchmarks(topCpuBenchmarks);
        setGpuBenchmarks(topGpuBenchmarks);
        setError(null);
      } catch (err) {
        console.error('Error in useTopBenchmarks:', err);
        setError(err.message);
        setCpuBenchmarks([]);
        setGpuBenchmarks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBenchmarks();
  }, [zkvmId, programId]);

  return { cpuBenchmarks, gpuBenchmarks, loading, error };
};

export default useTopBenchmarks; 