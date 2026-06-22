import { NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/lib/session';

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email : '';
  const password = typeof body.password === 'string' ? body.password : '';

  const expectedEmail = process.env.STUDIO_EMAIL ?? '';
  const expectedPassword = process.env.STUDIO_PASSWORD ?? '';

  if (!expectedEmail || !expectedPassword || !process.env.AUTH_SECRET) {
    return NextResponse.json(
      { error: 'Admin login is not configured on the server.' },
      { status: 500 },
    );
  }

  const valid =
    safeEqual(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase()) &&
    safeEqual(password, expectedPassword);

  if (!valid) {
    return NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 401 },
    );
  }

  const token = await createSessionToken(expectedEmail);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
