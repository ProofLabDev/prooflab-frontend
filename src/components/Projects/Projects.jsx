import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'Active' ? 'bg-green-100 text-green-800' : 
          project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {project.status}
        </span>
        <span className="text-sm text-gray-500">{project.timeline}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      {project.funder && (
        <div className="mb-4">
          <span className="text-xs text-gray-500">Funded by:</span>
          <span className="ml-2 text-sm font-medium text-gray-700">{project.funder}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, index) => (
          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-medium">
            {project.leadResearcher.initials}
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-900">{project.leadResearcher.name}</div>
            <a href={`https://twitter.com/${project.leadResearcher.twitter}`} className="text-gray-500 hover:text-indigo-600">
              @{project.leadResearcher.twitter}
            </a>
          </div>
        </div>
        <Link 
          to={`/projects/${project.id}`}
          className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
        >
          Learn more →
        </Link>
      </div>
      {project.links && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-4 text-sm">
          {project.links.dashboard && (
            <a href={project.links.dashboard} className="text-indigo-600 hover:text-indigo-700">
              Live Dashboard
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} className="text-indigo-600 hover:text-indigo-700">
              GitHub
            </a>
          )}
        </div>
      )}
    </div>
  </div>
);

const Projects = () => {
  const projects = [
    {
      id: 'zkarnage',
      title: 'ZKarnage',
      description: 'A live, on-chain stress-testing initiative for zero-knowledge proving systems on the Ethereum mainnet. Systematically executing "prover-killer" transactions to expose vulnerabilities, performance bottlenecks, and economic inefficiencies.',
      status: 'Active',
      timeline: 'July 2025 - Ongoing',
      funder: 'Ethereum Foundation',
      tags: ['Zero-Knowledge', 'Security', 'Stress Testing', 'Ethereum'],
      leadResearcher: {
        name: 'Conner Swann',
        initials: 'CS',
        twitter: 'yourbuddyconner'
      },
      links: {
        dashboard: 'https://prooflab.dev',
        github: 'https://github.com/yourbuddyconner/zkarnage'
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Current Research Projects</h1>
        <p className="text-lg text-gray-600">
          Explore our ongoing research initiatives advancing the security and reliability of cryptographic systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects; 