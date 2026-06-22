'use client';

import Image from 'next/image';
import type { TourPackage } from '@/lib/types';
import { waLink } from '@/lib/data';
import {
  formatPrice,
  localizeTerm,
  type Dictionary,
  type Locale,
} from '@/lib/i18n';
import {
  CloseIcon,
  ClockIcon,
  CheckIcon,
  PinIcon,
  WhatsAppIcon,
} from '@/components/icons';

interface PackageDetailModalProps {
  pkg: TourPackage;
  dict: Dictionary;
  locale: Locale;
  onClose: () => void;
}

export default function PackageDetailModal({
  pkg,
  dict,
  locale,
  onClose,
}: PackageDetailModalProps) {
  const description =
    locale === 'id' ? (pkg.descriptionId ?? pkg.description) : pkg.description;
  const duration =
    locale === 'id' ? (pkg.durationId ?? pkg.duration) : pkg.duration;
  const message = `${locale === 'id' ? 'Halo' : 'Hi'} Manta Bali Nusa Tours! ${
    locale === 'id' ? 'Saya tertarik dengan paket' : "I'm interested in the"
  } "${pkg.title}" (${formatPrice(pkg.priceValue)}).`;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-ink-950/60 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="my-8 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.common.close}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-800 transition-colors hover:bg-white"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
              <ClockIcon className="h-3.5 w-3.5" />
              {duration}
            </span>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-white">
              {pkg.title}
            </h3>
          </div>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-6">
          <p className="text-sm leading-relaxed text-ink-500">{description}</p>

          <div className="mt-6 space-y-5">
            {pkg.itinerary.map((group, i) => (
              <div key={i}>
                {group.label && (
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">
                    {localizeTerm(group.label, locale)}
                  </p>
                )}
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-700"
                    >
                      <PinIcon className="h-3 w-3 text-brand-500" />
                      {localizeTerm(item, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-ink-100 pt-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-400">
              {dict.common.includes}
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {pkg.includes.map((inc) => (
                <li
                  key={inc}
                  className="flex items-start gap-2 text-sm text-ink-600"
                >
                  <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                  {localizeTerm(inc, locale)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-ink-100 p-5">
          <div>
            <span className="text-xs text-ink-400">{dict.packages.startingFrom}</span>
            <p className="font-display text-xl font-extrabold text-brand-600">
              {formatPrice(pkg.priceValue)}
            </p>
          </div>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-wa-500 px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-95"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {dict.common.bookWhatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}
