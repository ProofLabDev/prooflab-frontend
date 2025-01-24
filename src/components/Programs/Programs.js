import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTelemetry } from '../../hooks/useTelemetry';
import ProgramMetrics from '../ProgramMetrics/ProgramMetrics';

const ProgramCard = ({ program, selectedZKVM }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const implementation = selectedZKVM ? 
    program.implementations.find(impl => impl.zkvm === selectedZKVM) : null;
  
  const { telemetryData, isLoading, error } = useTelemetry(
    implementation ? program.id : null,
    implementation ? implementation.zkvm : null
  );

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{program.name}</h3>
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
              program.complexity === 'low' ? 'bg-green-100 text-green-800' :
              program.complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {program.complexity} complexity
            </span>
            {implementation && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {implementation.language}
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-600 mb-4">{program.description}</p>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Category</h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {program.category}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {program.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {!selectedZKVM && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Available Implementations</h4>
              <div className="flex flex-wrap gap-2">
                {program.implementations.map((impl, index) => (
                  <Link
                    key={index}
                    to={`/programs?zkvm=${impl.zkvm}`}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200"
                  >
                    {impl.zkvm}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {implementation && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Implementation Details</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">ZKVM</dt>
                      <dd className="mt-1 text-sm text-gray-900">{implementation.zkvm}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Language</dt>
                      <dd className="mt-1 text-sm text-gray-900">{implementation.language}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(implementation.lastUpdated).toLocaleDateString()}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                >
                  {isExpanded ? 'Hide Metrics' : 'Show Metrics'}
                </button>
                
                {isExpanded && (
                  <div className="mt-4">
                    <ProgramMetrics
                      programId={program.id}
                      zkvmId={implementation.zkvm}
                      telemetryData={telemetryData}
                      isLoading={isLoading}
                      error={error}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          {implementation ? (
            <a
              href={implementation.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View Source
            </a>
          ) : (
            <div></div>
          )}
          <span className="text-sm text-gray-500">
            {implementation ? `Last updated: ${new Date(implementation.lastUpdated).toLocaleDateString()}` : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ title, options, selected, onChange }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...selected, option]);
                } else {
                  onChange(selected.filter((item) => item !== option));
                }
              }}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const Programs = () => {
  const [searchParams] = useSearchParams();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedComplexities, setSelectedComplexities] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const selectedZKVM = searchParams.get('zkvm');

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/data/programs.json');
        if (!response.ok) {
          throw new Error('Failed to fetch programs data');
        }
        const data = await response.json();
        setPrograms(data.programs || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const categories = [...new Set(programs.map((p) => p.category))];
  const complexities = [...new Set(programs.map((p) => p.complexity))];

  const filteredPrograms = programs
    .filter((program) => {
      const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(program.category);
      const matchesComplexities = selectedComplexities.length === 0 || selectedComplexities.includes(program.complexity);
      const matchesZKVM = !selectedZKVM || program.implementations.some(impl => impl.zkvm === selectedZKVM);
      return matchesSearch && matchesCategories && matchesComplexities && matchesZKVM;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      // Add more sorting options if needed
      return 0;
    });

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="search" className="sr-only">Search programs</label>
        <input
          type="search"
          id="search"
          placeholder="Search programs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort by</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="name">Name</option>
        </select>
      </div>

      <FilterSection
        title="Categories"
        options={categories}
        selected={selectedCategories}
        onChange={setSelectedCategories}
      />

      <FilterSection
        title="Complexity"
        options={complexities}
        selected={selectedComplexities}
        onChange={setSelectedComplexities}
      />
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading programs</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Zero Knowledge Programs
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore a collection of zero-knowledge programs and their implementations across different ZKVMs.
              {selectedZKVM && (
                <span className="block mt-2 text-indigo-600">
                  Showing programs for {selectedZKVM}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
          <svg
            className={`ml-2 h-5 w-5 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex h-full -mt-4">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0 pt-4">
              <div className="sticky top-4">
                <FilterPanel />
              </div>
            </div>

            {/* Sidebar - Mobile */}
            <div
              className={`lg:hidden fixed inset-0 z-20 bg-gray-500 bg-opacity-75 transition-opacity ${
                isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setIsFilterOpen(false)}
            >
              <div
                className={`fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl transform transition-transform ${
                  isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-full overflow-y-auto p-4">
                  <FilterPanel />
                </div>
              </div>
            </div>

            {/* Scrollable Program List */}
            <div className="flex-1 min-w-0 lg:pl-8 overflow-y-auto pt-4">
              <div className="grid grid-cols-1 gap-6 pb-8">
                {filteredPrograms.map((program) => (
                  <ProgramCard 
                    key={program.id} 
                    program={program}
                    selectedZKVM={selectedZKVM}
                  />
                ))}
              </div>

              {filteredPrograms.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No programs found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs; 