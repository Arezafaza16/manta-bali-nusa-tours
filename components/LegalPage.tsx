import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { ArrowIcon } from '@/components/icons';

export interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  backLabel: string;
}

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
  backLabel,
}: LegalPageProps) {
  return (
    <main className="min-h-dvh bg-white">
      <header className="border-b border-ink-100">
        <div className="container-px mx-auto flex max-w-3xl items-center justify-between py-5">
          <Link href="/" aria-label="Manta Balinusa Tour">
            <BrandLogo />
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-bold text-ink-600 transition-colors hover:text-brand-600"
          >
            <ArrowIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            {backLabel}
          </Link>
        </div>
      </header>

      <article className="container-px mx-auto max-w-3xl py-14">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink-400">{updated}</p>
        <p className="mt-6 leading-relaxed text-ink-600">{intro}</p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-bold text-ink-900">
                {s.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-600">{s.body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
