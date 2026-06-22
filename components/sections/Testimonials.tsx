'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { testimonials, proofStats } from '@/lib/data';
import type { Dictionary, Locale } from '@/lib/i18n';
import SectionHeading from '@/components/ui/SectionHeading';
import CountUp from '@/components/ui/CountUp';
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/icons';

interface TestimonialsProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Testimonials({ dict, locale }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [go]);

  const active = testimonials[index];
  const quote = locale === 'id' ? (active.textId ?? active.text) : active.text;

  return (
    <section
      id="testimonials"
      className="section-pad relative overflow-hidden bg-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-sky-500/[0.05] blur-3xl"
      />
      <div className="container-px relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={dict.testimonials.eyebrow}
          title={dict.testimonials.title}
          subtitle={dict.testimonials.subtitle}
        />

        <div className="mt-12 rounded-4xl bg-ink-50 p-8 ring-1 ring-ink-900/5 sm:p-12">
          <div className="flex gap-1 text-brand-500" aria-label={`${active.rating}/5`}>
            {Array.from({ length: active.rating }).map((_, i) => (
              <StarIcon key={i} className="h-5 w-5" />
            ))}
          </div>

          <blockquote className="mt-6 font-display text-xl font-bold leading-snug text-ink-800 sm:text-2xl">
            “{quote}”
          </blockquote>

          <div className="mt-8 flex items-center justify-between">
            <figcaption className="flex items-center gap-4">
              <span className="relative h-14 w-14 overflow-hidden rounded-2xl ring-2 ring-brand-200">
                <Image
                  src={active.avatar}
                  alt={active.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="block font-bold text-ink-900">
                  {active.name}
                </span>
                <span className="block text-sm text-ink-500">
                  {active.country}
                </span>
              </span>
            </figcaption>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-700 shadow-soft transition-colors hover:bg-brand-gradient hover:text-white"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-700 shadow-soft transition-colors hover:bg-brand-gradient hover:text-white"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-1.5">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-7 bg-brand-500' : 'w-3 bg-ink-200 hover:bg-ink-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Proof stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 rounded-4xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5 sm:grid-cols-4 sm:divide-x sm:divide-ink-100">
          {proofStats.map((stat) => (
            <div key={stat.key} className="text-center">
              <CountUp
                end={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals ?? 0}
                className="font-display text-2xl font-extrabold text-brand-600 sm:text-3xl"
              />
              <p className="mt-1 text-xs text-ink-500 sm:text-sm">
                {dict.stats[stat.key as keyof typeof dict.stats] ?? stat.key}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
