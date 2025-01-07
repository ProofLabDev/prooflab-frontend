import { useState, useEffect } from 'react';

const useDataLoader = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // First fetch the index file
        const indexResponse = await fetch('/data/telemetry/index.json');
        const { files } = await indexResponse.json();

        // Fetch all telemetry files in parallel
        const telemetryPromises = files.map(filename =>
          fetch(`/data/telemetry/${filename}`)
            .then(response => response.json())
            .then(data => ({
              ...data,
              // Add metadata from filename
              metadata: {
                timestamp: filename.split('_').pop().replace('.json', ''),
                filename
              }
            }))
        );

        const telemetryData = await Promise.all(telemetryPromises);
        setData(telemetryData);
      } catch (err) {
        console.error('Error loading telemetry data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

export default useDataLoader; 