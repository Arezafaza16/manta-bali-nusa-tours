import Link from 'next/link';
import type { Metadata } from 'next';
import { WHATSAPP_LINK } from '@/lib/data';
import { ArrowIcon, WhatsAppIcon } from '@/components/icons';
import Logo from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink-gradient px-5 py-16 text-center">
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-ink-400/20 blur-3xl" />

      <div className="relative max-w-lg">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-glow">
          <Logo className="h-11 w-11" />
        </span>

        <p className="mt-8 font-display text-7xl font-bold text-white sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
          This shore isn&rsquo;t on our map
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-100/80">
          The page you&rsquo;re looking for drifted out to sea. Let&rsquo;s get
          you back to dry land and planning your next Bali adventure.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-semibold text-ink-900 shadow-glow transition-transform hover:scale-105 active:scale-95"
          >
            <ArrowIcon className="h-5 w-5 rotate-180" />
            Back to homepage
          </Link>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl glass px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/20"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat with us
          </a>
        </div>
      </div>
    </main>
  );
}
