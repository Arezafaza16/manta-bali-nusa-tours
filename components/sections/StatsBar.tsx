import { heroStats } from '@/lib/data';
import type { Dictionary } from '@/lib/i18n';
import CountUp from '@/components/ui/CountUp';
import { UsersIcon, PinIcon, ClockIcon, StarIcon } from '@/components/icons';

const icons: Record<string, typeof UsersIcon> = {
  travelers: UsersIcon,
  destinations: PinIcon,
  years: ClockIcon,
  rating: StarIcon,
};

export default function StatsBar({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative z-10 -mt-px overflow-hidden bg-ink-900">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl"
      />
      <div className="container-px relative mx-auto max-w-7xl">
        <div className="grid grid-cols-2 divide-white/10 py-8 md:grid-cols-4 md:divide-x">
          {heroStats.map((stat, i) => {
            const Icon = icons[stat.key];
            const tint =
              i % 2 === 0
                ? 'bg-brand-500/15 text-brand-400'
                : 'bg-sky-500/15 text-sky-400';
            const label =
              dict.stats[stat.key as keyof typeof dict.stats] ?? stat.key;
            return (
              <div
                key={stat.key}
                className="flex items-center gap-4 px-2 py-3 md:justify-center md:px-6"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tint}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                    className="font-display text-2xl font-extrabold text-white sm:text-3xl"
                  />
                  <p className="text-xs text-white/55 sm:text-sm">{label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
