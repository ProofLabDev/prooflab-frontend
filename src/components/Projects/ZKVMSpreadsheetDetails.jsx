import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ZKVMSpreadsheetModal from '../Home/ZKVMSpreadsheetModal';

const ZKVMSpreadsheetDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const zkVMExamples = [
    { name: 'SP1', category: 'RISC-V Based' },
    { name: 'Risc0', category: 'RISC-V Based' },
    { name: 'Jolt', category: 'RISC-V Based' },
    { name: 'Valida VM', category: 'Custom ISA' },
    { name: 'cairo-vm', category: 'Cairo Based' },
    { name: 'Miden VM', category: 'Stack Machine' },
    { name: 'Triton VM', category: 'Stack Machine' },
    { name: 'zkWASM', category: 'WebAssembly' },
    { name: 'Nexus ZKVM', category: 'Multi-Architecture' },
    { name: 'Linea zkEVM', category: 'EVM Compatible' },
    { name: 'OpenVM', category: 'Modular Framework' },
    { name: 'Eigen-zkVM', category: 'General Purpose' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="mb-8">
        <Link to="/projects" className="text-indigo-600 hover:text-indigo-700">
          ← Back to Projects
        </Link>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">zkVM Comparison Framework</h1>
        
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8">
          <p className="text-lg font-medium text-indigo-900">
            The most comprehensive technical comparison of zero-knowledge virtual machines in the ecosystem
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">
            The zkVM ecosystem is rapidly evolving with 20+ different systems, each making different 
            trade-offs in architecture, performance, and security. Our comparison framework provides 
            structured data across 50+ technical dimensions to help teams make informed decisions.
          </p>
          <p className="text-gray-700 mb-4">
            This spreadsheet distills months of research into a practical resource for developers and 
            organizations evaluating zkVM options. We track everything from instruction set architectures 
            and proof systems to verification costs and production readiness.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Systems Covered</h2>
          <p className="text-gray-700 mb-4">
            The framework includes 23 zkVM implementations spanning the entire ecosystem:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {zkVMExamples.map((vm, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900">{vm.name}</h4>
                <p className="text-sm text-gray-600">{vm.category}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 italic">
            Plus: Airbender, Ceno, Ix, Mozak VM, o1vm, olavm, PetraVM, Pico, Ziren, ZisK, and zkEngine
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Architecture & Design</h3>
              <p className="text-gray-600">
                ISA choices (RISC-V, EVM, Cairo, Custom), precompiles, continuations support, and execution models
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Proof Systems</h3>
              <p className="text-gray-600">
                STARK vs SNARK vs Folding, field selections, commitment schemes, and trusted setup requirements
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Performance & Costs</h3>
              <p className="text-gray-600">
                EVM verification gas costs, hardware requirements, GPU acceleration support, and memory usage
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">Production Readiness</h3>
              <p className="text-gray-600">
                Security audit status, API stability, compiler support, and documentation quality
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why This Matters</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">→</span>
                <span><strong>Save weeks of research:</strong> We've already analyzed the codebases, documentation, and architectures</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">→</span>
                <span><strong>Make informed decisions:</strong> Compare actual metrics like gas costs and memory requirements, not marketing claims</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">→</span>
                <span><strong>Avoid costly mistakes:</strong> Understand production readiness, security audits, and API stability before committing</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">→</span>
                <span><strong>Stay current:</strong> Regular updates as the ecosystem evolves and new systems emerge</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get the Spreadsheet</h2>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8 text-center">
            <p className="text-gray-700 mb-6">
              Access the complete comparison framework with 20+ zkVM systems and 50+ data points per system.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Spreadsheet
            </button>
          </div>
        </section>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Want More Detail?</h3>
          <p className="text-gray-700 mb-4">
            For teams requiring deeper analysis, we offer comprehensive evaluation reports with full 
            technical documentation, code citations, and custom assessments tailored to your use case.
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://twitter.com/TheProofLab"
              className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Contact Us
            </a>
          </div>
        </div>
      </article>

      {/* Modal */}
      <ZKVMSpreadsheetModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default ZKVMSpreadsheetDetails; 