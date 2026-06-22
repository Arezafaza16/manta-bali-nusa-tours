import {
  WHATSAPP_LINK,
  WHATSAPP_NUMBER,
  CONTACT_EMAIL,
  INSTAGRAM_LINK,
  INSTAGRAM_HANDLE,
  TIKTOK_LINK,
  TIKTOK_HANDLE,
  FACEBOOK_LINK,
} from '@/lib/data';
import type { Dictionary, Locale } from '@/lib/i18n';
import type { TourPackage } from '@/lib/types';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/sections/ContactForm';
import {
  SparkleIcon,
  WhatsAppIcon,
  InstagramIcon,
  PinIcon,
  MailIcon,
  TikTokIcon,
  FacebookIcon,
} from '@/components/icons';

interface ContactProps {
  dict: Dictionary;
  locale: Locale;
  packages: TourPackage[];
}

export default function Contact({ dict, locale, packages }: ContactProps) {
  const channels = [
    {
      icon: WhatsAppIcon,
      label: dict.contact.whatsapp,
      value: `+${WHATSAPP_NUMBER}`,
      href: WHATSAPP_LINK,
      tint: 'bg-wa-500/10 text-wa-600',
    },
    {
      icon: InstagramIcon,
      label: dict.contact.instagram,
      value: `@${INSTAGRAM_HANDLE}`,
      href: INSTAGRAM_LINK,
      tint: 'bg-brand-50 text-brand-600',
    },
    {
      icon: TikTokIcon,
      label: dict.contact.tiktok,
      value: `@${TIKTOK_HANDLE}`,
      href: TIKTOK_LINK,
      tint: 'bg-ink-950/10 text-ink-950',
    },
    {
      icon: FacebookIcon,
      label: dict.contact.facebook,
      value: 'Manta Bali Nusa Tour',
      href: FACEBOOK_LINK,
      tint: 'bg-blue-600/10 text-blue-600',
    },
    {
      icon: MailIcon,
      label: dict.contact.email,
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      tint: 'bg-ink-900/5 text-ink-700',
    },
    {
      icon: PinIcon,
      label: dict.contact.address,
      value: dict.contact.addressValue,
      href: 'https://maps.app.goo.gl/71yZyPT3xFCetUkn7',
      tint: 'bg-sky-500/10 text-sky-600',
    },
  ];

  return (
    <Reveal
      as="section"
      id="contact"
      className="section-pad relative overflow-hidden bg-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-500/[0.06] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-sky-500/[0.06] blur-3xl"
      />
      <div className="container-px relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start">
        <div data-reveal>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.22em] text-sky-600">
            <SparkleIcon className="h-3.5 w-3.5" />
            {dict.contact.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl leading-[1.1] text-ink-900 sm:text-4xl lg:text-[2.6rem]">
            {dict.contact.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500">
            {dict.contact.subtitle}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {channels.map((c) => {
              const Icon = c.icon;
              const external = c.href.startsWith('http');
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.tint}`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-ink-400">
                      {c.label}
                    </span>
                    <span className="block font-semibold text-ink-800 truncate">
                      {c.value}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>

          {/* Embedded Office Map */}
          <div className="mt-8 relative h-[300px] overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all hover:shadow-card">
            <iframe
              src="https://maps.google.com/maps?q=CV%20Manta%20Balinusa%20Tour,%20Jl.%20Pakisaji%20Gang%20Cenganasari%20XIV%20No.%2010,%20Kesiman,%20Denpasar,%20Bali&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="CV Manta Balinusa Tour Office Location Map"
              className="grayscale-[20%] contrast-[110%] transition-all hover:grayscale-0"
            />
          </div>
        </div>

        <div data-reveal>
          <ContactForm
            dict={dict}
            locale={locale}
            destinations={packages.map((p) => p.title)}
          />
        </div>
      </div>
    </Reveal>
  );
}
