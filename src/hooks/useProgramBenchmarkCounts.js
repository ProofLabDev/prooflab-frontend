import { useState, useEffect } from 'react';

/**
 * Custom hook to get the number of benchmark runs for each program
 * @returns {Object} An object containing benchmark counts by program ID
 */
const useProgramBenchmarkCounts = () => {
  const [benchmarkCounts, setBenchmarkCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBenchmarkCounts = async () => {
      try {
        setLoading(true);
        
        // First, fetch the telemetry index file
        const indexResponse = await fetch('/data/telemetry/index.json');
        if (!indexResponse.ok) {
          throw new Error('Failed to fetch telemetry index');
        }
        
        const indexData = await indexResponse.json();
        const telemetryFiles = indexData.files || [];
        
        console.log("Telemetry files:", telemetryFiles);
        
        // Create count map
        const counts = {};
        
        // Known program IDs from programs.json - we'll build this manually based on the errors we've seen
        const knownPrograms = [
          'fibonacci',
          'ecdsa',
          'bubble-sort',
          'is-even',
          'json',
          'regex',
          'rsa',
          'sha'
        ];
        
        // Process each file and count by program ID
        telemetryFiles.forEach(file => {
          // First, check if any known program ID (with underscore instead of hyphen) is in the filename
          let foundProgramId = null;
          
          // Try each known program ID
          for (const id of knownPrograms) {
            // Convert from hyphen to underscore for matching in filename
            const searchPattern = id.replace(/-/g, '_');
            
            if (file.includes(`telemetry_${searchPattern}_`)) {
              foundProgramId = id;
              break;
            }
          }
          
          // If we found a match, count it
          if (foundProgramId) {
            console.log(`File ${file} → Program ID: ${foundProgramId}`);
            
            if (!counts[foundProgramId]) {
              counts[foundProgramId] = 0;
            }
            
            counts[foundProgramId]++;
          }
        });
        
        console.log("Final benchmark counts:", counts);
        setBenchmarkCounts(counts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching benchmark counts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBenchmarkCounts();
  }, []);

  return { benchmarkCounts, loading, error };
};

export default useProgramBenchmarkCounts;