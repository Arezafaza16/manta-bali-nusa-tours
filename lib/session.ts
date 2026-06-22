import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE = 'mbn_studio_session';
const ISSUER = 'manta-studio';
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not set. Add it to .env.local');
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<{ email: string } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
    });
    if (typeof payload.email === 'string') {
      return { email: payload.email };
    }
    return null;
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
