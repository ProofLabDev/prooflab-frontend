import React from 'react';
import useDataLoader from '../../hooks/useDataLoader';
import { calculateEC2Cost, formatCost } from '../../utils/dataTransforms';

const Sponsor = () => {
  const { data, loading, error } = useDataLoader();

  // Calculate total cost of all benchmarks using total duration
  const totalCost = data?.reduce((total, entry) => {
    return total + calculateEC2Cost(entry.timing.total_duration, entry.system_info?.ec2_instance_type);
  }, 500) || 500;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Support ProofLab</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Help us build better tools for the Zero Knowledge ecosystem
        </p>
      </div>

      <div className="space-y-12">
        <section className="prose max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Sponsor?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              ProofLab is an open-source project dedicated to advancing ZK technology. 
              We're building essential infrastructure to make ZK development more accessible, 
              measurable, and efficient.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Current Investment</h3>
              <p className="text-gray-700 mb-4">
                We've already invested <span className="font-semibold text-indigo-600">{formatCost(totalCost)}</span> in 
                running comprehensive benchmarks across different zkVMs and hardware configurations. 
                This helps developers make informed decisions, but maintaining this infrastructure 
                requires ongoing support.
              </p>
              <p className="text-sm text-gray-500">
                *Cost estimate based on AWS EC2 instance running time
              </p>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Support Enables:</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Running comprehensive benchmarks on high-performance hardware</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Maintaining and improving our open-source tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Developing new features for the ZK developer community</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Creating educational content and documentation</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Become a Sponsor</h2>
              <p className="text-gray-600 mb-8">
                Join us in building the future of Zero Knowledge infrastructure. 
                All sponsors will be featured on our website and GitHub repository.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://github.com/sponsors/ProofLabDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2v-2zm0-2h2V7h-2v7z"/>
                  </svg>
                  Sponsor on GitHub
                </a>
                <a
                  href="https://twitter.com/yourbuddyconner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Contact on Twitter
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sponsor; 