import React from 'react';
import { Helmet } from 'react-helmet';

// Add JSON-LD structured data for better SEO
const JsonLd = ({ type, data }) => {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
    </Helmet>
  );
};

export default JsonLd;