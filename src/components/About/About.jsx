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
              Prooflab Research Collective
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advancing the state of cryptographic systems through rigorous research and open collaboration
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link 
                to="/projects" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
              >
                Current Projects
              </Link>
              <Link 
                to="/research" 
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
              >
                Research Reports
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
                  <span className="text-xl font-semibold text-indigo-600">Prooflab is a research collective dedicated to improving the security, performance, and reliability of cryptographic proving systems.</span> We conduct rigorous research, develop practical tools, and share our findings openly to advance the entire ecosystem.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  The cryptographic landscape is evolving rapidly, with zero-knowledge proofs becoming critical infrastructure for privacy, scalability, and security. As these systems become more complex and widely deployed, the need for thorough security research and stress testing has never been greater.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Through initiatives like ZKarnage and future research projects, we proactively identify vulnerabilities, performance bottlenecks, and economic inefficiencies before they can be exploited. Our work helps developers build more robust systems and gives users confidence in the security of their applications.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 md:p-12 border-t border-gray-100 text-center">
              <div className="max-w-3xl mx-auto relative">
                <h3 className="text-indigo-700 font-semibold mb-6 uppercase tracking-wider text-sm">Our Approach</h3>
                <svg className="absolute -top-8 left-0 h-24 w-24 text-indigo-200 opacity-50 z-0" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <blockquote className="italic text-2xl text-gray-700 leading-relaxed px-8 relative z-10">
                  <p>
                    We believe in responsible disclosure, collaborative problem-solving, and the power of open research to strengthen the entire ecosystem.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        
        {/* Research Areas */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Research Areas</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our research spans critical areas of cryptographic systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Security Analysis</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Systematic stress testing and vulnerability research for zero-knowledge proving systems, identifying potential attack vectors before they can be exploited.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Live mainnet stress testing
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Prover vulnerability research
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Economic attack analysis
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Performance Optimization</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Research into improving the efficiency and scalability of cryptographic systems through novel algorithms and implementation strategies.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Prover optimization techniques
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Hardware acceleration research
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Scalability solutions
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Standards & Best Practices</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Developing industry standards and best practices for implementing and deploying cryptographic systems safely and efficiently.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Security guidelines
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Implementation patterns
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Testing methodologies
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Open Tools & Data</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Creating open-source tools and datasets that enable the broader community to conduct their own research and improve their systems.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Public vulnerability datasets
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Testing frameworks
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Analysis tools
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Current Initiative */}
        <section className="mb-24">
          <div className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-2xl shadow-xl overflow-hidden text-white">
            <div className="absolute inset-0 opacity-20 pattern-grid-lg text-white pointer-events-none"></div>
            <div className="p-8 md:p-12 relative">
              <h2 className="text-3xl font-bold mb-6 text-white">Featured Project: ZKarnage</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-white text-lg mb-6">
                  Our flagship initiative, supported by a grant from the Ethereum Foundation, is conducting systematic stress-testing of zero-knowledge proving systems on Ethereum mainnet.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                    <h3 className="text-xl font-semibold mb-3 text-white">What is ZKarnage?</h3>
                    <p className="text-white/90 text-base">
                      ZKarnage executes "prover-killer" transactions designed to expose vulnerabilities, performance bottlenecks, and economic inefficiencies in zero-knowledge proving systems deployed on mainnet.
                    </p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                    <h3 className="text-xl font-semibold mb-3 text-white">Why It Matters</h3>
                    <p className="text-white/90 text-base">
                      By proactively identifying weaknesses before they can be exploited, we help prover teams strengthen their systems and give users confidence in the security of ZK infrastructure.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <Link
                    to="/projects/zkarnage"
                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-indigo-800 bg-white hover:bg-gray-100"
                  >
                    Learn More About ZKarnage
                  </Link>
                  <a
                    href="https://github.com/yourbuddyconner/zkarnage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Research Team</h2>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Lead Researcher */}
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
                  <p className="text-indigo-600 font-medium mb-4">Lead Researcher</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Infrastructure builder with nearly a decade of experience in crypto and distributed systems. 
                    Through Prooflab, I'm conducting critical security research to strengthen the zero-knowledge ecosystem
                    and ensure these powerful cryptographic systems can be deployed safely at scale.
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
            
            {/* Partners & Support */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Partners & Support</h3>
              <p className="text-gray-700 mb-6">
                Prooflab's research is made possible through the support of leading organizations in the cryptographic ecosystem:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-900">Ethereum Foundation</h4>
                  <p className="text-gray-600 text-sm">Grant support for ZKarnage</p>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Collaborate With Us</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                We're always looking for collaborators, whether you're a researcher, developer, or organization interested in advancing cryptographic security. Get in touch to explore how we can work together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://twitter.com/yourbuddyconner" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Contact Us
                </a>
                <a 
                  href="https://twitter.com/TheProofLab" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow @TheProofLab
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