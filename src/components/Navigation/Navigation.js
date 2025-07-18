import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClasses = "inline-flex items-center px-1 pt-1 text-sm font-medium relative z-10 focus:outline-none";
    return `${baseClasses} ${isActive ? 'text-gray-900 border-b-2 border-indigo-500' : 'text-gray-500 hover:text-gray-900'}`;
  };

  const getMobileLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClasses = "block pl-3 pr-4 py-2 text-base font-medium focus:outline-none";
    return `${baseClasses} ${isActive ? 'text-indigo-700 bg-indigo-50' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center z-10 relative">
                <img
                  src="/prooflab-logo.png"
                  alt="ProofLab"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/projects" className={getLinkClass('/projects')} tabIndex="0">
                Projects
              </Link>
              <Link to="/research" className={getLinkClass('/research')} tabIndex="0">
                Research
              </Link>
              <Link to="/blog" className={getLinkClass('/blog')} tabIndex="0">
                Blog
              </Link>
              <Link to="/about" className={getLinkClass('/about')} tabIndex="0">
                About
              </Link>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <a
              href="https://twitter.com/TheProofLab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Get Updates
            </a>
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/projects"
            className={getMobileLinkClass('/projects')}
            onClick={() => setIsMenuOpen(false)}
            tabIndex="0"
          >
            Projects
          </Link>
          <Link
            to="/research"
            className={getMobileLinkClass('/research')}
            onClick={() => setIsMenuOpen(false)}
            tabIndex="0"
          >
            Research
          </Link>
          <Link
            to="/blog"
            className={getMobileLinkClass('/blog')}
            onClick={() => setIsMenuOpen(false)}
            tabIndex="0"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className={getMobileLinkClass('/about')}
            onClick={() => setIsMenuOpen(false)}
            tabIndex="0"
          >
            About
          </Link>
          <a
            href="https://twitter.com/TheProofLab"
            target="_blank"
            rel="noopener noreferrer"
            className="block pl-3 pr-4 py-2 text-base font-medium text-indigo-700 hover:bg-gray-50 focus:outline-none"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Updates
          </a>
        </div>
      </div>

    </nav>
  );
};

export default Navigation; 