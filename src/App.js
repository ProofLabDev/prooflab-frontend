import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';

// Import layouts
import MainLayout from './components/layouts/MainLayout';

// Import pages
import Home from './components/Home/Home';
import FAQ from './components/pages/FAQ';
import About from './components/About/About';
import Learn from './components/Learn/Learn';

// Import new Research Collective components
import Projects from './components/Projects/Projects';
import ZKarnageDetails from './components/Projects/ZKarnageDetails';
import Blog from './components/Blog/Blog';
import BlogPost from './components/Blog/BlogPost';
import Research from './components/Research/Research';

// Archived pages (commented out but preserved)
// import Programs from './components/pages/Programs';
// import ProgramDetails from './components/pages/ProgramDetails';
// import ZKVMs from './components/pages/ZKVMs';
// import ZKVMDetails from './components/pages/ZKVMDetails';
// import BenchmarkDetails from './components/pages/BenchmarkDetails';
// import TelemetryDashboard from './components/TelemetryDashboard/TelemetryDashboard';
// import ComparisonTable from './components/ComparisonTable/ComparisonTable';

function App() {
  useEffect(() => {
    // Initialize PostHog
    posthog.init(
      'phc_MiUDhy96LHedTYSD945UgXkQ6vZGsu0xzBHEpxrMOu7',
      {
        api_host: 'https://app.posthog.com',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug();
        }
      }
    );
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/projects" element={<MainLayout><Projects /></MainLayout>} />
          <Route path="/projects/zkarnage" element={<MainLayout><ZKarnageDetails /></MainLayout>} />
          <Route path="/research" element={<MainLayout><Research /></MainLayout>} />
          <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
          <Route path="/blog/:slug" element={<MainLayout><BlogPost /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/learn/*" element={<MainLayout><Learn /></MainLayout>} />
          <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />
          
          {/* Archived routes - commented out but preserved */}
          {/* <Route path="/programs" element={<MainLayout><Programs /></MainLayout>} /> */}
          {/* <Route path="/programs/:id" element={<MainLayout><ProgramDetails /></MainLayout>} /> */}
          {/* <Route path="/zkvms" element={<MainLayout><ZKVMs /></MainLayout>} /> */}
          {/* <Route path="/zkvms/:id" element={<MainLayout><ZKVMDetails /></MainLayout>} /> */}
          {/* <Route path="/benchmarks/:id" element={<MainLayout><BenchmarkDetails /></MainLayout>} /> */}
          {/* <Route path="/benchmarks" element={<MainLayout><TelemetryDashboard /></MainLayout>} /> */}
          {/* <Route path="/compare" element={<MainLayout><ComparisonTable /></MainLayout>} /> */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App; 