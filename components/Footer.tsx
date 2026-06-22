import Link from 'next/link';
import {
  WHATSAPP_LINK,
  WHATSAPP_NUMBER,
  CONTACT_EMAIL,
  INSTAGRAM_LINK,
} from '@/lib/data';
import type { Dictionary } from '@/lib/i18n';
import {
  WhatsAppIcon,
  InstagramIcon,
  MailIcon,
  PinIcon,
} from '@/components/icons';
import BrandLogo from '@/components/BrandLogo';

export default function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: dict.nav.home, href: '#home' },
    { label: dict.nav.packages, href: '#packages' },
    { label: dict.nav.destinations, href: '#destinations' },
    { label: dict.nav.testimonials, href: '#testimonials' },
    { label: dict.nav.contact, href: '#contact' },
  ];

  const destLinks = [
    'Nusa Penida',
    'Ubud',
    'Kelingking Beach',
    'Diamond Beach',
    'Manta Bay',
  ];

  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo onDark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              {dict.footer.tagline}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-ink-200 transition-colors hover:bg-brand-500 hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-ink-200 transition-colors hover:bg-brand-500 hover:text-white"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-ink-200 transition-colors hover:bg-brand-500 hover:text-white"
              >
                <MailIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              {dict.footer.navTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              {dict.footer.destTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {destLinks.map((d) => (
                <li key={d}>
                  <a
                    href="#destinations"
                    className="transition-colors hover:text-brand-400"
                  >
                    {d}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              {dict.footer.contactTitle}
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-brand-400"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0 text-brand-500" />
                  +{WHATSAPP_NUMBER}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 transition-colors hover:text-brand-400"
                >
                  <MailIcon className="h-5 w-5 shrink-0 text-brand-500" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PinIcon className="h-5 w-5 shrink-0 text-brand-500" />
                Bali &amp; Nusa Penida, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-ink-400 sm:flex-row">
          <p>© {year} Manta Bali Nusa Tours. {dict.footer.rights}</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-brand-400">
              {dict.footer.privacy}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand-400">
              {dict.footer.terms}
            </Link>
            <span className="hidden sm:inline">{dict.footer.madeIn} 🌊</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
