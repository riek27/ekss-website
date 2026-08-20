// scripts/create-admin.js
const { Redis } = require('@upstash/redis');
const bcrypt = require('bcryptjs');

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const USERS_KEY = 'ekss:admin:users'; // same key used in actions.ts

async function createAdmin() {
  try {
    // Read existing users (if any)
    let users = [];
    const raw = await redis.get(USERS_KEY);
    if (raw) {
      if (typeof raw === 'string') users = JSON.parse(raw);
      else if (typeof raw === 'object' && raw !== null) {
        if ('result' in raw) users = JSON.parse(raw.result);
        else users = raw;
      }
    }

    // Define the admin user
    const adminUsername = 'admin';
    const adminPassword = 'Admin2024!'; // change this if you want
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const adminUser = {
      username: adminUsername,
      displayName: 'Administrator',
      passwordHash,
      role: 'admin',
    };

    // Check if admin already exists
    const existingIndex = users.findIndex(u => u.username === adminUsername);
    if (existingIndex >= 0) {
      // Update password and role
      users[existingIndex] = { ...users[existingIndex], ...adminUser };
      console.log(`🔄 Admin user "${adminUsername}" updated with new password.`);
    } else {
      // Add new admin user
      users.push(adminUser);
      console.log(`✅ Admin user "${adminUsername}" created.`);
    }

    // Save users back to Redis
    await redis.set(USERS_KEY, JSON.stringify(users));
    console.log('👉 Login with: admin / Admin2024!');
    console.log('⚠️  Please change this password immediately after logging in via Settings.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin();