import { useState, useEffect } from 'react';

const useComparison = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sp1Data, risc0Data] = await Promise.all([
          fetch('/data/comparisons/sp1.json').then(res => res.json()),
          fetch('/data/comparisons/risc0.json').then(res => res.json())
        ]);

        // Create a list of feature IDs from the union of both feature sets
        const featureIds = Array.from(
          new Set([
            ...Object.keys(sp1Data.features),
            ...Object.keys(risc0Data.features)
          ])
        );

        // Create the comparison data structure
        const comparisonData = featureIds.map(id => ({
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1).replace(/_/g, ' '),
          sp1: sp1Data.features[id] || { value: '❌', details: 'Not supported' },
          risc0: risc0Data.features[id] || { value: '❌', details: 'Not supported' }
        }));

        setData(comparisonData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

export default useComparison; 