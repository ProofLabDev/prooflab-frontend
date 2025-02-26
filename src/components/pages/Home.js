import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// SVG Icons for use in the UI
const Icons = {
  Performance: (
    <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Comparison: (
    <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Data: (
    <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Ecosystem: (
    <svg className="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  Arrow: (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  ),
  Speed: (
    <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Memory: (
    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Security: (
    <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Check: (
    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
};

// Feature box component
const FeatureBox = ({ icon, title, description }) => (
  <div className="relative bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative p-8">
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-indigo-100 text-indigo-600 mb-5 group-hover:bg-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">{title}</h3>
      <p className="mt-2 text-md text-gray-600 group-hover:text-white/90 transition-colors duration-300">{description}</p>
    </div>
  </div>
);

// Report card component
const ReportCard = ({ name, description, metrics, tags }) => (
  <Link to={`/zkvms/${name.toLowerCase().replace(/\s+/g, '-')}`} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <div className="flex space-x-1">
          {metrics.labels.map((label, i) => (
            <span key={i} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              metrics.colors[i]
            }`}>
              {label}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        {metrics.data.map((metric, i) => (
          <div key={i} className="bg-gray-50 rounded p-2">
            <p className="text-xs text-gray-500">{metric.name}</p>
            <div className="flex items-center">
              <p className="font-semibold text-gray-900">{metric.value}</p>
              <span className="ml-1 text-xs text-gray-500">({metric.unit})</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-1">
        {tags.map((tag, i) => (
          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </Link>
);

// Program card component
const ProgramCard = ({ name, category, difficulty, description }) => {
  // Determine difficulty color
  const difficultyColor = 
    difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
    difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
    'bg-red-100 text-red-800';
    
  return (
    <Link to={`/programs/${name.toLowerCase().replace(/\s+/g, '-')}`} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor}`}>
            {difficulty}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {category}
          </span>
          <span className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
            View details
            <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

// Animated stat card
const StatCard = ({ value, label, icon }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
    <div className="flex items-center">
      <div className="flex-shrink-0 mr-3">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {label && <div className="text-sm text-gray-500">{label}</div>}
      </div>
    </div>
  </div>
);

// Comparison table row
const ComparisonRow = ({ feature, sp1, risc0 }) => (
  <tr className="border-b border-gray-200">
    <td className="py-3 pl-4 pr-3 text-sm font-medium text-gray-900">{feature}</td>
    <td className="px-3 py-3 text-sm text-center">
      {sp1 ? (
        <span className="inline-flex items-center justify-center">
          {typeof sp1 === 'string' ? sp1 : Icons.Check}
        </span>
      ) : (
        <span className="text-gray-400">-</span>
      )}
    </td>
    <td className="px-3 py-3 text-sm text-center">
      {risc0 ? (
        <span className="inline-flex items-center justify-center">
          {typeof risc0 === 'string' ? risc0 : Icons.Check}
        </span>
      ) : (
        <span className="text-gray-400">-</span>
      )}
    </td>
  </tr>
);

const Home = () => {
  const [stats, setStats] = useState({
    systemCount: 0,
    programCount: 0,
    benchmarkCount: 0,
    cycleCount: "1+ million"
  });

  useEffect(() => {
    // Fetch all necessary data for dynamic stats
    Promise.all([
      fetch('/data/zkvms.json'),
      fetch('/data/programs.json'),
      fetch('/data/telemetry/index.json')
    ])
      .then(([reportsRes, programsRes, telemetryRes]) => Promise.all([
        reportsRes.json(),
        programsRes.json(),
        telemetryRes.json()
      ]))
      .then(([reportsData, programsData, telemetryData]) => {
        // Get the basic data
        const zkvms = reportsData.zkvms || [];
        const programsList = programsData.programs || [];
        
        // Calculate stats
        const systemCount = zkvms.length;
        
        // Get unique program names from telemetry files
        const telemetryFiles = telemetryData.files || [];
        const uniquePrograms = new Set();
        
        // Extract unique program names from telemetry filenames
        telemetryFiles.forEach(file => {
          // Pattern like: risc0_telemetry_fibonacci_g6.16xlarge_20250119...
          const match = file.match(/telemetry_([a-z-]+)_/);
          if (match && match[1]) {
            uniquePrograms.add(match[1]);
          }
        });
        
        // Final stats
        const programCount = Math.max(programsList.length, uniquePrograms.size);
        
        // Get unique systems from telemetry files
        const uniqueSystems = new Set();
        telemetryFiles.forEach(file => {
          const system = file.split('_')[0]; // Extract system name (risc0, sp1, etc)
          if (system) {
            uniqueSystems.add(system);
          }
        });
        
        // Use the maximum of declared systems and discovered systems
        const finalSystemCount = Math.max(systemCount, uniqueSystems.size);
        
        // Set the dynamic stats with better formatting for visual appeal
        setStats({
          systemCount: finalSystemCount + "+",
          programCount: programCount + "+",
          benchmarkCount: "Weekly",
          cycleCount: "1+ million"
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Sample featured reports
  const featuredReports = [
    {
      name: "RISC Zero",
      description: "High-performance RISC-V based zero-knowledge virtual machine with strong security properties",
      metrics: {
        labels: ["High Performance", "Production Ready"],
        colors: ["bg-green-100 text-green-800", "bg-blue-100 text-blue-800"],
        data: [
          { name: "CPU Throughput", value: "2.5 MHz", unit: "r7i.16xl" },
          { name: "GPU Throughput", value: "12.8 MHz", unit: "g6.16xl" },
          { name: "Memory Usage", value: "4.2 GB", unit: "peak" },
          { name: "Verification Time", value: "45 ms", unit: "avg" }
        ]
      },
      tags: ["RISC-V", "STARKs", "Rust"]
    },
    {
      name: "SP1",
      description: "STARK-based virtual machine designed for developer simplicity and rapid iteration",
      metrics: {
        labels: ["Fast Verification", "Developer Friendly"],
        colors: ["bg-purple-100 text-purple-800", "bg-green-100 text-green-800"],
        data: [
          { name: "CPU Throughput", value: "1.8 MHz", unit: "r7i.16xl" },
          { name: "GPU Throughput", value: "9.2 MHz", unit: "g6.16xl" },
          { name: "Memory Usage", value: "3.8 GB", unit: "peak" },
          { name: "Verification Time", value: "30 ms", unit: "avg" }
        ]
      },
      tags: ["STARKs", "Rust", "Succinct"]
    }
  ];

  // Sample featured programs
  const featuredPrograms = [
    {
      name: "SHA-256",
      category: "Cryptography",
      difficulty: "Medium",
      description: "Zero-knowledge SHA-256 hash function implementation benchmarked across ZK systems"
    },
    {
      name: "ECDSA",
      category: "Cryptography",
      difficulty: "Hard",
      description: "ECDSA signature verification in zero-knowledge with optimized elliptic curve operations"
    },
    {
      name: "Fibonacci",
      category: "Computation",
      difficulty: "Easy",
      description: "Classic Fibonacci sequence computation as a basic benchmark for ZK systems"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 w-full">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden bg-white w-full min-w-full">
        <div className="absolute inset-0 w-full min-w-full min-h-full">
          <div className="absolute inset-0 w-full min-w-full bg-indigo-100 mix-blend-multiply opacity-30" />
          <div className="absolute top-0 left-0 right-0 w-full min-w-full h-40 bg-gradient-to-b from-white" />
          <div className="absolute bottom-0 left-0 right-0 w-full min-w-full h-40 bg-gradient-to-t from-white" />
          <div className="absolute inset-0 w-full min-w-full opacity-30 pattern-grid-lg text-indigo-200" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">The Observatory for</span>
              <span className="block text-indigo-600 mt-1">ZK Technology</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-3xl">
              ProofLab provides comprehensive, always up-to-date reports and benchmarks for zero-knowledge virtual machines, helping you choose the right technology for your needs.
            </p>
            <div className="mt-8 flex space-x-4">
              <Link
                to="/zkvms"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
              >
                Explore Reports
              </Link>
              <Link
                to="/benchmarks"
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
              >
                View Benchmarks
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats Section */}
      <div className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              value={stats.cycleCount} 
              label="Benchmarked cycles" 
              icon={Icons.Speed} 
            />
            <StatCard 
              value={stats.systemCount} 
              label="Supported zkVMs" 
              icon={Icons.Ecosystem} 
            />
            <StatCard 
              value={stats.programCount} 
              label="Test programs" 
              icon={Icons.Data} 
            />
            <StatCard 
              value={stats.benchmarkCount} 
              label="Benchmark reports" 
              icon={Icons.Performance} 
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The complete ZK observatory
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              ProofLab offers comprehensive tools for understanding and comparing Zero Knowledge systems
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureBox
              icon={Icons.Performance}
              title="Performance Metrics"
              description="Track and compare throughput, memory usage, and proof generation times across systems."
            />
            <FeatureBox
              icon={Icons.Comparison}
              title="Side-by-Side Comparison"
              description="Compare multiple ZK systems with identical workloads for fair assessment."
            />
            <FeatureBox
              icon={Icons.Data}
              title="Historical Data"
              description="Monitor performance improvements over time with comprehensive historical data."
            />
            <FeatureBox
              icon={Icons.Ecosystem}
              title="Ecosystem Overview"
              description="Get a bird's-eye view of the entire ZK ecosystem in one place."
            />
          </div>
        </div>
      </div>

      {/* Featured Reports Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Featured Reports</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Latest ZK system analyses
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Comprehensive evaluations of leading Zero Knowledge systems with up-to-date metrics
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredReports.map((report, index) => (
              <ReportCard key={index} {...report} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/zkvms"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View all system reports
              <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* System Comparison */}
      <div className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">System Comparison</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Feature Comparison
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              See how leading ZK systems stack up against each other
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SP1
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      RISC Zero
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <ComparisonRow feature="CPU Proving" sp1="1.8 MHz" risc0="2.5 MHz" />
                  <ComparisonRow feature="GPU Acceleration" sp1 risc0 />
                  <ComparisonRow feature="Recursive Proofs" sp1={false} risc0 />
                  <ComparisonRow feature="STARK-based" sp1 risc0 />
                  <ComparisonRow feature="Rust SDK" sp1 risc0 />
                  <ComparisonRow feature="Production Ready" sp1={false} risc0 />
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/compare"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
            >
              Compare All Systems
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Programs */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Benchmarked Programs</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Popular test cases
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Standardized workloads used to benchmark ZK system performance
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPrograms.map((program, index) => (
              <ProgramCard key={index} {...program} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/programs"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View all programs
              <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 bg-indigo-600">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-indigo-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-900 mix-blend-multiply" />
            </div>
            <div className="relative px-6 py-16 sm:px-12 lg:px-16">
              <div className="md:ml-auto md:w-1/2 md:pl-10">
                <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-200">
                  Get Involved
                </h2>
                <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Join the ZK community
                </p>
                <p className="mt-3 text-lg text-indigo-100">
                  Contribute to our benchmarks, suggest new test cases, or share insights about zero-knowledge technology.
                </p>
                <div className="mt-8 flex space-x-4">
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
                  >
                    Learn More
                  </Link>
                  <Link
                    to="/faq"
                    className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-indigo-800"
                  >
                    View FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;