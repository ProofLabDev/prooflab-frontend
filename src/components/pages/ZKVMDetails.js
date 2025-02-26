import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useTopBenchmarks from '../../hooks/useTopBenchmarks';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const formatFrequency = (cyclesPerSecond) => {
  if (cyclesPerSecond >= 1_000_000) {
    return `${(cyclesPerSecond / 1_000_000).toFixed(2)} MHz`;
  } else if (cyclesPerSecond >= 1_000) {
    return `${(cyclesPerSecond / 1_000).toFixed(2)} kHz`;
  }
  return `${Math.round(cyclesPerSecond)} Hz`;
};

const StatCard = ({ title, value, change, changeDirection, subtitle }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
    <div className="flex justify-between items-start flex-wrap">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      {change !== undefined && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          changeDirection === 'up' ? 'bg-green-100 text-green-800' : 
          changeDirection === 'down' ? 'bg-red-100 text-red-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {changeDirection === 'up' ? '↑' : changeDirection === 'down' ? '↓' : '⟷'} {change}
        </span>
      )}
    </div>
    <p className="mt-2 text-xl sm:text-2xl font-bold text-gray-900 break-words">{value}</p>
    {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
  </div>
);

const BenchmarkTable = ({ benchmarks, loading, title, instanceType }) => (
  <div className="mt-6">
    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
        {instanceType}
      </span>
    </div>
    {loading ? (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    ) : benchmarks.length > 0 ? (
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Program</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Throughput</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Cycles</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Proving Time</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Memory</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Version</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {benchmarks.map((benchmark, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 capitalize">
                  {benchmark.program.replace(/-/g, ' ')}
                  {benchmark.gpuEnabled && (
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                      GPU
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900 font-medium">
                  {formatFrequency(benchmark.throughput)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                  {benchmark.cycles.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                  {benchmark.provingTime.toFixed(2)}s
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                  {Math.round(benchmark.maxMemory)} MB
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                  v{benchmark.version}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
          </div>
        </div>
      ) : (
      <div className="py-10 bg-gray-50 rounded-lg border border-gray-200 text-center">
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100">
          <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="mt-3 text-lg font-medium text-gray-900">Benchmarks Coming Soon</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          We're currently integrating benchmarks for this system. Check back soon for performance metrics.
        </p>
        <div className="mt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            In Integration Process
          </span>
        </div>
      </div>
    )}
  </div>
);

const TechnologyCard = ({ title, details, icon }) => (
  <div className="bg-white shadow overflow-hidden rounded-lg">
    <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-200">
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      </div>
    </div>
    <div className="px-4 py-5 sm:p-6">
      <ul className="space-y-3">
        {details.map((detail, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 text-indigo-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="ml-3 text-sm text-gray-700">{detail}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ZKVMDetails = () => {
  const { id } = useParams();
  const [zkvm, setZkvm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cpuBenchmarks, gpuBenchmarks, loading: benchmarksLoading } = useTopBenchmarks(id);
  const [exportLoading, setExportLoading] = useState(false);
  const reportRef = useRef(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // Fetch zkVM data
    fetch('/data/zkvms.json')
      .then(response => response.json())
      .then(data => {
        const foundZkvm = data.zkvms.find(z => z.id === id);
        if (!foundZkvm) {
          throw new Error('Report not found');
        }
        setZkvm(foundZkvm);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
      
    // Fetch telemetry index to get last updated date
    fetch('/data/telemetry/index.json')
      .then(response => response.json())
      .then(data => {
        setLastUpdated(new Date(data.lastUpdated));
      })
      .catch(err => {
        console.error('Error fetching telemetry index:', err);
      });
  }, [id]);

  const exportAsPDF = async () => {
    if (!reportRef.current) return;
    
    setExportLoading(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${zkvm.name.replace(/\s+/g, '-').toLowerCase()}-report.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setExportLoading(false);
    }
  };

  // Get the highest CPU and GPU throughput
  const bestCpuThroughput = cpuBenchmarks.length > 0 
    ? Math.max(...cpuBenchmarks.map(b => b.throughput)) 
    : 0;
    
  const bestGpuThroughput = gpuBenchmarks.length > 0 
    ? Math.max(...gpuBenchmarks.map(b => b.throughput)) 
    : 0;
    
  // Check if benchmarks are available
  const hasBenchmarkData = cpuBenchmarks.length > 0 || gpuBenchmarks.length > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !zkvm) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error || 'Report not found'}</p>
              </div>
              <div className="mt-4">
                <Link
                  to="/zkvms"
                  className="text-sm font-medium text-red-800 hover:text-red-900"
                >
                  ← Back to Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div ref={reportRef} className="bg-gray-50 pb-8">
        {/* Header with Export Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-6 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{zkvm.name}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  zkvm.status === 'production' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {zkvm.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 max-w-3xl">{zkvm.description}</p>
              
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 gap-2 sm:gap-0">
                <span className="whitespace-nowrap">Last updated: {lastUpdated ? lastUpdated.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Unknown'}</span>
                
                <div className="flex flex-wrap gap-4 sm:ml-4">
                  {zkvm.documentation && (
                    <a
                      href={zkvm.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 flex items-center"
                    >
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      Docs
                    </a>
                  )}
                  {zkvm.github && (
                    <a
                      href={zkvm.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 flex items-center"
                    >
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={exportAsPDF}
              disabled={exportLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {exportLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Exporting...
                </>
              ) : (
                <>
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export as PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Performance Metrics</h2>
          {!hasBenchmarkData && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-700">
                    This system is currently being integrated into our benchmarking reports. Performance metrics will be available soon.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="CPU Throughput" 
              value={hasBenchmarkData ? formatFrequency(bestCpuThroughput) : "Coming Soon"} 
              subtitle={hasBenchmarkData ? "Best performing benchmark" : "Integration in progress"}
            />
            <StatCard 
              title="GPU Throughput" 
              value={hasBenchmarkData ? formatFrequency(bestGpuThroughput) : "Coming Soon"}
              subtitle={hasBenchmarkData ? "Best performing benchmark" : "Integration in progress"} 
            />
            <StatCard 
              title="Architecture" 
              value={zkvm.architecture?.type || "Custom"} 
              subtitle={zkvm.architecture?.proofSystem || ""}
            />
            <StatCard 
              title="Status" 
              value={zkvm.status} 
              subtitle={`Last updated: ${new Date(zkvm.lastUpdated).toLocaleDateString()}`}
            />
          </div>
        </div>

        {/* Benchmark Tables */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-900">Benchmark Results</h2>
              <p className="mt-1 text-sm text-gray-500">
                Performance metrics from the most recent benchmark runs
              </p>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <BenchmarkTable 
                title="CPU Benchmarks" 
                benchmarks={cpuBenchmarks} 
                loading={benchmarksLoading} 
                instanceType="r7i.16xlarge"
              />
              
              <BenchmarkTable 
                title="GPU Benchmarks" 
                benchmarks={gpuBenchmarks} 
                loading={benchmarksLoading}
                instanceType="g6.16xlarge" 
              />
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Specifications</h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            <TechnologyCard
              title="Proof Generation"
              icon={
                <svg className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              details={zkvm.technicalSpecs.proofGeneration}
            />
            <TechnologyCard
              title="Verification"
              icon={
                <svg className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              details={zkvm.technicalSpecs.verification}
            />
          </div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-900">Features</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {zkvm.features.map((feature, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        {zkvm.additionalResources && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900">Additional Resources</h2>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <ul className="divide-y divide-gray-200">
                  {zkvm.additionalResources.map(resource => (
                    <li key={resource.url} className="py-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-indigo-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h4 className="text-sm font-medium text-gray-900">
                          {resource.title}
                        </h4>
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Resource
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZKVMDetails; 