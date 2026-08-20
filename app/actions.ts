'use server';

import { Redis } from '@upstash/redis';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const REDIS_PREFIX = process.env.REDIS_PREFIX || 'ekss:';

// ----- Page Data Helpers -----
export async function savePageData(page: string, data: any) {
  try {
    await redis.set(`${REDIS_PREFIX}page:${page}`, JSON.stringify(data));
    revalidatePath(page === 'home' ? '/' : `/${page}`);
    revalidatePath('/admin/' + page);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function getPageData(page: string) {
  const raw = await redis.get(`${REDIS_PREFIX}page:${page}`);
  if (!raw) return null;
  if (typeof raw === 'string') return JSON.parse(raw);
  if (typeof raw === 'object' && raw !== null && 'result' in raw) {
    return JSON.parse((raw as any).result);
  }
  return raw;
}

// ----- File Upload -----
export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File | null;
  if (!file || file.size === 0) {
    return { success: false, error: 'No file selected.' };
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('BLOB_READ_WRITE_TOKEN is missing at runtime');
    return { success: false, error: 'Blob credentials not configured.' };
  }

  try {
    const blob = await put(file.name, file, {
      access: 'public',
      token,
      addRandomSuffix: true,
    });
    return { success: true, filename: file.name, url: blob.url };
  } catch (error: any) {
    console.error('Blob upload error:', error);
    return { success: false, error: error.message };
  }
}

// ----- Admin Users Management -----
const USERS_KEY = `${REDIS_PREFIX}admin:users`;

type AdminUser = {
  username: string;
  displayName: string;
  passwordHash: string;
  role: 'admin' | 'editor';
};

async function getUsers(): Promise<AdminUser[]> {
  const raw = await redis.get(USERS_KEY);
  if (!raw) return [];
  if (typeof raw === 'string') return JSON.parse(raw);
  if (typeof raw === 'object' && raw !== null && 'result' in raw) {
    return JSON.parse((raw as any).result);
  }
  return raw as AdminUser[];
}

async function saveUsers(users: AdminUser[]) {
  await redis.set(USERS_KEY, JSON.stringify(users));
}

async function getUserByUsername(username: string): Promise<AdminUser | null> {
  const users = await getUsers();
  return users.find(u => u.username === username) || null;
}

// Get current logged-in user object
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const username = cookieStore.get('admin_username')?.value || '';
  if (!username) return null;
  return await getUserByUsername(username);
}

// Check if current user is admin
export async function isAdmin() {
  const user = await getCurrentUser();
  if (user) {
    return user.role === 'admin';
  }
  // Legacy fallback: if no users exist yet, 'empowerkids' is admin
  const cookieStore = await cookies();
  const username = cookieStore.get('admin_username')?.value || '';
  if (username === 'empowerkids') {
    const users = await getUsers();
    if (users.length === 0) {
      return true;
    }
  }
  return false;
}

// ----- Rate Limiting / Lockout -----
const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 15 * 60; // 15 minutes

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwarded = headersList.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return headersList.get('x-real-ip') || 'unknown';
}

async function getLoginAttempts(ip: string): Promise<number> {
  const raw = await redis.get(`${REDIS_PREFIX}admin:login:attempts:${ip}`);
  if (!raw) return 0;
  if (typeof raw === 'string') return parseInt(raw, 10);
  if (typeof raw === 'object' && raw !== null && 'result' in raw) {
    return parseInt((raw as any).result, 10);
  }
  return typeof raw === 'number' ? raw : 0;
}

async function incrementLoginAttempts(ip: string): Promise<void> {
  const key = `${REDIS_PREFIX}admin:login:attempts:${ip}`;
  const current = await getLoginAttempts(ip);
  const next = current + 1;
  await redis.set(key, next, { ex: LOCKOUT_SECONDS });
}

async function setLoginLock(ip: string): Promise<void> {
  const key = `${REDIS_PREFIX}admin:login:lock:${ip}`;
  await redis.set(key, 'locked', { ex: LOCKOUT_SECONDS });
}

async function isLoginLocked(ip: string): Promise<boolean> {
  const raw = await redis.get(`${REDIS_PREFIX}admin:login:lock:${ip}`);
  return !!raw;
}

async function clearLoginAttempts(ip: string): Promise<void> {
  await redis.del(`${REDIS_PREFIX}admin:login:attempts:${ip}`);
  await redis.del(`${REDIS_PREFIX}admin:login:lock:${ip}`);
}

// ----- Authentication -----
export async function authenticate(username: string, password: string) {
  const ip = await getClientIp();

  // Check if locked out
  if (await isLoginLocked(ip)) {
    return { success: false, error: 'Too many failed attempts. Please try again in 15 minutes.' };
  }

  // 1. Check users list first
  const users = await getUsers();
  if (users.length > 0) {
    const user = users.find(u => u.username === username);
    if (!user) {
      await incrementLoginAttempts(ip);
      const attempts = await getLoginAttempts(ip);
      if (attempts >= MAX_ATTEMPTS) {
        await setLoginLock(ip);
        await redis.del(`${REDIS_PREFIX}admin:login:attempts:${ip}`);
        return { success: false, error: 'Too many failed attempts. Please try again in 15 minutes.' };
      }
      return { success: false, error: 'Invalid username or password' };
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      await incrementLoginAttempts(ip);
      const attempts = await getLoginAttempts(ip);
      if (attempts >= MAX_ATTEMPTS) {
        await setLoginLock(ip);
        await redis.del(`${REDIS_PREFIX}admin:login:attempts:${ip}`);
        return { success: false, error: 'Too many failed attempts. Please try again in 15 minutes.' };
      }
      return { success: false, error: 'Invalid username or password' };
    }

    // Success
    await clearLoginAttempts(ip);
    const cookieStore = await cookies();
    cookieStore.set('admin_token', process.env.ADMIN_SECRET || 'fallback-secret', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set('admin_username', user.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return { success: true };
  }

  // 2. Legacy fallback (only when no users have been created)
  const legacyUser = 'empowerkids';
  const legacyPass = 'Empower2014';
  if (username === legacyUser && password === legacyPass) {
    await clearLoginAttempts(ip);
    const cookieStore = await cookies();
    cookieStore.set('admin_token', process.env.ADMIN_SECRET || 'fallback-secret', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    cookieStore.set('admin_username', legacyUser, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return { success: true };
  }

  // Invalid legacy attempt
  await incrementLoginAttempts(ip);
  const attempts = await getLoginAttempts(ip);
  if (attempts >= MAX_ATTEMPTS) {
    await setLoginLock(ip);
    await redis.del(`${REDIS_PREFIX}admin:login:attempts:${ip}`);
    return { success: false, error: 'Too many failed attempts. Please try again in 15 minutes.' };
  }
  return { success: false, error: 'Invalid username or password' };
}

// ----- Change Password (legacy, kept for backward compatibility) -----
export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  const expectedToken = process.env.ADMIN_SECRET || 'fallback-secret';
  if (!token || token.value !== expectedToken) {
    return { success: false, error: 'Not authenticated' };
  }

  const username = cookieStore.get('admin_username')?.value || '';
  if (!username) {
    return { success: false, error: 'User identity not found' };
  }

  if (newPassword.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters long' };
  }

  const user = await getUserByUsername(username);
  if (!user) {
    if (username === 'empowerkids' && currentPassword === 'Empower2014') {
      const hash = await bcrypt.hash(newPassword, 10);
      await saveUsers([{ username: 'empowerkids', displayName: 'EmpowerKids Admin', passwordHash: hash, role: 'admin' }]);
      return { success: true };
    }
    return { success: false, error: 'User not found' };
  }

  const match = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!match) {
    return { success: false, error: 'Current password is incorrect' };
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  user.passwordHash = newHash;
  const users = await getUsers();
  const index = users.findIndex(u => u.username === username);
  if (index === -1) return { success: false, error: 'User not found in list' };
  users[index] = user;
  await saveUsers(users);
  return { success: true };
}

// ----- Update Admin Profile (username and password) -----
export async function updateAdminProfile(
  currentUsername: string,
  currentPassword: string,
  newUsername: string,
  newPassword: string
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  const expectedToken = process.env.ADMIN_SECRET || 'fallback-secret';
  if (!token || token.value !== expectedToken) {
    return { success: false, error: 'Not authenticated' };
  }

  const loggedInUsername = cookieStore.get('admin_username')?.value || '';
  if (!loggedInUsername) {
    return { success: false, error: 'User identity not found' };
  }

  if (currentUsername.trim() !== loggedInUsername) {
    return { success: false, error: 'Current username is incorrect' };
  }

  const user = await getUserByUsername(loggedInUsername);
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  const match = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!match) {
    return { success: false, error: 'Current password is incorrect' };
  }

  const finalUsername = newUsername.trim();
  if (!finalUsername) {
    return { success: false, error: 'New username is required' };
  }
  if (finalUsername !== loggedInUsername) {
    const users = await getUsers();
    if (users.some(u => u.username === finalUsername)) {
      return { success: false, error: 'Username already exists' };
    }
  }

  if (!newPassword || newPassword.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters long' };
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  const users = await getUsers();
  const index = users.findIndex(u => u.username === loggedInUsername);
  if (index === -1) {
    return { success: false, error: 'User not found in list' };
  }

  const updatedUser: AdminUser = {
    ...users[index],
    username: finalUsername,
    passwordHash: newHash,
  };

  users[index] = updatedUser;
  await saveUsers(users);

  if (finalUsername !== loggedInUsername) {
    cookieStore.set('admin_username', finalUsername, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
  }

  return { success: true };
}

// ----- User Management (admin only) -----
export async function getAdminUsers() {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error('Only admins can view users');
  }
  const users = await getUsers();
  return users.map(u => ({ username: u.username, displayName: u.displayName, role: u.role }));
}

export async function addAdminUser(formData: FormData) {
  const admin = await isAdmin();
  if (!admin) {
    return { success: false, error: 'Only admins can add users' };
  }

  const username = String(formData.get('username') || '').trim();
  const displayName = String(formData.get('displayName') || '').trim();
  const password = String(formData.get('password') || '');
  const role = String(formData.get('role') || 'editor') as 'admin' | 'editor';

  if (!username || !displayName || password.length < 8) {
    return { success: false, error: 'Username, display name and password (min 8 chars) are required' };
  }

  const users = await getUsers();
  if (users.some(u => u.username === username)) {
    return { success: false, error: 'Username already exists' };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, displayName, passwordHash, role });
  await saveUsers(users);
  return { success: true };
}

export async function deleteAdminUser(username: string) {
  const admin = await isAdmin();
  if (!admin) {
    return { success: false, error: 'Only admins can delete users' };
  }

  if (username === 'empowerkids') {
    return { success: false, error: 'Cannot delete the primary admin' };
  }

  const users = await getUsers();
  const filtered = users.filter(u => u.username !== username);
  await saveUsers(filtered);
  return { success: true };
}

// ----- Logout -----
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  cookieStore.delete('admin_username');
  redirect('/admin/login');
}