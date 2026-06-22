import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';

// Paths that do not require a session.
const PUBLIC_PATHS = ['/studio/login', '/api/studio/auth/login'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (session) return NextResponse.next();

  // API requests get a 401; page requests are redirected to the login screen.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL('/studio/login', req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/studio/:path*', '/api/studio/:path*'],
};
