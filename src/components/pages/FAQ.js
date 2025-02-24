import React, { useState } from 'react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sections = [
    {
      title: "What is ProofLab?",
      category: "general",
      content: [
        {
          question: "What is ProofLab?",
          answer: `ProofLab is building the future of zero-knowledge infrastructure. Our mission is to accelerate 
            the adoption of zero-knowledge technology by providing comprehensive solutions and tools for 
            developers.`,
          details: `Our flagship product is a state-of-the-art benchmarking platform for Zero Knowledge Virtual 
            Machines (zkVMs), providing standardized performance metrics and comparisons. But that's just 
            the beginning - we're building a complete ecosystem of tools and services to support the ZK 
            developer community.`,
          links: [
            {
              title: "Learn more about our vision",
              url: "/about"
            }
          ]
        }
      ]
    },
    {
      title: "Understanding zkVMs",
      category: "technical",
      content: [
        {
          question: "What is a zkVM?",
          answer: `A Zero Knowledge Virtual Machine (zkVM) is a specialized virtual machine that can execute 
            programs while generating cryptographic proofs of correct execution. These proofs can be 
            verified by others without revealing the program's inputs or intermediate states.`,
          details: `zkVMs are particularly powerful because they allow developers to write programs in familiar 
            languages like Rust or C++ and automatically generate zero-knowledge proofs of their execution.`
        }
      ]
    },
    {
      title: "Benchmarking",
      category: "benchmarks",
      content: [
        {
          question: "What do the benchmarks measure?",
          answer: "Our benchmarks measure several key metrics:",
          details: [
            {
              title: "Proof Generation Time",
              description: "The total time taken to generate a proof, including both core proving and compression phases."
            },
            {
              title: "Throughput",
              description: "The number of cycles executed per second during proof generation, measured in Hz."
            },
            {
              title: "Resource Usage",
              description: "Memory and CPU utilization during the proving process."
            },
            {
              title: "Proof Size",
              description: "The size of the generated proof in bytes, which impacts verification costs and storage requirements."
            }
          ]
        },
        {
          question: "How are the benchmarks run?",
          answer: "Our benchmarks are run in controlled environments with standardized hardware configurations.",
          details: [
            "Uses the same input program across different zkVMs",
            "Measures complete end-to-end performance including compilation and proving",
            "Is run multiple times to ensure consistent results",
            "Includes detailed resource profiling"
          ]
        }
      ]
    },
    {
      title: "Choosing a zkVM",
      category: "guidance",
      content: [
        {
          question: "Which zkVM should I choose?",
          answer: "The choice of zkVM depends on your specific requirements. Consider factors such as:",
          details: [
            {
              title: "Performance Priority",
              items: [
                "Proof generation speed",
                "Verification time",
                "Resource requirements"
              ]
            },
            {
              title: "Development Experience",
              items: [
                "Programming language preference",
                "Tooling and documentation",
                "Community support"
              ]
            },
            {
              title: "Security Considerations",
              items: [
                "Cryptographic assumptions",
                "Audit status",
                "Production readiness"
              ]
            },
            {
              title: "Integration Needs",
              items: [
                "EVM compatibility",
                "External library support",
                "Hardware acceleration"
              ]
            }
          ]
        }
      ]
    },
    {
      title: "Contributing",
      category: "community",
      content: [
        {
          question: "Can I contribute?",
          answer: `Yes! ProofLab is an open platform, and we welcome contributions from the ZK community. 
            Whether it's adding new benchmarks, improving existing ones, or suggesting new features, 
            you can contribute by submitting a PR to our GitHub repository.`
        }
      ]
    },
    {
      title: "Our Approach",
      category: "technical",
      content: [
        {
          question: "What makes ProofLab's benchmarks unique?",
          answer: "ProofLab leverages an extended fork of zkRust for benchmarking:",
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
                "Write your program once in standard Rust",
                "Use familiar Rust libraries and tools",
                "Deploy to any supported zkVM (currently SP1 and RISC0)",
                "Get consistent performance metrics across platforms"
              ]
            },
            {
              title: "Benefits for Developers",
              items: [
                "Write Once, Prove Anywhere: Develop without being locked into a specific zkVM",
                "Easy Comparison: Test your use case across different zkVMs without rewriting code",
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
        }
      ]
    },
    {
      title: "Prior Art",
      category: "general",
      content: [
        {
          question: "What existing work does ProofLab build upon?",
          answer: "ProofLab builds upon and is inspired by existing work in the ZK benchmarking space:",
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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

      {/* FAQ Sections */}
      <div className="space-y-8">
        {filteredSections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{item.answer}</p>
                    
                    {/* Render details */}
                    {item.details && (
                      <div className="mt-4 space-y-4">
                        {Array.isArray(item.details) ? (
                          <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex}>
                                {typeof detail === 'string' ? detail : (
                                  <div className="mb-4">
                                    <h4 className="font-medium text-gray-900 mb-2">{detail.title}</h4>
                                    {detail.description && (
                                      <p className="text-gray-700">{detail.description}</p>
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
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-700">{item.details}</p>
                        )}
                      </div>
                    )}

                    {/* Render links */}
                    {item.links && item.links.length > 0 && (
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-4">
                          {item.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target={link.url.startsWith('/') ? undefined : '_blank'}
                              rel={link.url.startsWith('/') ? undefined : 'noopener noreferrer'}
                              className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                              {link.title} →
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 