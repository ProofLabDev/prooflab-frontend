import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
        <p className="space-x-2">
          <span>Built with ❤️ for the Zero Knowledge community</span>
          <span>•</span>
          <Link 
            to="/sponsor" 
            className="text-indigo-500 hover:text-indigo-600 transition-colors"
          >
            Sponsor ProofLab?
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 