import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useZKVMThroughput from '../../hooks/useZKVMThroughput';

const ZKVMCard = ({ zkvm }) => {
  const { throughput, loading } = useZKVMThroughput(zkvm.id);

  return (
    <Link
      to={`/zkvms/${zkvm.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{zkvm.name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            zkvm.performance === 'high' ? 'bg-green-100 text-green-800' :
            zkvm.performance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {zkvm.performance} performance
          </span>
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
        </div>
      </div>
    </Link>
  );
};

const Home = () => {
  const [programs, setPrograms] = useState([]);
  const [zkvms, setZkvms] = useState([]);

  useEffect(() => {
    // Fetch programs and zkVMs data
    Promise.all([
      fetch('/data/programs.json'),
      fetch('/data/zkvms.json')
    ])
      .then(([programsRes, zkvmsRes]) => Promise.all([
        programsRes.json(),
        zkvmsRes.json()
      ]))
      .then(([programsData, zkvmsData]) => {
        setPrograms(programsData.programs);
        setZkvms(zkvmsData.zkvms);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Benchmarks for Zero-Knowledge Virtual Machines
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Compare performance metrics across different zkVMs and find the best solution for your needs.
          </p>
          <div className="mt-10">
            <Link
              to="/benchmarks"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Explore Benchmarks
            </Link>
          </div>
        </div>
      </div>

      {/* zkVMs Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Featured zkVMs
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Explore different zero-knowledge virtual machines and their capabilities.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {zkvms.map(zkvm => (
                <ZKVMCard key={zkvm.id} zkvm={zkvm} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Programs Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Popular Programs
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Discover commonly benchmarked programs across different zkVMs.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {programs.slice(0, 6).map(program => (
                <Link
                  key={program.id}
                  to={`/programs/${program.id}`}
                  className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-lg transition-shadow duration-200 flex items-center space-x-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-lg font-medium text-gray-900">{program.name}</p>
                      <p className="text-sm text-gray-500 truncate">{program.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {program.tags?.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 