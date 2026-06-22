'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function CountUp({
  end,
  suffix = '',
  decimals = 0,
  duration = 2000,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const prefersReduced = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;
        if (prefersReduced) {
          setValue(end);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutExpo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setValue(end * eased);
          if (progress < 1) requestAnimationFrame(tick);
          else setValue(end);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={`tnum ${className ?? ''}`}>
      {value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
