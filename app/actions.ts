'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// ------- Content Saving -------
export async function savePageData(page: string, data: any) {
  const filePath = path.join(process.cwd(), 'data', `${page}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    revalidatePath(page === 'home' ? '/' : `/${page}`);
    revalidatePath('/admin/' + page);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// ------- Image Upload (unchanged, kept for backward compatibility) -------
export async function uploadImage(formData: FormData) {
  const file = formData.get('image') as File | null;
  if (!file || file.size === 0) {
    return { success: false, error: 'No file selected.' };
  }

  const uniqueName = `${Date.now()}-${file.name}`;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, uniqueName);
  fs.writeFileSync(filePath, buffer);

  return { success: true, filename: uniqueName, url: `/images/${uniqueName}` };
}

// ------- General File Upload (new) -------
export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File | null;
  if (!file || file.size === 0) {
    return { success: false, error: 'No file selected.' };
  }

  // Determine subdirectory based on file type
  const ext = file.name.split('.').pop()?.toLowerCase();
  let subDir = 'uploads';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
    subDir = 'images';
  } else if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext || '')) {
    subDir = 'documents';
  }

  const uniqueName = `${Date.now()}-${file.name}`;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', subDir);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, uniqueName);
  fs.writeFileSync(filePath, buffer);

  return { success: true, filename: uniqueName, url: `/${subDir}/${uniqueName}` };
}

// ------- Authentication -------
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