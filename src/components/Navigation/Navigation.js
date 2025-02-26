import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import posthog from 'posthog-js';

const UpdatesModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Capture the signup event in PostHog
      posthog.capture('newsletter_signup', {
        name,
        email,
        source: 'modal'
      });
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setSubmitStatus(null);
        onClose();
        setName('');
        setEmail('');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-2xl font-semibold leading-6 text-gray-900 mb-4">
                Get ProofLab Updates
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Stay informed about new zkVM benchmarks, features, and insights.
              </p>
              
              {submitStatus === 'success' ? (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Thanks for subscribing!
                      </p>
                    </div>
                  </div>
                </div>
              ) : submitStatus === 'error' ? (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">
                        Oops! Something went wrong. Please try again.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    >
                      {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdatesModalOpen, setIsUpdatesModalOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClasses = "inline-flex items-center px-1 pt-1 text-sm font-medium relative z-10";
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
              <Link to="/" className="flex items-center z-10 relative">
                <img
                  src="/prooflab-logo.png"
                  alt="ProofLab"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/zkvms" className={getLinkClass('/zkvms')}>
                Reports
              </Link>
              <Link to="/programs" className={getLinkClass('/programs')}>
                Programs
              </Link>
              <Link to="/benchmarks" className={getLinkClass('/benchmarks')}>
                Benchmarks
              </Link>
              <Link to="/compare" className={getLinkClass('/compare')}>
                Compare
              </Link>
              <Link to="/faq" className={getLinkClass('/faq')}>
                FAQ
              </Link>
              <Link to="/about" className={getLinkClass('/about')}>
                About
              </Link>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <button
              onClick={() => setIsUpdatesModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Updates
            </button>
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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
            to="/zkvms"
            className={getMobileLinkClass('/zkvms')}
            onClick={() => setIsMenuOpen(false)}
          >
            Reports
          </Link>
          <Link
            to="/programs"
            className={getMobileLinkClass('/programs')}
            onClick={() => setIsMenuOpen(false)}
          >
            Programs
          </Link>
          <Link
            to="/benchmarks"
            className={getMobileLinkClass('/benchmarks')}
            onClick={() => setIsMenuOpen(false)}
          >
            Benchmarks
          </Link>
          <Link
            to="/compare"
            className={getMobileLinkClass('/compare')}
            onClick={() => setIsMenuOpen(false)}
          >
            Compare
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
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsUpdatesModalOpen(true);
            }}
            className="w-full text-left pl-3 pr-4 py-2 text-base font-medium text-indigo-700 hover:bg-gray-50"
          >
            Get Updates
          </button>
        </div>
      </div>

      {/* Updates Modal */}
      <UpdatesModal 
        isOpen={isUpdatesModalOpen}
        onClose={() => setIsUpdatesModalOpen(false)}
      />
    </nav>
  );
};

export default Navigation; 