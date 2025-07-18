import React from 'react';
import { Link } from 'react-router-dom';

const ResearchReportCard = ({ report }) => (
  <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${!report.available ? 'opacity-75' : ''}`}>
    {!report.available && (
      <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3">
        <p className="text-sm font-medium text-yellow-800">
          <span className="inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Coming Soon
          </span>
        </p>
      </div>
    )}
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{report.type}</span>
        {report.available ? (
          <time className="text-sm text-gray-500" dateTime={report.publishedDate}>
            {new Date(report.publishedDate).toLocaleDateString()}
          </time>
        ) : (
          <span className="text-sm text-gray-500">Expected {new Date(report.publishedDate).toLocaleDateString()}</span>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
      <p className="text-gray-600 mb-4">{report.abstract}</p>
      <div className="mb-4">
        <div className="text-sm text-gray-700">
          <span className="font-medium">Authors:</span> {report.authors.join(', ')}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {report.keywords.map((keyword, index) => (
          <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
            {keyword}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex space-x-4">
          {report.available && report.pdfUrl && (
            <a 
              href={report.pdfUrl}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </a>
          )}
          {report.available && report.arxivUrl && (
            <a 
              href={report.arxivUrl}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on arXiv
            </a>
          )}
          {!report.available && (
            <span className="text-gray-400 text-sm italic">Report will be available soon</span>
          )}
        </div>
        {report.available ? (
          <Link 
            to={`/research/${report.id}`}
            className="text-gray-600 hover:text-gray-900 font-medium text-sm"
          >
            View Details →
          </Link>
        ) : (
          <span className="text-gray-400 font-medium text-sm cursor-not-allowed">
            View Details →
          </span>
        )}
      </div>
    </div>
  </div>
);

const Research = () => {
  const researchReports = [
    {
      id: 'zkarnage-initial-findings',
      title: 'ZKarnage: Initial Findings from Mainnet Stress Testing of Zero-Knowledge Provers',
      abstract: 'We present initial results from the ZKarnage project, a systematic stress-testing initiative for zero-knowledge proving systems on Ethereum mainnet. Our findings reveal critical performance characteristics and potential vulnerabilities across multiple proving systems.',
      type: 'Technical Report',
      publishedDate: '2025-09-15',
      authors: ['Conner Swann'],
      keywords: ['Zero-Knowledge Proofs', 'Security Analysis', 'Stress Testing', 'Ethereum'],
      pdfUrl: '/reports/zkarnage-initial-findings.pdf',
      arxivUrl: null,
      available: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Reports</h1>
        <p className="text-lg text-gray-600">
          Published research findings, technical reports, and papers from the Prooflab collective.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {researchReports.map((report) => (
          <ResearchReportCard key={report.id} report={report} />
        ))}
      </div>

      {researchReports.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Research reports will be published here as our projects progress.
          </p>
        </div>
      )}
    </div>
  );
};

export default Research; 