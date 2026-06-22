'use client';

import { useState } from 'react';
import Image from 'next/image';
import Logo from './Logo';

interface BrandLogoProps {
  /** Affects the fallback wordmark color on dark backgrounds. */
  onDark?: boolean;
}

const LOGO_SRC = '/mantabali-icon.png';

/**
 * Renders the official logo (public/mantabali-icon.png). The source is a square
 * canvas with transparent padding, so it's framed in a wide box with
 * object-cover to trim the surrounding whitespace and read at navbar size.
 * Falls back to the built-in SVG mark + wordmark if the file ever fails.
 */
export default function BrandLogo({ onDark = false }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="flex items-center gap-2.5">
        <Logo className="h-10 w-10 shrink-0" />
        <span className="font-display text-lg font-extrabold leading-none tracking-tight">
          <span className={onDark ? 'text-white' : 'text-brand-500'}>
            Manta
          </span>{' '}
          <span className="text-sky-500">Balinusa</span>
        </span>
      </span>
    );
  }

  return (
    <span className="relative block h-11 w-36">
      <Image
        src={LOGO_SRC}
        alt="Manta Balinusa Tour"
        fill
        sizes="160px"
        priority
        unoptimized
        onError={() => setFailed(true)}
        className="object-cover object-center"
      />
    </span>
  );
}
