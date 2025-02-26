import React, { useState } from 'react';
import { useComparisonData } from '../../utils/dataFetching';
import RadarChart from './RadarChart';

// Define metric categories based on the specified requirements
const metricCategories = [
  {
    id: 'performance',
    name: 'Performance Metrics',
    description: 'Metrics focusing on efficiency and speed of the zkVM',
    metrics: [
      'proof_generation_time',
      'verification_cost',
      'resource_utilization',
      'throughput',
      'latency'
    ]
  },
  {
    id: 'security',
    name: 'Security Metrics',
    description: 'Metrics focusing on security properties of the zkVM',
    metrics: [
      'trusted_computing_base',
      'attack_surface',
      'formal_verification',
      'code_coverage',
      'auditability',
      'vulnerability_history'
    ]
  },
  {
    id: 'holistic',
    name: 'Holistic Metrics',
    description: 'Metrics considering overall impact on real-world applications',
    metrics: [
      'development_effort',
      'tooling_ecosystem',
      'security_under_composition'
    ]
  },
  {
    id: 'features',
    name: 'Features & Compatibility',
    description: 'Key features and ecosystem compatibility',
    metrics: [
      'language',
      'zktype',
      'unbounded',
      'libraries',
      'evm',
      'hardware',
      'features',
      'precompiles',
      'tooling',
      'audit',
      'license',
      'production'
    ]
  }
];

// Map metric names to human-readable labels and descriptions
const metricInfo = {
  // Performance metrics
  proof_generation_time: {
    label: 'Proof Generation Time',
    description: 'Time taken to generate a proof for a given computation (lower is better)',
    unit: 'seconds/milliseconds'
  },
  verification_cost: {
    label: 'Verification Cost',
    description: 'Cost required to verify a generated proof (time or gas)',
    unit: 'seconds/gas'
  },
  resource_utilization: {
    label: 'Resource Utilization',
    description: 'Resources consumed during proof generation and verification',
    unit: 'CPU/Memory/Disk'
  },
  throughput: {
    label: 'Throughput',
    description: 'Number of proofs generated per unit of time (higher is better)',
    unit: 'proofs per second'
  },
  latency: {
    label: 'Latency',
    description: 'Time delay between computation submission and proof generation',
    unit: 'seconds/milliseconds'
  },
  
  // Security metrics
  trusted_computing_base: {
    label: 'TCB Size',
    description: 'Amount of code that must be trusted for secure operation',
    unit: 'LOC/dependencies'
  },
  attack_surface: {
    label: 'Attack Surface',
    description: 'Potential entry points for attackers',
    unit: 'endpoints/vectors'
  },
  formal_verification: {
    label: 'Formal Verification',
    description: 'Percentage of code that has been formally verified',
    unit: '%'
  },
  code_coverage: {
    label: 'Code Coverage',
    description: 'Effectiveness of testing in exploring code paths',
    unit: '%'
  },
  auditability: {
    label: 'Auditability',
    description: 'Ease with which code can be audited by security experts',
    unit: 'High/Medium/Low'
  },
  vulnerability_history: {
    label: 'Vulnerabilities',
    description: 'Number and severity of discovered vulnerabilities',
    unit: 'count/severity'
  },
  
  // Holistic metrics
  development_effort: {
    label: 'Dev. Effort',
    description: 'Effort required to develop and maintain applications',
    unit: 'LOC/time'
  },
  tooling_ecosystem: {
    label: 'Tooling & Ecosystem',
    description: 'Availability and quality of development tools and libraries',
    unit: 'count/quality'
  },
  security_under_composition: {
    label: 'Composition Security',
    description: 'How security guarantees hold when combined with other systems',
    unit: 'assessment'
  },
  
  // Feature metrics (existing ones)
  language: {
    label: 'Language Support',
    description: 'Programming languages supported by the zkVM'
  },
  zktype: {
    label: 'ZK Technology',
    description: 'Type of zero-knowledge proof system used'
  },
  unbounded: {
    label: 'Unbounded Computation',
    description: 'Support for arbitrarily long computations'
  },
  libraries: {
    label: 'Library Support',
    description: 'Compatibility with existing libraries and frameworks'
  },
  evm: {
    label: 'EVM Integration',
    description: 'Integration with Ethereum Virtual Machine'
  },
  hardware: {
    label: 'Hardware Support',
    description: 'Compatible hardware platforms and accelerators'
  },
  features: {
    label: 'Special Features',
    description: 'Special capabilities and optimizations'
  },
  precompiles: {
    label: 'Precompiles',
    description: 'Built-in optimized functions for common operations'
  },
  tooling: {
    label: 'Developer Tools',
    description: 'Tools provided for development workflow'
  },
  audit: {
    label: 'Security Audits',
    description: 'Security audits performed on the codebase'
  },
  license: {
    label: 'License',
    description: 'Open source license terms'
  },
  production: {
    label: 'Production Readiness',
    description: 'Status of production deployment'
  }
};

// Define color scheme for each system (using neutral/professional colors)
const systemColors = {
  sp1: '#4f46e5',    // Deeper blue
  risc0: '#7e22ce',  // Purple
  cairo: '#0e7490',  // Teal
  leo: '#6b7280',    // Gray
  leo_nativo: '#334155', // Slate
};

const ComparisonTable = () => {
  const { comparisons, loading, error } = useComparisonData();
  const [activeCategory, setActiveCategory] = useState('features');
  const [selectedSystems, setSelectedSystems] = useState([]);
  const [showRadar, setShowRadar] = useState(true);

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

  // Get all available systems
  const availableSystems = Object.keys(comparisons);
  
  // If no systems are explicitly selected, use all available systems
  const systemsToShow = selectedSystems.length > 0 ? selectedSystems : availableSystems;

  // Get metrics for the active category
  const activeMetrics = metricCategories.find(cat => cat.id === activeCategory)?.metrics || [];

  const renderFeatureValue = (value) => {
    if (!value) return "N/A";
    
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

  // Function to handle system selection
  const toggleSystemSelection = (system) => {
    if (selectedSystems.includes(system)) {
      setSelectedSystems(selectedSystems.filter(s => s !== system));
    } else {
      setSelectedSystems([...selectedSystems, system]);
    }
  };

  // Check if there's data for radar chart in the current category
  const hasRadarData = activeCategory !== 'features' && 
    systemsToShow.some(system => 
      comparisons[system]?.[activeCategory] && 
      Object.keys(comparisons[system][activeCategory]).length > 0
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900">zkVM Comparison</h2>
          <p className="mt-1 text-sm text-gray-500">
            Detailed comparison of Zero-Knowledge Virtual Machines across multiple dimensions
          </p>
        </div>
        
        {/* System Selection */}
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Compare Systems</h3>
          <div className="flex flex-wrap gap-2">
            {availableSystems.map(system => (
              <button
                key={system}
                onClick={() => toggleSystemSelection(system)}
                className={`px-4 py-2 rounded-full text-sm font-medium 
                  ${selectedSystems.includes(system) || selectedSystems.length === 0 
                    ? `bg-${system in systemColors ? systemColors[system].replace('#', '') : 'indigo'}-100 text-${system in systemColors ? systemColors[system].replace('#', '') : 'indigo'}-800` 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                style={{ 
                  backgroundColor: selectedSystems.includes(system) || selectedSystems.length === 0 
                    ? `${systemColors[system]}20` 
                    : undefined,
                  color: selectedSystems.includes(system) || selectedSystems.length === 0 
                    ? systemColors[system] 
                    : undefined 
                }}
              >
                {comparisons[system]?.name || system.toUpperCase()}
              </button>
            ))}
          </div>
          {selectedSystems.length > 0 && (
            <button 
              onClick={() => setSelectedSystems([])}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
            >
              Show All
            </button>
          )}
        </div>
        
        {/* Category tabs */}
        <div className="border-t border-gray-200">
          <div className="px-4 sm:px-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                {metricCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm 
                      ${activeCategory === category.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
        {/* Active category description */}
        <div className="bg-gray-50 px-4 py-3 sm:px-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {metricCategories.find(cat => cat.id === activeCategory)?.description}
            </p>
            
            {/* Radar chart toggle button (only show for categories with radar data) */}
            {hasRadarData && (
              <button
                onClick={() => setShowRadar(!showRadar)}
                className="px-3 py-1 text-xs font-medium rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              >
                {showRadar ? 'Hide Radar Chart' : 'Show Radar Chart'}
              </button>
            )}
          </div>
        </div>
        
        {/* Radar Chart for the active category (if applicable) */}
        {activeCategory !== 'features' && showRadar && (
          <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance at a Glance</h3>
            <RadarChart 
              category={activeCategory}
              metrics={activeMetrics}
              systems={systemsToShow}
              comparisons={comparisons}
              metricInfo={metricInfo}
              colors={systemColors}
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              * Metrics are normalized on a scale of 0-10 for comparison purposes
            </p>
          </div>
        )}
        
        {/* Comparison table */}
        <div className="border-t border-gray-200">
          <dl>
            {activeMetrics.map((metric, index) => {
              // Skip metrics that don't exist in any of the systems being compared
              const hasData = systemsToShow.some(system => 
                comparisons[system]?.features && 
                (comparisons[system].features[metric] || 
                 // For new metrics that might be added later
                 comparisons[system][activeCategory]?.[metric])
              );
              
              if (!hasData && activeCategory === 'features') return null;
              
              return (
                <div key={metric} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                  <dt className="text-sm font-medium text-gray-500">
                    <div>{metricInfo[metric]?.label || metric.replace(/_/g, ' ')}</div>
                    {metricInfo[metric]?.description && (
                      <p className="mt-1 text-xs text-gray-400">{metricInfo[metric].description}</p>
                    )}
                    {metricInfo[metric]?.unit && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-1">
                        {metricInfo[metric].unit}
                      </span>
                    )}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {systemsToShow.map(system => {
                        // Try to get either from features or from the new category structure
                        const metricData = 
                          comparisons[system]?.features?.[metric] || 
                          comparisons[system]?.[activeCategory]?.[metric] || 
                          (activeCategory !== 'features' ? { value: 'Coming Soon', details: 'Data will be available in future updates.' } : null);
                        
                        if (!metricData && activeCategory === 'features') return null;
                        
                        return (
                          <div 
                            key={system} 
                            className="border rounded-lg p-4"
                            style={{ borderColor: `${systemColors[system]}30` }}
                          >
                            <h4 
                              className="font-medium mb-2" 
                              style={{ color: systemColors[system] }}
                            >
                              {comparisons[system]?.name || system.toUpperCase()}
                            </h4>
                            <div className="text-gray-900">
                              {metricData ? renderFeatureValue(metricData.value) : 'Coming Soon'}
                            </div>
                            {metricData && renderFeatureDetails(metricData.details)}
                          </div>
                        );
                      })}
                    </div>
                  </dd>
                </div>
              );
            })}
            
            {/* Show message if no metrics are available for this category */}
            {activeMetrics.length === 0 && (
              <div className="px-4 py-5 sm:px-6 text-center">
                <p className="text-gray-500">No metrics available for this category.</p>
              </div>
            )}
            
            {/* Show message for new metrics categories that don't have data yet */}
            {activeCategory !== 'features' && activeMetrics.every(metric => 
              !systemsToShow.some(system => 
                comparisons[system]?.[activeCategory]?.[metric]
              )
            ) && (
              <div className="px-4 py-5 sm:px-6 bg-blue-50 border-l-4 border-blue-400">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Coming Soon</h3>
                    <p className="mt-2 text-sm text-blue-700">
                      Detailed metrics for this category are currently being gathered and will be available in future updates.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </dl>
        </div>
      </div>
      
      {/* Benchmark methodology section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Benchmark Methodology</h2>
          <p className="mt-1 text-sm text-gray-500">
            How we collect and validate zkVM performance data
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Data Collection</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our benchmarks are collected using standardized workloads running on controlled environments
              to ensure fair and consistent comparisons. All zkVMs are tested using the same programs compiled
              from zkRust, ensuring an apples-to-apples comparison across systems.
            </p>
            
            <h3 className="text-base font-semibold text-gray-900 mt-4 mb-2">Testing Environment</h3>
            <p className="text-sm text-gray-600 mb-2">
              Performance metrics are gathered on multiple hardware configurations:
            </p>
            <ul className="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
              <li><span className="font-medium">CPU Testing:</span> AWS EC2 c6i.16xlarge instances (64 vCPUs, 128 GB RAM)</li>
              <li><span className="font-medium">GPU Testing:</span> AWS EC2 g5.12xlarge instances (4x NVIDIA A10G GPUs)</li>
            </ul>
            
            <h3 className="text-base font-semibold text-gray-900 mt-4 mb-2">Scoring Methodology</h3>
            <p className="text-sm text-gray-600 mb-2">
              For radar chart visualizations, metrics are normalized to a 0-10 scale with these considerations:
            </p>
            <ul className="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
              <li><span className="font-medium">Performance Metrics:</span> For metrics where lower is better (proof time, latency), 
                values are inverted so that higher scores always represent better performance.</li>
              <li><span className="font-medium">Security Metrics:</span> Based on industry standards and comparative analysis.</li>
              <li><span className="font-medium">Holistic Metrics:</span> Qualitative assessments converted to numerical values 
                based on standardized criteria.</li>
            </ul>
            
            <h3 className="text-base font-semibold text-gray-900 mt-4 mb-2">Verification</h3>
            <p className="text-sm text-gray-600 mb-2">
              All benchmark data is independently verifiable. The benchmark suite is open source,
              and detailed methodologies are documented to allow anyone to reproduce our results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;