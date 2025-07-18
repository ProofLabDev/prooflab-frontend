import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useZKVMThroughput from '../../hooks/useZKVMThroughput';

const ZKVMCard = ({ zkvm }) => {
  const { throughput, loading, isIntegrating } = useZKVMThroughput(zkvm.id);

  return (
    <Link
      to={`/zkvms/${zkvm.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{zkvm.name}</h3>
          <div className="flex space-x-2">
            {isIntegrating && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Coming Soon
              </span>
            )}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              zkvm.performance === 'high' ? 'bg-green-100 text-green-800' :
              zkvm.performance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {zkvm.performance} performance
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">{zkvm.description}</p>
        
        {/* Features */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {zkvm.features.slice(0, 3).map(feature => (
              <span
                key={feature}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Throughput Metrics */}
        <div className="mt-4 border-t border-gray-200 pt-4">
          {isIntegrating ? (
            <div className="py-2">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium text-blue-800">Benchmarks in progress</p>
              </div>
              <p className="mt-1 text-xs text-gray-500 pl-7">
                We're currently integrating this system into our benchmarking reports
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm">
                  <p className="text-gray-500">CPU Throughput</p>
                  <div className="flex items-center">
                    {loading ? (
                      <div className="h-5 w-16 bg-gray-200 animate-pulse rounded"></div>
                    ) : (
                      <p className="font-medium text-gray-900">{throughput.cpu.formatted}</p>
                    )}
                    <span className="ml-1 text-xs text-gray-500">(r7i.16xl)</span>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">GPU Throughput</p>
                  <div className="flex items-center">
                    {loading ? (
                      <div className="h-5 w-16 bg-gray-200 animate-pulse rounded"></div>
                    ) : (
                      <p className="font-medium text-gray-900">{throughput.gpu.formatted}</p>
                    )}
                    <span className="ml-1 text-xs text-gray-500">(g6.16xl)</span>
                  </div>
                </div>
              </div>
              {throughput.version && (
                <div className="mt-2 text-xs text-gray-500">
                  Latest version: v{throughput.version}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

const ZKVMs = () => {
  const [zkvms, setZkvms] = useState([]);
  const [filteredZkvms, setFilteredZkvms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetch('/data/zkvms.json')
      .then(response => response.json())
      .then(data => {
        setZkvms(data.zkvms);
        setFilteredZkvms(data.zkvms);
      })
      .catch(error => console.error('Error fetching zkVMs:', error));
  }, []);

  useEffect(() => {
    let result = [...zkvms];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(zkvm =>
        zkvm.name.toLowerCase().includes(query) ||
        zkvm.description.toLowerCase().includes(query) ||
        zkvm.features.some(feature => feature.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'performance':
          return a.performance === b.performance ? 0 :
            a.performance === 'high' ? -1 :
            b.performance === 'high' ? 1 :
            a.performance === 'medium' ? -1 : 1;
        default:
          return 0;
      }
    });

    setFilteredZkvms(result);
  }, [zkvms, searchQuery, sortBy]);

  return (
    <div className="py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Report Library</h1>
        <p className="mt-2 text-sm text-gray-700">
          Compare and explore comprehensive reports on different ZK systems and their capabilities.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                name="search"
                id="search"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search Reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
                Sort by
              </label>
              <select
                id="sort"
                name="sort"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="performance">Performance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* zkVMs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredZkvms.map(zkvm => (
            <ZKVMCard key={zkvm.id} zkvm={zkvm} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZKVMs; 