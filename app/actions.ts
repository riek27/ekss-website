'use server';

import { Redis } from '@upstash/redis';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// ----- Redis client -----
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const REDIS_PREFIX = process.env.REDIS_PREFIX || 'ekss:';

// ----- Save page data (Redis) -----
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

// ----- Get page data (used in API route and seed) -----
export async function getPageData(page: string) {
  const raw = await redis.get(`${REDIS_PREFIX}page:${page}`);
  if (!raw) return null;
  // handle both raw string and object with 'result' property
  if (typeof raw === 'string') {
    return JSON.parse(raw);
  }
  if (typeof raw === 'object' && raw !== null && 'result' in raw) {
    return JSON.parse((raw as any).result);
  }
  return raw;
}

// ----- Upload file to Vercel Blob -----
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
      addRandomSuffix: true,   // prevents duplicate filenames
    });
    return { success: true, filename: file.name, url: blob.url };
  } catch (error: any) {
    console.error('Blob upload error:', error);
    return { success: false, error: error.message };
  }
}

// ----- Authentication (unchanged) -----
export async function authenticate(username: string, password: string) {
  const expectedUser = 'empowerkids';
  const expectedPass = 'Empower2014';

  if (username === expectedUser && password === expectedPass) {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', process.env.ADMIN_SECRET || 'fallback-secret', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return { success: true };
  }
  return { success: false, error: 'Invalid username or password' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  redirect('/admin/login');
}