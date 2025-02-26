import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import BreadcrumbTrail from '../Navigation/BreadcrumbTrail';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`min-h-screen flex flex-col ${isHomePage ? 'bg-white' : 'bg-gray-50'}`}>
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