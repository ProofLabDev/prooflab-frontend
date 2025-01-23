import React from 'react';

const ResourceCard = ({ resource }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${resource.iconBg}`}>
            {/* Icon would go here */}
            <div className={`w-6 h-6 ${resource.iconColor}`}></div>
          </div>
          <h3 className="ml-4 text-lg font-semibold text-gray-900">{resource.title}</h3>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${resource.levelClass}`}>
          {resource.level}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{resource.description}</p>
      <div className="mt-4">
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          Learn More →
        </button>
      </div>
    </div>
  </div>
);

const Learn = () => {
  const sections = [
    {
      title: 'Getting Started',
      resources: [
        {
          title: 'Introduction to Zero Knowledge',
          description: 'Learn the fundamentals of Zero Knowledge proofs and their applications',
          level: 'Beginner',
          levelClass: 'bg-green-100 text-green-800',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600'
        },
        {
          title: 'ZK Development Setup',
          description: 'Set up your development environment for ZK programming',
          level: 'Beginner',
          levelClass: 'bg-green-100 text-green-800',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600'
        }
      ]
    },
    {
      title: 'Core Concepts',
      resources: [
        {
          title: 'ZK Circuit Design',
          description: 'Understanding how to design efficient ZK circuits',
          level: 'Intermediate',
          levelClass: 'bg-blue-100 text-blue-800',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        },
        {
          title: 'Performance Optimization',
          description: 'Learn techniques to optimize your ZK proofs',
          level: 'Advanced',
          levelClass: 'bg-purple-100 text-purple-800',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600'
        }
      ]
    },
    {
      title: 'Best Practices',
      resources: [
        {
          title: 'Security Considerations',
          description: 'Best practices for secure ZK implementation',
          level: 'Intermediate',
          levelClass: 'bg-blue-100 text-blue-800',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        },
        {
          title: 'Testing Strategies',
          description: 'Comprehensive testing approaches for ZK applications',
          level: 'Intermediate',
          levelClass: 'bg-blue-100 text-blue-800',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Learn Zero Knowledge Development</h1>
        <p className="mt-2 text-lg text-gray-600">
          Comprehensive guides and resources to master Zero Knowledge programming
        </p>
      </div>

      {/* Quick Start Section */}
      <div className="mb-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white p-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
          <p className="mb-6">
            New to Zero Knowledge development? Start here to learn the basics and build your first ZK application.
          </p>
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-md font-medium hover:bg-indigo-50">
            Start Learning
          </button>
        </div>
      </div>

      {/* Learning Path Sections */}
      <div className="space-y-12">
        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.resources.map((resource, resourceIndex) => (
                <ResourceCard key={resourceIndex} resource={resource} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Documentation Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Technical Documentation</h2>
            <p className="mt-2 text-gray-600">
              Detailed API references, integration guides, and technical specifications
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learn; 