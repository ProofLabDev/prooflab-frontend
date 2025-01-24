import React from 'react';
import { Link } from 'react-router-dom';
import HealthIndicator from './HealthIndicator';

const MetricItem = ({ label, value }) => (
  <div className="flex items-center space-x-2">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-900">{value}</span>
  </div>
);

const ZKVMCard = ({ zkvm }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{zkvm.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{zkvm.description}</p>
        </div>
        <HealthIndicator metrics={zkvm.healthMetrics} size="small" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Performance Metrics</h4>
          {zkvm.metrics.map((metric, index) => (
            <MetricItem key={index} label={metric.label} value={metric.value} />
          ))}
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Features</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {zkvm.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            zkvm.status === 'production' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {zkvm.status}
          </span>
          <span className="text-xs text-gray-500">
            Updated {new Date(zkvm.lastUpdated).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <a
              href={zkvm.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Docs
            </a>
            <span className="text-gray-300">|</span>
            <a
              href={zkvm.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              GitHub
            </a>
          </div>
          <Link
            to={`/zkvms/${zkvm.id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ZKVMCard; 