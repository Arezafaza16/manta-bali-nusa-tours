'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { waLink } from '@/lib/data';
import type { Dictionary } from '@/lib/i18n';
import { PinIcon, WhatsAppIcon, ArrowIcon } from '@/components/icons';

interface HeroProps {
  dict: Dictionary;
}

const slides = [
  '/images/hero_slide_1.png',
  '/images/hero_slide_2.png',
  '/images/hero_slide_3.png',
];

export default function Hero({ dict }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  // Background slideshow
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  // Text reveal: explicit set()+to() so it is deterministic under StrictMode
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsapModule = await import('gsap');
      if (cancelled) return;
      const gsap = gsapModule.gsap ?? gsapModule.default;
      ctx = gsap.context(() => {
        gsap.set('[data-hero]', { autoAlpha: 0, y: 34 });
        gsap.to('[data-hero]', {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          clearProps: 'transform,opacity,visibility',
        });
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-16 isolate"
    >
      {/* Background solid color below slides */}
      <div className="absolute inset-0 -z-20 bg-ink-950" />
      {/* Slideshow */}
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 -z-10 transition-opacity duration-1000"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/90 via-ink-950/60 to-ink-950/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />

      <div className="container-px mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <span
            data-hero
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur"
          >
            <PinIcon className="h-4 w-4 text-sky-300" />
            {dict.hero.badge}
          </span>

          <div data-hero className="mt-6 grid grid-cols-1 grid-rows-1">
            {dict.hero.slides.map((slide, i) => (
              <div
                key={i}
                className="col-start-1 row-start-1 transition-all duration-700 ease-in-out"
                style={{
                  opacity: i === index ? 1 : 0,
                  transform: i === index ? 'translateY(0)' : 'translateY(16px)',
                  pointerEvents: i === index ? 'auto' : 'none',
                }}
              >
                <h1 className="font-display text-[2.6rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div data-hero className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#packages"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-7 py-4 text-base font-bold text-white shadow-glow transition-transform hover:scale-105 active:scale-95"
            >
              {dict.hero.ctaPackages}
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-7 py-4 text-base font-bold text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {dict.hero.ctaBook}
            </a>
          </div>

          {/* Slideshow dots */}
          <div data-hero className="mt-12 flex gap-2">
            {slides.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-8 bg-brand-500' : 'w-4 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
