import React, { useState, useEffect } from 'react';
import ZKVMCard from './ZKVMCard';

const ZKVMs = () => {
  const [zkvms, setZKVMs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchZKVMs = async () => {
      try {
        const response = await fetch('/data/zkvms.json');
        if (!response.ok) {
          throw new Error('Failed to fetch ZKVMs data');
        }
        const data = await response.json();
        setZKVMs(data.zkvms);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchZKVMs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse flex justify-center">
              <div className="h-8 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Error loading ZKVMs: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Zero-Knowledge Virtual Machines</h2>
          <p className="mt-4 text-lg text-gray-600">
            Compare different ZKVMs and their performance characteristics
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {zkvms.map((zkvm) => (
            <ZKVMCard key={zkvm.id} zkvm={zkvm} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZKVMs; 