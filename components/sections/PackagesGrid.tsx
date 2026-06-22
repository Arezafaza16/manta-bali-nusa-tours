'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { TourPackage } from '@/lib/types';
import { waLink } from '@/lib/data';
import { formatPrice, type Dictionary, type Locale } from '@/lib/i18n';
import { ClockIcon, ArrowIcon } from '@/components/icons';
import PackageDetailModal from '@/components/ui/PackageDetailModal';

interface PackagesGridProps {
  packages: TourPackage[];
  dict: Dictionary;
  locale: Locale;
}

export default function PackagesGrid({
  packages,
  dict,
  locale,
}: PackagesGridProps) {
  const [selected, setSelected] = useState<TourPackage | null>(null);

  return (
    <>
      <div
        data-reveal-group
        className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
      >
        {packages.map((pkg) => {
          const description =
            locale === 'id'
              ? (pkg.descriptionId ?? pkg.description)
              : pkg.description;
          const duration =
            locale === 'id' ? (pkg.durationId ?? pkg.duration) : pkg.duration;
          const bookMsg = `${locale === 'id' ? 'Halo' : 'Hi'} Manta Bali Nusa Tours! ${
            locale === 'id' ? 'Saya ingin booking paket' : "I'd like to book the"
          } "${pkg.title}" (${formatPrice(pkg.priceValue)}).`;

          return (
            <article
              key={pkg.id}
              data-reveal-item
              className="group flex flex-col rounded-xs bg-white shadow-soft ring-1 ring-ink-900/[0.07] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card"
            >
              <div className="relative h-48 overflow-hidden rounded-t-xs">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-xs bg-white/90 px-3 py-1 text-xs font-bold text-ink-800 backdrop-blur">
                  <ClockIcon className="h-3.5 w-3.5 text-brand-500" />
                  {duration}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 min-h-[3.25rem] font-display text-lg font-extrabold leading-snug text-ink-900">
                  {pkg.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">
                  {description}
                </p>

                {/* Pinned to the bottom so price + buttons line up across the row */}
                <div className="mt-auto pt-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[11px] text-ink-400">
                        {dict.packages.startingFrom}
                      </span>
                      <p className="font-display text-xl font-extrabold text-brand-600">
                        {formatPrice(pkg.priceValue)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelected(pkg)}
                      className="rounded-xs border border-ink-200 px-4 py-2.5 text-sm font-bold text-ink-700 transition-colors hover:border-ink-300 hover:bg-ink-50"
                    >
                      {dict.packages.detail}
                    </button>
                    <a
                      href={waLink(bookMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xs bg-brand-gradient px-4 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.03] active:scale-95"
                    >
                      {dict.packages.book}
                      <ArrowIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {selected && (
        <PackageDetailModal
          pkg={selected}
          dict={dict}
          locale={locale}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
