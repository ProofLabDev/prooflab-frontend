import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import BreadcrumbTrail from '../Navigation/BreadcrumbTrail';
import SEO from '../SEO/SEO';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Basic SEO setup that can be overridden by individual pages
  const getPageTitle = () => {
    const path = location.pathname;
    
    // Default mapping of paths to page titles
    const pageTitles = {
      '/': 'Home',
      '/about': 'About',
      '/projects': 'Research Projects',
      '/research': 'Research Reports',
      '/blog': 'Blog',
      '/faq': 'FAQ',
      '/learn': 'Learn',
      // Legacy routes (keeping for redirects)
      '/programs': 'Benchmark Programs',
      '/zkvms': 'ZK Virtual Machines',
      '/compare': 'Compare ZKVMs',
      '/benchmarks': 'Benchmarks'
    };
    
    return pageTitles[path] || 'Prooflab Research Collective';
  };

  return (
    <div className={`min-h-screen flex flex-col ${isHomePage ? 'bg-white' : 'bg-gray-50'}`}>
      <SEO 
        title={getPageTitle()}
        canonical={location.pathname}
      />
      <Navigation />
      {!isHomePage && <BreadcrumbTrail />}
      <main className={`flex-grow ${isHomePage ? 'w-full p-0' : 'container mx-auto px-4 py-8'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 