import React, { useState } from 'react';

const ProgramCard = ({ program }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
    <div className="h-[150px] bg-gray-100"></div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
      <div className="mt-2 space-y-2">
        {program.metrics.map((metric, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">{metric.label}</span>
            <span className="font-medium text-gray-900">{metric.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">
          View Details
        </button>
      </div>
    </div>
  </div>
);

const FilterSection = ({ title, options, selected, onChange }) => (
  <div className="mb-6">
    <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={() => onChange(option.value)}
            className="h-4 w-4 text-indigo-600 rounded border-gray-300"
          />
          <span className="ml-2 text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const Programs = () => {
  const [filters, setFilters] = useState({
    categories: [],
    languages: [],
    performance: []
  });

  const filterOptions = {
    categories: [
      { label: 'Computation', value: 'computation' },
      { label: 'Privacy', value: 'privacy' },
      { label: 'Verification', value: 'verification' }
    ],
    languages: [
      { label: 'Rust', value: 'rust' },
      { label: 'C++', value: 'cpp' },
      { label: 'Python', value: 'python' }
    ],
    performance: [
      { label: 'High Performance', value: 'high' },
      { label: 'Medium Performance', value: 'medium' },
      { label: 'Low Performance', value: 'low' }
    ]
  };

  // Sample programs data
  const programs = [
    {
      name: 'RISC Zero',
      metrics: [
        { label: 'Proving Time', value: '2.3s' },
        { label: 'Memory Usage', value: '1.2GB' },
        { label: 'Verification Time', value: '0.1s' }
      ]
    },
    {
      name: 'Polygon zkEVM',
      metrics: [
        { label: 'Proving Time', value: '1.8s' },
        { label: 'Memory Usage', value: '0.9GB' },
        { label: 'Verification Time', value: '0.08s' }
      ]
    }
  ];

  const handleFilterChange = (section, value) => {
    setFilters(prev => ({
      ...prev,
      [section]: prev[section].includes(value)
        ? prev[section].filter(v => v !== value)
        : [...prev[section], value]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
            
            <FilterSection
              title="Categories"
              options={filterOptions.categories}
              selected={filters.categories}
              onChange={(value) => handleFilterChange('categories', value)}
            />

            <FilterSection
              title="Languages"
              options={filterOptions.languages}
              selected={filters.languages}
              onChange={(value) => handleFilterChange('languages', value)}
            />

            <FilterSection
              title="Performance"
              options={filterOptions.performance}
              selected={filters.performance}
              onChange={(value) => handleFilterChange('performance', value)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">ZK Programs</h1>
            <p className="mt-2 text-gray-600">
              Discover and compare Zero Knowledge programs for your use case
            </p>
          </div>

          {/* Search and Sort Controls */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search programs..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="w-48">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                <option>Most Popular</option>
                <option>Newest First</option>
                <option>Highest Performance</option>
              </select>
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <ProgramCard key={index} program={program} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs; 