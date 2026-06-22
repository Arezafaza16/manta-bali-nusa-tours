'use client';

import { LOCALE_COOKIE, type Locale } from '@/lib/i18n';

interface LocaleSwitcherProps {
  locale: Locale;
  variant?: 'light' | 'dark';
}

export default function LocaleSwitcher({
  locale,
  variant = 'dark',
}: LocaleSwitcherProps) {
  const setLocale = (next: Locale) => {
    if (next === locale) return;
    // Persist the manual choice; getLocale() reads this cookie first.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  };

  const base =
    variant === 'light'
      ? 'bg-ink-900/5 ring-ink-900/10'
      : 'bg-white/10 ring-white/20';

  return (
    <div
      className={`flex items-center rounded-full p-0.5 text-xs font-bold ring-1 ${base}`}
      role="group"
      aria-label="Language"
    >
      {(['en', 'id'] as Locale[]).map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
              active
                ? 'bg-brand-500 text-white'
                : variant === 'light'
                  ? 'text-ink-500 hover:text-ink-800'
                  : 'text-white/70 hover:text-white'
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
