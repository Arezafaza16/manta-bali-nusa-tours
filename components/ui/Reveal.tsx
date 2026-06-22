'use client';

import type { ElementType, ReactNode } from 'react';
import { useGsapReveal } from '@/lib/useGsapReveal';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
}

/**
 * Client wrapper that activates scroll-triggered GSAP animations for any
 * descendants tagged with data-reveal / data-reveal-group / data-parallax.
 * Lets the inner content remain server-rendered.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className,
  id,
}: RevealProps) {
  const ref = useGsapReveal<HTMLElement>();
  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
