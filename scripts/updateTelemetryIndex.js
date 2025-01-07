const fs = require('fs');
const path = require('path');

const TELEMETRY_DIR = path.join(__dirname, '../public/data/telemetry');
const INDEX_FILE = path.join(TELEMETRY_DIR, 'index.json');

// Get all JSON files in the telemetry directory
const telemetryFiles = fs.readdirSync(TELEMETRY_DIR)
  .filter(file => file.endsWith('.json'))
  .filter(file => file !== 'index.json');

// Create the index file content
const indexContent = {
  files: telemetryFiles,
  lastUpdated: new Date().toISOString()
};

// Write the index file
fs.writeFileSync(INDEX_FILE, JSON.stringify(indexContent, null, 2));

console.log(`Updated telemetry index with ${telemetryFiles.length} files`); 