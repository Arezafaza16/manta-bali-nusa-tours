import Image from 'next/image';
import { destinations, waLink } from '@/lib/data';
import { formatPrice, type Dictionary, type Locale } from '@/lib/i18n';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { ArrowIcon, PinIcon } from '@/components/icons';

interface PopularDestinationsProps {
  dict: Dictionary;
  locale: Locale;
}

// Asymmetric 6-column bento: a dominant feature tile, two tall tiles on the
// right, two wide tiles across the bottom.
const spans = [
  'sm:col-span-4 sm:row-span-2 min-h-[340px] sm:min-h-0',
  'sm:col-span-2',
  'sm:col-span-2',
  'sm:col-span-3',
  'sm:col-span-3',
];

export default function PopularDestinations({
  dict,
  locale,
}: PopularDestinationsProps) {
  return (
    <Reveal as="section" id="destinations" className="section-pad bg-ink-50">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={dict.destinations.eyebrow}
          title={dict.destinations.title}
          subtitle={dict.destinations.subtitle}
        />

        <div
          data-reveal-group
          className="mt-14 grid auto-rows-[210px] grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-5"
        >
          {destinations.map((dest, i) => {
            const isFeature = dest.size === 'lg';
            const area = locale === 'id' ? (dest.areaId ?? dest.area) : dest.area;
            const tagline =
              locale === 'id' ? (dest.taglineId ?? dest.tagline) : dest.tagline;
            const msg = `${locale === 'id' ? 'Halo' : 'Hi'} Manta Bali Nusa Tours! ${
              locale === 'id'
                ? `Saya ingin info tur ke ${dest.name}.`
                : `I'd like info about tours to ${dest.name}.`
            }`;

            return (
              <a
                key={dest.id}
                href={waLink(msg)}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal-item
                className={`group relative overflow-hidden rounded-3xl ${spans[i]}`}
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes={isFeature ? '(max-width: 640px) 100vw, 66vw' : '(max-width: 640px) 100vw, 33vw'}
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.12]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-brand-600/0 transition-colors duration-500 group-hover:bg-brand-600/10" />

                {/* Tours badge */}
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/25 backdrop-blur">
                  <PinIcon className="h-3.5 w-3.5 text-brand-300" />
                  {dest.tours} {dict.destinations.tours}
                </span>

                <div className="absolute inset-x-5 bottom-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3
                        className={`font-display font-extrabold text-white ${
                          isFeature ? 'text-2xl sm:text-3xl' : 'text-xl'
                        }`}
                      >
                        {dest.name}
                      </h3>
                      <p className="text-sm text-white/70">{area}</p>
                    </div>
                    {!isFeature && (
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:ring-brand-500">
                        <ArrowIcon className="h-5 w-5" />
                      </span>
                    )}
                  </div>

                  {isFeature ? (
                    <div className="mt-3">
                      <p className="max-w-md text-sm text-white/80">{tagline}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
                          {dict.destinations.explore}
                          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="text-sm font-semibold text-white/80">
                          {dict.destinations.from}{' '}
                          <span className="text-brand-300">
                            {formatPrice(dest.priceFrom)}
                          </span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Collapsed by default, smoothly revealed on hover
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <div className="pt-3">
                          <p className="text-sm text-white/80">{tagline}</p>
                          <p className="mt-1.5 text-sm font-semibold text-white/80">
                            {dict.destinations.from}{' '}
                            <span className="text-brand-300">
                              {formatPrice(dest.priceFrom)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <span className="sr-only">{dict.destinations.explore}</span>
              </a>
            );
          })}
        </div>

        {/* Section CTA */}
        <div data-reveal className="mt-10 text-center">
          <a
            href="#packages"
            className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-6 py-3 text-sm font-bold text-ink-800 transition-all hover:border-brand-300 hover:text-brand-600 hover:shadow-soft"
          >
            {dict.destinations.viewAll}
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}
