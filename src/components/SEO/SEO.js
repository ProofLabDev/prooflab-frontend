import React from 'react';
import { Helmet } from 'react-helmet-async';
import JsonLd from './JsonLd';

const SEO = ({ 
  title, 
  description, 
  canonical = '', 
  image = 'https://prooflab.dev/social-preview.png',
  type = 'website',
  articleData = null
}) => {
  const siteTitle = 'ProofLab - ZK Benchmarking Platform';
  const siteUrl = 'https://prooflab.dev';
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || 'Your gateway to understanding and comparing Zero Knowledge proof systems with comprehensive benchmarking and performance analysis tools.';
  
  // Create the JSON-LD structured data
  let jsonLdData = null;
  
  if (type === 'website') {
    jsonLdData = {
      type: 'WebSite',
      data: {
        name: siteTitle,
        url: siteUrl,
        description: pageDescription,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
    };
  } else if (type === 'article' && articleData) {
    jsonLdData = {
      type: 'Article',
      data: {
        headline: title,
        description: pageDescription,
        image: image,
        url: fullUrl,
        datePublished: articleData.datePublished,
        dateModified: articleData.dateModified || articleData.datePublished,
        author: {
          '@type': 'Organization',
          name: 'ProofLab'
        },
        publisher: {
          '@type': 'Organization',
          name: 'ProofLab',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/prooflab-logo.png`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl
        }
      }
    };
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={fullUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={image} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={fullUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={image} />
        
        {/* Additional meta tags for better SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Helmet>
      
      {jsonLdData && <JsonLd type={jsonLdData.type} data={jsonLdData.data} />}
    </>
  );
};

export default SEO;