import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">ProofLab</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The Zero Knowledge Proof Benchmarking Platform
        </p>
      </div>
      
      <div className="space-y-16">
        <section className="prose max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              ProofLab serves as the central infrastructure layer for zero knowledge proof development, 
              combining specialized version control for ZK programs with flexible proving infrastructure.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Our platform bridges the gap between traditional software development practices and the 
              unique requirements of ZK systems, making it easier for developers to write, share, and 
              deploy ZK applications.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Benchmarking Leaderboard</h3>
              <p className="text-gray-600 leading-relaxed">
                Compare performance metrics across different ZK implementations with our 
                comprehensive benchmarking system.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Data Visualization</h3>
              <p className="text-gray-600 leading-relaxed">
                Interactive charts and detailed breakdowns of proving times, resource usage, 
                and system performance.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Standardized Testing</h3>
              <p className="text-gray-600 leading-relaxed">
                Consistent benchmarking environment ensures fair and accurate comparisons 
                between different proving systems.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Open Platform</h3>
              <p className="text-gray-600 leading-relaxed">
                Built for the ZK community, ProofLab welcomes contributions and feedback 
                to improve the platform.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Creator</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <img
                  className="h-24 w-24 rounded-full object-cover shadow-md"
                  src="https://pbs.twimg.com/profile_images/1609309028462784513/Z8Cco7rb_400x400.jpg"
                  alt="Conner Swann"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900">Conner Swann</h3>
                <p className="text-gray-600 mt-2 mb-3 leading-relaxed">
                  Infrastructure builder with nearly a decade of experience in crypto and distributed systems. 
                  Through ProofLab, I'm working to make Zero Knowledge technology more accessible 
                  by establishing clear benchmarks and standards for the developer community.
                </p>
                <div className="mt-2 flex items-center space-x-4">
                  <a
                    href="https://x.com/connerswann"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    @connerswann
                  </a>
                  <a
                    href="https://burningbridges.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                    </svg>
                    Substack
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 