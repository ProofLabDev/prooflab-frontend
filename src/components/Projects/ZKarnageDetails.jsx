import React from 'react';
import { Link } from 'react-router-dom';

const ZKarnageDetails = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <nav className="mb-8">
        <Link to="/projects" className="text-indigo-600 hover:text-indigo-700">
          ← Back to Projects
        </Link>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">ZKarnage</h1>
        
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8">
          <p className="text-lg font-medium text-indigo-900">
            A live, on-chain stress-testing initiative for zero-knowledge proving systems on Ethereum mainnet
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-gray-700 mb-4">
            ZKarnage is a systematic effort to stress-test zero-knowledge proof systems by deploying "prover-killer" 
            transactions on Ethereum mainnet. Supported by a grant from the Ethereum Foundation, this project aims 
            to expose vulnerabilities, performance bottlenecks, and economic inefficiencies in ZK proving systems 
            before they become critical issues in production environments.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Attack Strategy</h2>
          <p className="text-gray-700 mb-4">
            Our approach involves deploying various types of computationally intensive transactions designed to 
            stress different aspects of ZK proving systems:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">JUMPDEST Attacks</h3>
              <p className="text-gray-600">
                Exploiting EVM opcodes that require complex analysis in ZK circuits
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">MODEXP Operations</h3>
              <p className="text-gray-600">
                Heavy modular exponentiation operations that stress mathematical components
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Precompile-Heavy Transactions</h3>
              <p className="text-gray-600">
                Intensive use of Ethereum precompiled contracts to test edge cases
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Memory-Intensive Operations</h3>
              <p className="text-gray-600">
                Transactions that consume significant memory resources during proving
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Execution Plan</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">Every 1,000</div>
                <div className="text-gray-600">Blocks (~3.5 hours)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">100+</div>
                <div className="text-gray-600">Target Submissions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">~17.5</div>
                <div className="text-gray-600">Days of Execution</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Collection & Analysis</h2>
          <p className="text-gray-700 mb-4">
            We're collecting comprehensive data to understand the impact of our stress tests:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Detailed attack transaction logs and execution traces</li>
            <li>Prover performance metrics from EthProofs and other monitoring systems</li>
            <li>Economic analysis of proving costs under stress conditions</li>
            <li>Network behavior and response patterns</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Deliverables</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900">Live Dashboard</h3>
                <p className="text-gray-600">Real-time monitoring of attack execution and prover responses</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900">Weekly Progress Reports</h3>
                <p className="text-gray-600">Regular updates on findings and system behaviors</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900">Comprehensive Final Report</h3>
                <p className="text-gray-600">Detailed analysis of vulnerabilities and recommendations for improvements</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Timeline</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <span className="font-bold text-gray-900">Total Duration:</span>
                <span className="ml-2 text-gray-700">8 weeks from start to final deliverable</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">Active Execution:</span>
                <span className="ml-2 text-gray-700">~17.5 days of continuous mainnet testing</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">Launch Date:</span>
                <span className="ml-2 text-gray-700">July 21, 2025</span>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Get Involved</h3>
          <p className="text-gray-700 mb-4">
            Follow the project's progress and contribute to our research:
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://github.com/yourbuddyconner/zkarnage"
              className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
            <Link 
              to="/blog/announcing-zkarnage"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Read Announcement
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ZKarnageDetails; 