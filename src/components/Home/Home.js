import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ZKVMSpreadsheetModal from './ZKVMSpreadsheetModal';

const FeatureCard = ({ icon, title, description, link, linkText }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link to={link} className="text-indigo-600 hover:text-indigo-700 font-medium">
      {linkText} →
    </Link>
  </div>
);

const LatestUpdate = ({ title, date, excerpt, link }) => (
  <Link to={link} className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border border-gray-200">
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
    <p className="text-gray-600 text-sm">{excerpt}</p>
  </Link>
);

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-indigo-50" />
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Prooflab Research Collective</span>
              <span className="block text-indigo-600 mt-2">Advancing the State of Cryptographic Systems</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              A research collective dedicated to improving the security, performance, and reliability of cryptographic proving systems through rigorous research and open collaboration.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View Current Projects
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Read Our Blog
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="py-16 bg-gray-50 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon="🔬"
                title="Research Projects"
                description="Cutting-edge research initiatives focused on advancing cryptographic systems and zero-knowledge proofs."
                link="/projects"
                linkText="Explore Projects"
              />
              <FeatureCard
                icon="📊"
                title="Research Reports"
                description="Published findings, technical reports, and papers documenting our research outcomes."
                link="/research"
                linkText="View Reports"
              />
              <FeatureCard
                icon="📝"
                title="Blog & Updates"
                description="Latest announcements, insights, and updates from the Prooflab collective."
                link="/blog"
                linkText="Read Blog"
              />
            </div>
          </div>

          {/* Current Focus Section - Updated for zkVM Spreadsheet */}
          <div className="py-16 border-t border-gray-200">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Focus</h2>
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg">
                <div className="mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
                    🚀 New Resource Available
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    zkVM Comparison Spreadsheet
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">
                    We've compiled the most comprehensive comparison of zero-knowledge virtual machines in the ecosystem. 
                    Get detailed insights into 20+ zkVM systems, with over 50 data points per system covering architecture, 
                    proof systems, hardware acceleration, verification costs, and development ecosystem.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">20+</div>
                      <div className="text-sm text-gray-600">zkVM Systems</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">50+</div>
                      <div className="text-sm text-gray-600">Data Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">Live</div>
                      <div className="text-sm text-gray-600">Updates</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600">Free</div>
                      <div className="text-sm text-gray-600">Access</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Get the Spreadsheet →
                    </button>
                    <span className="text-sm text-gray-600">
                      No spam, just valuable zkVM insights
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Project Highlight */}
              <div className="mt-12 max-w-3xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Also in Progress: ZKarnage</h3>
                <p className="text-gray-600 mb-4">
                  Our flagship security research project, supported by the Ethereum Foundation, conducting live stress-testing of zero-knowledge proving systems.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://github.com/yourbuddyconner/zkarnage"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                  <Link
                    to="/projects/zkarnage"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Updates */}
          <div className="pb-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
              <Link to="/blog" className="text-indigo-600 hover:text-indigo-700">
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              <LatestUpdate
                title="Announcing ZKarnage: Mainnet Stress Testing Initiative"
                date="July 21, 2025"
                excerpt="With support from the Ethereum Foundation, we're launching a comprehensive stress-testing program for zero-knowledge provers..."
                link="/blog/announcing-zkarnage"
              />
              <LatestUpdate
                title="Introducing Prooflab Research Collective"
                date="July 15, 2025"
                excerpt="We're excited to announce the transformation of Prooflab into a research collective focused on advancing cryptographic systems..."
                link="/blog/prooflab-research-collective"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ZKVMSpreadsheetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Home; 