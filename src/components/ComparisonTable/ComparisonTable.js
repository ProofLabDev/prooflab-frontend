import React from 'react';
import { useComparisonData } from '../../utils/dataFetching';

const ComparisonTable = () => {
  const { comparisons, loading, error } = useComparisonData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading comparison data</h3>
            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const features = Object.keys(comparisons.sp1?.features || {});

  const renderFeatureValue = (value) => {
    if (typeof value === 'string') {
      if (value.startsWith('✅')) {
        return (
          <span className="inline-flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {value.substring(2)}
          </span>
        );
      }
      if (value.startsWith('❌')) {
        return (
          <span className="inline-flex items-center">
            <svg className="h-5 w-5 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            {value.substring(2)}
          </span>
        );
      }
      return value;
    }
    return JSON.stringify(value);
  };

  const renderFeatureDetails = (details) => {
    if (!details) return null;

    if (typeof details === 'string') {
      return <p className="mt-2 text-sm text-gray-500">{details}</p>;
    }

    return (
      <div className="mt-2">
        {details.summary && (
          <p className="text-sm text-gray-500 mb-2">{details.summary}</p>
        )}
        {details.items && (
          <ul className="list-disc list-inside space-y-1">
            {details.items.map((item, index) => (
              <li key={index} className="text-sm text-gray-500">
                {typeof item === 'string' ? (
                  item
                ) : (
                  <span>
                    <strong>{item.title}:</strong> {item.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        {details.links && (
          <div className="mt-3 space-y-1">
            {details.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-500 block"
              >
                {link.text} →
              </a>
            ))}
          </div>
        )}
        {details.note && (
          <p className="mt-2 text-sm text-gray-500 italic">{details.note}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">System Comparison</h2>
          <p className="mt-1 text-sm text-gray-500">
            Detailed comparison between SP1 and RISC0 proving systems
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {features.map((feature, index) => (
              <div key={feature} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-500 capitalize">
                  {feature.replace(/_/g, ' ')}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* SP1 */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-indigo-600 mb-2">SP1</h4>
                      <div className="text-gray-900">
                        {renderFeatureValue(comparisons.sp1?.features[feature]?.value)}
                      </div>
                      {renderFeatureDetails(comparisons.sp1?.features[feature]?.details)}
                    </div>

                    {/* RISC0 */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium text-indigo-600 mb-2">RISC0</h4>
                      <div className="text-gray-900">
                        {renderFeatureValue(comparisons.risc0?.features[feature]?.value)}
                      </div>
                      {renderFeatureDetails(comparisons.risc0?.features[feature]?.details)}
                    </div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable; 