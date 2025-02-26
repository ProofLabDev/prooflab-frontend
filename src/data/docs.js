const docs = {
  sections: {
    "getting-started": {
      title: "Getting Started",
      pages: [
        {
          slug: "introduction",
          title: "Introduction to prooflab-rs",
          description: "Learn about the prooflab-rs SDK for cross-zkVM development",
          updated: "March 2025",
          content: [
            {
              type: "text",
              content: "prooflab-rs is a powerful SDK that allows developers to write zero-knowledge applications in Rust that can run on multiple zkVMs without modification. It provides a unified interface for zkVM development, letting you write once and deploy to any supported system."
            },
            {
              type: "info",
              title: "About prooflab-rs",
              content: "prooflab-rs is a fork of zkRust with significant new functionality added. It maintains compatibility with the original codebase while extending it with additional features and optimizations."
            },
            {
              type: "heading",
              level: 2,
              id: "why-prooflab-rs",
              content: "Why prooflab-rs?"
            },
            {
              type: "text",
              content: "Zero-knowledge virtual machines (zkVMs) are powerful tools for generating cryptographic proofs of computation. However, each zkVM has its own SDK, APIs, and development tools, making it challenging to compare different systems or switch between them."
            },
            {
              type: "text",
              content: "prooflab-rs solves this problem by providing a consistent abstraction layer that works across multiple zkVMs, allowing you to:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Write your code once in Rust and run it on any supported zkVM",
                "Easily compare performance and functionality between different systems",
                "Future-proof your applications against changes in the ZK ecosystem",
                "Leverage familiar Rust tools and libraries in your zero-knowledge applications"
              ]
            },
            {
              type: "heading",
              level: 2,
              id: "supported-zkvms",
              content: "Supported zkVMs"
            },
            {
              type: "text",
              content: "prooflab-rs currently supports the following zero-knowledge virtual machines:"
            },
            {
              type: "table",
              headers: ["zkVM", "Status", "Features"],
              rows: [
                ["RISC0", "Stable", "STARK→SNARK, full Rust support, GPU acceleration"],
                ["SP1", "Stable", "STARK-based, LLVM support, optimized for performance"],
                ["Cairo VM", "Coming Soon", "Powers Starknet, utilizes STARKs"]
              ]
            },
            {
              type: "heading",
              level: 2,
              id: "key-features",
              content: "Key Features"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Cross-zkVM Compatibility: Write Rust code that works on any supported zkVM",
                "Unified I/O Interface: Consistent API for handling inputs and outputs across systems",
                "Optimized Precompiles: Fast implementations of common cryptographic operations",
                "Development Tools: CLI utilities for building, testing, and deploying",
                "Benchmarking: Built-in performance measurement and comparison tools",
                "Extensive Documentation: Guides, examples, and API references"
              ]
            }
          ]
        },
        {
          slug: "installation",
          title: "Installation",
          description: "Set up prooflab-rs and its dependencies",
          updated: "March 2025",
          content: [
            {
              type: "heading",
              level: 2,
              id: "prerequisites",
              content: "Prerequisites"
            },
            {
              type: "text",
              content: "Before installing prooflab-rs, ensure you have the following prerequisites installed on your system:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Rust (latest stable version, 1.75.0+)",
                "Cargo package manager",
                "Git version control",
                "C++ build tools (gcc/clang on Linux/macOS, MSVC on Windows)"
              ]
            },
            {
              type: "info",
              title: "Rust Installation",
              content: "If you don't have Rust installed, you can install it using rustup: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
            },
            {
              type: "heading",
              level: 2,
              id: "installation-methods",
              content: "Installation Methods"
            },
            {
              type: "text",
              content: "There are two primary ways to install prooflab-rs:"
            },
            {
              type: "heading",
              level: 3,
              id: "method-1-install-script",
              content: "Method 1: Using the Install Script"
            },
            {
              type: "text",
              content: "The easiest way to install prooflab-rs is using our automated install script:"
            },
            {
              type: "code",
              language: "bash",
              content: "curl -L https://raw.githubusercontent.com/ProofLabDev/prooflab-rs/main/install_prooflab.sh | bash"
            },
            {
              type: "text",
              content: "This script will install the prooflab-rs CLI tool globally on your system, making it available from anywhere."
            },
            {
              type: "heading",
              level: 3,
              id: "method-2-from-source",
              content: "Method 2: Building from Source"
            },
            {
              type: "text",
              content: "If you prefer to build from source or want to contribute to the project, you can clone the repository and build it manually:"
            },
            {
              type: "code",
              language: "bash",
              content: "# Clone the repository\ngit clone https://github.com/ProofLabDev/prooflab-rs.git\ncd prooflab-rs\n\n# Build and install\nmake install"
            },
            {
              type: "info",
              variant: "warning",
              title: "Build Time Warning",
              content: "Building from source may take several minutes, especially on the first build, as it compiles all dependencies."
            },
            {
              type: "heading",
              level: 2,
              id: "verifying-installation",
              content: "Verifying Installation"
            },
            {
              type: "text",
              content: "After installation, verify that prooflab-rs is correctly installed by running:"
            },
            {
              type: "code",
              language: "bash",
              content: "prooflab-rs --version"
            },
            {
              type: "text",
              content: "You should see output showing the installed version of prooflab-rs. If the command is not found, make sure your PATH includes the installation directory."
            },
            {
              type: "heading",
              level: 2,
              id: "installing-zkvms",
              content: "Installing zkVMs"
            },
            {
              type: "text",
              content: "prooflab-rs works with multiple zkVMs, but you'll need to install them separately. Here's how to install the most common ones:"
            },
            {
              type: "code",
              language: "bash",
              content: "# Install RISC0\nprooflab-rs install risc0\n\n# Install SP1\nprooflab-rs install sp1"
            },
            {
              type: "info",
              title: "Optional Components",
              content: "You can install additional components and precompiles using the prooflab-rs install command. Run prooflab-rs install --help to see all available options."
            }
          ]
        },
        {
          slug: "quickstart",
          title: "Quick Start Guide",
          description: "Build your first prooflab-rs application",
          updated: "March 2025",
          content: [
            {
              type: "text",
              content: "This guide will walk you through creating and running a simple prooflab-rs application. We'll build a program that computes a Fibonacci number and generates a zero-knowledge proof of the computation."
            },
            {
              type: "heading",
              level: 2,
              id: "create-project",
              content: "Create a New Project"
            },
            {
              type: "text",
              content: "First, let's create a new prooflab-rs project using the CLI:"
            },
            {
              type: "code",
              language: "bash",
              content: "prooflab-rs new fibonacci-example\ncd fibonacci-example"
            },
            {
              type: "text",
              content: "This creates a new directory with the basic project structure needed for a prooflab-rs application."
            },
            {
              type: "heading",
              level: 2,
              id: "project-structure",
              content: "Project Structure"
            },
            {
              type: "text",
              content: "The generated project has the following structure:"
            },
            {
              type: "code",
              language: "text",
              content: "fibonacci-example/\n├── Cargo.toml           # Project dependencies\n├── src/\n│   └── main.rs          # Main program code\n└── prooflab.toml        # prooflab-rs configuration"
            },
            {
              type: "heading",
              level: 2,
              id: "write-program",
              content: "Write the Program"
            },
            {
              type: "text",
              content: "Now, let's edit src/main.rs to implement our Fibonacci calculator:"
            },
            {
              type: "code",
              language: "rust",
              filename: "src/main.rs",
              content: "use prooflab_io;\n\n// Input function: runs before the zkVM execution\npub fn input() {\n    // The number we want to calculate fibonacci for\n    let n: u32 = 10;\n    prooflab_io::write(&n);\n}\n\n// Main function: runs inside the zkVM\npub fn main() {\n    // Read the input value\n    let n: u32 = prooflab_io::read();\n    \n    // Calculate the nth Fibonacci number\n    let result = fibonacci(n);\n    \n    // Commit the result (will be part of the proof)\n    prooflab_io::commit(&result);\n}\n\n// Output function: runs after the zkVM execution\npub fn output() {\n    // Read the result\n    let fibonacci_result: u64 = prooflab_io::out();\n    println!(\"The result is: {}\", fibonacci_result);\n}\n\n// Recursive Fibonacci function\nfn fibonacci(n: u32) -> u64 {\n    match n {\n        0 => 0,\n        1 => 1,\n        _ => fibonacci(n - 1) + fibonacci(n - 2),\n    }\n}"
            },
            {
              type: "heading",
              level: 2,
              id: "run-program",
              content: "Run the Program"
            },
            {
              type: "text",
              content: "With our program written, we can now run it on different zkVMs."
            },
            {
              type: "heading",
              level: 3,
              id: "run-with-risc0",
              content: "Run with RISC0"
            },
            {
              type: "code",
              language: "bash",
              content: "prooflab-rs run --zkvm risc0"
            },
            {
              type: "heading",
              level: 3,
              id: "run-with-sp1",
              content: "Run with SP1"
            },
            {
              type: "code",
              language: "bash",
              content: "prooflab-rs run --zkvm sp1"
            },
            {
              type: "info",
              title: "Expected Output",
              content: "In both cases, you should see output indicating that the proof was generated successfully, along with the final result: The result is: 55"
            },
            {
              type: "heading",
              level: 2,
              id: "verify-proof",
              content: "Verify the Proof"
            },
            {
              type: "text",
              content: "After running the program, a proof file is generated. You can verify this proof separately:"
            },
            {
              type: "code",
              language: "bash",
              content: "prooflab-rs verify --zkvm risc0 --proof target/proofs/risc0_proof.json"
            },
            {
              type: "heading",
              level: 2,
              id: "next-steps",
              content: "Next Steps"
            },
            {
              type: "text",
              content: "Congratulations! You've created and run your first prooflab-rs application. This simple example demonstrates the core workflow: write, prove, and verify."
            },
            {
              type: "text",
              content: "Next, you can explore more complex examples, learn about the API in detail, or start building your own zero-knowledge applications using prooflab-rs."
            }
          ]
        }
      ]
    },
    "core-concepts": {
      title: "Core Concepts",
      pages: [
        {
          slug: "architecture",
          title: "Architecture Overview",
          description: "Understanding how prooflab-rs works with different zkVMs",
          updated: "March 2025",
          content: [
            {
              type: "text",
              content: "prooflab-rs provides a unified abstraction layer that allows your Rust code to run on multiple zkVM systems. This section explains the architecture that makes this possible."
            },
            {
              type: "heading",
              level: 2,
              id: "high-level-overview",
              content: "High-Level Overview"
            },
            {
              type: "text",
              content: "At a high level, prooflab-rs consists of several key components:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "The Core SDK: Provides the unified API and abstractions for cross-zkVM development",
                "zkVM Adapters: Backend implementations for each supported zkVM",
                "I/O System: Handles communication between the host and the zkVM guest environment",
                "CLI: Command-line interface for project management, building, and running"
              ]
            },
            {
              type: "heading",
              level: 2,
              id: "architecture-diagram",
              content: "Architecture Diagram"
            },
            {
              type: "text",
              content: "The following diagram illustrates how prooflab-rs connects your application code with different zkVM backends:"
            },
            {
              type: "mermaid",
              content: `flowchart TD
    A[Your Rust Code] --> B[prooflab-rs SDK]
    B --> C[zkVM Adapters]
    C --> D[RISC0 Adapter]
    C --> E[SP1 Adapter]
    C --> F[Cairo Adapter]
    C --> G[...]
    
    style A fill:#f9f9f9,stroke:#333,stroke-width:2px
    style B fill:#e8f4f8,stroke:#0077b6,stroke-width:2px
    style C fill:#e0f2fe,stroke:#0ea5e9,stroke-width:2px
    style D fill:#f0f9ff,stroke:#7dd3fc,stroke-width:1px
    style E fill:#f0f9ff,stroke:#7dd3fc,stroke-width:1px
    style F fill:#f0f9ff,stroke:#7dd3fc,stroke-width:1px
    style G fill:#f0f9ff,stroke:#7dd3fc,stroke-width:1px,stroke-dasharray: 5 5`
            },
            {
              type: "heading",
              level: 2,
              id: "execution-flow",
              content: "Execution Flow"
            },
            {
              type: "text",
              content: "When you run a prooflab-rs application, the following process occurs:"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "The input() function runs on the host to prepare data for the zero-knowledge computation",
                "Your main() function runs inside the selected zkVM environment",
                "The zkVM adapter translates your code to the format required by the specific zkVM",
                "The zkVM executes your program and generates a proof of correct execution",
                "The output() function runs on the host to process the results"
              ]
            },
            {
              type: "mermaid",
              content: `sequenceDiagram
    participant Host
    participant ProofLabRS as prooflab-rs SDK
    participant zkVM
    participant Verifier
    
    Host->>ProofLabRS: Run Program
    activate ProofLabRS
    ProofLabRS->>Host: Execute input() function
    activate Host
    Host-->>ProofLabRS: Prepare Input Data
    deactivate Host
    
    ProofLabRS->>zkVM: Execute main() in zkVM
    activate zkVM
    Note over zkVM: Program Execution
    zkVM-->>zkVM: Generate Proof
    zkVM-->>ProofLabRS: Return Result & Proof
    deactivate zkVM
    
    ProofLabRS->>Host: Execute output() function
    activate Host
    Host-->>ProofLabRS: Process Results
    deactivate Host
    
    ProofLabRS-->>Host: Return Final Output
    deactivate ProofLabRS
    
    Note right of Verifier: Later Verification
    Host->>Verifier: Submit Proof
    Verifier-->>Host: Verification Result`
            },
            {
              type: "heading",
              level: 2,
              id: "io-system",
              content: "I/O System"
            },
            {
              type: "text",
              content: "The prooflab-rs I/O system handles communication between the host and guest environments:"
            },
            {
              type: "mermaid",
              content: `classDiagram
    class HostEnvironment {
        +input() void
        +output() void
    }
    
    class GuestEnvironment {
        +main() void
    }
    
    class ProoflabIO {
        +write(data) void
        +write_public(data) void
        +read() T
        +read_public() T
        +commit(result) void
        +out() T
    }
    
    HostEnvironment --> ProoflabIO : Uses
    GuestEnvironment --> ProoflabIO : Uses
    
    note for HostEnvironment "Runs before/after zkVM"
    note for GuestEnvironment "Runs inside zkVM"`
            },
            {
              type: "code",
              language: "rust",
              content: "// Host environment (before/after zkVM execution)\nfn input() {\n    let data = 42;\n    prooflab_io::write(&data);  // Write data to zkVM input\n}\n\n// Guest environment (inside zkVM)\nfn main() {\n    let data: u32 = prooflab_io::read();  // Read data from input\n    // Process data...\n    prooflab_io::commit(&result);  // Write result to zkVM output\n}\n\n// Host environment (after zkVM execution)\nfn output() {\n    let result: u32 = prooflab_io::out();  // Read result from zkVM output\n    println!(\"Result: {}\", result);\n}"
            },
            {
              type: "heading",
              level: 2,
              id: "public-vs-private",
              content: "Public vs. Private Inputs"
            },
            {
              type: "text",
              content: "In zero-knowledge systems, it's crucial to understand the distinction between public and private inputs:"
            },
            {
              type: "info",
              title: "Input Types",
              content: [
                "Private Inputs: Data that remains hidden but is used in the computation (passed via prooflab_io::read())",
                "Public Inputs: Data that is visible to verifiers and constrains the proof (passed via prooflab_io::public_read())",
                "Public Outputs: Results that are revealed and verified (committed via prooflab_io::commit())"
              ]
            },
            {
              type: "text",
              content: "This distinction is essential for designing secure zero-knowledge applications where some data must remain private while other data must be verifiable."
            }
          ]
        },
        {
          slug: "io-api",
          title: "I/O System & API",
          description: "Working with inputs and outputs in prooflab-rs",
          updated: "March 2025",
          content: [
            {
              type: "text",
              content: "The I/O system is a core component of prooflab-rs that enables communication between the host environment and the zkVM guest environment. This page explains how to use the I/O API effectively."
            },
            {
              type: "heading",
              level: 2,
              id: "io-overview",
              content: "I/O Overview"
            },
            {
              type: "text",
              content: "prooflab-rs provides a comprehensive I/O system through the prooflab_io module. This module offers functions for reading inputs, writing outputs, and committing public values."
            },
            {
              type: "heading",
              level: 2,
              id: "program-structure",
              content: "Program Structure"
            },
            {
              type: "text",
              content: "A typical prooflab-rs program consists of three main functions:"
            },
            {
              type: "code",
              language: "rust",
              content: "// Host environment: Runs before zkVM execution\npub fn input() {\n    // Prepare and write inputs\n}\n\n// Guest environment: Runs inside the zkVM\npub fn main() {\n    // Read inputs, perform computation, commit outputs\n}\n\n// Host environment: Runs after zkVM execution\npub fn output() {\n    // Read and process outputs\n}"
            },
            {
              type: "info",
              title: "Function Execution Environment",
              content: "Only the main() function runs inside the zkVM and generates a proof. The input() and output() functions run in the host environment and are not part of the proven computation."
            },
            {
              type: "heading",
              level: 2,
              id: "input-api",
              content: "Input API"
            },
            {
              type: "text",
              content: "The input API allows you to send data to the zkVM guest environment."
            },
            {
              type: "heading",
              level: 3,
              id: "writing-inputs",
              content: "Writing Inputs (Host Side)"
            },
            {
              type: "code",
              language: "rust",
              content: "pub fn input() {\n    // Write a single value\n    let number: u32 = 42;\n    prooflab_io::write(&number);\n    \n    // Write a vector\n    let vector: Vec<u8> = vec![1, 2, 3, 4, 5];\n    prooflab_io::write(&vector);\n    \n    // Write a complex structure\n    let data = MyStruct { field1: 123, field2: \"hello\".to_string() };\n    prooflab_io::write(&data);\n}"
            },
            {
              type: "info",
              title: "Serialization",
              content: "All types passed to prooflab_io::write() must implement the Serialize trait from serde."
            },
            {
              type: "heading",
              level: 3,
              id: "reading-inputs",
              content: "Reading Inputs (Guest Side)"
            },
            {
              type: "code",
              language: "rust",
              content: "pub fn main() {\n    // Read a single value\n    let number: u32 = prooflab_io::read();\n    \n    // Read a vector\n    let vector: Vec<u8> = prooflab_io::read();\n    \n    // Read a complex structure\n    let data: MyStruct = prooflab_io::read();\n}"
            },
            {
              type: "info",
              title: "Deserialization",
              content: "All types read using prooflab_io::read() must implement the Deserialize trait from serde."
            },
            {
              type: "heading",
              level: 3,
              id: "public-inputs",
              content: "Public Inputs"
            },
            {
              type: "text",
              content: "Public inputs are values that are visible to both the prover and verifier. They can be used to constrain the proof."
            },
            {
              type: "code",
              language: "rust",
              content: "// Host side\npub fn input() {\n    // Write a public input\n    prooflab_io::write_public(&public_value);\n}\n\n// Guest side\npub fn main() {\n    // Read a public input\n    let public_value: u32 = prooflab_io::read_public();\n}"
            },
            {
              type: "heading",
              level: 2,
              id: "output-api",
              content: "Output API"
            },
            {
              type: "text",
              content: "The output API allows you to get data from the zkVM guest environment."
            },
            {
              type: "heading",
              level: 3,
              id: "committing-outputs",
              content: "Committing Outputs (Guest Side)"
            },
            {
              type: "code",
              language: "rust",
              content: "pub fn main() {\n    // Perform computation...\n    \n    // Commit a single result value\n    let result: u64 = compute_result();\n    prooflab_io::commit(&result);\n    \n    // Commit multiple values\n    let result2 = compute_another_result();\n    prooflab_io::commit(&result2);\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "reading-outputs",
              content: "Reading Outputs (Host Side)"
            },
            {
              type: "code",
              language: "rust",
              content: "pub fn output() {\n    // Read committed outputs in the same order they were committed\n    let result1: u64 = prooflab_io::out();\n    let result2: SomeType = prooflab_io::out();\n    \n    println!(\"Results: {} and {:?}\", result1, result2);\n}"
            },
            {
              type: "info",
              variant: "warning",
              title: "Order Matters",
              content: "Outputs must be read in the same order they were committed. Each call to prooflab_io::out() reads the next committed value."
            },
            {
              type: "heading",
              level: 2,
              id: "logging",
              content: "Logging"
            },
            {
              type: "text",
              content: "prooflab-rs provides logging capabilities for debugging purposes:"
            },
            {
              type: "code",
              language: "rust",
              content: "// Inside the guest environment\npub fn main() {\n    // Log a message (only visible during development)\n    prooflab_io::log(\"Processing started\");\n    \n    // Log with formatted values\n    prooflab_io::log(&format!(\"Processing value: {}\", value));\n}"
            },
            {
              type: "info",
              variant: "warning",
              title: "Log Performance Impact",
              content: "Logging can significantly impact proof generation performance. Use it sparingly in production code."
            }
          ]
        },
        {
          slug: "cross-zkvm",
          title: "Cross-zkVM Development",
          description: "Writing code that works on multiple zkVMs",
          updated: "March 2025",
          content: [
            {
              type: "text",
              content: "One of the key benefits of prooflab-rs is the ability to write code once and run it on multiple zkVMs. This page explains how to write code that works well across different systems."
            },
            {
              type: "heading",
              level: 2,
              id: "principles",
              content: "Core Principles"
            },
            {
              type: "text",
              content: "To write effective cross-zkVM code, follow these principles:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Use Standard Rust: Stick to standard Rust features that are supported by all zkVMs",
                "Use the prooflab_io API: Always use the official API for I/O operations",
                "Test on Multiple zkVMs: Regularly test your code on all target zkVMs",
                "Understand Limitations: Be aware of zkVM-specific limitations and work around them"
              ]
            },
            {
              type: "heading",
              level: 2,
              id: "compatibility-features",
              content: "Compatibility Features"
            },
            {
              type: "text",
              content: "prooflab-rs provides feature flags to enable or disable zkVM-specific functionality:"
            },
            {
              type: "code",
              language: "toml",
              filename: "Cargo.toml",
              content: "[dependencies]\nprooflab_io = { version = \"0.2.0\", features = [\"risc0\", \"sp1\"] }"
            },
            {
              type: "text",
              content: "You can also use conditional compilation to include zkVM-specific code:"
            },
            {
              type: "code",
              language: "rust",
              content: "#[cfg(feature = \"risc0\")]\nfn risc0_specific_function() {\n    // RISC0-specific code\n}\n\n#[cfg(feature = \"sp1\")]\nfn sp1_specific_function() {\n    // SP1-specific code\n}"
            },
            {
              type: "heading",
              level: 2,
              id: "common-limitations",
              content: "Common Limitations"
            },
            {
              type: "text",
              content: "When writing cross-zkVM code, be aware of these common limitations:"
            },
            {
              type: "table",
              headers: ["Feature", "RISC0", "SP1", "Workaround"],
              rows: [
                ["Floating Point", "Limited", "Limited", "Use fixed-point arithmetic"],
                ["Dynamic Memory", "Supported", "Supported", "Prefer static allocation when possible"],
                ["Standard Library", "Partial", "Partial", "Use prooflab-rs alternatives"],
                ["External Libraries", "Limited", "Limited", "Prefer pure Rust libraries"],
                ["System Calls", "None", "None", "Use prooflab_io interfaces"]
              ]
            },
            {
              type: "heading",
              level: 2,
              id: "recommended-practices",
              content: "Recommended Practices"
            },
            {
              type: "heading",
              level: 3,
              id: "deterministic-computation",
              content: "Ensure Deterministic Computation"
            },
            {
              type: "text",
              content: "All zkVMs require deterministic computation to generate valid proofs. Avoid sources of non-determinism such as:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Random number generation (unless using a seeded, deterministic RNG)",
                "Current time or date",
                "Thread scheduling or parallel execution",
                "Uninitialized memory or undefined behavior"
              ]
            },
            {
              type: "heading",
              level: 3,
              id: "memory-management",
              content: "Efficient Memory Management"
            },
            {
              type: "text",
              content: "Memory usage directly impacts proving time and cost. To optimize memory usage:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Prefer stack allocation over heap allocation when possible",
                "Reuse buffers instead of allocating new ones",
                "Use appropriate data structures for your use case",
                "Be mindful of memory layout and alignment"
              ]
            },
            {
              type: "heading",
              level: 3,
              id: "error-handling",
              content: "Error Handling"
            },
            {
              type: "text",
              content: "Error handling in zkVMs requires special consideration:"
            },
            {
              type: "code",
              language: "rust",
              content: "// Preferred approach: Use Result for error handling\nfn process_data(input: &[u8]) -> Result<u32, &'static str> {\n    if input.is_empty() {\n        return Err(\"Input cannot be empty\");\n    }\n    // Process data...\n    Ok(result)\n}\n\n// In the main function\npub fn main() {\n    let input: Vec<u8> = prooflab_io::read();\n    match process_data(&input) {\n        Ok(result) => prooflab_io::commit(&result),\n        Err(err) => {\n            // Log the error and commit a failure indicator\n            prooflab_io::log(err);\n            prooflab_io::commit(&0u32); // Indicate failure\n        }\n    }\n}"
            },
            {
              type: "info",
              variant: "warning",
              title: "Avoid Panics",
              content: "Panic behavior can vary between zkVMs. Use Result for error handling instead of panic or assert when possible."
            },
            {
              type: "heading",
              level: 2,
              id: "testing-verification",
              content: "Testing and Verification"
            },
            {
              type: "text",
              content: "To ensure your code works across zkVMs, follow these testing practices:"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Write unit tests using the prooflab-rs test framework",
                "Test on all target zkVMs",
                "Compare performance characteristics across systems",
                "Use the prooflab-rs benchmarking tools to identify performance bottlenecks",
                "Verify your code with different input sizes and edge cases"
              ]
            },
            {
              type: "code",
              language: "bash",
              content: "# Test on all supported zkVMs\nprooflab-rs test --all-zkvms\n\n# Benchmark on specific zkVMs\nprooflab-rs bench --zkvm risc0 --zkvm sp1"
            }
          ]
        }
      ]
    },
    "advanced-topics": {
      title: "Advanced Topics",
      pages: [
        {
          slug: "cryptography",
          title: "Cryptographic Operations",
          description: "Using cryptographic primitives in prooflab-rs",
          updated: "March 2025",
          content: [
            {
              type: "text",
              content: "Cryptographic operations are a common use case for zero-knowledge proofs. prooflab-rs provides optimized implementations of cryptographic primitives that work efficiently across different zkVMs."
            },
            {
              type: "heading",
              level: 2,
              id: "hash-functions",
              content: "Hash Functions"
            },
            {
              type: "text",
              content: "prooflab-rs provides efficient implementations of common hash functions:"
            },
            {
              type: "code",
              language: "rust",
              content: "use prooflab_crypto::hash::{sha256, sha512, keccak256};\n\npub fn main() {\n    let data: Vec<u8> = prooflab_io::read();\n    \n    // Compute SHA-256 hash\n    let sha256_result = sha256(&data);\n    prooflab_io::commit(&sha256_result);\n    \n    // Compute SHA-512 hash\n    let sha512_result = sha512(&data);\n    prooflab_io::commit(&sha512_result);\n    \n    // Compute Keccak-256 hash (used in Ethereum)\n    let keccak_result = keccak256(&data);\n    prooflab_io::commit(&keccak_result);\n}"
            },
            {
              type: "info",
              title: "Precompiled Acceleration",
              content: "These hash functions use optimized precompiled implementations when available in the underlying zkVM, resulting in significantly faster proof generation."
            },
            {
              type: "heading",
              level: 2,
              id: "digital-signatures",
              content: "Digital Signatures"
            },
            {
              type: "text",
              content: "Verifying digital signatures in zero-knowledge is a powerful capability. prooflab-rs supports various signature schemes:"
            },
            {
              type: "heading",
              level: 3,
              id: "ecdsa",
              content: "ECDSA Signatures"
            },
            {
              type: "code",
              language: "rust",
              content: "use prooflab_crypto::signatures::ecdsa;\n\npub fn main() {\n    // Read the message, signature, and public key\n    let message: Vec<u8> = prooflab_io::read();\n    let signature: ecdsa::Signature = prooflab_io::read();\n    let public_key: ecdsa::PublicKey = prooflab_io::read();\n    \n    // Verify the signature\n    let is_valid = ecdsa::verify(&message, &signature, &public_key);\n    \n    // Commit the result\n    prooflab_io::commit(&is_valid);\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "ed25519",
              content: "Ed25519 Signatures"
            },
            {
              type: "code",
              language: "rust",
              content: "use prooflab_crypto::signatures::ed25519;\n\npub fn main() {\n    // Read the message, signature, and public key\n    let message: Vec<u8> = prooflab_io::read();\n    let signature: ed25519::Signature = prooflab_io::read();\n    let public_key: ed25519::PublicKey = prooflab_io::read();\n    \n    // Verify the signature\n    let is_valid = ed25519::verify(&message, &signature, &public_key);\n    \n    // Commit the result\n    prooflab_io::commit(&is_valid);\n}"
            },
            {
              type: "heading",
              level: 2,
              id: "merkle-trees",
              content: "Merkle Trees"
            },
            {
              type: "text",
              content: "Merkle trees are fundamental data structures in many cryptographic applications. prooflab-rs provides a Merkle tree implementation:"
            },
            {
              type: "code",
              language: "rust",
              content: "use prooflab_crypto::merkle::{MerkleTree, Proof};\n\npub fn main() {\n    // Read leaf values\n    let leaves: Vec<Vec<u8>> = prooflab_io::read();\n    \n    // Create a Merkle tree\n    let tree = MerkleTree::new(&leaves);\n    let root = tree.root();\n    \n    // Create and verify a proof for a specific leaf\n    let leaf_index = 3; // Example index\n    let proof = tree.create_proof(leaf_index);\n    let is_valid = proof.verify(&root, &leaves[leaf_index], leaf_index);\n    \n    // Commit the root and verification result\n    prooflab_io::commit(&root);\n    prooflab_io::commit(&is_valid);\n}"
            },
            {
              type: "heading",
              level: 2,
              id: "encryption",
              content: "Encryption"
            },
            {
              type: "text",
              content: "While encryption inside a zkVM is less common, prooflab-rs supports some symmetric encryption algorithms:"
            },
            {
              type: "code",
              language: "rust",
              content: "use prooflab_crypto::symmetric::{aes, chacha20};\n\npub fn main() {\n    // Read plaintext and key\n    let plaintext: Vec<u8> = prooflab_io::read();\n    let key: [u8; 32] = prooflab_io::read();\n    \n    // Encrypt using ChaCha20\n    let nonce = [0u8; 12];\n    let ciphertext = chacha20::encrypt(&plaintext, &key, &nonce);\n    \n    // Verify encryption/decryption works\n    let decrypted = chacha20::decrypt(&ciphertext, &key, &nonce);\n    let is_correct = plaintext == decrypted;\n    \n    // Commit the results\n    prooflab_io::commit(&ciphertext);\n    prooflab_io::commit(&is_correct);\n}"
            },
            {
              type: "heading",
              level: 2,
              id: "performance-considerations",
              content: "Performance Considerations"
            },
            {
              type: "text",
              content: "Cryptographic operations can be computationally intensive in a zkVM. Here are some performance tips:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Use precompiled operations whenever possible",
                "Minimize the size of data being processed",
                "Batch similar operations together",
                "Consider the zkVM-specific performance characteristics when choosing algorithms",
                "Use the prooflab-rs benchmarking tools to measure performance"
              ]
            },
            {
              type: "info",
              variant: "warning",
              title: "Performance Variation",
              content: "Cryptographic operation performance can vary significantly between zkVMs. Some may have optimized implementations for specific algorithms while others don't."
            },
            {
              type: "heading",
              level: 2,
              id: "security-best-practices",
              content: "Security Best Practices"
            },
            {
              type: "text",
              content: "When implementing cryptographic operations in prooflab-rs, follow these security best practices:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Don't implement your own cryptographic algorithms; use the provided libraries",
                "Be careful about exposing sensitive values in public outputs",
                "Remember that the zkVM environment is deterministic; avoid using it for random number generation",
                "Consider side-channel attacks in your implementation",
                "Validate all inputs before processing",
                "Follow the principle of least privilege with input/output"
              ]
            }
          ]
        },
        {
          slug: "optimizations",
          title: "Performance Optimization",
          description: "Techniques for optimizing prooflab-rs applications",
          updated: "March 2025",
          content: [
            {
              type: "text",
              content: "Performance optimization is crucial for zero-knowledge applications, as proof generation can be computationally intensive. This guide covers strategies to optimize your prooflab-rs applications."
            },
            {
              type: "heading",
              level: 2,
              id: "performance-factors",
              content: "Understanding Performance Factors"
            },
            {
              type: "text",
              content: "Several factors affect the performance of zkVM applications:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Execution Time: The time your code takes to run inside the zkVM",
                "Memory Usage: The amount of memory your application consumes",
                "Circuit Size: The complexity of the resulting zero-knowledge circuit",
                "Cryptographic Operations: The number and type of cryptographic operations",
                "I/O Operations: The amount of data transferred in and out of the zkVM"
              ]
            },
            {
              type: "heading",
              level: 2,
              id: "measuring-performance",
              content: "Measuring Performance"
            },
            {
              type: "text",
              content: "Before optimizing, you need to measure the current performance. prooflab-rs provides built-in benchmarking tools:"
            },
            {
              type: "code",
              language: "bash",
              content: "# Run benchmark with detailed metrics\nprooflab-rs bench --detailed\n\n# Compare performance across zkVMs\nprooflab-rs bench --zkvm risc0 --zkvm sp1"
            },
            {
              type: "text",
              content: "This will output detailed performance metrics including execution time, memory usage, and proving time."
            },
            {
              type: "heading",
              level: 2,
              id: "optimization-strategies",
              content: "General Optimization Strategies"
            },
            {
              type: "heading",
              level: 3,
              id: "use-precompiles",
              content: "Use Precompiled Operations"
            },
            {
              type: "text",
              content: "Precompiled operations are optimized implementations of common functions that are significantly faster than their native counterparts:"
            },
            {
              type: "code",
              language: "rust",
              content: "// Instead of implementing SHA-256 yourself\nuse prooflab_crypto::hash::sha256;\n\npub fn main() {\n    let data: Vec<u8> = prooflab_io::read();\n    \n    // Uses optimized precompiled implementation\n    let hash = sha256(&data);\n    \n    prooflab_io::commit(&hash);\n}"
            },
            {
              type: "info",
              title: "Available Precompiles",
              content: "prooflab-rs provides precompiles for common operations like hashing, signature verification, and elliptic curve operations."
            },
            {
              type: "heading",
              level: 3,
              id: "optimize-memory",
              content: "Optimize Memory Usage"
            },
            {
              type: "text",
              content: "Memory usage directly impacts proving time. Here are strategies to reduce memory usage:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Reuse buffers instead of allocating new ones",
                "Process data in chunks instead of loading everything at once",
                "Use appropriate data structures for your operations",
                "Consider using fixed-size arrays instead of dynamic vectors when possible",
                "Free resources as soon as they're no longer needed"
              ]
            },
            {
              type: "code",
              language: "rust",
              content: "// Instead of this\nfn process_large_data(data: &[u8]) -> Vec<u8> {\n    let mut result = Vec::with_capacity(data.len());\n    for chunk in data.chunks(1024) {\n        let processed = process_chunk(chunk);\n        result.extend_from_slice(&processed);\n    }\n    result\n}\n\n// Do this\nfn process_large_data_optimized(data: &[u8], result: &mut Vec<u8>) {\n    result.clear();\n    result.reserve(data.len());\n    \n    let mut buffer = [0u8; 1024]; // Reuse the same buffer\n    for chunk in data.chunks(1024) {\n        let processed_len = process_chunk_into_buffer(chunk, &mut buffer);\n        result.extend_from_slice(&buffer[..processed_len]);\n    }\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "reduce-complexity",
              content: "Reduce Computational Complexity"
            },
            {
              type: "text",
              content: "Lower computational complexity means smaller circuits and faster proving times:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Choose efficient algorithms with lower complexity",
                "Avoid unnecessary computation inside the zkVM",
                "Move costly operations outside the zkVM when possible",
                "Use lookup tables for complex functions",
                "Cache results of repeated calculations"
              ]
            },
            {
              type: "code",
              language: "rust",
              content: "// Instead of computing values in the zkVM\npub fn input() {\n    let values = compute_expensive_values();\n    prooflab_io::write(&values);\n}\n\npub fn main() {\n    // Read pre-computed values\n    let values: Vec<u32> = prooflab_io::read();\n    \n    // Use the pre-computed values\n    let result = process_values(&values);\n    prooflab_io::commit(&result);\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "parallelize",
              content: "Leverage Parallelism"
            },
            {
              type: "text",
              content: "Some zkVMs support parallel proving, which can significantly speed up proof generation:"
            },
            {
              type: "code",
              language: "bash",
              content: "# Enable parallel proving with 8 threads\nprooflab-rs run --parallel --threads 8"
            },
            {
              type: "info",
              variant: "warning",
              title: "Parallel Execution Limitations",
              content: "Parallel execution is only available for proof generation, not for the guest code execution itself, which remains sequential."
            },
            {
              type: "heading",
              level: 2,
              id: "zkvm-specific-optimizations",
              content: "zkVM-Specific Optimizations"
            },
            {
              type: "text",
              content: "Different zkVMs have different performance characteristics. Here are some zkVM-specific optimizations:"
            },
            {
              type: "heading",
              level: 3,
              id: "risc0-optimizations",
              content: "RISC0 Optimizations"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Use the RISC0 accelerator for supported operations",
                "Minimize branching in performance-critical code",
                "Use the appropriate alignment for data structures",
                "Enable GPU acceleration for faster proving",
                "Consider using RISC0-specific memory optimizations"
              ]
            },
            {
              type: "code",
              language: "bash",
              content: "# Enable GPU acceleration for RISC0\nprooflab-rs run --zkvm risc0 --gpu"
            },
            {
              type: "heading",
              level: 3,
              id: "sp1-optimizations",
              content: "SP1 Optimizations"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Leverage SP1's optimized cryptographic operations",
                "Use SP1's batch processing capabilities for similar operations",
                "Consider SP1's memory model when designing your application",
                "Take advantage of SP1's LLVM-based optimizations",
                "Utilize SP1's specialized hardware acceleration"
              ]
            },
            {
              type: "heading",
              level: 2,
              id: "case-studies",
              content: "Case Studies"
            },
            {
              type: "text",
              content: "Let's look at a real-world optimization example: optimizing a Merkle tree verification."
            },
            {
              type: "heading",
              level: 3,
              id: "unoptimized-merkle",
              content: "Unoptimized Version"
            },
            {
              type: "code",
              language: "rust",
              content: "pub fn verify_merkle_proof(leaf: &[u8], proof: &[Vec<u8>], root: &[u8]) -> bool {\n    let mut current = leaf.to_vec();\n    \n    for (i, sibling) in proof.iter().enumerate() {\n        let mut combined = Vec::new();\n        if i % 2 == 0 {\n            combined.extend_from_slice(&current);\n            combined.extend_from_slice(sibling);\n        } else {\n            combined.extend_from_slice(sibling);\n            combined.extend_from_slice(&current);\n        }\n        \n        // Compute hash\n        current = sha256(&combined).to_vec();\n    }\n    \n    current == root\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "optimized-merkle",
              content: "Optimized Version"
            },
            {
              type: "code",
              language: "rust",
              content: "pub fn verify_merkle_proof_optimized(leaf: &[u8], proof: &[Vec<u8>], root: &[u8]) -> bool {\n    // Pre-allocate buffers to avoid repeated allocations\n    let mut current = [0u8; 32];\n    let mut combined = [0u8; 64];\n    \n    // Copy initial leaf to current buffer\n    current.copy_from_slice(leaf);\n    \n    for (i, sibling) in proof.iter().enumerate() {\n        // Directly copy into the combined buffer without creating new vectors\n        if i % 2 == 0 {\n            combined[..32].copy_from_slice(&current);\n            combined[32..].copy_from_slice(sibling);\n        } else {\n            combined[..32].copy_from_slice(sibling);\n            combined[32..].copy_from_slice(&current);\n        }\n        \n        // Use the optimized precompile directly\n        let hash = sha256(&combined);\n        current.copy_from_slice(&hash);\n    }\n    \n    // Direct comparison without creating new vector\n    &current[..] == root\n}"
            },
            {
              type: "text",
              content: "The optimized version eliminates unnecessary memory allocations, reuses buffers, and leverages precompiled operations for better performance."
            },
            {
              type: "heading",
              level: 2,
              id: "optimization-tips",
              content: "Summary of Optimization Tips"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Measure first: Use the benchmarking tools to identify bottlenecks",
                "Use precompiled operations for cryptographic functions",
                "Minimize memory allocations and reuse buffers",
                "Move expensive computations outside the zkVM when possible",
                "Choose efficient algorithms with lower complexity",
                "Enable hardware acceleration (GPU) for faster proving",
                "Use zkVM-specific optimizations when appropriate",
                "Balance readability with performance for maintainability"
              ]
            }
          ]
        }
      ]
    }
  }
};

export default docs;