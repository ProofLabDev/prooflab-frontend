import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import LeaderboardTable from './components/LeaderboardTable/LeaderboardTable';
import About from './components/About/About';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import ZKVMComparison from './components/ZKVMComparison/ZKVMComparison';
import Sponsor from './components/Sponsor/Sponsor';
import posthog from 'posthog-js';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClasses = "inline-flex items-center px-1 pt-1 text-sm font-medium";
    return `${baseClasses} ${isActive ? 'text-gray-900 border-b-2 border-indigo-500' : 'text-gray-500 hover:text-gray-900'}`;
  };

  const getMobileLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClasses = "block pl-3 pr-4 py-2 text-base font-medium";
    return `${baseClasses} ${isActive ? 'text-indigo-700 bg-indigo-50' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
              >
                ProofLab
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={getLinkClass('/')}>
                Leaderboard
              </Link>
              <Link to="/compare" className={getLinkClass('/compare')}>
                Compare zkVMs
              </Link>
              <Link to="/faq" className={getLinkClass('/faq')}>
                FAQ
              </Link>
              <Link to="/about" className={getLinkClass('/about')}>
                About
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden border-t border-gray-200`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={getMobileLinkClass('/')}
            onClick={() => setIsMenuOpen(false)}
          >
            Leaderboard
          </Link>
          <Link
            to="/compare"
            className={getMobileLinkClass('/compare')}
            onClick={() => setIsMenuOpen(false)}
          >
            Compare zkVMs
          </Link>
          <Link
            to="/faq"
            className={getMobileLinkClass('/faq')}
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link
            to="/about"
            className={getMobileLinkClass('/about')}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Add PostHog page view tracking
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    posthog.capture('$pageview');
  }, [location]);

  return null;
};

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
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <PageViewTracker />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LeaderboardTable />} />
            <Route path="/compare" element={<ZKVMComparison />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/sponsor" element={<Sponsor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 