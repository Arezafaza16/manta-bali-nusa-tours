import type { Metadata } from 'next';
import { getLocale } from '@/lib/getLocale';
import LegalPage from '@/components/LegalPage';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that apply when you book a Bali or Nusa Penida tour with Manta Bali Nusa Tours.',
};

const content = {
  en: {
    title: 'Terms of Service',
    updated: 'Last updated: June 2025',
    intro:
      'These terms apply when you book a tour with us. By confirming a booking over WhatsApp, you agree to the points below.',
    backLabel: 'Back to home',
    sections: [
      {
        heading: 'Bookings and prices',
        body: 'Prices are listed per person and may change with the season, group size and availability. A booking is confirmed once we reply with your itinerary and pickup time. Quoted prices include the items listed under each package.',
      },
      {
        heading: 'Payment and deposits',
        body: 'For some packages we ask for a small deposit to secure boat seats and entrance tickets, with the balance settled on the tour day. We will always tell you the amount before you commit.',
      },
      {
        heading: 'Cancellations and weather',
        body: 'Plans can change. Tell us as early as you can if you need to reschedule. Boat trips to Nusa Penida depend on sea conditions, and we may move or refund a tour if the crossing is unsafe.',
      },
      {
        heading: 'Safety and liability',
        body: `Snorkeling, ATV rides and rafting carry inherent risk. Please follow your guide's instructions and declare any medical conditions. We are not liable for losses caused by ignoring safety guidance or by events beyond our control.`,
      },
      {
        heading: 'Contact',
        body: `Questions about these terms? Reach us at ${CONTACT_EMAIL} or +${WHATSAPP_NUMBER}.`,
      },
    ],
  },
  id: {
    title: 'Ketentuan Layanan',
    updated: 'Terakhir diperbarui: Juni 2025',
    intro:
      'Ketentuan ini berlaku saat Anda memesan tur bersama kami. Dengan mengonfirmasi pemesanan melalui WhatsApp, Anda menyetujui poin-poin di bawah ini.',
    backLabel: 'Kembali ke beranda',
    sections: [
      {
        heading: 'Pemesanan dan harga',
        body: 'Harga tercantum per orang dan dapat berubah sesuai musim, jumlah peserta, dan ketersediaan. Pemesanan dikonfirmasi setelah kami membalas dengan rangkaian perjalanan dan waktu penjemputan. Harga sudah termasuk item yang tercantum pada setiap paket.',
      },
      {
        heading: 'Pembayaran dan deposit',
        body: 'Untuk beberapa paket, kami meminta deposit kecil untuk mengamankan kursi boat dan tiket masuk, sisanya dilunasi pada hari tur. Kami selalu memberi tahu jumlahnya sebelum Anda memutuskan.',
      },
      {
        heading: 'Pembatalan dan cuaca',
        body: 'Rencana bisa berubah. Beri tahu kami sedini mungkin jika perlu menjadwalkan ulang. Perjalanan boat ke Nusa Penida bergantung pada kondisi laut, dan kami dapat memindahkan atau mengembalikan dana jika penyeberangan tidak aman.',
      },
      {
        heading: 'Keselamatan dan tanggung jawab',
        body: 'Snorkeling, ATV, dan rafting memiliki risiko bawaan. Mohon ikuti arahan pemandu dan sampaikan kondisi medis Anda. Kami tidak bertanggung jawab atas kerugian akibat mengabaikan panduan keselamatan atau kejadian di luar kendali kami.',
      },
      {
        heading: 'Kontak',
        body: `Pertanyaan tentang ketentuan ini? Hubungi kami di ${CONTACT_EMAIL} atau +${WHATSAPP_NUMBER}.`,
      },
    ],
  },
};

export default async function TermsPage() {
  const locale = await getLocale();
  return <LegalPage {...content[locale]} />;
}
