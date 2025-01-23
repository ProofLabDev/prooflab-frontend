import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ZKVMCard = ({ zkvm }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{zkvm.name}</h3>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              zkvm.status === 'production' ? 'bg-green-100 text-green-800' :
              zkvm.status === 'beta' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {zkvm.status}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              zkvm.performance === 'high' ? 'bg-blue-100 text-blue-800' :
              zkvm.performance === 'medium' ? 'bg-indigo-100 text-indigo-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {zkvm.performance} performance
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{zkvm.description}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Architecture</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Type</span>
                <p className="text-sm text-gray-900">{zkvm.architecture.type}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Proof System</span>
                <p className="text-sm text-gray-900">{zkvm.architecture.proofSystem}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {zkvm.supportedLanguages && zkvm.supportedLanguages.map((lang, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
            <div className="flex flex-wrap gap-2">
              {zkvm.features && zkvm.features.map((feature, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {zkvm.metrics && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Base Metrics</h4>
              <div className="grid grid-cols-3 gap-4">
                {zkvm.metrics.map((metric, index) => (
                  <div key={index}>
                    <span className="text-sm text-gray-500">{metric.label}</span>
                    <p className="text-sm font-medium text-gray-900">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex space-x-4">
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
            to={`/programs?zkvm=${zkvm.id}`}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Programs
          </Link>
        </div>
      </div>
    </div>
  );
};

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
        // Extract the zkvms array from the response
        setZKVMs(data.zkvms || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching ZKVMs:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchZKVMs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading ZKVMs</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Zero Knowledge Virtual Machines
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore different ZK virtual machines, their features, and performance characteristics. 
          Each ZKVM provides a unique environment for executing zero-knowledge proofs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {zkvms.length > 0 ? (
          zkvms.map((zkvm) => (
            <ZKVMCard key={zkvm.id} zkvm={zkvm} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No ZKVMs available</h3>
            <p className="text-gray-600">Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZKVMs; 