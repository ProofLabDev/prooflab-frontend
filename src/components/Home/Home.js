import React from 'react';
import { Link } from 'react-router-dom';

const TrendingCard = ({ title, subtitle, stats, link, lastUpdated }) => (
  <Link to={link} className="block bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="flex items-center space-x-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center text-sm">
            <span className="text-gray-400">•</span>
            <span className="ml-2 text-gray-300">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
    <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
    <div className="mt-2 text-xs text-gray-500">
      Updated {lastUpdated}
    </div>
  </Link>
);

const TaskCategory = ({ title, tasks }) => (
  <div className="mb-8">
    <h3 className="text-gray-400 text-sm font-medium mb-3">{title}</h3>
    <div className="grid grid-cols-2 gap-3">
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center space-x-2 text-gray-300 text-sm p-2 rounded hover:bg-gray-800 cursor-pointer">
          <span className={`text-lg ${task.iconColor}`}>{task.icon}</span>
          <span>{task.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const Home = () => {
  const trendingZKVMs = [
    {
      title: "RISC Zero",
      subtitle: "High-performance RISC-V based ZK virtual machine",
      stats: [
        { value: "44.6k" },
        { value: "2.03k" }
      ],
      lastUpdated: "about 14 hours ago",
      link: "/zkvms"
    },
    {
      title: "SP1",
      subtitle: "STARK-based virtual machine for zero-knowledge proofs",
      stats: [
        { value: "32.6k" },
        { value: "2.29k" }
      ],
      lastUpdated: "2 days ago",
      link: "/zkvms"
    }
  ];

  const trendingPrograms = [
    {
      title: "ECDSA Verification",
      subtitle: "Zero-knowledge ECDSA signature verification",
      stats: [
        { value: "63.7k" },
        { value: "396" }
      ],
      lastUpdated: "about 14 hours ago",
      link: "/programs"
    },
    {
      title: "SHA-256",
      subtitle: "Zero-knowledge SHA-256 hash computation",
      stats: [
        { value: "50.8k" },
        { value: "791" }
      ],
      lastUpdated: "about 15 hours ago",
      link: "/programs"
    }
  ];

  const tasks = {
    cryptography: [
      { name: "ECDSA", icon: "🔐", iconColor: "text-yellow-500" },
      { name: "SHA-256", icon: "🔒", iconColor: "text-green-500" },
      { name: "RSA", icon: "🔑", iconColor: "text-blue-500" },
      { name: "Merkle Trees", icon: "🌳", iconColor: "text-green-500" }
    ],
    computation: [
      { name: "Fibonacci", icon: "🔢", iconColor: "text-purple-500" },
      { name: "Matrix Multiplication", icon: "📊", iconColor: "text-blue-500" },
      { name: "Sorting", icon: "📈", iconColor: "text-green-500" },
      { name: "Graph Algorithms", icon: "🕸️", iconColor: "text-yellow-500" }
    ],
    dataProcessing: [
      { name: "JSON Parser", icon: "📝", iconColor: "text-yellow-500" },
      { name: "Regex Matcher", icon: "🔍", iconColor: "text-blue-500" },
      { name: "Data Validation", icon: "✅", iconColor: "text-green-500" },
      { name: "Compression", icon: "📦", iconColor: "text-purple-500" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              The Zero Knowledge Community<br />
              <span className="text-indigo-400">building the future.</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-gray-300 sm:text-2xl md:mt-5 md:max-w-3xl">
              The platform where the zero-knowledge community collaborates on ZKVMs, programs, and benchmarks.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Task Categories */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-lg font-semibold">Tasks</span>
                  <span className="bg-gray-700 text-gray-300 text-sm px-2 py-1 rounded">12 categories</span>
                </div>
                <input
                  type="text"
                  placeholder="Filter tasks by name"
                  className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <TaskCategory title="Cryptography" tasks={tasks.cryptography} />
              <TaskCategory title="Computation" tasks={tasks.computation} />
              <TaskCategory title="Data Processing" tasks={tasks.dataProcessing} />
            </div>

            {/* Right Column - Trending */}
            <div className="space-y-8">
              {/* Trending ZKVMs */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Trending ZKVMs</h2>
                  <Link to="/zkvms" className="text-indigo-400 hover:text-indigo-300 text-sm">
                    Browse all ZKVMs →
                  </Link>
                </div>
                <div className="space-y-4">
                  {trendingZKVMs.map((zkvm, index) => (
                    <TrendingCard key={index} {...zkvm} />
                  ))}
                </div>
              </div>

              {/* Trending Programs */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Popular Programs</h2>
                  <Link to="/programs" className="text-indigo-400 hover:text-indigo-300 text-sm">
                    Browse all programs →
                  </Link>
                </div>
                <div className="space-y-4">
                  {trendingPrograms.map((program, index) => (
                    <TrendingCard key={index} {...program} />
                  ))}
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