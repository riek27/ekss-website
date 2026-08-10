import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token')?.value;
  const expectedToken = process.env.ADMIN_SECRET || 'fallback-secret';

  // If the user is on the login page, allow access even without a token
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // If no token or token doesn't match, redirect to login
  if (!adminToken || adminToken !== expectedToken) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};