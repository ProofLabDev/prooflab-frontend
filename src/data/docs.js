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
              id: "project-structure",
              content: "Project Structure"
            },
            {
              type: "text",
              content: "The project is organized as a Cargo workspace with the following crates:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "`crates/prooflab`: Core CLI tool and zkVM integration",
                "`crates/prooflab_io`: I/O marshalling between host and guest programs",
              ]
            },
            {
              type: "text",
              content: "It abstracts away the complexity of zkVM integration while giving developers the choice of which zkVM backend to use for their applications."
            },
            {
              type: "text",
              content: "For performance benchmarks and detailed reports on each supported zkVM, visit [prooflab.dev](https://prooflab.dev) - our benchmark platform that helps you compare and select the right zkVM for your specific needs."
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
                "Git version control"
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
              content: "There are several ways to install prooflab-rs:"
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
              content: "If you prefer to build from source or want to contribute to the project, you can build it manually:"
            },
            {
              type: "code",
              language: "bash",
              content: "make install"
            },
            {
              type: "heading",
              level: 3,
              id: "method-3-docker",
              content: "Method 3: Using Docker"
            },
            {
              type: "text",
              content: "prooflab-rs can also be run in a Docker container with all dependencies pre-configured."
            },
            {
              type: "code",
              language: "bash",
              content: "# Building the Docker Image\ndocker build -t prooflab-rs .\n\n# Running the Docker Container (basic usage)\ndocker run -it prooflab-rs bash\n\n# For faster builds and better performance, mount your local Rust cache\ndocker run -it \\\n  -v \"$HOME/.cargo/registry:/root/.cargo/registry\" \\\n  -v \"$HOME/.cargo/git:/root/.cargo/git\" \\\n  prooflab-rs bash"
            },
            {
              type: "text",
              content: "Using Docker with mounted volumes significantly speeds up builds by reusing your local Rust package cache."
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
              content: "This guide will walk you through creating and running a simple prooflab-rs application."
            },
            {
              type: "heading",
              level: 2,
              id: "create-project",
              content: "Create a New Project"
            },
            {
              type: "text",
              content: "First, let's create a new Rust project using Cargo:"
            },
            {
              type: "code",
              language: "bash",
              content: "cargo new my_zkvm_program\ncd my_zkvm_program"
            },
            {
              type: "text",
              content: "This creates a new directory with the basic project structure needed for a Rust application."
            },
            {
              type: "heading",
              level: 2,
              id: "project-structure",
              content: "Project Structure"
            },
            {
              type: "text",
              content: "Your project should have the following structure:"
            },
            {
              type: "code",
              language: "text",
              content: "my_zkvm_program/\n├── Cargo.toml           # Project dependencies\n└── src/\n    └── main.rs          # Main program code"
            },
            {
              type: "heading",
              level: 2,
              id: "program-components",
              content: "Program Components"
            },
            {
              type: "text",
              content: "A prooflab-rs program consists of three main functions:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "`main()`: Required function that runs inside the zkVM and is proven",
                "`input()`: Optional function that runs on the host before zkVM execution to prepare inputs",
                "`output()`: Optional function that runs on the host after zkVM execution to process results"
              ]
            },
            {
              type: "heading",
              level: 3,
              id: "main-function",
              content: "The `main()` Function (Required)"
            },
            {
              type: "text",
              content: "This function runs inside the zkVM and is the code that will be proven:"
            },
            {
              type: "code",
              language: "rust",
              content: "use prooflab_io;\n\nfn main() {\n    // Read input from the host\n    let input_value: u32 = prooflab_io::read();\n    \n    // Perform computation logic\n    let result = input_value * 2;\n    \n    // Commit results to be read by the host\n    prooflab_io::commit(&result);\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "input-function",
              content: "The `input()` Function (Optional)"
            },
            {
              type: "text",
              content: "This function runs on the host before the zkVM execution and prepares inputs:"
            },
            {
              type: "code",
              language: "rust",
              content: "use prooflab_io;\n\nfn input() {\n    // Define input data for the zkVM\n    let value = 42u32;\n    \n    // Send it to the zkVM\n    prooflab_io::write(&value);\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "output-function",
              content: "The `output()` Function (Optional)"
            },
            {
              type: "text",
              content: "This function runs on the host after the zkVM execution and processes the results:"
            },
            {
              type: "code",
              language: "rust",
              content: "use prooflab_io;\n\nfn output() {\n    // Read the committed data from the zkVM\n    let result: u32 = prooflab_io::out();\n    \n    // Process the output\n    println!(\"The result is: {}\", result);\n}"
            },
            {
              type: "heading",
              level: 2,
              id: "update-dependencies",
              content: "Add Dependencies"
            },
            {
              type: "text",
              content: "Update your Cargo.toml file to include the prooflab_io dependency:"
            },
            {
              type: "code",
              language: "toml",
              filename: "Cargo.toml",
              content: "[dependencies]\nprooflab_io = { git = \"https://github.com/ProofLabDev/prooflab-rs.git\", package = \"prooflab_io\" }"
            },
            {
              type: "heading",
              level: 2,
              id: "simple-example",
              content: "Complete Example: Fibonacci"
            },
            {
              type: "text",
              content: "Let's create a simple Fibonacci calculator as a complete example:"
            },
            {
              type: "code",
              language: "rust",
              filename: "src/main.rs",
              content: "use prooflab_io;\n\nfn main() {\n    let n: u32 = prooflab_io::read();\n    prooflab_io::commit(&n);\n\n    let mut a: u32 = 0;\n    let mut b: u32 = 1;\n    for _ in 0..n {\n        let mut c = a + b;\n        c %= 7919; // Modulus to prevent overflow\n        a = b;\n        b = c;\n    }\n\n    prooflab_io::commit(&a);\n    prooflab_io::commit(&b);\n}\n\nfn input() {\n    let n = 1000u32;\n    prooflab_io::write(&n);\n}\n\nfn output() {\n    let (n, a, b): (u32, u32, u32) = prooflab_io::out();\n    println!(\"n: {}\", n);\n    println!(\"a: {}\", a);\n    println!(\"b: {}\", b);\n}"
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
              id: "run-with-sp1",
              content: "Run with SP1"
            },
            {
              type: "code",
              language: "bash",
              content: "cargo run --release -p prooflab -- prove-sp1 my_zkvm_program"
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
              content: "cargo run --release -p prooflab -- prove-risc0 my_zkvm_program"
            },
            {
              type: "info",
              title: "Expected Output",
              content: "In both cases, you should see output indicating that the proof was generated successfully, along with the final result from your output() function."
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
              id: "data-flow",
              content: "Data Flow Between Host and Guest"
            },
            {
              type: "text",
              content: "Let's examine how data flows between the host and the zkVM environment:"
            },
            {
              type: "heading",
              level: 3,
              id: "host-to-guest",
              content: "Sending Data to the zkVM (Host → Guest)"
            },
            {
              type: "text",
              content: "In your input() function, use prooflab_io::write() to send data to the zkVM:"
            },
            {
              type: "code",
              language: "rust",
              content: "fn input() {\n    // You can write multiple values\n    let a = 5u32;\n    let b = 10u32;\n    let c = \"hello\".to_string();\n    \n    prooflab_io::write(&a);\n    prooflab_io::write(&b);\n    prooflab_io::write(&c);\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "guest-reading",
              content: "Reading Data in the zkVM (Guest)"
            },
            {
              type: "text",
              content: "In your main() function, use prooflab_io::read() to get the input data:"
            },
            {
              type: "code",
              language: "rust",
              content: "fn main() {\n    // Read values in the same order they were written\n    let a: u32 = prooflab_io::read();\n    let b: u32 = prooflab_io::read();\n    let c: String = prooflab_io::read();\n    \n    // Process the data...\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "guest-to-host",
              content: "Sending Data from the zkVM (Guest → Host)"
            },
            {
              type: "text",
              content: "In your main() function, use prooflab_io::commit() to commit results:"
            },
            {
              type: "code",
              language: "rust",
              content: "fn main() {\n    // ... computation ...\n    \n    // You can commit multiple values\n    let result1 = 42u32;\n    let result2 = \"done\".to_string();\n    \n    prooflab_io::commit(&result1);\n    prooflab_io::commit(&result2);\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "host-reading",
              content: "Reading zkVM Results (Host)"
            },
            {
              type: "text",
              content: "In your output() function, use prooflab_io::out() to get the committed data:"
            },
            {
              type: "code",
              language: "rust",
              content: "fn output() {\n    // Option 1: Read each value separately\n    let result1: u32 = prooflab_io::out();\n    let result2: String = prooflab_io::out();\n    \n    println!(\"Result 1: {}\", result1);\n    println!(\"Result 2: {}\", result2);\n    \n    // Option 2: Read multiple values as a tuple\n    // let (result1, result2): (u32, String) = prooflab_io::out();\n}"
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
              id: "working-with-complex-data",
              content: "Handling Complex Data Structures"
            },
            {
              type: "text",
              content: "For complex data types, ensure they implement Serde's Serialize and Deserialize traits:"
            },
            {
              type: "code",
              language: "rust",
              content: "use serde::{Serialize, Deserialize};\n\n#[derive(Serialize, Deserialize, Debug)]\nstruct MyData {\n    id: u32,\n    name: String,\n    values: Vec<f64>,\n}\n\nfn main() {\n    let data: MyData = prooflab_io::read();\n    // Process the data...\n    prooflab_io::commit(&data);\n}\n\nfn input() {\n    let data = MyData {\n        id: 1,\n        name: \"Example\".to_string(),\n        values: vec![1.0, 2.0, 3.0],\n    };\n    prooflab_io::write(&data);\n}\n\nfn output() {\n    let data: MyData = prooflab_io::out();\n    println!(\"Data: {:?}\", data);\n}"
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
              content: "// Inside the guest environment\nfn main() {\n    // Log a message (only visible during development)\n    prooflab_io::log(\"Processing started\");\n    \n    // Log with formatted values\n    prooflab_io::log(&format!(\"Processing value: {}\", value));\n}"
            },
            {
              type: "info",
              variant: "warning",
              title: "Log Performance Impact",
              content: "Logging can significantly impact proof generation performance. Use it sparingly in production code."
            },
            {
              type: "heading",
              level: 2,
              id: "type-annotations",
              content: "Use Clear Type Annotations"
            },
            {
              type: "text",
              content: "Always use explicit type annotations to avoid confusion:"
            },
            {
              type: "code",
              language: "rust",
              content: "// Good: Type is explicitly stated\nlet input_value: u32 = prooflab_io::read();\n\n// Avoid: Implicit typing\nlet input_value = prooflab_io::read();  // What type is this?"
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
              id: "examples",
              content: "Example Programs"
            },
            {
              type: "text",
              content: "prooflab-rs comes with several example programs that demonstrate different use cases:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Fibonacci: Computing and reading Fibonacci numbers",
                "RSA: Key verification",
                "ECDSA: Signature verification",
                "JSON: Verification of blockchain state diffs",
                "SHA256: Computing cryptographic hashes",
                "Tendermint: Block verification",
                "ZK Quiz: Interactive user quiz with zero-knowledge proofs"
              ]
            },
            {
              type: "code",
              language: "bash",
              content: "# Run examples with either Risc0 or SP1 backend\nmake prove_risc0_fibonacci\nmake prove_sp1_fibonacci"
            },
            {
              type: "heading",
              level: 2,
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
              level: 2,
              id: "memory-management",
              content: "Memory Management"
            },
            {
              type: "text",
              content: "zkVMs have limits on memory usage. For large computations:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Break processing into smaller chunks",
                "Avoid excessive memory allocation",
                "Use fixed-size arrays where possible",
                "Consider memory-efficient algorithms"
              ]
            },
            {
              type: "heading",
              level: 2,
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
              content: "// Preferred approach: Use Result for error handling\nfn process_data(input: &[u8]) -> Result<u32, &'static str> {\n    if input.is_empty() {\n        return Err(\"Input cannot be empty\");\n    }\n    // Process data...\n    Ok(result)\n}\n\n// In the main function\nfn main() {\n    let input: Vec<u8> = prooflab_io::read();\n    match process_data(&input) {\n        Ok(result) => prooflab_io::commit(&result),\n        Err(err) => {\n            // Log the error and commit a failure indicator\n            prooflab_io::log(err);\n            prooflab_io::commit(&0u32); // Indicate failure\n        }\n    }\n}"
            },
            {
              type: "info",
              variant: "warning",
              title: "Avoid Panics",
              content: "Panic behavior can vary between zkVMs. Use Result for error handling instead of panic or assert when possible."
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
              id: "accelerated-libraries",
              content: "Using Accelerated Libraries"
            },
            {
              type: "text",
              content: "ProofLab-rs supports hardware-accelerated versions of common cryptographic libraries. To use them, add the --precompiles flag when running your program."
            },
            {
              type: "info",
              title: "SP1 Accelerated Crates",
              content: [
                "sha2 v0.10.6",
                "sha3 v0.10.8",
                "crypto-bigint v0.5.5", 
                "tiny-keccak v2.0.2",
                "ed25519-consensus v2.1.0",
                "ecdsa-core v0.16.9"
              ]
            },
            {
              type: "info",
              title: "RISC0 Accelerated Crates",
              content: [
                "sha2 v0.10.6",
                "k256 v0.13.1",
                "crypto-bigint v0.5.5"
              ]
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
              content: "use sha3::{Digest as _, Keccak256};\n\nfn main() {\n    let data: Vec<u8> = prooflab_io::read();\n    let hash: [u8; 32] = Keccak256::digest(&data).into();\n    prooflab_io::commit(&hash);\n}\n\nfn input() {\n    let message = b\"Hello, world!\".to_vec();\n    prooflab_io::write(&message);\n}\n\nfn output() {\n    let hash: [u8; 32] = prooflab_io::out();\n    println!(\"Keccak256 hash: {:?}\", hash);\n}"
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
              content: "Verifying digital signatures in zero-knowledge is a powerful capability. prooflab-rs supports various signature schemes like ECDSA and Ed25519."
            },
            {
              type: "heading",
              level: 2,
              id: "precompile-flag",
              content: "Using the Precompiles Flag"
            },
            {
              type: "text",
              content: "To leverage hardware-accelerated cryptographic operations, use the --precompiles flag when running your program:"
            },
            {
              type: "code",
              language: "bash",
              content: "# With SP1\ncargo run --release -p prooflab -- prove-sp1 /path/to/my_zkvm_program --precompiles\n\n# With RISC0\ncargo run --release -p prooflab -- prove-risc0 /path/to/my_zkvm_program --precompiles"
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
              id: "command-line-options",
              content: "Command-line Options"
            },
            {
              type: "text",
              content: "prooflab-rs provides several command-line options to optimize your applications:"
            },
            {
              type: "table",
              headers: ["Flag", "Description", "Default"],
              rows: [
                ["--submit-to-aligned", "Sends the proof to Aligned for verification after generation", ""],
                ["--keystore-path", "Path to your wallet keystore", "~/keystore"],
                ["--rpc-url", "Ethereum RPC URL for submitting proofs", "https://ethereum-holesky-rpc.publicnode.com"],
                ["--network", "Chain ID of the Ethereum network where Aligned is deployed", "holesky"],
                ["--precompiles", "Enables hardware acceleration for specific cryptographic operations", ""]
              ]
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
              language: "bash",
              content: "# Use precompiles for hardware acceleration\ncargo run --release -p prooflab -- prove-sp1 /path/to/my_zkvm_program --precompiles"
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
              type: "heading",
              level: 3,
              id: "gpu-acceleration",
              content: "Use GPU Acceleration"
            },
            {
              type: "text",
              content: "For faster proof generation, you can use GPU acceleration with compatible hardware:"
            },
            {
              type: "code",
              language: "bash",
              content: "# With GPU acceleration\ncargo run --release -p prooflab -- prove-sp1 /path/to/my_zkvm_program --gpu"
            },
            {
              type: "info",
              variant: "warning",
              title: "Hardware Requirements",
              content: "GPU acceleration requires compatible hardware and may not be available for all zkVMs."
            },
            {
              type: "heading",
              level: 2,
              id: "troubleshooting",
              content: "Troubleshooting Common Issues"
            },
            {
              type: "heading",
              level: 3,
              id: "common-issues",
              content: "Common Issues and Solutions"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "**Proof generation fails with memory error**: Reduce memory usage in your program or break large computations into smaller parts",
                "**Cryptographic operations are slow**: Use the --precompiles flag for hardware acceleration and ensure you're using compatible versions of crypto libraries",
                "**Type mismatch errors**: Ensure types match exactly between write() and read() calls and use explicit type annotations",
                "**Proof verification fails**: Ensure deterministic computation (avoid random numbers) and check for undefined behavior or race conditions",
                "**Build errors with dependencies**: Some crates may not be compatible with zkVMs, check for zkVM-specific versions of libraries"
              ]
            },
            {
              type: "heading",
              level: 3,
              id: "getting-help",
              content: "Getting Help"
            },
            {
              type: "text",
              content: "If you encounter issues not covered here:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Check the [ProofLab GitHub repository](https://github.com/ProofLabDev/prooflab-rs) for updates",
                "Join the [Telegram support group](https://t.me/+7Qd3EutBDwZhM2U5)",
                "Review the examples provided with ProofLab for reference implementations",
                "Look at the test suite in the `crates/prooflab/tests` directory to understand the internals"
              ]
            },
            {
              type: "heading",
              level: 2,
              id: "submitting-proofs",
              content: "Submitting Proofs to Aligned"
            },
            {
              type: "text",
              content: "To submit proofs to Aligned, follow these steps:"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Generate a local wallet keystore using cast: `cast wallet new-mnemonic`",
                "Import your created keystore: `cast wallet import --interactive <PATH_TO_KEYSTORE.json>`",
                "Generate and submit your proof using the --submit-to-aligned flag: `cargo run --release -- prove-sp1 <PROGRAM_DIRECTORY_PATH> --submit-to-aligned --keystore-path <PATH_TO_KEYSTORE>`"
              ]
            },
            {
              type: "info",
              title: "Note",
              content: "Aligned currently supports verification of Risc0 proofs from release version v1.0.1."
            }
          ]
        },
        {
          slug: "best-practices",
          title: "Best Practices",
          description: "Recommended patterns for prooflab-rs development",
          updated: "March 2025",
          content: [
            {
              type: "text",
              content: "This guide covers recommended patterns and best practices for developing efficient and maintainable prooflab-rs applications."
            },
            {
              type: "heading",
              level: 2,
              id: "project-organization",
              content: "Project Organization"
            },
            {
              type: "heading",
              level: 3,
              id: "directory-structure",
              content: "Directory Structure"
            },
            {
              type: "text",
              content: "For larger projects, move shared code to a library:"
            },
            {
              type: "code",
              language: "text",
              content: "my_project/\n├── Cargo.toml\n├── lib/\n│   ├── Cargo.toml\n│   └── src/\n│       └── lib.rs      # Shared utility functions and data structures\n└── src/\n    └── main.rs         # Contains main(), input(), and output() functions"
            },
            {
              type: "heading",
              level: 3,
              id: "function-responsibilities",
              content: "Keep Input and Output Functions Small"
            },
            {
              type: "text",
              content: "The input() and output() functions should primarily handle data preparation and presentation, not complex logic:"
            },
            {
              type: "code",
              language: "rust",
              content: "fn input() {\n    // Good: Simple data preparation\n    let data = load_data_from_file(\"input.json\");\n    prooflab_io::write(&data);\n}\n\nfn output() {\n    // Good: Simple result presentation\n    let result = prooflab_io::out();\n    save_results_to_file(\"output.json\", &result);\n}"
            },
            {
              type: "heading",
              level: 2,
              id: "code-quality",
              content: "Code Quality Practices"
            },
            {
              type: "heading",
              level: 3,
              id: "type-annotations",
              content: "Use Clear Type Annotations"
            },
            {
              type: "text",
              content: "Always use explicit type annotations to avoid confusion:"
            },
            {
              type: "code",
              language: "rust",
              content: "// Good: Type is explicitly stated\nlet input_value: u32 = prooflab_io::read();\n\n// Avoid: Implicit typing\nlet input_value = prooflab_io::read();  // What type is this?"
            },
            {
              type: "heading",
              level: 3,
              id: "error-handling",
              content: "Handle Errors Gracefully"
            },
            {
              type: "text",
              content: "Since panics inside the zkVM will fail proof generation, handle errors gracefully:"
            },
            {
              type: "code",
              language: "rust",
              content: "fn main() {\n    let input: Result<Vec<u8>, String> = prooflab_io::read();\n    \n    match input {\n        Ok(data) => {\n            // Process valid data\n            let result = process_data(data);\n            prooflab_io::commit(&Ok::<_, String>(result));\n        },\n        Err(err) => {\n            // Handle error case\n            prooflab_io::commit(&Err::<Vec<u8>, _>(err));\n        }\n    }\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "debugging",
              content: "Debugging zkVM Programs"
            },
            {
              type: "text",
              content: "Since zkVMs don't support traditional debugging, use these strategies:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Test outside the zkVM first by creating a normal Rust binary",
                "Use the commit mechanism to output intermediate values",
                "Break complex logic into smaller, testable functions",
                "Add assertions to verify program correctness"
              ]
            },
            {
              type: "heading",
              level: 2,
              id: "dependencies",
              content: "Working with Dependencies"
            },
            {
              type: "text",
              content: "You can use many standard Rust crates in your zkVM program. However, there are some limitations:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Standard I/O operations like println!() won't work inside the zkVM (in your main() function)",
                "Some system calls may not be available inside the zkVM",
                "Some crates may need special versions optimized for zkVMs"
              ]
            },
            {
              type: "text",
              content: "For best results, prefer pure computation libraries that don't rely on external resources."
            },
            {
              type: "heading",
              level: 2,
              id: "memory-management",
              content: "Memory Management"
            },
            {
              type: "text",
              content: "zkVMs have limits on memory usage. For large computations:"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Break processing into smaller chunks",
                "Avoid excessive memory allocation",
                "Use fixed-size arrays where possible",
                "Consider memory-efficient algorithms"
              ]
            },
            {
              type: "heading",
              level: 2,
              id: "example-patterns",
              content: "Example Patterns"
            },
            {
              type: "heading",
              level: 3,
              id: "pattern-bubble-sort",
              content: "Bubble Sort Example"
            },
            {
              type: "code",
              language: "rust",
              content: "use prooflab_io;\n\nfn main() {\n    // Read the input array\n    let mut input: Vec<i32> = prooflab_io::read();\n\n    // Commit the original array\n    prooflab_io::commit(&input);\n\n    // Bubble sort implementation\n    let n = input.len();\n    for i in 0..n {\n        for j in 0..n - i - 1 {\n            if input[j] > input[j + 1] {\n                input.swap(j, j + 1);\n            }\n        }\n    }\n\n    // Commit the sorted array\n    prooflab_io::commit(&input);\n}\n\nfn input() {\n    // Example input array\n    let numbers = vec![64, 34, 25, 12, 22, 11, 90];\n    prooflab_io::write(&numbers);\n}\n\nfn output() {\n    let (original, sorted): (Vec<i32>, Vec<i32>) = prooflab_io::out();\n    println!(\"Original array: {:?}\", original);\n    println!(\"Sorted array:   {:?}\", sorted);\n}"
            },
            {
              type: "heading",
              level: 3,
              id: "pattern-cryptographic-hash",
              content: "Cryptographic Hash Example"
            },
            {
              type: "code",
              language: "rust",
              content: "use sha3::{Digest as _, Keccak256};\n\nfn main() {\n    let data: Vec<u8> = prooflab_io::read();\n    let hash: [u8; 32] = Keccak256::digest(&data).into();\n    prooflab_io::commit(&hash);\n}\n\nfn input() {\n    let message = b\"Hello, world!\".to_vec();\n    prooflab_io::write(&message);\n}\n\nfn output() {\n    let hash: [u8; 32] = prooflab_io::out();\n    println!(\"Keccak256 hash: {:?}\", hash);\n}"
            },
            {
              type: "heading",
              level: 2,
              id: "key-workflow",
              content: "Key Workflow"
            },
            {
              type: "text",
              content: "Remember the key workflow for prooflab-rs development:"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Define your computation in main()",
                "Prepare inputs in input()",
                "Process outputs in output()",
                "Generate proofs with your preferred zkVM"
              ]
            },
            {
              type: "text",
              content: "By following these best practices, you can create efficient and effective zkVM programs with your choice of backend."
            }
          ]
        }
      ]
    }
  }
};

export default docs;