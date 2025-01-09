import React from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is ProofLab?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            ProofLab is building the future of zero-knowledge infrastructure. Our mission is to accelerate 
            the adoption of zero-knowledge technology by providing comprehensive solutions and tools for 
            developers.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our flagship product is a state-of-the-art benchmarking platform for Zero Knowledge Virtual 
            Machines (zkVMs), providing standardized performance metrics and comparisons. But that's just 
            the beginning - we're building a complete ecosystem of tools and services to support the ZK 
            developer community. Learn more about our vision and roadmap in our{' '}
            <Link to="/about" className="text-blue-600 hover:text-blue-800 underline">
              About page
            </Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is a zkVM?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            A Zero Knowledge Virtual Machine (zkVM) is a specialized virtual machine that can execute 
            programs while generating cryptographic proofs of correct execution. These proofs can be 
            verified by others without revealing the program's inputs or intermediate states.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            zkVMs are particularly powerful because they allow developers to write programs in familiar 
            languages like Rust or C++ and automatically generate zero-knowledge proofs of their execution.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What do the benchmarks measure?</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Proof Generation Time</h3>
              <p className="text-gray-600">
                The total time taken to generate a proof, including both core proving and compression phases.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Throughput</h3>
              <p className="text-gray-600">
                The number of cycles executed per second during proof generation, measured in Hz.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Resource Usage</h3>
              <p className="text-gray-600">
                Memory and CPU utilization during the proving process.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Proof Size</h3>
              <p className="text-gray-600">
                The size of the generated proof in bytes, which impacts verification costs and storage requirements.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How are the benchmarks run?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our benchmarks are run in controlled environments with standardized hardware configurations. 
            Each benchmark:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
            <li>Uses the same input program across different zkVMs</li>
            <li>Measures complete end-to-end performance including compilation and proving</li>
            <li>Is run multiple times to ensure consistent results</li>
            <li>Includes detailed resource profiling</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Which zkVM should I choose?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The choice of zkVM depends on your specific requirements. Consider factors such as:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium mb-2 text-gray-900">Performance Priority</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Proof generation speed</li>
                <li>• Verification time</li>
                <li>• Resource requirements</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium mb-2 text-gray-900">Development Experience</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Programming language preference</li>
                <li>• Tooling and documentation</li>
                <li>• Community support</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium mb-2 text-gray-900">Security Considerations</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Cryptographic assumptions</li>
                <li>• Audit status</li>
                <li>• Production readiness</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium mb-2 text-gray-900">Integration Needs</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• EVM compatibility</li>
                <li>• External library support</li>
                <li>• Hardware acceleration</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Can I contribute?</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Yes! ProofLab is an open platform, and we welcome contributions from the ZK community. 
            Whether it's adding new benchmarks, improving existing ones, or suggesting new features, 
            you can contribute by submitting a PR to our GitHub repository.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What makes ProofLab's benchmarks unique?</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Our zkRust-Based Approach</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                ProofLab leverages an extended fork of <a href="https://github.com/yetanotherco/zkRust" className="text-blue-600 hover:text-blue-800 underline">zkRust</a>, 
                a powerful abstraction layer that allows developers to write Rust code once and run it across multiple zkVMs. 
                You can find our extended fork <a href="https://github.com/ProofLabDev/zkRust" className="text-blue-600 hover:text-blue-800 underline">here</a>. 
                This approach ensures our benchmarks are:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Truly comparable:</strong> The exact same code is executed across different zkVMs, 
                  eliminating implementation differences that could skew results.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Real-world representative:</strong> Our benchmarks use actual zkVM code that 
                  developers would write in production, not synthetic tests.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Easily extensible:</strong> Adding support for new zkVMs or benchmark programs 
                  is straightforward thanks to zkRust's abstraction layer.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">How It Works</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                zkRust provides a unified interface for zkVM development:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Write your program once in standard Rust</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Use familiar Rust libraries and tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Deploy to any supported zkVM (currently SP1 and RISC0)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Get consistent performance metrics across platforms</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Benefits for Developers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This approach provides several advantages:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Write Once, Prove Anywhere:</strong> Develop your application without being locked 
                  into a specific zkVM implementation.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Easy Comparison:</strong> Test your specific use case across different zkVMs 
                  without rewriting code.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Future-Proof:</strong> As new zkVMs emerge, you can easily benchmark and 
                  migrate to them.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prior Art</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              ProofLab builds upon and is inspired by existing work in the ZK benchmarking space. We'd like to acknowledge:
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <a href="https://zkbench.dev" className="text-blue-600 hover:text-blue-800 underline font-medium">zkbench.dev</a>
                  <p className="mt-1">
                    A pioneering open-source project that established early methodologies for 
                    comparing ZK framework performance and helped shape the benchmarking landscape.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <a href="https://github.com/yetanotherco/zkRust" className="text-blue-600 hover:text-blue-800 underline font-medium">zkRust</a>
                  <p className="mt-1">
                    The foundational project that enables our cross-zkVM benchmarking approach, providing 
                    the abstraction layer that makes our comparable benchmarks possible.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ; 