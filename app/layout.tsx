import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '@/lib/data';
import { getLocale } from '@/lib/getLocale';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const SITE_URL = 'https://mantabalinusatours.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Manta Bali Nusa Tours | Bali & Nusa Penida Tour Packages',
    template: '%s | Manta Bali Nusa Tours',
  },
  description:
    'Explore Bali and Nusa Penida with local experts. ATV adventures, snorkeling with manta rays, fast boat tours, and private Bali experiences.',
  keywords: [
    'Bali tours',
    'Nusa Penida tour',
    'Manta Bay snorkeling',
    'Kelingking Beach',
    'Ubud ATV',
    'fast boat Nusa Penida',
    'paket wisata Bali',
    'tour Nusa Penida',
  ],
  authors: [{ name: 'Manta Bali Nusa Tours' }],
  creator: 'Manta Bali Nusa Tours',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Manta Bali Nusa Tours',
    title: 'Manta Bali Nusa Tours | Bali & Nusa Penida Tour Packages',
    description:
      'Explore Bali and Nusa Penida with local experts. ATV adventures, snorkeling with manta rays, fast boat tours, and private Bali experiences.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Nusa Penida coastline',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manta Bali Nusa Tours | Bali & Nusa Penida Tour Packages',
    description:
      'Explore Bali and Nusa Penida with local experts. ATV adventures, snorkeling with manta rays, fast boat tours.',
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['TravelAgency', 'LocalBusiness'],
      '@id': `${SITE_URL}/#business`,
      name: 'Manta Bali Nusa Tours',
      description:
        'Local tour operator specializing in Bali and Nusa Penida experiences: ATV adventures, snorkeling with manta rays, and private fast boat tours.',
      url: SITE_URL,
      email: CONTACT_EMAIL,
      telephone: `+${WHATSAPP_NUMBER}`,
      priceRange: 'Rp 725.000 - Rp 1.850.000',
      areaServed: 'Bali, Indonesia',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Bali',
        addressCountry: 'ID',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '512',
      },
    },
    {
      '@type': 'TouristAttraction',
      name: 'Nusa Penida & Bali Tours',
      description:
        'Snorkeling with manta rays at Manta Bay, Kelingking Beach, Broken Beach, and Ubud ATV adventures.',
      touristType: ['Adventure travelers', 'Snorkelers', 'Couples', 'Families'],
      isAccessibleForFree: false,
      url: SITE_URL,
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={jakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
