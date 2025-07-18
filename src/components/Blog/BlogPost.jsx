import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Blog post data - in a real app this would come from a CMS or API
const blogPosts = {
  'announcing-zkarnage': {
    title: 'Announcing ZKarnage: A Mainnet Stress Test for Zero-Knowledge Provers',
    date: '2025-07-21',
    author: {
      name: 'Conner Swann',
      twitter: 'yourbuddyconner'
    },
    tags: ['Announcement', 'ZKarnage', 'Research'],
    content: `
      <div class="prose prose-lg max-w-none">
        <div class="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
          <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">FOR IMMEDIATE RELEASE</p>
          <p class="text-sm text-gray-600">San Francisco, California – July 21, 2025</p>
        </div>

        <p class="text-xl text-gray-700 leading-relaxed mb-8">
          Prooflab, with the support of a grant from the Ethereum Foundation, is proud to announce the launch of <strong class="text-gray-900">ZKarnage</strong>, a live, on-chain stress-testing initiative for zero-knowledge (ZK) proving systems on the Ethereum mainnet.
        </p>

        <p class="text-gray-700 leading-relaxed mb-8">
          As the backbone of Layer 2 scaling solutions and advanced cryptographic applications, the resilience of ZK provers is paramount to the security and reliability of the entire Ethereum ecosystem. ZKarnage is designed to push these systems to their limits by systematically executing "prover-killer" transactions—computationally intensive operations designed to expose potential vulnerabilities, performance bottlenecks, and economic inefficiencies in a real-world environment.
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Project Mission</h2>
        
        <p class="text-gray-700 leading-relaxed mb-6">The primary objectives of the ZKarnage initiative are:</p>
        
        <div class="space-y-4 my-8">
          <div class="flex items-start">
            <span class="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-sm mr-3 mt-0.5">1</span>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Strengthen the Ecosystem</h3>
              <p class="text-gray-700">To identify and help remedy vulnerabilities in ZK proving systems before they can be exploited maliciously.</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-sm mr-3 mt-0.5">2</span>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Provide Public Data</h3>
              <p class="text-gray-700">To create a valuable, open-source dataset on prover performance under duress, enabling developers to build more robust and efficient systems.</p>
            </div>
          </div>
          <div class="flex items-start">
            <span class="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-sm mr-3 mt-0.5">3</span>
            <div>
              <h3 class="font-semibold text-gray-900 mb-1">Foster Collaboration</h3>
              <p class="text-gray-700">To work closely with prover development teams by sharing findings and fostering a collaborative approach to security.</p>
            </div>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">How It Works</h2>
        
        <p class="text-gray-700 leading-relaxed mb-6">
          Starting this week, the ZKarnage project will begin deploying a series of targeted transactions on the Ethereum mainnet. These transactions are not random; they are carefully crafted "prover-killer" operations designed to exploit discrepancies between an operation's gas cost and its actual computational cost for a ZK prover.
        </p>

        <h3 class="text-2xl font-semibold text-gray-900 mt-10 mb-4">The Science of "Prover-Killer" Transactions</h3>
        <p class="text-gray-700 leading-relaxed mb-6">
          The core of ZKarnage is identifying and exploiting EVM operations where the gas cost doesn't align with the actual proving resources required. This discrepancy allows us to create transactions that are cheap to execute on L1 but create significant computational stress for ZK provers. Our research has identified two primary categories of such operations:
        </p>

        <div class="grid md:grid-cols-2 gap-8 my-8">
          <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 class="font-semibold text-lg text-gray-800 mb-2">1. Expensive EVM Opcodes</h4>
            <p class="text-gray-700 leading-relaxed mb-4 text-sm">
              These are fundamental EVM instructions that are cheap in gas but require intensive computation for ZK circuits to prove.
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 pl-2 text-sm">
              <li><strong><code>JUMPDEST</code>:</strong> Exploits a massive 1,000x+ cycle-to-gas ratio to stress state verification.</li>
              <li><strong><code>MCOPY</code> / <code>CALLDATACOPY</code>:</strong> Test a prover's efficiency in handling large memory operations.</li>
            </ul>
          </div>
          <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 class="font-semibold text-lg text-gray-800 mb-2">2. Intensive Precompiles</h4>
            <p class="text-gray-700 leading-relaxed mb-4 text-sm">
              Precompiles for complex cryptography are another key vector. Their fixed gas costs often hide immense computational depth.
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-2 pl-2 text-sm">
              <li><strong><code>MODEXP</code>:</strong> Our most potent attack, with a cycle-to-gas ratio also exceeding 1,000x by using worst-case parameters.</li>
              <li><strong>Elliptic Curve Ops:</strong> <code>BN_PAIRING</code>, <code>BN_MUL</code>, and <code>ECRECOVER</code> attacks target complex and costly cryptographic computations.</li>
            </ul>
          </div>
        </div>
        
        <div class="bg-indigo-50 border-l-4 border-indigo-400 p-6 my-8">
          <p class="text-gray-700 leading-relaxed">
            The impact of these transactions on various ZK proving systems will be monitored in near real-time, with data and findings made publicly available on our dashboard.
          </p>
        </div>

        <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Why This Matters</h2>
        
        <p class="text-gray-700 leading-relaxed mb-8">
          The security of the Ethereum ecosystem depends on the strength of its underlying components. By proactively and transparently stress-testing ZK provers, ZKarnage aims to surface critical insights that will lead to stronger, more resilient, and more cost-effective systems for everyone. This effort ensures that as the ecosystem grows, its foundations remain secure.
        </p>

        <h2 class="text-3xl font-bold text-gray-900 mt-12 mb-6">Follow the Project</h2>
        
        <p class="text-gray-700 leading-relaxed mb-6">We invite the community, researchers, and prover teams to follow our progress and engage with the findings:</p>
        
        <div class="grid md:grid-cols-2 gap-6 my-8">
          <a href="https://prooflab.dev" class="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 class="font-semibold text-gray-900 mb-2">📊 Live Dashboard</h3>
            <p class="text-indigo-600 hover:text-indigo-700">prooflab.dev</p>
            <p class="text-sm text-gray-500 mt-1">(Link to be activated upon launch)</p>
          </a>
          <a href="https://github.com/yourbuddyconner/zkarnage" class="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 class="font-semibold text-gray-900 mb-2">💻 Public Repository & Data</h3>
            <p class="text-indigo-600 hover:text-indigo-700">github.com/yourbuddyconner/zkarnage</p>
          </a>
        </div>

        <div class="bg-gray-50 rounded-lg p-8 mt-12">
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">About Prooflab</h3>
              <p class="text-sm text-gray-600 leading-relaxed">
                Prooflab is a research collective dedicated to improving the security, performance, and reliability of cryptographic proving systems.
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 mb-3">Contact</h3>
              <p class="text-sm text-gray-600">
                Conner Swann<br/>
                Project Lead<br/>
                <a href="https://twitter.com/yourbuddyconner" class="text-indigo-600 hover:text-indigo-700">@yourbuddyconner</a> / <a href="https://twitter.com/TheProofLab" class="text-indigo-600 hover:text-indigo-700">@TheProofLab</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  'prooflab-research-collective': {
    title: 'Introducing Prooflab: A Research Collective for Cryptographic Systems',
    date: '2025-07-15',
    author: {
      name: 'Conner Swann',
      twitter: 'yourbuddyconner'
    },
    tags: ['Announcement', 'Prooflab'],
    content: `
      <div>
        <p class="text-xl text-gray-700 leading-relaxed mb-8">
          Today we are excited to announce the transformation of Prooflab into a research collective dedicated to improving the security, performance, and reliability of cryptographic proving systems.
        </p>

        <h2>Our Mission</h2>
        
        <p>
          The cryptographic landscape is evolving rapidly, with zero-knowledge proofs becoming critical infrastructure for privacy, scalability, and security. As these systems become more complex and widely deployed, the need for thorough security research and stress testing has never been greater.
        </p>
        
        <p>
          Prooflab addresses this need by conducting rigorous research, developing practical tools, and sharing our findings openly to advance the entire ecosystem. We believe in responsible disclosure, collaborative problem-solving, and the power of open research to strengthen cryptographic systems.
        </p>

        <h2>Research Areas</h2>
        
        <p>Our research spans critical areas of cryptographic systems:</p>
        
        <div class="bg-gray-50 rounded-lg p-6 my-8">
          <ul class="space-y-4">
            <li class="flex items-start">
              <span class="text-indigo-600 mr-2">•</span>
              <div>
                <strong>Security Analysis:</strong> Systematic stress testing and vulnerability research for zero-knowledge proving systems
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-indigo-600 mr-2">•</span>
              <div>
                <strong>Performance Optimization:</strong> Research into improving the efficiency and scalability of cryptographic systems
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-indigo-600 mr-2">•</span>
              <div>
                <strong>Standards & Best Practices:</strong> Developing industry standards for implementing cryptographic systems safely
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-indigo-600 mr-2">•</span>
              <div>
                <strong>Open Tools & Data:</strong> Creating open-source tools and datasets for the broader community
              </div>
            </li>
          </ul>
        </div>

        <h2>Our Approach</h2>
        
        <p>
          What sets Prooflab apart is our commitment to practical, real-world research. We don't just theorize about potential vulnerabilities—we actively test systems in production environments, working closely with development teams to identify and address issues before they can be exploited.
        </p>
        
        <p>
          Our first major initiative, ZKarnage, exemplifies this approach. Supported by a grant from the Ethereum Foundation, we're conducting live stress-testing of zero-knowledge proving systems on Ethereum mainnet, providing valuable data and insights to strengthen the entire ecosystem.
        </p>

        <h2>Join Us</h2>
        
        <p>
          We're always looking for collaborators, whether you're a researcher, developer, or organization interested in advancing cryptographic security. Follow our progress and get involved:
        </p>
        
        <div class="bg-indigo-50 rounded-lg p-6 my-8">
          <ul class="space-y-3">
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Twitter: <a href="https://twitter.com/TheProofLab" class="text-indigo-600 hover:text-indigo-700 font-medium">@TheProofLab</a></span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub: <a href="https://github.com/prooflabdev" class="text-indigo-600 hover:text-indigo-700 font-medium">github.com/prooflabdev</a></span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 mr-3 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Contact: <a href="https://twitter.com/yourbuddyconner" class="text-indigo-600 hover:text-indigo-700 font-medium">@yourbuddyconner</a></span>
            </li>
          </ul>
        </div>

        <p class="text-lg font-medium text-gray-900 text-center mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
          Together, we can build a more secure future for cryptographic systems.
        </p>
      </div>
    `
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-indigo-600 hover:text-indigo-700 font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-12">
        <Link to="/blog" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8 transition-colors">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
            <time dateTime={post.date} className="flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className="text-gray-400">•</span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              By {post.author.name}
            </span>
            {post.author.twitter && (
              <>
                <span className="text-gray-400">•</span>
                <a 
                  href={`https://twitter.com/${post.author.twitter}`}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  @{post.author.twitter}
                </a>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

export default BlogPost; 