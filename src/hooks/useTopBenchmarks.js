import { useState, useEffect } from 'react';

const calculateThroughput = (cycles, timing) => {
  if (!cycles || !timing) return 0;
  const totalNanos = (timing.core_prove_duration?.secs || 0) * 1000000000 + (timing.core_prove_duration?.nanos || 0);
  return totalNanos > 0 ? (cycles / (totalNanos / 1000000000)) : 0;
};

const useTopBenchmarks = (zkvmId) => {
  const [benchmarks, setBenchmarks] = useState([]);
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
        // Fetch the telemetry index
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

        // Group by program (get latest for each)
        const programGroups = {};
        telemetryFiles.forEach(file => {
          const programMatch = file.match(new RegExp(`${zkvmId.toLowerCase()}_telemetry_(.+?)_.*`));
          if (programMatch) {
            const program = programMatch[1];
            if (!programGroups[program] || file > programGroups[program]) {
              programGroups[program] = file;
            }
          }
        });

        // Fetch data for each program's latest run
        const programData = await Promise.all(
          Object.entries(programGroups).map(async ([program, file]) => {
            const response = await fetch(`/data/telemetry/${file}`);
            if (!response.ok) return null;
            const data = await response.json();
            
            // Calculate throughput using core prove time
            const throughput = calculateThroughput(data.zk_metrics.cycles, data.timing);
            const throughputMHz = throughput / 1_000_000; // Convert to MHz for sorting

            return {
              program,
              throughput,
              throughputMHz,
              cycles: data.zk_metrics.cycles,
              provingTime: (data.timing.core_prove_duration.secs + 
                           data.timing.core_prove_duration.nanos / 1e9),
              maxMemory: data.resources.max_memory_kb / 1024, // Convert to MB
              instanceType: data.system_info?.ec2_instance_type || 'Local',
              gpuEnabled: data.gpu_enabled || false
            };
          })
        );

        // Sort by MHz and take top 3
        const topBenchmarks = programData
          .filter(Boolean)
          .sort((a, b) => b.throughputMHz - a.throughputMHz)
          .slice(0, 3);

        setBenchmarks(topBenchmarks);
        setError(null);
      } catch (err) {
        setError(err.message);
        setBenchmarks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBenchmarks();
  }, [zkvmId]);

  return { benchmarks, loading, error };
};

export default useTopBenchmarks; 