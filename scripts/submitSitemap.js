const https = require('https');

/**
 * Script to submit the sitemap to Google's indexing API.
 * Run this after deploying a new version of the site to prompt Google to re-crawl.
 * Note: For proper usage, you would typically need to authenticate with Google Search Console.
 * This is a simplified version that just pings the sitemap URL.
 */

const SITE_URL = 'https://prooflab.dev';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

console.log(`Pinging Google about sitemap at: ${SITEMAP_URL}`);

// Ping Google's sitemap submission URL
https.get(`https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`, (res) => {
  console.log('Response status code:', res.statusCode);
  console.log('Ping complete. If successful, Google has been notified about your sitemap.');
  console.log('Note: You should also submit your sitemap manually in Google Search Console for best results.');
}).on('error', (err) => {
  console.error('Error pinging Google:', err.message);
});