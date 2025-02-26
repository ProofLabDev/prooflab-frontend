import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs = useRef({});
  const observerRef = useRef(null);

  const sections = [
    {
      id: 'about',
      title: "What is ProofLab?",
      category: "general",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: [
        {
          question: "What is ProofLab?",
          answer: `ProofLab is the observatory for zero-knowledge technology. We collect, analyze, and visualize comprehensive
            data on ZK systems to help developers, researchers, and organizations make informed decisions.`,
          details: `Our platform provides standardized benchmarks, detailed performance metrics, and comprehensive 
            comparison tools for Zero Knowledge Virtual Machines (zkVMs). This allows developers to understand 
            the tradeoffs between different systems and choose the right one for their specific needs.
            
            Beyond benchmarking, we're building a complete ecosystem of tools and resources to support the 
            growing ZK community, including our zkRust SDK, educational materials, and developer tools.`,
          links: [
            {
              title: "Learn more about our vision",
              url: "/about"
            },
            {
              title: "Explore Report comparisons",
              url: "/compare"
            }
          ]
        },
        {
          question: "Why do we need ProofLab?",
          answer: "The ZK ecosystem is evolving rapidly, making it difficult to keep track of advancements and understand system tradeoffs.",
          details: `Just as astronomers use observatories to study celestial objects, the ZK community needs 
            an observatory to make sense of the growing ZK universe. ProofLab serves as this central hub, providing:
            
            1. Objective metrics for comparing different systems
            2. Consistent benchmarks across multiple dimensions
            3. Tools for developers to make informed decisions
            4. Resources for understanding ZK technology fundamentals`
        }
      ]
    },
    {
      id: 'zkvm',
      title: "Understanding zkVMs",
      category: "technical",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      content: [
        {
          question: "What is a zkVM?",
          answer: `A Zero Knowledge Virtual Machine (zkVM) is a specialized runtime environment that executes 
            programs while generating cryptographic proofs of correct execution. These proofs can be 
            verified by others without revealing the program's inputs or intermediate states.`,
          details: [
            {
              title: "Key Components",
              items: [
                "Virtual Machine: A simulated computing environment that executes programs",
                "Proving System: Cryptographic algorithms that generate proofs of computation",
                "Verification System: Methods for others to verify the computation was performed correctly"
              ]
            },
            {
              title: "Why zkVMs Matter",
              items: [
                "Write familiar code: Use languages like Rust or C++ instead of specialized circuit languages",
                "Prove complex computations: Support for loops, memory access, and advanced control flow",
                "Portable verification: Generate proofs for any context, from blockchains to standalone applications"
              ]
            }
          ]
        },
        {
          question: "How do zkVMs differ from other ZK tools?",
          answer: "zkVMs focus on general-purpose computation, while many ZK tools target specific use cases.",
          details: [
            {
              description: "Traditional ZK frameworks often require developers to express their computation in specialized languages or constraints. This can be challenging and time-consuming."
            },
            {
              description: "zkVMs take a different approach by allowing developers to write code in familiar languages and frameworks, then automatically handling the conversion to zero-knowledge proofs."
            },
            {
              title: "Key Differences",
              items: [
                "Usability: zkVMs are designed for developers without cryptography expertise",
                "Generality: They can handle a wide range of applications, not just specific use cases",
                "Compatibility: Programs can be written in mainstream languages",
                "Developer Experience: More familiar tools, debugging capabilities, and workflows"
              ]
            }
          ]
        },
        {
          question: "What are the main zkVMs in the ecosystem?",
          answer: "The main zkVMs currently include RISC0, SP1, Cairo VM, Leo, and a growing number of newer systems.",
          details: [
            {
              title: "RISC0",
              description: "A RISC-V based zkVM with support for Rust, C, and C++. Uses STARKs with STARK→SNARK conversion."
            },
            {
              title: "SP1",
              description: "A high-performance zkVM that supports a wide range of languages via LLVM, with optimized STARK-based proving."
            },
            {
              title: "Cairo VM",
              description: "Powers Starknet's ZK rollup, using the Cairo language and STARK proofs for on-chain computation."
            },
            {
              title: "Leo",
              description: "A zkVM and programming language by Aleo, designed for privacy-preserving applications."
            }
          ],
          links: [
            {
              title: "View detailed Report comparisons",
              url: "/compare"
            }
          ]
        }
      ]
    },
    {
      id: 'benchmarks',
      title: "Benchmarking",
      category: "benchmarks",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      content: [
        {
          question: "What metrics does ProofLab measure?",
          answer: "ProofLab measures a comprehensive set of metrics across performance, security, and developer experience dimensions.",
          details: [
            {
              title: "Performance Metrics",
              items: [
                "Proof Generation Time: Time to generate a proof (in seconds)",
                "Verification Cost: Resources needed to verify a proof (time or gas)",
                "Resource Utilization: Memory, CPU, and storage requirements",
                "Throughput: Operations per second during proof generation",
                "Latency: End-to-end time from computation to verified proof"
              ]
            },
            {
              title: "Security Metrics",
              items: [
                "Trusted Computing Base Size: Amount of code that must be trusted",
                "Attack Surface: Potential entry points for attackers",
                "Formal Verification Coverage: Percentage of code formally verified",
                "Code Coverage: Test and fuzzing coverage statistics",
                "Vulnerability History: Track record of security issues"
              ]
            },
            {
              title: "Holistic Metrics",
              items: [
                "Development Effort: Resources required to build on the system",
                "Tooling Ecosystem: Available developer tools and libraries",
                "Security Under Composition: How security holds when integrated with other systems"
              ]
            }
          ],
          links: [
            {
              title: "View detailed metrics",
              url: "/compare"
            }
          ]
        },
        {
          question: "How are the benchmarks run?",
          answer: "Our benchmarks use standardized programs, consistent environments, and controlled methodology.",
          details: [
            {
              title: "Our Approach",
              description: `We use the same zkRust program implementations across all zkVMs, ensuring an 
                apples-to-apples comparison. Each benchmark is run multiple times in controlled environments to 
                ensure consistency and reliability.`
            },
            {
              title: "Testing Environments",
              items: [
                "CPU Testing: AWS EC2 c6i.16xlarge instances (64 vCPUs, 128GB RAM)",
                "GPU Testing: AWS EC2 g5.12xlarge instances (4× NVIDIA A10G GPUs)",
                "Consistent OS and software configurations across all tests"
              ]
            },
            {
              title: "Methodology",
              items: [
                "Each benchmark is run at least 5 times to establish averages and variance",
                "Memory, CPU, and resource utilization are monitored throughout execution",
                "Detailed logs are captured for verification and analysis",
                "SDK versions and configurations are standardized when possible"
              ]
            }
          ]
        },
        {
          question: "What programs are used for benchmarking?",
          answer: "We use a diverse set of real-world programs that represent common ZK use cases.",
          details: [
            {
              title: "Benchmark Suite Categories",
              items: [
                "Cryptographic Operations: Hash functions, signature verification, and encryption",
                "Financial Computations: Account balance verification, transaction validation",
                "Data Structures: Merkle tree operations, sparse array access",
                "Complex Logic: State machines, constraint systems"
              ]
            },
            {
              description: "Each program is implemented in zkRust, allowing it to run consistently across all supported zkVMs without modification. This ensures that performance differences are due to the zkVMs themselves, not implementation variations."
            }
          ],
          links: [
            {
              title: "Explore benchmark programs",
              url: "/programs"
            }
          ]
        }
      ]
    },
    {
      id: 'choosing',
      title: "Choosing a zkVM",
      category: "guidance",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      ),
      content: [
        {
          question: "Which zkVM should I choose?",
          answer: "The best zkVM depends on your specific requirements across several dimensions.",
          details: [
            {
              title: "Performance Priority",
              items: [
                "If proving time is critical: Consider hardware-accelerated options",
                "If verification cost matters most: Compare on-chain gas costs",
                "If memory constraints exist: Check resource utilization metrics",
                "If throughput is key: Look at operations per second"
              ]
            },
            {
              title: "Development Experience",
              items: [
                "Language preference: Choose a zkVM supporting your preferred language",
                "Library ecosystem: Check compatibility with libraries you need",
                "Developer tools: Evaluate debugging, testing, and deployment tools",
                "Documentation quality: Look for comprehensive guides and examples"
              ]
            },
            {
              title: "Security Considerations",
              items: [
                "Cryptographic foundations: STARKs vs SNARKs vs other proving systems",
                "Audit status: Check for independent security reviews",
                "Production readiness: Evaluate maturity and live deployments",
                "Trusted setup requirements: Some require trusted ceremonies"
              ]
            },
            {
              title: "Integration Needs",
              items: [
                "Blockchain compatibility: Check support for your target chains",
                "Composability: Evaluate integration with other ZK systems",
                "Hardware requirements: Consider available acceleration options",
                "Deployment constraints: Assess infrastructure needs"
              ]
            }
          ],
          links: [
            {
              title: "Compare Reports side-by-side",
              url: "/compare"
            }
          ]
        },
        {
          question: "What are the main tradeoffs between zkVMs?",
          answer: "zkVMs make different tradeoffs in proving time, verification cost, security assumptions, and developer experience.",
          details: [
            {
              title: "Key Tradeoffs",
              items: [
                "Proving Time vs. Verification Cost: Some zkVMs optimize for faster proof generation, while others focus on minimizing verification costs",
                "Security Assumptions vs. Performance: Different cryptographic foundations (STARKs, SNARKs, etc.) make different security assumptions that affect performance",
                "Developer Experience vs. Flexibility: More user-friendly systems may have limitations in what they can express or optimize",
                "Maturity vs. Innovation: Established systems have more testing and adoption, while newer ones may offer performance or feature improvements"
              ]
            },
            {
              description: "The ProofLab comparison tool helps visualize these tradeoffs by providing standardized metrics across multiple dimensions."
            }
          ]
        }
      ]
    },
    {
      id: 'approach',
      title: "Our Approach",
      category: "technical",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      content: [
        {
          question: "What makes ProofLab's benchmarks unique?",
          answer: "ProofLab uses zkRust to ensure truly comparable benchmarks across different zkVMs.",
          details: [
            {
              title: "Our zkRust-Based Approach",
              description: `ProofLab leverages an extended fork of zkRust, a powerful abstraction layer that allows 
                developers to write Rust code once and run it across multiple zkVMs.`,
              features: [
                "Truly comparable: The exact same code is executed across different zkVMs",
                "Real-world representative: Our benchmarks use actual zkVM code",
                "Easily extensible: Adding support for new zkVMs or benchmark programs is straightforward"
              ]
            },
            {
              title: "How It Works",
              items: [
                "Write program once in standard Rust",
                "Use familiar Rust libraries and tools",
                "Deploy to any supported zkVM (currently SP1 and RISC0)",
                "Get consistent performance metrics across platforms"
              ]
            },
            {
              title: "Benefits for Developers",
              items: [
                "Write Once, Prove Anywhere: Develop without being locked into a specific zkVM",
                "Easy Comparison: Test your use case across different ZK systems without rewriting code",
                "Future-Proof: Easily benchmark and migrate to new zkVMs as they emerge"
              ]
            }
          ],
          links: [
            {
              title: "zkRust Repository",
              url: "https://github.com/yetanotherco/zkRust"
            },
            {
              title: "ProofLab's Extended Fork",
              url: "https://github.com/ProofLabDev/zkRust"
            }
          ]
        },
        {
          question: "How does ProofLab ensure fair comparisons?",
          answer: "We use consistent methodology, transparent processes, and community oversight.",
          details: [
            {
              title: "Our Approach to Fair Comparisons",
              items: [
                "Identical Code Base: The same zkRust implementations run on all zkVMs, eliminating implementation bias",
                "Standardized Environments: All benchmarks run in identical hardware environments",
                "Open Methodology: Our benchmark processes and analysis methods are public and open to scrutiny",
                "Multiple Metrics: We measure many aspects of performance to provide a complete picture",
                "Version Tracking: We clearly document the versions of all zkVMs, libraries, and tools",
                "Community Input: We welcome feedback and contributions to improve our methodologies"
              ]
            },
            {
              description: "We're committed to being an objective, neutral observatory for the ZK ecosystem."
            }
          ]
        }
      ]
    },
    {
      id: 'contributing',
      title: "Contributing",
      category: "community",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      content: [
        {
          question: "How can I contribute to ProofLab?",
          answer: "There are many ways to contribute, from adding benchmarks to improving tools or documentation.",
          details: [
            {
              title: "Contribute Benchmarks",
              description: "Add new benchmark programs or improve existing ones:",
              items: [
                "Implement new benchmark programs in zkRust",
                "Run benchmarks on additional zkVMs or hardware configurations",
                "Validate and verify existing benchmark results",
                "Suggest new metrics or analysis methods"
              ]
            },
            {
              title: "Improve Tools",
              description: "Help enhance the ProofLab tooling ecosystem:",
              items: [
                "Add support for new zkVMs in our benchmarking framework",
                "Improve visualization and data presentation",
                "Develop new analysis tools for ZK performance",
                "Enhance the zkRust library and SDK"
              ]
            },
            {
              title: "Documentation & Education",
              description: "Help make ZK technology more accessible:",
              items: [
                "Improve documentation and guides",
                "Create tutorials and examples",
                "Write articles and blog posts about ZK topics",
                "Develop educational resources for newcomers"
              ]
            }
          ],
          links: [
            {
              title: "GitHub Repository",
              url: "https://github.com/ProofLabDev"
            },
            {
              title: "Contact the Team",
              url: "https://x.com/yourbuddyconner"
            }
          ]
        },
        {
          question: "Are there specific contribution guidelines?",
          answer: "Yes, we have guidelines to ensure high-quality contributions.",
          details: [
            {
              title: "Contribution Guidelines",
              items: [
                "Benchmark Programs: Should be representative of real-world use cases, well-documented, and implemented in zkRust following best practices",
                "Methodology: All benchmark results should include detailed information about the testing environment, methodology, and configurations",
                "Neutrality: Contributions should maintain objectivity and avoid favoring specific zkVMs or approaches",
                "Documentation: All contributions should include clear documentation and explanation",
                "Testing: Code contributions should include appropriate tests",
                "Licensing: All contributions must be compatible with our open source licenses"
              ]
            },
            {
              description: "For specific guidelines, please see our CONTRIBUTING.md file in the repository."
            }
          ]
        }
      ]
    },
    {
      id: 'prior-art',
      title: "Prior Art",
      category: "general",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      content: [
        {
          question: "What existing work does ProofLab build upon?",
          answer: "ProofLab builds upon and is inspired by existing work in the ZK benchmarking space.",
          details: [
            {
              title: "zkbench.dev",
              description: `A pioneering open-source project that established early methodologies for 
                comparing ZK framework performance and helped shape the benchmarking landscape.`,
              url: "https://zkbench.dev"
            },
            {
              title: "zkRust",
              description: `The foundational project that enables our cross-zkVM benchmarking approach, providing 
                the abstraction layer that makes our comparable benchmarks possible.`,
              url: "https://github.com/yetanotherco/zkRust"
            },
            {
              title: "L2Beat",
              description: `While focused on L2 scaling solutions rather than zkVMs specifically, L2Beat's 
                approach to comparative analysis and data visualization has been influential.`,
              url: "https://l2beat.com"
            },
            {
              title: "ZK Whiteboard Sessions",
              description: `Educational content that has helped increase understanding of ZK systems 
                and their tradeoffs within the broader community.`,
              url: "https://zkhack.dev/whiteboard"
            }
          ]
        }
      ]
    }
  ];

  const filteredSections = sections.filter(section => {
    if (selectedCategory !== 'all' && section.category !== selectedCategory) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        section.title.toLowerCase().includes(query) ||
        section.content.some(item =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
        )
      );
    }

    return true;
  });

  const categories = ['all', ...new Set(sections.map(section => section.category))];

  const formatCategory = (category) => {
    if (!category || category === 'all') return 'All';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  useEffect(() => {
    // Set the first section as active initially if none is selected
    if (activeSection === null && filteredSections.length > 0) {
      setActiveSection(filteredSections[0].id);
    }
  }, [activeSection, filteredSections]);
  
  useEffect(() => {
    // Set up the Intersection Observer to track which section is in view
    const options = {
      root: null, // viewport
      rootMargin: "-10% 0px -70% 0px", // Consider a section in view when it's 10% from the top and not more than 70% off the bottom
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // Create a new observer
    observerRef.current = new IntersectionObserver(handleIntersect, options);

    // Start observing all section refs
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observerRef.current.observe(ref);
    });

    return () => {
      // Clean up the observer when component unmounts
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredSections]); // Re-run when filtered sections change

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    
    // Scroll to the section
    if (sectionRefs.current[sectionId]) {
      // Apply a small offset to account for any fixed headers
      const yOffset = -20; 
      const element = sectionRefs.current[sectionId];
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to know about ProofLab and Zero Knowledge Virtual Machines
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {formatCategory(category)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 sticky top-4">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-700">Topics</h2>
            </div>
            <nav className="p-2">
              <ul className="space-y-1">
                {filteredSections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-indigo-100 text-indigo-700 font-medium shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className={`mr-3 transition-colors duration-200 ${activeSection === section.id ? 'text-indigo-500' : 'text-gray-400'}`}>
                        {section.icon}
                      </span>
                      <span>{section.title}</span>
                      {activeSection === section.id && (
                        <span className="ml-auto w-1.5 h-5 bg-indigo-500 rounded-full"></span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Quick Links */}
            <div className="p-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/zkvms" className="flex items-center text-sm text-indigo-600 hover:text-indigo-800">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Explore Reports
                  </Link>
                </li>
                <li>
                  <Link to="/compare" className="flex items-center text-sm text-indigo-600 hover:text-indigo-800">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Compare Systems
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="flex items-center text-sm text-indigo-600 hover:text-indigo-800">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Benchmark Programs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="space-y-6">
            {filteredSections.map((section, sectionIndex) => (
              <section 
                key={section.id} 
                id={section.id}
                ref={el => sectionRefs.current[section.id] = el}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-4 border-b border-gray-100 transition-all duration-300">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="mr-3">{section.icon}</span>
                    {section.title}
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-1">
                          <svg className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                          <p className="text-gray-700 leading-relaxed mb-4">{item.answer}</p>
                          
                          {/* Render details */}
                          {item.details && (
                            <div className="mt-4 space-y-4 bg-gray-50 rounded-lg p-4">
                              {Array.isArray(item.details) ? (
                                <ul className="space-y-4">
                                  {item.details.map((detail, detailIndex) => (
                                    <li key={detailIndex}>
                                      {typeof detail === 'string' ? (
                                        <p className="text-gray-700 whitespace-pre-line">{detail}</p>
                                      ) : (
                                        <div className="mb-2">
                                          {detail.title && (
                                            <h4 className="font-medium text-gray-900 mb-2">{detail.title}</h4>
                                          )}
                                          {detail.description && (
                                            <p className="text-gray-700 mb-2">{detail.description}</p>
                                          )}
                                          {detail.items && (
                                            <ul className="mt-2 space-y-1 list-disc pl-6">
                                              {detail.items.map((item, i) => (
                                                <li key={i} className="text-gray-700">{item}</li>
                                              ))}
                                            </ul>
                                          )}
                                          {detail.features && (
                                            <ul className="mt-2 space-y-1 list-disc pl-6">
                                              {detail.features.map((feature, i) => (
                                                <li key={i} className="text-gray-700">{feature}</li>
                                              ))}
                                            </ul>
                                          )}
                                          {detail.url && (
                                            <a 
                                              href={detail.url} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center mt-2 text-indigo-600 hover:text-indigo-800"
                                            >
                                              Learn more
                                              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                              </svg>
                                            </a>
                                          )}
                                        </div>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-gray-700 whitespace-pre-line">{item.details}</p>
                              )}
                            </div>
                          )}

                          {/* Render links */}
                          {item.links && item.links.length > 0 && (
                            <div className="mt-6">
                              <div className="flex flex-wrap gap-4">
                                {item.links.map((link, linkIndex) => (
                                  <a
                                    key={linkIndex}
                                    href={link.url}
                                    target={link.url.startsWith('/') ? undefined : '_blank'}
                                    rel={link.url.startsWith('/') ? undefined : 'noopener noreferrer'}
                                    className="inline-flex items-center px-4 py-2 border border-indigo-300 text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
                                  >
                                    {link.title}
                                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
            
            {filteredSections.length === 0 && (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
                <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  No questions match your search or filter criteria. Try adjusting your search or clearing filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Still have questions */}
      <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-xl text-white overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-indigo-100 mb-8">
              If you couldn't find the answer you're looking for, reach out to us directly. We're always happy to help!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://github.com/ProofLabDev" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50"
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
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white hover:bg-indigo-500"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;