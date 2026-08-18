const { Redis } = require('@upstash/redis');
const fs = require('fs');
const path = require('path');

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const PREFIX = process.env.REDIS_PREFIX || 'ekss:';
const pages = [
  'home',
  'about',
  'news',
  'resources',
  'getInvolved',
  'contact',
  'education',
  'empower-farmers',
  'advocacy',
  'youth',
];

async function exportData() {
  for (const page of pages) {
    const key = `${PREFIX}page:${page}`;
    const raw = await redis.get(key);
    if (!raw) {
      console.log(`⚠️  No data for ${page}`);
      continue;
    }
    const data = JSON.parse(raw);
    const filePath = path.join(__dirname, '..', 'data', `${page}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`📦 Exported ${page}`);
  }
  console.log('✅ Export completed.');
  process.exit(0);
}

exportData().catch(console.error);