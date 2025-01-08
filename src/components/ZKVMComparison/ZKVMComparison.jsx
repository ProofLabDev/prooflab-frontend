import React, { useState } from 'react';
import useComparison from '../../hooks/useComparison';

const ZKVMComparison = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const { data: features, loading, error } = useComparison();

  const toggleFeatureExpansion = (featureId) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-600">Error loading comparison data: {error}</div>
    </div>
  );

  const renderDetails = (details) => {
    if (typeof details === 'string') {
      return <p className="text-sm text-gray-600">{details}</p>;
    }

    return (
      <div>
        {details.summary && (
          <p className="text-sm text-gray-600 mb-4">{details.summary}</p>
        )}
        {details.items && (
          <ul className="list-disc pl-4 mb-4 space-y-1">
            {details.items.map((item, index) => (
              <li key={index}>
                {typeof item === 'string' ? (
                  <span className="text-sm text-gray-600">{item}</span>
                ) : (
                  <div>
                    <strong>{item.title}:</strong> {item.description}
                    {item.subitems && (
                      <ul className="list-disc pl-4 mt-1">
                        {item.subitems.map((subitem, subIndex) => (
                          <li key={subIndex} className="text-sm text-gray-600">{subitem}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {details.note && (
          <p className="text-sm text-gray-600">{details.note}</p>
        )}
        {details.links && (
          <div className="flex space-x-4">
            {details.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {link.text} →
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">zkVM Comparison</h1>
        <p className="text-xl text-gray-600">
          Compare features and performance between popular Zero Knowledge Virtual Machines
        </p>
      </div>

      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div 
              className="px-6 py-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
              onClick={() => toggleFeatureExpansion(feature.id)}
            >
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                <div className="mt-2 grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">SP1</h4>
                    <p className="text-sm text-gray-900">{feature.sp1.value}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Risc0</h4>
                    <p className="text-sm text-gray-900">{feature.risc0.value}</p>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <button className="text-gray-400 hover:text-gray-600">
                  {expandedFeature === feature.id ? '▼' : '▶'}
                </button>
              </div>
            </div>
            
            {expandedFeature === feature.id && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">SP1</h4>
                    {renderDetails(feature.sp1.details)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Risc0</h4>
                    {renderDetails(feature.risc0.details)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Legend</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✅</span>
              <span className="text-sm text-gray-600">Supported</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">⚠️</span>
              <span className="text-sm text-gray-600">Partial/Limited Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">❌</span>
              <span className="text-sm text-gray-600">Not Supported</span>
            </div>
          </div>
        </div>

        <div className="prose max-w-none space-y-4">
          <p className="text-gray-600">
            Note: This comparison table is maintained by the ProofLab team and is updated regularly. 
            For the most up-to-date information, please refer to the official documentation of each project.
          </p>
          <p className="text-gray-600">
            We welcome corrections and contributions! The comparison data is maintained in our{' '}
            <a 
              href="https://github.com/ProofLabDev/frontend/tree/main/public/data/comparisons" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              public repository
            </a>. 
            Feel free to submit a pull request or open an issue if you notice any inaccuracies or have suggestions for improvement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZKVMComparison; 