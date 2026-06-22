import { getLocale } from '@/lib/getLocale';
import { getDictionary } from '@/lib/i18n';
import { getPackages } from '@/lib/packages';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsBar from '@/components/sections/StatsBar';
import Packages from '@/components/sections/Packages';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import PopularDestinations from '@/components/sections/PopularDestinations';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default async function HomePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const packages = await getPackages();

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main id="main-content" tabIndex={-1}>
        <Hero dict={dict} />
        <StatsBar dict={dict} />
        <Packages dict={dict} locale={locale} packages={packages} />
        <WhyChooseUs dict={dict} />
        <PopularDestinations dict={dict} locale={locale} />
        <Testimonials dict={dict} locale={locale} />
        <Contact dict={dict} locale={locale} packages={packages} />
      </main>
      <Footer dict={dict} />
      <FloatingWhatsApp label={dict.common.bookWhatsapp} />
    </>
  );
}
