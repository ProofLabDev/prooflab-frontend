import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const sections = {
    'Getting Started': [
      'Introduction to ZK Proofs',
      'Setting Up Your Environment',
      'Your First ZK Program'
    ],
    'Core Concepts': [
      'Understanding ZKVMs',
      'Program Structure',
      'Proving and Verification',
      'Memory Management'
    ],
    'Advanced Topics': [
      'Recursive Proofs',
      'Performance Optimization',
      'Security Best Practices',
      'Advanced Circuit Design'
    ],
    'Tutorials': [
      'Building a Private Voting System',
      'Zero-Knowledge Identity',
      'Private NFT Ownership',
      'Anonymous Credentials'
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
    'Introduction to ZK Proofs': {
      title: 'Introduction to Zero-Knowledge Proofs',
      description: 'Learn the fundamentals of zero-knowledge proofs and their applications in modern cryptography.',
      content: [
        {
          type: 'text',
          content: 'Zero-knowledge proofs are cryptographic methods that allow one party (the prover) to prove to another party (the verifier) that a statement is true without revealing any information beyond the validity of the statement itself.'
        },
        {
          type: 'code',
          language: 'rust',
          content: `// Example of a simple ZK proof program
fn main() {
    // Define a secret value
    let secret: u64 = 42;
    
    // Prove that we know a number that, when squared, equals 1764
    // without revealing the number itself
    let squared = secret * secret;
    assert_eq!(squared, 1764);
}`
        },
        {
          type: 'info',
          title: 'Key Properties',
          content: [
            'Completeness: If the statement is true, an honest verifier will be convinced by an honest prover',
            'Soundness: If the statement is false, no cheating prover can convince an honest verifier',
            'Zero-Knowledge: The verifier learns nothing other than the fact that the statement is true'
          ]
        }
      ]
    }
    // Add more content sections here
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
  const [activeSection, setActiveSection] = useState('Introduction to ZK Proofs');

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