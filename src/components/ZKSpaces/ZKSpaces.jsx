import React, { useState } from 'react';

const SpaceCard = ({ space }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
      {/* Space preview/screenshot would go here */}
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{space.name}</h3>
          <p className="mt-1 text-sm text-gray-600">{space.description}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {space.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Using:</span>
          <span className="font-medium text-gray-900">{space.zkProgram}</span>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">
          View Demo
        </button>
      </div>
    </div>
  </div>
);

const ZKSpaces = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample spaces data
  const spaces = [
    {
      name: 'Private Voting System',
      description: 'A decentralized voting system with zero-knowledge proofs for privacy',
      tags: ['Voting', 'Privacy', 'Governance'],
      zkProgram: 'RISC Zero'
    },
    {
      name: 'Anonymous Credentials',
      description: 'Identity verification without revealing personal information',
      tags: ['Identity', 'Privacy', 'Authentication'],
      zkProgram: 'Polygon zkEVM'
    }
  ];

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Privacy', value: 'privacy' },
    { label: 'Computation', value: 'computation' },
    { label: 'Gaming', value: 'gaming' },
    { label: 'DeFi', value: 'defi' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">ZK Spaces</h1>
        <p className="mt-2 text-gray-600">
          Explore interactive Zero Knowledge applications and implementations
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search spaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {filterOptions.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeFilter === filter.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space, index) => (
          <SpaceCard key={index} space={space} />
        ))}
      </div>

      {/* Create New Space CTA */}
      <div className="mt-12 bg-indigo-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Build Your Own ZK Space</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Ready to create your own Zero Knowledge application? Get started with our
          comprehensive development tools and guides.
        </p>
        <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium">
          Create New Space
        </button>
      </div>
    </div>
  );
};

export default ZKSpaces; 