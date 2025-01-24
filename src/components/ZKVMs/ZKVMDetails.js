import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HealthIndicator from './HealthIndicator';

const DetailSection = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

const MetricCard = ({ title, value, trend }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{title}</span>
      {trend && (
        <span className={`text-xs font-medium ${
          trend > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
  </div>
);

const ZKVMDetails = () => {
  const { id } = useParams();
  const [zkvm, setZkvm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/zkvms.json')
      .then(response => response.json())
      .then(data => {
        const foundZkvm = data.zkvms.find(vm => vm.id === id);
        if (foundZkvm) {
          setZkvm(foundZkvm);
        } else {
          setError('ZKVM not found');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DetailSection title="Overview">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{zkvm.name}</h1>
              <p className="mt-2 text-gray-600">{zkvm.description}</p>
            </div>
          </DetailSection>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <DetailSection title="Architecture">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Proof System</h4>
                  <p className="mt-1 text-sm text-gray-600">{zkvm.architecture.proofSystem}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Runtime Language</h4>
                  <p className="mt-1 text-sm text-gray-600">{zkvm.runtimeLanguage}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Supported Languages</h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {zkvm.supportedLanguages.map((lang, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </DetailSection>

            <DetailSection title="Status">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {zkvm.metrics.map((metric, index) => (
                    <MetricCard
                      key={index}
                      title={metric.label}
                      value={metric.value}
                      trend={metric.trend}
                    />
                  ))}
                </div>
              </div>
            </DetailSection>
          </div>
        </div>

        <div className="space-y-8">
          <DetailSection title="Health Status">
            <div className="flex items-center justify-center py-16">
              <HealthIndicator metrics={zkvm.healthMetrics} size="normal" />
            </div>
          </DetailSection>

          <DetailSection title="Features">
            <ul className="space-y-4">
              {zkvm.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-indigo-400 rounded-full"></span>
                  <span className="ml-3 text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="Resources">
            <div className="space-y-4">
              <a
                href={zkvm.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                Documentation →
              </a>
              <a
                href={zkvm.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                GitHub Repository →
              </a>
            </div>
          </DetailSection>
        </div>
      </div>
    </div>
  );
};

export default ZKVMDetails; 