import React from 'react';
import { Link } from 'react-router-dom';

const CodeBlock = () => (
  <div className="relative rounded-lg overflow-hidden bg-[#1a1b26] border border-[#292e42] shadow-2xl">
    <div className="flex items-center justify-between px-4 py-3 bg-[#1f2335] border-b border-[#292e42]">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-2 text-[#565f89] text-sm font-medium">range_proof.rs</div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-xs text-[#565f89] bg-[#292e42] px-2 py-1 rounded">rust</div>
      </div>
    </div>
    <div className="p-6 text-sm font-mono">
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">1</div>
        <div>
          <span className="text-[#bb9af7]">use</span>
          <span className="text-[#c0caf5]"> zk_rust_sdk::prelude::*;</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">2</div>
        <div><span className="text-[#c0caf5]">&nbsp;</span></div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">3</div>
        <div>
          <span className="text-[#89ddff]">#[</span>
          <span className="text-[#f7768e]">circuit</span>
          <span className="text-[#89ddff]">]</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">4</div>
        <div>
          <span className="text-[#bb9af7]">pub struct</span>
          <span className="text-[#e0af68]"> RangeProof</span>
          <span className="text-[#c0caf5]"> {'{'}</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">5</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#9aa5ce]">{"/// The secret value to prove is within range"}</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">6</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#bb9af7]">secret</span>
          <span className="text-[#c0caf5]">: Field,</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">7</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#9aa5ce]">{"/// The range bounds [min, max]"}</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">8</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#bb9af7]">public</span>
          <span className="text-[#c0caf5]"> bounds: (Field, Field),</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">9</div>
        <div>
          <span className="text-[#c0caf5]">{'}'}</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">10</div>
        <div><span className="text-[#c0caf5]">&nbsp;</span></div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">11</div>
        <div>
          <span className="text-[#bb9af7]">pub fn</span>
          <span className="text-[#7aa2f7]"> input</span>
          <span className="text-[#c0caf5]">() {'{'}</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">12</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#bb9af7]">let</span>
          <span className="text-[#c0caf5]"> secret = Field::from(42);</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">13</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#bb9af7]">let</span>
          <span className="text-[#c0caf5]"> bounds = (Field::from(0), Field::from(100));</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">14</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#c0caf5]">zk_rust_io::write(&secret);</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">15</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#c0caf5]">zk_rust_io::write(&bounds);</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">16</div>
        <div>
          <span className="text-[#c0caf5]">{'}'}</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">17</div>
        <div><span className="text-[#c0caf5]">&nbsp;</span></div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">18</div>
        <div>
          <span className="text-[#bb9af7]">pub fn</span>
          <span className="text-[#7aa2f7]"> main</span>
          <span className="text-[#c0caf5]">() {'{'}</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">19</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#bb9af7]">let</span>
          <span className="text-[#c0caf5]"> secret: Field = zk_rust_io::read();</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">20</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#bb9af7]">let</span>
          <span className="text-[#c0caf5]"> bounds: (Field, Field) = zk_rust_io::read();</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">21</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#bb9af7]">let</span>
          <span className="text-[#c0caf5]"> (min, max) = bounds;</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">22</div>
        <div><span className="text-[#c0caf5]">&nbsp;</span></div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">23</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#9aa5ce]">{"// Prove: min ≤ secret ≤ max"}</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">24</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#c0caf5]">assert!(secret {'>'}= min);</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">25</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#c0caf5]">assert!(secret {'<'}= max);</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">26</div>
        <div><span className="text-[#c0caf5]">&nbsp;</span></div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">27</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#c0caf5]">zk_rust_io::commit(&true);</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">28</div>
        <div>
          <span className="text-[#c0caf5]">{'}'}</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">29</div>
        <div><span className="text-[#c0caf5]">&nbsp;</span></div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">30</div>
        <div>
          <span className="text-[#bb9af7]">pub fn</span>
          <span className="text-[#7aa2f7]"> output</span>
          <span className="text-[#c0caf5]">() {'{'}</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">31</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#bb9af7]">let</span>
          <span className="text-[#c0caf5]"> result: bool = zk_rust_io::out();</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">32</div>
        <div>
          <span className="text-[#c0caf5]">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="text-[#c0caf5]">println!("Range proof verified: {}", result);</span>
        </div>
      </div>
      <div className="flex">
        <div className="text-[#3b4261] select-none mr-4">33</div>
        <div>
          <span className="text-[#c0caf5]">{'}'}</span>
        </div>
      </div>
    </div>
  </div>
);

const TrendingCard = ({ title, subtitle, stats, link, lastUpdated }) => (
  <Link to={link} className="block bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-800/70 transition-colors border border-gray-700">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="flex items-center space-x-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center text-sm">
            <span className="text-gray-400">•</span>
            <span className="ml-2 text-gray-300">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
    <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
    <div className="mt-2 text-xs text-gray-500">
      Updated {lastUpdated}
    </div>
  </Link>
);

const TaskCategory = ({ title, tasks }) => (
  <div className="mb-8">
    <h3 className="text-gray-400 text-sm font-medium mb-3">{title}</h3>
    <div className="grid grid-cols-2 gap-3">
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center space-x-2 text-gray-300 text-sm p-2 rounded hover:bg-gray-800/50 cursor-pointer backdrop-blur-sm border border-gray-800">
          <span className={`text-lg ${task.iconColor}`}>{task.icon}</span>
          <span>{task.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const Home = () => {
  const trendingZKVMs = [
    {
      title: "RISC Zero",
      subtitle: "High-performance RISC-V based ZK virtual machine",
      stats: [
        { value: "44.6k" },
        { value: "2.03k" }
      ],
      lastUpdated: "about 14 hours ago",
      link: "/zkvms"
    },
    {
      title: "SP1",
      subtitle: "STARK-based virtual machine for zero-knowledge proofs",
      stats: [
        { value: "32.6k" },
        { value: "2.29k" }
      ],
      lastUpdated: "2 days ago",
      link: "/zkvms"
    }
  ];

  const trendingPrograms = [
    {
      title: "ECDSA Verification",
      subtitle: "Zero-knowledge ECDSA signature verification",
      stats: [
        { value: "63.7k" },
        { value: "396" }
      ],
      lastUpdated: "about 14 hours ago",
      link: "/programs"
    },
    {
      title: "SHA-256",
      subtitle: "Zero-knowledge SHA-256 hash computation",
      stats: [
        { value: "50.8k" },
        { value: "791" }
      ],
      lastUpdated: "about 15 hours ago",
      link: "/programs"
    }
  ];

  const tasks = {
    cryptography: [
      { name: "ECDSA", icon: "🔐", iconColor: "text-yellow-500" },
      { name: "SHA-256", icon: "🔒", iconColor: "text-green-500" },
      { name: "RSA", icon: "🔑", iconColor: "text-blue-500" },
      { name: "Merkle Trees", icon: "🌳", iconColor: "text-green-500" }
    ],
    computation: [
      { name: "Fibonacci", icon: "🔢", iconColor: "text-purple-500" },
      { name: "Matrix Multiplication", icon: "📊", iconColor: "text-blue-500" },
      { name: "Sorting", icon: "📈", iconColor: "text-green-500" },
      { name: "Graph Algorithms", icon: "🕸️", iconColor: "text-yellow-500" }
    ],
    dataProcessing: [
      { name: "JSON Parser", icon: "📝", iconColor: "text-yellow-500" },
      { name: "Regex Matcher", icon: "🔍", iconColor: "text-blue-500" },
      { name: "Data Validation", icon: "✅", iconColor: "text-green-500" },
      { name: "Compression", icon: "📦", iconColor: "text-purple-500" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-900">
      <div className="absolute inset-0 opacity-10 grid-pattern" />
      
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-900" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Open Source ZK Toolkit</span>
              <span className="block text-indigo-400 mt-2">Build zero-knowledge applications together</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              A community-driven toolkit for developing, testing, and comparing zero-knowledge proof implementations.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link
                to="/learn"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-300 bg-gray-800/50 hover:bg-gray-800"
              >
                Browse Programs
              </Link>
            </div>
          </div>

          {/* Code Editor Preview */}
          <div className="max-w-3xl mx-auto mb-16">
            <CodeBlock />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-24">
            {/* Left Column - Task Categories */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-lg font-semibold">Tasks</span>
                  <span className="bg-gray-700/50 text-gray-300 text-sm px-2 py-1 rounded">12 categories</span>
                </div>
                <input
                  type="text"
                  placeholder="Filter tasks by name"
                  className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <TaskCategory title="Cryptography" tasks={tasks.cryptography} />
              <TaskCategory title="Computation" tasks={tasks.computation} />
              <TaskCategory title="Data Processing" tasks={tasks.dataProcessing} />
            </div>

            {/* Right Column - Trending */}
            <div className="space-y-8">
              {/* Trending ZKVMs */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Trending ZKVMs</h2>
                  <Link to="/zkvms" className="text-indigo-400 hover:text-indigo-300 text-sm">
                    Browse all ZKVMs →
                  </Link>
                </div>
                <div className="space-y-4">
                  {trendingZKVMs.map((zkvm, index) => (
                    <TrendingCard key={index} {...zkvm} />
                  ))}
                </div>
              </div>

              {/* Trending Programs */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Popular Programs</h2>
                  <Link to="/programs" className="text-indigo-400 hover:text-indigo-300 text-sm">
                    Browse all programs →
                  </Link>
                </div>
                <div className="space-y-4">
                  {trendingPrograms.map((program, index) => (
                    <TrendingCard key={index} {...program} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 