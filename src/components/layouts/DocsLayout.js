import React from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

const DocsLayout = ({ children, sidebar }) => {

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <div className="flex-grow flex">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white border-r border-gray-200 sticky top-0 h-screen overflow-y-auto">
          {sidebar}
        </div>
        
        {/* Content */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default DocsLayout;