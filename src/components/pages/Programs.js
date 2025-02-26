import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProgramBenchmarkCounts from '../../hooks/useProgramBenchmarkCounts';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [tooltipProgram, setTooltipProgram] = useState(null);
  
  // Get benchmark counts for all programs
  const { benchmarkCounts, loading: benchmarksLoading } = useProgramBenchmarkCounts();

  useEffect(() => {
    fetch('/data/programs.json')
      .then(response => response.json())
      .then(data => {
        setPrograms(data.programs);
        setFilteredPrograms(data.programs);
      })
      .catch(error => console.error('Error fetching programs:', error));
  }, []);

  useEffect(() => {
    let result = [...programs];

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(program => program.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(program =>
        program.name.toLowerCase().includes(query) ||
        program.description.toLowerCase().includes(query) ||
        program.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'complexity':
          const complexityOrder = { low: 1, medium: 2, high: 3 };
          return complexityOrder[a.complexity] - complexityOrder[b.complexity];
        case 'implementations':
          return b.implementations.length - a.implementations.length;
        default:
          return 0;
      }
    });

    setFilteredPrograms(result);
  }, [programs, selectedCategory, searchQuery, sortBy]);

  const categories = ['all', ...new Set(programs.map(program => program.category))];

  return (
    <div className="py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Programs</h1>
        <p className="mt-2 text-sm text-gray-700">
          Browse and compare different programs implemented across zkVMs.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
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
                <option value="complexity">Complexity</option>
                <option value="implementations">Number of Implementations</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map(program => (
            <Link
              key={program.id}
              to={`/programs/${program.id}`}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{program.name}</h3>
                  <div className="relative inline-block"
                    onMouseEnter={() => setTooltipProgram(program.id)}
                    onMouseLeave={() => setTooltipProgram(null)}
                  >
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-help ${
                      program.complexity === 'low' ? 'bg-green-100 text-green-800' :
                      program.complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {program.complexity}
                    </span>
                    
                    {tooltipProgram === program.id && (
                      <div className="absolute z-50 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 mt-2 right-0 text-left"
                        onClick={(e) => e.preventDefault()}
                      >
                        <p className="text-sm text-gray-600">
                          <span className="font-medium block mb-1">Program Complexity</span>
                          {program.complexity === 'low' && 
                            'Low complexity programs are simpler calculations with fewer operations, typically requiring fewer resources to prove.'}
                          {program.complexity === 'medium' && 
                            'Medium complexity programs have moderate resource requirements and represent typical real-world ZK applications.'}
                          {program.complexity === 'high' && 
                            'High complexity programs involve intensive computations and may require significant resources to generate proofs.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">{program.description}</p>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {program.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      Benchmark Runs: {benchmarksLoading 
                        ? "Loading..." 
                        : (benchmarkCounts[program.id] || 0)}
                    </span>
                    <span>Category: {program.category}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs; 