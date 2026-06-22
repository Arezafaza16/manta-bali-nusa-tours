import { cookies, headers } from 'next/headers';
import { LOCALE_COOKIE, type Locale } from './i18n';

/**
 * Resolve the visitor's locale on the server, in priority order:
 *   1. explicit cookie (manual toggle)
 *   2. geo country header (Indonesia -> id), set by Vercel / many CDNs
 *   3. Accept-Language header (browser preference)
 *   4. English fallback
 *
 * Using request headers makes the page render dynamically per visitor, which
 * is what we want for automatic language detection.
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  if (fromCookie === 'id' || fromCookie === 'en') return fromCookie;

  const h = await headers();

  const country = (
    h.get('x-vercel-ip-country') ||
    h.get('cf-ipcountry') ||
    h.get('x-country') ||
    ''
  ).toUpperCase();
  if (country === 'ID') return 'id';

  const accept = h.get('accept-language')?.toLowerCase() ?? '';
  const primary = accept
    .split(',')
    .map((part) => part.trim().split(';')[0])
    .find(Boolean);
  if (primary === 'id' || primary?.startsWith('id-')) return 'id';

  return 'en';
}
