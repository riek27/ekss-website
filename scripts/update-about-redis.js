// scripts/update-about-redis.js
const { Redis } = require('@upstash/redis');
const fs = require('fs');
const path = require('path');

// Environment variables must be set when running the script
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const PREFIX = process.env.REDIS_PREFIX || 'ekss:';
const PAGE = 'about'; // Only the About page

async function updateAboutData() {
  try {
    // Read the new about.json from your data folder
    const filePath = path.join(__dirname, '..', 'data', 'about.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const aboutData = JSON.parse(rawData);

    // Overwrite the about page in Redis
    const key = `${PREFIX}page:${PAGE}`;
    await redis.set(key, JSON.stringify(aboutData));

    console.log('✅ About page data updated successfully!');
    console.log('Key:', key);
  } catch (error) {
    console.error('❌ Failed to update About page data:', error);
  }
  process.exit(0);
}

updateAboutData();