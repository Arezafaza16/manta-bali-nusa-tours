import type { Metadata } from 'next';
import { getLocale } from '@/lib/getLocale';
import LegalPage from '@/components/LegalPage';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Manta Bali Nusa Tours collects, uses and protects the information you share when booking a tour.',
};

const content = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: June 2025',
    intro:
      'This policy explains what information we collect when you contact us or book a tour, and how we use it. We keep it simple and only collect what we need to plan your trip.',
    backLabel: 'Back to home',
    sections: [
      {
        heading: 'Information we collect',
        body: 'When you message us or submit the contact form, we receive your name, WhatsApp number, chosen destination and any details you send. We do not collect payment card data through this website.',
      },
      {
        heading: 'How we use it',
        body: 'We use your details only to respond to your enquiry, confirm bookings, arrange hotel pickup, and send trip information. We never sell your data or share it for advertising.',
      },
      {
        heading: 'WhatsApp and third parties',
        body: `Conversations happen over WhatsApp, which is governed by Meta's own privacy terms. We may also share trip details with the drivers, guides and boat operators needed to run your tour.`,
      },
      {
        heading: 'Contact',
        body: `For any privacy question, reach us at ${CONTACT_EMAIL} or on WhatsApp at +${WHATSAPP_NUMBER}.`,
      },
    ],
  },
  id: {
    title: 'Kebijakan Privasi',
    updated: 'Terakhir diperbarui: Juni 2025',
    intro:
      'Kebijakan ini menjelaskan data apa yang kami kumpulkan saat Anda menghubungi kami atau memesan tur, dan bagaimana kami menggunakannya. Kami hanya mengumpulkan data yang diperlukan untuk merencanakan perjalanan Anda.',
    backLabel: 'Kembali ke beranda',
    sections: [
      {
        heading: 'Data yang kami kumpulkan',
        body: 'Saat Anda mengirim pesan atau mengisi formulir, kami menerima nama, nomor WhatsApp, destinasi pilihan, dan detail yang Anda kirim. Kami tidak mengumpulkan data kartu pembayaran melalui situs ini.',
      },
      {
        heading: 'Bagaimana kami menggunakannya',
        body: 'Data Anda hanya digunakan untuk menjawab pertanyaan, mengonfirmasi pemesanan, mengatur penjemputan hotel, dan mengirim informasi perjalanan. Kami tidak pernah menjual data Anda atau membagikannya untuk iklan.',
      },
      {
        heading: 'WhatsApp dan pihak ketiga',
        body: 'Percakapan berlangsung melalui WhatsApp, yang tunduk pada ketentuan privasi Meta. Kami juga dapat membagikan detail perjalanan kepada sopir, pemandu, dan operator boat yang menjalankan tur Anda.',
      },
      {
        heading: 'Kontak',
        body: `Untuk pertanyaan privasi, hubungi kami di ${CONTACT_EMAIL} atau WhatsApp +${WHATSAPP_NUMBER}.`,
      },
    ],
  },
};

export default async function PrivacyPage() {
  const locale = await getLocale();
  return <LegalPage {...content[locale]} />;
}
