import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Documentation sections and content
import docContent from '../../data/docs';

const Sidebar = ({ activePath }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button - always visible on mobile */}
      <div className="md:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md text-gray-500 bg-white shadow-md hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span className="sr-only">{isOpen ? 'Close sidebar' : 'Open sidebar'}</span>
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
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Sidebar backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar content */}
      <div className={`
        fixed md:relative top-0 left-0 z-30 w-64
        h-full bg-white border-r border-gray-200
        md:h-[calc(100vh-4rem)] md:top-0
        overflow-y-auto transform transition-transform duration-200 ease-in-out
        md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex-shrink-0 md:w-64
      `}>
        <div className="h-full overflow-y-auto px-3 py-4">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">prooflab-rs Documentation</h2>
            <p className="text-sm text-gray-600">Powerful zero-knowledge SDK for cross-zkVM development</p>
          </div>
          
          <div className="space-y-6">
            {Object.entries(docContent.sections).map(([sectionKey, section]) => (
              <div key={sectionKey}>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.pages.map((page) => {
                    const pagePath = `/learn/${sectionKey}/${page.slug}`;
                    const isActive = activePath === pagePath;
                    
                    return (
                      <li key={page.slug}>
                        <Link
                          to={pagePath}
                          className={`block px-3 py-2 text-sm rounded-md ${
                            isActive
                              ? 'text-indigo-600 bg-indigo-50 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {page.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/ProofLabDev/prooflab-rs"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
                  </svg>
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/ProofLabDev/prooflab-rs/tree/main/examples" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.293 1.55l.707.708-7.147 7.146a.5.5 0 0 0 0 .708l7.147 7.146-.707.708-7.147-7.147a1.5 1.5 0 0 1 0-2.122L9.293 1.55z"/>
                    <path d="M22.707 1.55l-7.147 7.147a1.5 1.5 0 0 0 0 2.122l7.147 7.147.707-.708-7.147-7.146a.5.5 0 0 1 0-.708l7.147-7.146-.707-.708z"/>
                  </svg>
                  Example Projects
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/ProofLabDev/prooflab-rs/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 7zm0 10a1 1 0 100-2 1 1 0 000 2z" />
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15a1 1 0 112 0 1 1 0 01-2 0zm1-10.75a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 6.25z" clipRule="evenodd" />
                  </svg>
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const DocContentBlock = ({ block }) => {
  switch (block.type) {
    case 'text':
      return <p className="text-gray-600 leading-relaxed mb-6">{block.content}</p>;
    
    case 'mermaid':
      return (
        <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="mermaid">
            {block.content}
          </div>
        </div>
      );
    
    case 'code':
      return (
        <div className="mb-6">
          {block.filename && (
            <div className="text-xs font-mono bg-gray-800 text-gray-400 px-4 py-2 rounded-t-lg border-b border-gray-700">
              {block.filename}
            </div>
          )}
          <SyntaxHighlighter
            language={block.language || 'javascript'}
            style={vscDarkPlus}
            className={`${block.filename ? 'rounded-t-none' : ''} rounded-lg !mt-0`}
            customStyle={{ margin: 0 }}
          >
            {block.content}
          </SyntaxHighlighter>
        </div>
      );
    
    case 'info':
      return (
        <div className={`mb-6 p-5 rounded-lg ${
          block.variant === 'warning' 
            ? 'bg-amber-50 border border-amber-200' 
            : block.variant === 'error'
              ? 'bg-red-50 border border-red-200'
              : 'bg-blue-50 border border-blue-200'
        }`}>
          <h4 className={`text-base font-semibold mb-2 ${
            block.variant === 'warning' 
              ? 'text-amber-800' 
              : block.variant === 'error'
                ? 'text-red-800'
                : 'text-blue-800'
          }`}>
            {block.title}
          </h4>
          {typeof block.content === 'string' ? (
            <p className={`${
              block.variant === 'warning' 
                ? 'text-amber-700' 
                : block.variant === 'error'
                  ? 'text-red-700'
                  : 'text-blue-700'
            }`}>
              {block.content}
            </p>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              {block.content.map((item, i) => (
                <li key={i} className={`${
                  block.variant === 'warning' 
                    ? 'text-amber-700' 
                    : block.variant === 'error'
                      ? 'text-red-700'
                      : 'text-blue-700'
                }`}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    
    case 'heading':
      const HeadingTag = `h${block.level}`;
      return (
        <HeadingTag 
          id={block.id} 
          className={`
            font-bold text-gray-900 mb-4 mt-8 
            ${block.level === 2 ? 'text-2xl border-b border-gray-200 pb-2' : ''}
            ${block.level === 3 ? 'text-xl' : ''}
            ${block.level === 4 ? 'text-lg' : ''}
          `}
        >
          {block.content}
        </HeadingTag>
      );
    
    case 'list':
      return (
        <ul className={`mb-6 pl-6 ${block.style === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
          {block.items.map((item, index) => (
            <li key={index} className="text-gray-600 mb-2">
              {item}
            </li>
          ))}
        </ul>
      );
    
    case 'table':
      return (
        <div className="mb-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                {block.headers.map((header, index) => (
                  <th 
                    key={index}
                    scope="col" 
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 text-sm text-gray-500">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    
    default:
      return null;
  }
};

const DocPage = ({ page }) => {
  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (!page) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The documentation page you're looking for doesn't exist.</p>
        <Link 
          to="/learn/getting-started/introduction"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Go to Introduction
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{page.title}</h1>
        {page.description && (
          <p className="text-xl text-gray-600">{page.description}</p>
        )}
        {page.updated && (
          <p className="text-sm text-gray-500 mt-3">
            Last updated: {page.updated}
          </p>
        )}
      </div>

      {/* Content blocks */}
      <div className="prose prose-indigo max-w-none">
        {page.content.map((block, index) => (
          <DocContentBlock key={index} block={block} />
        ))}
      </div>
      
      {/* Next/Prev navigation */}
      {(page.prevPage || page.nextPage) && (
        <div className="mt-10 border-t border-gray-200 pt-6 flex justify-between">
          {page.prevPage ? (
            <Link
              to={page.prevPage.path}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {page.prevPage.title}
            </Link>
          ) : <div></div>}
          
          {page.nextPage && (
            <Link
              to={page.nextPage.path}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              {page.nextPage.title}
              <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

const DocRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redirect to first page if at root path
  useEffect(() => {
    if (location.pathname === '/learn' || location.pathname === '/learn/') {
      navigate('/learn/getting-started/introduction', { replace: true });
    }
  }, [location.pathname, navigate]);

  // Process doc content to build routes and navigation links
  const pages = {};
  Object.entries(docContent.sections).forEach(([sectionKey, section]) => {
    section.pages.forEach((page, pageIndex) => {
      const path = `/learn/${sectionKey}/${page.slug}`;
      
      // Add navigation info
      const prevPage = pageIndex > 0 
        ? { 
            title: section.pages[pageIndex - 1].title, 
            path: `/learn/${sectionKey}/${section.pages[pageIndex - 1].slug}` 
          }
        : null;
        
      const nextPage = pageIndex < section.pages.length - 1 
        ? { 
            title: section.pages[pageIndex + 1].title, 
            path: `/learn/${sectionKey}/${section.pages[pageIndex + 1].slug}` 
          }
        : null;
      
      // Store processed page data
      pages[path] = {
        ...page,
        prevPage,
        nextPage
      };
    });
  });

  return (
    <Routes>
      {Object.entries(pages).map(([path, page]) => (
        <Route 
          key={path} 
          path={path.replace('/learn', '')} 
          element={<DocPage page={page} />} 
        />
      ))}
      <Route path="*" element={<DocPage page={null} />} />
    </Routes>
  );
};

const Learn = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Initialize Mermaid when the component mounts
    if (typeof window !== 'undefined') {
      import('mermaid').then(mermaid => {
        mermaid.default.initialize({
          startOnLoad: true,
          theme: 'neutral',
          securityLevel: 'loose',
          fontSize: 16
        });
        mermaid.default.contentLoaded();
      });
    }
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - always included, but visibility controlled by CSS and state */}
      <Sidebar activePath={location.pathname} />
      
      {/* Main content area */}
      <div className="flex-1">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <DocRoutes />
        </div>
      </div>
    </div>
  );
};

export default Learn;