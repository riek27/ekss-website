// scripts/add-theory-to-resources.js
const { Redis } = require('@upstash/redis');

// Load environment variables from .env.local (if dotenv is installed)
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // dotenv not installed – we'll pass env vars manually
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const PREFIX = process.env.REDIS_PREFIX || 'ekss:';
const PAGE = 'resources';

async function addTheoryOfChange() {
  try {
    const key = `${PREFIX}page:${PAGE}`;
    const raw = await redis.get(key);

    if (!raw) {
      console.log(`❌ No data found for key ${key}. Please seed first.`);
      process.exit(1);
    }

    // Parse current data (Redis may return string or object)
    let data;
    if (typeof raw === 'string') {
      data = JSON.parse(raw);
    } else if (typeof raw === 'object' && raw !== null) {
      // Upstash sometimes returns { result: "..." }
      if ('result' in raw) {
        data = JSON.parse(raw.result);
      } else {
        data = raw;
      }
    } else {
      throw new Error('Unexpected data type from Redis');
    }

    // If theoryOfChange already exists, do nothing
    if (data.theoryOfChange) {
      console.log('⚠️  theoryOfChange already exists. No changes made.');
      process.exit(0);
    }

    // Add the new field with default values
    data.theoryOfChange = {
      heading: 'Our Theory of Change',
      image: '/images/theory-of-change.png',
      caption: 'Optional caption describing the theory of change.'
    };

    // Save back to Redis
    await redis.set(key, JSON.stringify(data));
    console.log('✅ theoryOfChange added to resources data!');
    console.log('Key:', key);
  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit(0);
}

addTheoryOfChange();