import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';

// Import layouts
import MainLayout from './components/layouts/MainLayout';

// Import pages
import Home from './components/pages/Home';
import Programs from './components/pages/Programs';
import ProgramDetails from './components/pages/ProgramDetails';
import ZKVMs from './components/pages/ZKVMs';
import ZKVMDetails from './components/pages/ZKVMDetails';
import BenchmarkDetails from './components/pages/BenchmarkDetails';
import FAQ from './components/pages/FAQ';
import About from './components/About/About';
import TelemetryDashboard from './components/TelemetryDashboard/TelemetryDashboard';
import ComparisonTable from './components/ComparisonTable/ComparisonTable';
import Learn from './components/Learn/Learn';

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
          <Route path="/programs" element={<MainLayout><Programs /></MainLayout>} />
          <Route path="/programs/:id" element={<MainLayout><ProgramDetails /></MainLayout>} />
          <Route path="/zkvms" element={<MainLayout><ZKVMs /></MainLayout>} />
          <Route path="/zkvms/:id" element={<MainLayout><ZKVMDetails /></MainLayout>} />
          <Route path="/benchmarks/:id" element={<MainLayout><BenchmarkDetails /></MainLayout>} />
          <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/benchmarks" element={<MainLayout><TelemetryDashboard /></MainLayout>} />
          <Route path="/compare" element={<MainLayout><ComparisonTable /></MainLayout>} />
          <Route path="/learn/*" element={<MainLayout><Learn /></MainLayout>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App; 