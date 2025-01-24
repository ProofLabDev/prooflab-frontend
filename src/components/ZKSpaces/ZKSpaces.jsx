import React, { useState, useEffect } from 'react';

const SpaceCard = ({ space }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold text-gray-900">{space.name}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800`}>
              {space.implementation.zkvm}
            </span>
          </div>
          <p className="mt-2 text-gray-600">{space.description}</p>
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

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <img
              src={space.creator.avatar}
              alt={space.creator.name}
              className="w-6 h-6 rounded-full"
              onError={(e) => {
                e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
              }}
            />
            <span className="text-gray-600">{space.creator.name}</span>
          </div>
          <span className="text-gray-500">
            Updated: {new Date(space.lastUpdated).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{space.metrics.users.toLocaleString()} users</span>
            <span>{space.metrics.transactions.toLocaleString()} txns</span>
            <span>{space.metrics.avgProofTime} avg proof</span>
          </div>
          <div className="flex space-x-2">
            <a
              href={space.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
            >
              View Demo
            </a>
            <a
              href={space.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center space-x-2 mt-8">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-4 py-2 text-sm font-medium rounded-md ${
        currentPage === 1
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      Previous
    </button>
    <div className="flex items-center space-x-1">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            currentPage === i + 1
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 text-sm font-medium rounded-md ${
        currentPage === totalPages
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      Next
    </button>
  </div>
);

const ZKSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const spacesPerPage = 6;

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch('/data/spaces.json');
        if (!response.ok) {
          throw new Error('Failed to fetch spaces');
        }
        const data = await response.json();
        setSpaces(data.spaces);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching spaces:', error);
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  // Reset to first page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Privacy', value: 'privacy' },
    { label: 'DeFi', value: 'defi' },
    { label: 'Gaming', value: 'gaming' },
    { label: 'Identity', value: 'identity' },
    { label: 'AI', value: 'ai' }
  ];

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = 
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = 
      activeFilter === 'all' ||
      space.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));

    return matchesSearch && matchesFilter;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredSpaces.length / spacesPerPage);
  const startIndex = (currentPage - 1) * spacesPerPage;
  const paginatedSpaces = filteredSpaces.slice(startIndex, startIndex + spacesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the spaces section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

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

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {Math.min(startIndex + 1, filteredSpaces.length)}-{Math.min(startIndex + spacesPerPage, filteredSpaces.length)} of {filteredSpaces.length} spaces
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedSpaces.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>

      {filteredSpaces.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No spaces found</h3>
          <p className="mt-2 text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

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