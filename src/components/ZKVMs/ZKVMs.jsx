import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ZKVMCard = ({ zkvm }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{zkvm.name}</h3>
          <p className="mt-2 text-gray-600">{zkvm.description}</p>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          zkvm.status === 'production' 
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {zkvm.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-500">Architecture</div>
          <div className="mt-1 text-sm text-gray-900">{zkvm.architecture.type}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">Proof System</div>
          <div className="mt-1 text-sm text-gray-900">{zkvm.architecture.proofSystem}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-gray-500">Features</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {zkvm.features.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <a
            href={zkvm.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Documentation
          </a>
          <a
            href={zkvm.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            GitHub
          </a>
        </div>
        <Link
          to={`/zkvms/${zkvm.id}`}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
);

const ZKVMs = () => {
  const [zkvms, setZkvms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchZKVMs = async () => {
      try {
        const response = await fetch('/data/zkvms.json');
        const data = await response.json();
        setZkvms(data.zkvms);
        setError(null);
      } catch (err) {
        console.error('Error fetching ZKVMs:', err);
        setError('Failed to load ZKVM data');
      } finally {
        setLoading(false);
      }
    };

    fetchZKVMs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-xl text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Zero Knowledge Virtual Machines</h1>
        <p className="mt-2 text-lg text-gray-600">
          Compare different ZK Virtual Machines and their capabilities
        </p>
      </div>

      <div className="space-y-8">
        {zkvms.map((zkvm) => (
          <ZKVMCard key={zkvm.id} zkvm={zkvm} />
        ))}
      </div>
    </div>
  );
};

export default ZKVMs; 