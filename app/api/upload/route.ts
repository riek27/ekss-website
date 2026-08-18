import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No file selected.' }, { status: 400 });
    }

    // Upload directly to Vercel Blob with a unique filename
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,   // <-- prevents duplicate filename errors
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}