import type { Dictionary } from '@/lib/i18n';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import {
  CompassIcon,
  TagIcon,
  ShieldIcon,
  PhoneIcon,
} from '@/components/icons';

const icons = [CompassIcon, TagIcon, ShieldIcon, PhoneIcon];
const tints = [
  'bg-brand-50 text-brand-600',
  'bg-sky-500/10 text-sky-600',
  'bg-wa-500/10 text-wa-600',
  'bg-ink-900/5 text-ink-700',
];

export default function WhyChooseUs({ dict }: { dict: Dictionary }) {
  return (
    <Reveal
      as="section"
      id="why"
      className="section-pad relative overflow-hidden bg-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full bg-brand-500/[0.06] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sky-500/[0.06] blur-3xl"
      />
      <div className="container-px relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={dict.why.eyebrow}
          title={dict.why.title}
          subtitle={dict.why.subtitle}
        />

        <div
          data-reveal-group
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {dict.why.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.title}
                data-reveal-item
                className="group rounded-3xl bg-white/70 p-7 text-center ring-1 ring-ink-900/[0.06] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card hover:ring-transparent"
              >
                <span
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${tints[i]}`}
                >
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
