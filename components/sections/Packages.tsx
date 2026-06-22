import type { Dictionary, Locale } from '@/lib/i18n';
import type { TourPackage } from '@/lib/types';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import PackagesGrid from '@/components/sections/PackagesGrid';

interface PackagesProps {
  dict: Dictionary;
  locale: Locale;
  packages: TourPackage[];
}

export default function Packages({ dict, locale, packages }: PackagesProps) {
  return (
    <Reveal as="section" id="packages" className="section-pad bg-ink-50">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={dict.packages.eyebrow}
          title={dict.packages.title}
          subtitle={dict.packages.subtitle}
        />
        <div className="mt-14">
          <PackagesGrid packages={packages} dict={dict} locale={locale} />
        </div>
      </div>
    </Reveal>
  );
}
