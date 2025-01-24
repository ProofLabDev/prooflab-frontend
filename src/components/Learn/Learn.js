import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const sections = {
    'Getting Started': [
      'Introduction to Zero Knowledge',
      'Getting Started with zkRust'
    ],
    'Core Concepts': [
      'Understanding zkVMs in Depth',
      'zkRust Program Structure'
    ],
    'Advanced Topics': [
      'Performance Optimization',
      'Example Applications'
    ]
  };

  return (
    <div className="w-64 h-screen overflow-y-auto fixed left-0 top-16 bg-white border-r border-gray-200 p-4">
      <div className="space-y-8">
        {Object.entries(sections).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
              {category}
            </h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setActiveSection(item)}
                    className={`w-full text-left px-2 py-1.5 text-sm rounded-md ${
                      activeSection === item
                        ? 'text-indigo-600 bg-indigo-50 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContentSection = ({ section }) => {
  const content = {
    'Introduction to Zero Knowledge': {
      title: 'Introduction to Zero Knowledge',
      description: 'Learn the fundamentals of Zero Knowledge proofs and zkVMs',
      content: [
        {
          type: 'text',
          content: 'Zero-knowledge proofs (ZKPs) are cryptographic methods that allow one party (the prover) to prove to another party (the verifier) that a statement is true without revealing any information beyond the validity of the statement itself. This powerful concept enables privacy-preserving computation and verification.'
        },
        {
          type: 'info',
          title: 'Key Properties of Zero Knowledge Proofs',
          content: [
            'Completeness: If the statement is true, an honest verifier will be convinced by an honest prover',
            'Soundness: If the statement is false, no cheating prover can convince an honest verifier',
            'Zero-Knowledge: The verifier learns nothing other than the fact that the statement is true'
          ]
        },
        {
          type: 'text',
          content: 'There are several types of zero-knowledge proofs, but the most practical for general-purpose computation are SNARKs (Succinct Non-interactive ARguments of Knowledge) and STARKs (Scalable Transparent ARguments of Knowledge).'
        },
        {
          type: 'info',
          title: 'SNARKs vs STARKs',
          content: [
            'SNARKs: Smaller proof size, faster verification, but require trusted setup',
            'STARKs: No trusted setup, post-quantum secure, but larger proof size',
            'STARK→SNARK: Combines STARK security with SNARK efficiency',
            'Both support general computation through arithmetic circuits'
          ]
        },
        {
          type: 'text',
          content: 'A Zero Knowledge Virtual Machine (zkVM) is a specialized virtual machine that can execute programs while generating cryptographic proofs of correct execution. These proofs can be verified by others without revealing the program\'s inputs or intermediate states. zkVMs make it possible to write programs in familiar languages like Rust and automatically generate zero-knowledge proofs of their execution.'
        },
        {
          type: 'info',
          title: 'Why Use a zkVM?',
          content: [
            'Write programs in familiar languages (Rust, C++)',
            'Automatic proof generation for program execution',
            'No need to manually design circuits',
            'Hardware acceleration support for better performance',
            'Production-ready security through audited implementations'
          ]
        },
        {
          type: 'text',
          content: 'zkVMs typically work by translating program execution into a series of arithmetic constraints that can be proven using SNARKs or STARKs. This allows developers to focus on writing their application logic rather than dealing with the complexities of zero-knowledge proof systems.'
        },
        {
          type: 'info',
          title: 'Common zkVM Applications',
          content: [
            'Private Smart Contract Execution',
            'Verifiable Computation Outsourcing',
            'Privacy-Preserving State Updates',
            'Secure Multi-Party Computation',
            'Identity and Credential Verification'
          ]
        },
        {
          type: 'text',
          content: 'The zkVM ecosystem is primarily dominated by two major implementations: RISC0 and SP1. Each has its own unique architecture and trade-offs, but both enable developers to write and prove general-purpose programs.'
        },
        {
          type: 'info',
          title: 'Key zkVM Components',
          content: [
            'Execution Environment: Runs the program and records execution trace',
            'Proving System: Generates proof of correct execution',
            'Verification System: Validates proofs efficiently',
            'Memory Management: Handles program state and storage',
            'I/O Interface: Manages inputs and outputs securely'
          ]
        },
        {
          type: 'text',
          content: 'When writing programs for zkVMs, developers need to consider certain constraints and best practices to ensure efficient proof generation:'
        },
        {
          type: 'info',
          title: 'zkVM Development Considerations',
          content: [
            'Deterministic Execution: Programs must be deterministic',
            'Resource Constraints: Memory and computation affect proving time',
            'Precompiles: Use optimized operations when available',
            'I/O Handling: Carefully manage public and private inputs',
            'Proof Size: Consider verification costs and storage requirements'
          ]
        },
        {
          type: 'text',
          content: 'zkRust simplifies zkVM development by providing a unified interface for multiple zkVMs, allowing developers to write code once and deploy to different proving systems. This abstraction helps developers focus on their application logic while maintaining the flexibility to choose the most suitable zkVM for their specific needs.'
        }
      ]
    },
    'Understanding zkVMs in Depth': {
      title: 'Understanding Zero-Knowledge Virtual Machines',
      description: 'Deep dive into RISC0 and SP1 zkVMs',
      content: [
        {
          type: 'text',
          content: 'Zero-Knowledge Virtual Machines (ZKVMs) are specialized runtime environments that enable the execution of programs while generating zero-knowledge proofs of their correct execution.'
        },
        {
          type: 'info',
          title: 'RISC0',
          content: [
            'RISC-V based zkVM with STARK→SNARK architecture',
            'Supports Rust (core/std), C, and C++ through LLVM',
            'Features extensive cryptographic precompiles including SHA-256, RSA, and ECDSA',
            'Production-ready with zkVM 1.0 release and multiple security audits'
          ]
        },
        {
          type: 'code',
          language: 'rust',
          content: `// Example RISC0 program
use risc0_zkvm::guest::env;

fn main() {
    // Read private input
    let secret: u64 = env::read();
    
    // Perform computation
    let result = expensive_computation(secret);
    
    // Public output
    env::commit(&result);
}`
        },
        {
          type: 'info',
          title: 'SP1',
          content: [
            'STARK + FRI based zkVM with STARK→SNARK wrapping',
            'Supports any LLVM-compiled language, with primary Rust support',
            'Includes optimized precompiles for hash functions and cryptographic operations',
            'Used in production by projects like Blobstream and Vector'
          ]
        }
      ]
    },
    'Getting Started with zkRust': {
      title: 'Getting Started with zkRust',
      description: 'Learn how to use zkRust for cross-zkVM development',
      content: [
        {
          type: 'text',
          content: 'zkRust is a CLI tool that simplifies developing zk applications in Rust using zkVMs such as SP1 or RISC0. It abstracts the complexity of using zkVMs and provides developers the choice of which zkVM they would like to develop with.'
        },
        {
          type: 'info',
          title: 'Prerequisites',
          content: [
            'Rust installed on your machine (rustc, cargo)',
            'Basic understanding of Rust programming',
            'Git for version control',
            'Docker (optional, for containerized development)'
          ]
        },
        {
          type: 'text',
          content: 'There are two ways to install zkRust: direct installation using the install script, or building from source for local development.'
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Direct installation
curl -L https://raw.githubusercontent.com/yetanotherco/zkRust/main/install_zkrust.sh | bash

# For local development
git clone https://github.com/ProofLabDev/zkRust.git
cd zkRust
make install`
        },
        {
          type: 'info',
          title: 'Project Structure',
          content: [
            'main.rs: Contains the main program logic executed in the zkVM',
            'input(): Optional function for preprocessing before VM execution',
            'output(): Optional function for post-processing after VM execution',
            'lib/: Optional directory for shared libraries'
          ]
        },
        {
          type: 'code',
          language: 'text',
          content: `# Basic project structure
.
├── Cargo.toml
├── lib/          # Optional
└── src
    └── main.rs`
        },
        {
          type: 'text',
          content: 'To create your first zkRust program, you need to define a main() function that will be executed within the zkVM. You can also optionally define input() and output() functions for pre/post processing.'
        },
        {
          type: 'code',
          language: 'rust',
          content: `use zk_rust_io;

// Optional: Runs before zkVM execution
pub fn input() {
    let data = "Hello zkRust!".to_string();
    // Write data to be used in the VM
    zk_rust_io::write(&data);
}

// Main function executed in zkVM
pub fn main() {
    // Read input data in the VM
    let message: String = zk_rust_io::read();
    
    // Perform computation
    let result = process_data(message);
    
    // Write result to VM output buffer
    zk_rust_io::commit(&result);
}

// Optional: Runs after zkVM execution
pub fn output() {
    // Read result from VM output buffer
    let result: String = zk_rust_io::out();
    println!("Result: {}", result);
}`
        },
        {
          type: 'info',
          title: 'Running Your Program',
          content: [
            'Generate proof with RISC0: cargo run --release -- prove-risc0',
            'Generate proof with SP1: cargo run --release -- prove-sp1',
            'Use --precompiles flag for hardware acceleration',
            'Use --submit-to-aligned to submit proofs to Aligned Layer'
          ]
        },
        {
          type: 'text',
          content: 'zkRust provides a unified I/O interface through the zk_rust_io crate. Add it to your Cargo.toml:'
        },
        {
          type: 'code',
          language: 'toml',
          content: `[dependencies]
zk_rust_io = { git = "https://github.com/yetanotherco/zkRust.git" }`
        },
        {
          type: 'info',
          title: 'Available Examples',
          content: [
            'Fibonacci number computation',
            'RSA key verification',
            'ECDSA signature verification',
            'Blockchain state diff verification',
            'SHA256 hash computation',
            'Interactive quiz system'
          ]
        },
        {
          type: 'text',
          content: 'For faster development and better performance when using Docker, you can mount the Rust cache directories:'
        },
        {
          type: 'code',
          language: 'bash',
          content: `docker run -it \\
  -v "$HOME/.cargo/registry:/root/.cargo/registry" \\
  -v "$HOME/.cargo/git:/root/.cargo/git" \\
  zkrust bash`
        }
      ]
    }
  };

  const sectionContent = content[section];
  if (!sectionContent) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-500">
          Content for "{section}" is coming soon...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{sectionContent.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{sectionContent.description}</p>
      
      <div className="space-y-6">
        {sectionContent.content.map((block, index) => {
          switch (block.type) {
            case 'text':
              return (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {block.content}
                </p>
              );
            case 'code':
              return (
                <div key={index} className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-gray-100">
                    <code>{block.content}</code>
                  </pre>
                </div>
              );
            case 'info':
              return (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-blue-800 font-semibold mb-2">{block.title}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {block.content.map((item, i) => (
                      <li key={i} className="text-blue-700">{item}</li>
                    ))}
                  </ul>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8">
        <div className="flex justify-between items-center">
          <Link
            to="#"
            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
          >
            ← Previous
          </Link>
          <Link
            to="#"
            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
          >
            Next →
          </Link>
        </div>
      </div>
    </div>
  );
};

const Learn = () => {
  const [activeSection, setActiveSection] = useState('Introduction to Zero Knowledge');

  return (
    <div className="min-h-screen bg-white pt-16">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="pl-64">
        <ContentSection section={activeSection} />
      </div>
    </div>
  );
};

export default Learn; 