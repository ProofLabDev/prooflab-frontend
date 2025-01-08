import React from 'react';

const Sponsor = () => {
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
              <a
                href="https://github.com/sponsors/prooflab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2v-2zm0-2h2V7h-2v7z"/>
                </svg>
                Sponsor on GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sponsor; 