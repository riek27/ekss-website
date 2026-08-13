const { Redis } = require('@upstash/redis');
const fs = require('fs');
const path = require('path');

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const PREFIX = process.env.REDIS_PREFIX || 'ekss:';

const pages = ['home', 'about', 'news', 'resources', 'getInvolved', 'contact', 'education', 'empower-farmers', 'advocacy', 'youth'];

async function seed() {
  for (const page of pages) {
    const filePath = path.join(__dirname, '..', 'data', `${page}.json`);
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      continue;
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    await redis.set(`${PREFIX}page:${page}`, JSON.stringify(data));
    console.log(`✅ Seeded ${page}`);
  }
  console.log('🎉 All pages seeded successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});