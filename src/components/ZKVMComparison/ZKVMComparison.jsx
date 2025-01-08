import React, { useState } from 'react';

const ZKVMComparison = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const features = [
    {
      id: 'language',
      name: 'Frontend (Language)',
      sp1: { value: 'Rust (any LLVM-compiled language)', details: 'SP1 supports any language that can compile to LLVM IR, with primary support for Rust. This enables developers to write ZK programs in familiar languages.' },
      risc0: { value: 'Rust (core/std), C, C++', details: 'Risc0 provides native support for Rust with optional std library support via feature flag. Guest code runs in a RISC-V environment with core library by default. C and C++ support through LLVM.' },
    },
    {
      id: 'zktype',
      name: 'ZK Type',
      sp1: { 
        value: 'STARK + FRI (Baby Bear field) with STARK→SNARK wrapping', 
        details: 'SP1 uses STARKs with FRI over the Baby Bear field and includes a STARK→SNARK wrapping system for generating small SNARK proofs that can be efficiently verified on EVM chains.' 
      },
      risc0: { 
        value: 'STARK / RISC-V zkVM with STARK→SNARK', 
        details: <div>
          <p className="text-sm text-gray-600 mb-4">
            Three-circuit architecture for flexible proving:
          </p>
          <ul className="list-disc pl-4 mb-4 space-y-1">
            <li><strong>RISC-V Circuit:</strong> STARK circuit proving correct RISC-V execution</li>
            <li><strong>Recursion Circuit:</strong> STARK circuit optimized for cryptography and proof verification</li>
            <li><strong>STARK-to-SNARK Circuit:</strong> R1CS circuit for generating Groth16 proofs (~200kB) for EVM verification</li>
          </ul>
          <a href="https://dev.risczero.com/api/recursion" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-blue-600 hover:text-blue-800">
            Recursion Documentation →
          </a>
        </div>
      },
    },
    {
      id: 'unbounded',
      name: 'Unbounded Programs',
      sp1: { 
        value: '✅ (via STARK recursion)', 
        details: 'SP1 uses performant STARK recursion that allows proving the execution of arbitrarily long programs, making it suitable for complex computations.' 
      },
      risc0: { 
        value: '✅ (via Segments & Recursion)', 
        details: <div>
          <p className="text-sm text-gray-600 mb-4">
            Multi-stage proving process for unbounded computation:
          </p>
          <ul className="list-disc pl-4 mb-4 space-y-1">
            <li><strong>Segmentation:</strong> Program execution split into Segments</li>
            <li><strong>Lifting:</strong> Each SegmentReceipt converted to SuccinctReceipt</li>
            <li><strong>Joining:</strong> Pairs of SuccinctReceipts recursively joined</li>
            <li><strong>Compression:</strong> Final proof converted to ~200kB Groth16Receipt</li>
          </ul>
          <p className="text-sm text-gray-600">
            Supports composite, succinct, or groth16 receipts via prove_with_opts.
          </p>
        </div>
      },
    },
    {
      id: 'libraries',
      name: 'External Libraries',
      sp1: { value: '✅ (revm, reth, tendermint-rs, serde)', details: 'SP1 enables teams to reuse existing Rust crates like revm, reth, tendermint-rs, and serde to write ZKP logic in maintainable Rust code.' },
      risc0: { value: '✅ (with std feature flag)', details: 'Supports Rust standard library when enabled via feature flag. Guest code can use external libraries, with some limitations in no_std mode. Includes built-in support for serde and SHA-256.' },
    },
    {
      id: 'evm',
      name: 'EVM Verifier',
      sp1: { value: '✅ (via STARK→SNARK)', details: 'SP1 includes a STARK→SNARK wrapping system that generates small SNARK proofs for efficient verification on EVM chains.' },
      risc0: { value: '✅', details: 'Supports EVM verification through the client API. Includes verifier parameters for both standard and succinct receipts.' },
    },
    {
      id: 'gpu',
      name: 'Hardware Acceleration',
      sp1: { 
        value: '✅ Metal, CUDA, AVX', 
        details: <div>
          <p className="text-sm text-gray-600 mb-4">
            Multiple hardware acceleration options:
          </p>
          <ul className="list-disc pl-4 mb-4 space-y-1">
            <li><strong>CPU Acceleration:</strong> Supports AVX256 and AVX512 on x86 CPUs via Plonky3</li>
            <li><strong>Apple Silicon:</strong> Metal GPU acceleration</li>
            <li><strong>CUDA (Experimental):</strong> 
              <ul className="list-disc pl-4 mt-1">
                <li>Requires CUDA 12 & CUDA Container Toolkit</li>
                <li>24GB+ GPU for core/compressed proofs</li>
                <li>40GB+ GPU for shrink/wrap proofs</li>
              </ul>
            </li>
          </ul>
          <div className="flex space-x-4">
            <a href="https://docs.succinct.xyz/docs/generating-proofs/hardware-acceleration/avx" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-600 hover:text-blue-800">
              AVX Guide →
            </a>
            <a href="https://docs.succinct.xyz/docs/generating-proofs/hardware-acceleration/cuda" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-600 hover:text-blue-800">
              CUDA Guide →
            </a>
          </div>
        </div>
      },
      risc0: { 
        value: '✅ Metal, CUDA', 
        details: <div>
          <p className="text-sm text-gray-600 mb-4">
            GPU acceleration options:
          </p>
          <ul className="list-disc pl-4 mb-4 space-y-1">
            <li><strong>Apple Silicon:</strong> Metal GPU acceleration enabled by default</li>
            <li><strong>CUDA:</strong> Requires CUDA toolkit installation</li>
          </ul>
          <a href="https://dev.risczero.com/api/zkvm/cuda" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-blue-600 hover:text-blue-800">
            Documentation →
          </a>
        </div>
      },
    },
    {
      id: 'features',
      name: 'Special Features',
      sp1: { 
        value: '✅ Precompiles, STARK recursion', 
        details: 'Includes performant precompiles for hash functions and cryptographic signature verification. Supports STARK recursion for proving long computations.' 
      },
      risc0: { 
        value: '✅ Precompiles, Dev mode, Segments API', 
        details: 'Extensive precompile support including SHA-256, RSA, ECDSA (k256), EdDSA (curve25519), and modular multiplication. Includes development mode for faster testing and Segments API for partial execution proofs.' 
      },
    },
    {
      id: 'precompiles',
      name: 'Accelerators / Precompiles',
      sp1: { 
        value: '✅ Extensive Crypto Suite', 
        details: <div>
          <p className="text-sm text-gray-600 mb-4">
            Accelerated cryptographic operations through optimized implementations:
          </p>
          <ul className="list-disc pl-4 mb-4 space-y-1">
            <li><strong>Hash Functions:</strong> sha2 (0.9.8-0.10.8), sha3, tiny-keccak</li>
            <li><strong>Elliptic Curves:</strong> secp256k1, ed25519-dalek, curve25519-dalek</li>
            <li><strong>Pairing Crypto:</strong> BLS12-381, BN254</li>
            <li><strong>Performance:</strong> Up to 22x faster for BN254 pairing, 9.77x for KZG proofs</li>
          </ul>
          <div className="flex space-x-4">
            <a href="https://docs.succinct.xyz/docs/writing-programs/precompiles" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-600 hover:text-blue-800">
              Precompiles Documentation →
            </a>
            <a href="https://docs.succinct.xyz/docs/writing-programs/patched-crates" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-600 hover:text-blue-800">
              Patched Crates List →
            </a>
          </div>
        </div>
      },
      risc0: { 
        value: '✅ Extensive Crypto Suite', 
        details: <div>
          <p className="text-sm text-gray-600 mb-4">
            Specialized extension circuits for cryptographic operations:
          </p>
          <ul className="list-disc pl-4 mb-4 space-y-1">
            <li><strong>Hash Functions:</strong> sha2 (0.10.6-0.10.8)</li>
            <li><strong>Elliptic Curves:</strong> k256 (0.13.1-0.13.4), curve25519-dalek (4.1.0-4.1.2)</li>
            <li><strong>RSA:</strong> rsa (0.9.6)</li>
            <li><strong>Additional:</strong> Modular multiplication, accelerated versions of popular crypto crates</li>
          </ul>
          <a href="https://dev.risczero.com/api/zkvm/precompiles" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-blue-600 hover:text-blue-800">
            Documentation →
          </a>
        </div>
      },
    },
    {
      id: 'tooling',
      name: 'Developer Tools',
      sp1: { value: '✅ SDK, CLI tools', details: 'Provides SDK for proof generation and CLI tools for development workflow.' },
      risc0: { value: '✅ rzup, cargo-risczero', details: 'Includes rzup installer for toolchain management and cargo-risczero for project scaffolding. Extensive examples and tutorials available.' },
    },
    {
      id: 'audit',
      name: 'Audit Status',
      sp1: { value: '✅ Multiple audits completed', details: 'SP1 has undergone multiple audits from leading ZK security firms and is currently used in production by many top blockchain teams.' },
      risc0: { 
        value: '✅ Multiple audits completed', 
        details: <div>
          <p className="text-sm text-gray-600 mb-4">
            Risc0 has completed multiple security audits:
          </p>
          <ul className="list-disc pl-4 mb-4 space-y-1">
            <li>Hexens zkVM audit (October 2023)</li>
            <li>Additional audits available in their security repository</li>
          </ul>
          <div className="flex space-x-4">
            <a href="https://github.com/risc0/rz-security/tree/main/audits" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-600 hover:text-blue-800">
              View Audit Reports →
            </a>
          </div>
        </div>
      },
    },
    {
      id: 'license',
      name: 'License',
      sp1: { value: 'MIT / Apache 2.0', details: 'SP1 is 100% open-source under MIT/Apache 2.0 licenses with no code obfuscation and built to be contributor friendly.' },
      risc0: { value: 'MIT', details: 'Risc0 is open source under the MIT license.' },
    },
    {
      id: 'production',
      name: 'Production Usage',
      sp1: { value: '✅ (Blobstream, Vector, etc.)', details: 'SP1 is used in production by multiple projects including Blobstream (Celestia bridge) and Vector (Avail bridge).' },
      risc0: { value: '⚠️', details: 'Has production-ready features like disable-dev-mode flag to prevent security issues in production, but limited known production deployments.' },
    },
  ];

  const toggleFeatureExpansion = (featureId) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">zkVM Comparison</h1>
        <p className="text-xl text-gray-600">
          Compare features and performance between popular Zero Knowledge Virtual Machines
        </p>
      </div>

      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div 
              className="px-6 py-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
              onClick={() => toggleFeatureExpansion(feature.id)}
            >
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                <div className="mt-2 grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">SP1</h4>
                    <p className="text-sm text-gray-900">{feature.sp1.value}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Risc0</h4>
                    <p className="text-sm text-gray-900">{feature.risc0.value}</p>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <button className="text-gray-400 hover:text-gray-600">
                  {expandedFeature === feature.id ? '▼' : '▶'}
                </button>
              </div>
            </div>
            
            {expandedFeature === feature.id && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">SP1</h4>
                    <p className="text-sm text-gray-600">{feature.sp1.details}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Risc0</h4>
                    <p className="text-sm text-gray-600">{feature.risc0.details}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Hardware Requirements</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* SP1 Requirements */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">SP1</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">CPU</h4>
                  <p className="text-sm text-gray-600">16+ cores recommended. Single-core performance matters for execution & trace generation.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Memory</h4>
                  <p className="text-sm text-gray-600">16GB+ RAM, more if using more cores. Required for large matrices in memory.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Disk</h4>
                  <p className="text-sm text-gray-600">10GB+ for toolchain, circuit artifacts, and checkpointing.</p>
                </div>
              </div>
            </div>

            {/* Risc0 Requirements */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Risc0</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Core / Compress</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• CPU: 16+ cores (more is better)</li>
                    <li>• Memory: 16GB+ (more if you have more cores)</li>
                    <li>• Disk: 10GB+</li>
                    <li>• EVM Compatible: ❌</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Groth16 and PLONK (EVM)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• CPU: 16+ cores (more is better)</li>
                    <li>• Memory: 16GB+ (more is better)</li>
                    <li>• Disk: 10GB+</li>
                    <li>• EVM Compatible: ✅</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Mock / Network</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• CPU: 1+ (single-core performance matters)</li>
                    <li>• Memory: 8GB+ (more is better)</li>
                    <li>• Disk: 10GB+</li>
                    <li>• EVM Compatible: ✅</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> Hardware requirements may vary based on the complexity of your programs and the type of proofs being generated. 
              GPU acceleration can significantly improve performance when available.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Legend</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✅</span>
              <span className="text-sm text-gray-600">Supported</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">⚠️</span>
              <span className="text-sm text-gray-600">Partial/Limited Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">❌</span>
              <span className="text-sm text-gray-600">Not Supported</span>
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-600">
            Note: This comparison table is maintained by the ProofLab team and is updated regularly. 
            For the most up-to-date information, please refer to the official documentation of each project.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZKVMComparison; 