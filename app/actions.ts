'use server';

import { Redis } from '@upstash/redis';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const REDIS_PREFIX = process.env.REDIS_PREFIX || 'ekss:';

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
  return JSON.parse(raw as string);
}

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File | null;
  if (!file || file.size === 0) {
    return { success: false, error: 'No file selected.' };
  }
  try {
    const blob = await put(file.name, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return { success: true, filename: file.name, url: blob.url };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

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