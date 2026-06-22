'use client';

import { useEffect, useState } from 'react';
import { WHATSAPP_LINK } from '@/lib/data';
import type { Dictionary, Locale } from '@/lib/i18n';
import { WhatsAppIcon, MenuIcon, CloseIcon } from '@/components/icons';
import BrandLogo from '@/components/BrandLogo';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher';

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Header({ dict, locale }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  const navLinks = [
    { label: dict.nav.home, href: '#home' },
    { label: dict.nav.packages, href: '#packages' },
    { label: dict.nav.destinations, href: '#destinations' },
    { label: dict.nav.testimonials, href: '#testimonials' },
    { label: dict.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['home', 'packages', 'destinations', 'testimonials', 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const onDark = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 shadow-soft backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-px mx-auto flex max-w-7xl items-center justify-between py-4">
        <a href="#home" className="flex items-center" aria-label="Manta Balinusa Tour">
          <BrandLogo onDark={onDark} />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-brand-500'
                      : onDark
                        ? 'text-white/85 hover:text-white'
                        : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LocaleSwitcher locale={locale} variant={onDark ? 'dark' : 'light'} />
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white shadow-glow transition-transform hover:scale-105 active:scale-95 sm:flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {dict.nav.book}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className={`flex h-10 w-10 items-center justify-center rounded-xl lg:hidden ${
              onDark ? 'text-white hover:bg-white/10' : 'text-ink-900 hover:bg-ink-900/5'
            }`}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={open ? 'pointer-events-auto' : 'pointer-events-none'}>
        <div
          className={`fixed inset-0 top-0 z-40 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`fixed inset-x-0 top-[72px] z-50 mx-4 rounded-3xl bg-white p-6 shadow-card transition-all duration-300 lg:hidden ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-600'
                        : 'text-ink-700 hover:bg-ink-50'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3">
            <LocaleSwitcher locale={locale} variant="light" />
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-5 py-3 text-base font-bold text-white shadow-glow"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {dict.nav.book}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
