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

    // The value might be already an object (if the client unpacks it) or a JSON string.
    let data: any;
    if (typeof raw === 'string') {
      data = JSON.parse(raw);
    } else if (typeof raw === 'object' && raw !== null) {
      // Some Upstash responses come as { result: "..." }
      if ('result' in raw) {
        data = JSON.parse(raw.result as string);
      } else {
        data = raw; // assume it's already the parsed object
      }
    } else {
      throw new Error('Unexpected data type from Redis');
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}