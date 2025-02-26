import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="w-full">
      {/* Hero Section with Grid Pattern */}
      <div className="relative overflow-hidden bg-white w-full">
        <div className="absolute inset-0 w-full">
          <div className="absolute inset-0 w-full bg-indigo-100 mix-blend-multiply opacity-30" />
          <div className="absolute inset-0 w-full opacity-30 pattern-grid-lg text-indigo-200" />
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white" />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16">
            <div className="mb-6 relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-30"></div>
              <img 
                src="/prooflab-logo.png" 
                alt="ProofLab" 
                className="h-24 w-auto relative"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              The Observatory for Zero Knowledge Technology
            </h1>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link 
                to="/zkvms" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
              >
                Explore Reports
              </Link>
              <Link 
                to="/compare" 
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
              >
                Compare Systems
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        {/* Mission */}
        <section className="mb-24">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
              <div className="max-w-none space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <span className="text-xl font-semibold text-indigo-600">ProofLab is the observatory for zero-knowledge technology.</span> We collect, analyze, and visualize comprehensive data on ZK systems to help developers, researchers, and organizations make informed decisions.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  The zero-knowledge ecosystem is evolving rapidly, with new proving systems, optimization techniques, and applications emerging constantly. This rapid evolution makes it challenging for stakeholders to keep track of the latest advancements and understand the tradeoffs between different systems.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Just as astronomers use observatories to study celestial objects, the ZK community needs an observatory to make sense of the growing ZK universe. ProofLab fills this void by providing a central hub for ZK benchmarking, comparison, and analysis.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 md:p-12 border-t border-gray-100 text-center">
              <div className="max-w-3xl mx-auto relative">
                <h3 className="text-indigo-700 font-semibold mb-6 uppercase tracking-wider text-sm">Our Vision</h3>
                <svg className="absolute -top-8 left-0 h-24 w-24 text-indigo-200 opacity-50 z-0" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <blockquote className="italic text-2xl text-gray-700 leading-relaxed px-8 relative z-10">
                  <p>
                    To accelerate the adoption of zero-knowledge technology by establishing clear benchmarks, standards, and developer tools that democratize access to this powerful technology.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        
        {/* Platform Features */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">The ProofLab Platform</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive toolkit for understanding and leveraging ZK technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Universal Benchmarks</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Compare zkVM performance with actual production code across a standardized suite of programs. Analyze proving time, resource usage, and more in controlled environments.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-world programs, not synthetic tests
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Same codebase across all zkVMs
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Detailed performance breakdowns
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">zkRust SDK</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our extended fork of zkRust allows developers to write code once and run it on any supported zkVM. No vendor lock-in, no rewriting code.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Write Once, Prove Anywhere
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Familiar Rust development experience
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Easy migration between zkVMs
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">System Comparison</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our advanced comparison tools help you evaluate zkVM systems across multiple dimensions, from performance to security to developer experience.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Performance metrics radar charts
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Security and development tradeoffs
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Feature-by-feature analysis
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Community Hub</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                ProofLab is a community-driven platform built by and for ZK developers. Share insights, contribute benchmarks, and help shape the future of ZK development.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Open benchmark methodologies
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Contribute your own test cases
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Connect with ZK experts
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* The Vision - Improved Readability */}
        <section className="mb-24">
          <div className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-2xl shadow-xl overflow-hidden text-white">
            <div className="absolute inset-0 opacity-20 pattern-grid-lg text-white pointer-events-none"></div>
            <div className="p-8 md:p-12 relative">
              <h2 className="text-3xl font-bold mb-6 text-white">The Vision for ProofLab</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-white text-lg">
                  Our long-term vision extends beyond benchmarking. We're building a comprehensive platform that connects every part of the ZK developer journey:
                </p>
                
                <div className="mt-8 space-y-4">
                  <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                    <h3 className="text-xl font-semibold mb-2 text-white">Phase 1: The Observatory</h3>
                    <p className="text-white text-base">
                      Establishing the gold standard for benchmarking and comparison in the ZK space, with comprehensive data collection, visualization, and analysis.
                    </p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                    <h3 className="text-xl font-semibold mb-2 text-white">Phase 2: The Laboratory</h3>
                    <p className="text-white text-base">
                      Creating developer tools that make it easier to build, test, and deploy ZK applications, regardless of the underlying proving system.
                    </p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                    <h3 className="text-xl font-semibold mb-2 text-white">Phase 3: The Academy</h3>
                    <p className="text-white text-base">
                      Building educational resources, tutorials, and guides to make ZK technology accessible to a broader audience of developers and organizations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Team & Contributors</h2>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Founder */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8 md:flex md:items-center md:space-x-8">
                <div className="flex-shrink-0 mb-6 md:mb-0 text-center md:text-left">
                  <div className="relative inline-block">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-30"></div>
                    <img
                      className="relative h-32 w-32 rounded-full object-cover shadow-md"
                      src="https://pbs.twimg.com/profile_images/1609309028462784513/Z8Cco7rb_400x400.jpg"
                      alt="Conner Swann"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Conner Swann</h3>
                  <p className="text-indigo-600 font-medium mb-4">Founder & Lead Developer</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Infrastructure builder with nearly a decade of experience in crypto and distributed systems. 
                    Through ProofLab, I'm working to make Zero Knowledge technology more accessible 
                    by establishing clear benchmarks and standards for the developer community.
                  </p>
                  <div className="flex items-center space-x-4">
                    <a
                      href="https://x.com/yourbuddyconner"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/yourbuddyconner"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                      </svg>
                    </a>
                    <a
                      href="https://burningbridges.substack.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Collaborators */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contributors & Collaborators</h3>
              <p className="text-gray-700 mb-6">
                ProofLab is supported by an incredible network of contributors, advisors, and collaborators from across the ZK ecosystem. We'd like to thank:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-900">YetAnotherCo</h4>
                  <p className="text-gray-600 text-sm">zkRust creators</p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-gray-900">SP1 Team</h4>
                  <p className="text-gray-600 text-sm">Benchmarking support</p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-gray-900">RISC0 Team</h4>
                  <p className="text-gray-600 text-sm">Technical collaboration</p>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Join the ProofLab Community</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Want to contribute to ProofLab? We're looking for developers, researchers, and ZK enthusiasts to help shape the future of the platform.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://github.com/ProofLabDev" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                  </svg>
                  GitHub
                </a>
                <a 
                  href="https://x.com/yourbuddyconner" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow Updates
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;