import { SparkleIcon } from '@/components/icons';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <span
        data-reveal
        className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.22em] ${
          light ? 'text-brand-300' : 'text-sky-600'
        }`}
      >
        <SparkleIcon className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2
        data-reveal
        className={`mt-4 font-display text-3xl leading-[1.1] sm:text-4xl lg:text-[2.6rem] ${
          light ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          data-reveal
          className={`mt-4 text-base leading-relaxed ${
            light ? 'text-ink-100/75' : 'text-ink-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
