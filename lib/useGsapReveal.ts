'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight wrapper around GSAP + ScrollTrigger that progressively enhances
 * a section: children tagged with `data-reveal` fade/slide up, and elements
 * tagged with `data-reveal-stagger` animate in sequence on scroll.
 *
 * GSAP is imported dynamically so it stays out of the server bundle and the
 * animation only runs in the browser after hydration.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    let ctx: { revert: () => void } | undefined;
    // Skip building tweens if the effect is torn down before the async GSAP
    // import resolves (React StrictMode double-invoke), avoiding overlapping
    // animations that can leave elements stuck mid-reveal.
    let cancelled = false;

    (async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      const gsap = gsapModule.gsap ?? gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger ?? stModule.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const reveals = root.querySelectorAll<HTMLElement>('[data-reveal]');
        reveals.forEach((el) => {
          gsap.fromTo(
            el,
            { y: 48, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: 'power3.out',
              // Remove GSAP's inline transform once revealed so it can't fight a
              // CSS transition on transform (e.g. hover-translate cards).
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            },
          );
        });

        const staggerGroups =
          root.querySelectorAll<HTMLElement>('[data-reveal-group]');
        staggerGroups.forEach((group) => {
          const items =
            group.querySelectorAll<HTMLElement>('[data-reveal-item]');
          gsap.fromTo(
            items,
            { y: 60, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.14,
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: group,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            },
          );
        });

        const parallaxItems =
          root.querySelectorAll<HTMLElement>('[data-parallax]');
        parallaxItems.forEach((el) => {
          const depth = Number(el.dataset.parallax) || 0.2;
          gsap.to(el, {
            yPercent: depth * 100,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return ref;
}
