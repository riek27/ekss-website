import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    if (!page) {
      return NextResponse.json({ error: 'Missing page param' }, { status: 400 });
    }

    const redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    });

    const REDIS_PREFIX = process.env.REDIS_PREFIX || 'ekss:';
    const raw = await redis.get(`${REDIS_PREFIX}page:${page}`);

    if (!raw) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(JSON.parse(raw as string));
  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}