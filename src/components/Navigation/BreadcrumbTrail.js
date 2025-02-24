import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BreadcrumbTrail = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSegments.length - 1;
    
    // Format the segment to be more readable
    const formattedSegment = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return (
      <React.Fragment key={path}>
        <li>
          {isLast ? (
            <span className="text-gray-500">{formattedSegment}</span>
          ) : (
            <>
              <Link
                to={path}
                className="text-indigo-600 hover:text-indigo-700"
              >
                {formattedSegment}
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </>
          )}
        </li>
      </React.Fragment>
    );
  });

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center text-sm">
          <li>
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Home
            </Link>
            {breadcrumbs.length > 0 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
          {breadcrumbs}
        </ol>
      </div>
    </nav>
  );
};

export default BreadcrumbTrail; 