export type Locale = 'en' | 'id';

export const LOCALES: Locale[] = ['en', 'id'];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_COOKIE = 'mbn_locale';

/** Format a rupiah amount the Indonesian way, e.g. 975000 → "Rp 975.000". */
export function formatPrice(value: number): string {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

/** Recurring include / itinerary phrases, translated once and reused. */
const TERMS: Record<string, string> = {
  'Return Fast Boat Ticket': 'Tiket Fast Boat PP',
  'Fast Boat Ticket': 'Tiket Fast Boat',
  'Fast Boat to Nusa Penida': 'Fast Boat ke Nusa Penida',
  'Shared Snorkeling Boat': 'Boat Snorkeling Sharing',
  'Snorkeling Equipment': 'Peralatan Snorkeling',
  Lunch: 'Makan Siang',
  Lunches: 'Makan Siang',
  Breakfast: 'Sarapan',
  'Private Transportation': 'Transportasi Pribadi',
  Transportation: 'Transportasi',
  'Mineral Water': 'Air Mineral',
  'Entrance Fees': 'Tiket Masuk',
  Insurance: 'Asuransi',
  'ATV Ticket': 'Tiket ATV',
  'Rafting Ticket': 'Tiket Rafting',
  'Hotel Pickup & Drop-off': 'Antar-Jemput Hotel',
  Accommodation: 'Akomodasi',
  'ATV Adventure': 'Petualangan ATV',
  'White Water Rafting': 'Arung Jeram',
  'Return to Bali': 'Kembali ke Bali',
  'West Coast Tour': 'Tur Pesisir Barat',
  'East Coast Tour': 'Tur Pesisir Timur',
  Destinations: 'Destinasi',
  Activities: 'Aktivitas',
};

/** Translate a single include/itinerary term (place names pass through). */
export function localizeTerm(term: string, locale: Locale): string {
  if (locale === 'en') return term;
  return TERMS[term] ?? term.replace(/^Day (\d+)/, 'Hari $1');
}

export const dictionaries = {
  en: {
    nav: {
      home: 'Home',
      packages: 'Packages',
      destinations: 'Destinations',
      why: 'Why Us',
      testimonials: 'Reviews',
      contact: 'Contact',
      book: 'Book Now',
    },
    hero: {
      badge: 'Bali & Nusa Penida, Indonesia',
      slides: [
        {
          title: 'Explore Nusa Penida’s Majestic Cliffs',
          subtitle:
            'Discover the iconic Kelingking Beach, Broken Beach, and breathtaking coastlines with our private day tours.',
        },
        {
          title: 'Swim with Gentle Giant Manta Rays',
          subtitle:
            'Dive into the crystal-clear waters of Manta Bay and experience an unforgettable snorkeling adventure.',
        },
        {
          title: 'Ride Ubud’s Jungle Trails and River Rapids',
          subtitle:
            'Tackle muddy ATV jungle trails and the rapids of the Ayung River with experienced local guides.',
        },
      ],
      ctaPackages: 'View Packages',
      ctaBook: 'Book Now',
    },
    stats: {
      travelers: 'Happy Travelers',
      destinations: 'Destinations',
      years: 'Years Experience',
      rating: 'Rating',
      satisfied: 'Satisfied Travelers',
      rebooking: 'Rebooking Rate',
    },
    packages: {
      eyebrow: 'Tour Packages',
      title: 'Recommended Tour Packages',
      subtitle:
        'Pick the best tour with transparent pricing and a clear itinerary, all handled door to door.',
      detail: 'Details',
      book: 'Book',
      startingFrom: 'Starting from',
      perPerson: '/ person',
    },
    why: {
      eyebrow: 'Why Choose Us',
      title: 'Why Choose Us?',
      subtitle:
        'We deliver the best travel experience with a professional, trusted local team.',
      items: [
        {
          title: 'Experienced Local Team',
          text: 'Born-and-raised Bali guides who know every viewpoint, tide and reef.',
        },
        {
          title: 'Affordable Pricing',
          text: 'Honest, all-inclusive rates with no hidden fees or surprises.',
        },
        {
          title: 'Safety Guaranteed',
          text: 'Licensed drivers, safety-trained guides and proper equipment.',
        },
        {
          title: '24/7 Service',
          text: 'Instant confirmation and real-time support over WhatsApp, anytime.',
        },
      ],
    },
    destinations: {
      eyebrow: 'Explore Indonesia',
      title: 'Popular Destinations',
      subtitle:
        'Bali has endless natural beauty. Discover the destinations of your dreams.',
      explore: 'Explore',
      tours: 'tours',
      from: 'from',
      viewAll: 'View all packages',
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What They Say',
      subtitle:
        'Real stories from travelers who experienced the adventure with us.',
    },
    contact: {
      eyebrow: 'Get In Touch',
      title: 'Ready For a Holiday?',
      subtitle:
        'Send a message over WhatsApp and we will help you plan the trip of your dreams.',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      facebook: 'Facebook',
      address: 'Address',
      addressValue: 'Denpasar, Bali, Indonesia',
      email: 'Email',
      formTitle: 'Send a Message via WhatsApp',
      formSubtitle: 'Fill the form and your message is sent straight to WhatsApp.',
      name: 'Full Name',
      namePlaceholder: 'Your name',
      phone: 'WhatsApp Number',
      phonePlaceholder: 'Your number',
      dest: 'Destination',
      destPlaceholder: 'Choose a destination',
      message: 'Message (optional)',
      messagePlaceholder: 'Write your message here…',
      send: 'Send via WhatsApp',
      note: 'You will be redirected to WhatsApp to send your message.',
    },
    map: {
      eyebrow: 'Our Location',
      title: 'Visit Our Office',
      subtitle: 'Located in Denpasar, Bali, our team is ready to coordinate your perfect holiday.',
      addressTitle: 'Office Address',
      addressValue: 'Jl. Pakisaji Gang Cenganasari XIV No. 10, Kesiman, Denpasar, Bali 80239',
      contactTitle: 'Phone / WhatsApp',
      emailTitle: 'Email Address',
      openBtn: 'Open in Google Maps',
    },
    footer: {
      tagline:
        'A local tour operator crafting safe, authentic and unforgettable Bali & Nusa Penida adventures.',
      navTitle: 'Navigation',
      destTitle: 'Destinations',
      contactTitle: 'Contact',
      rights: 'All rights reserved.',
      madeIn: 'Crafted with care in Bali, Indonesia',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    common: {
      bookWhatsapp: 'Book via WhatsApp',
      itinerary: 'Itinerary',
      includes: 'Includes',
      close: 'Close',
    },
  },
  id: {
    nav: {
      home: 'Beranda',
      packages: 'Paket Wisata',
      destinations: 'Destinasi',
      why: 'Kenapa Kami',
      testimonials: 'Testimoni',
      contact: 'Hubungi Kami',
      book: 'Booking Sekarang',
    },
    hero: {
      badge: 'Bali & Nusa Penida, Indonesia',
      slides: [
        {
          title: 'Jelajahi Tebing Megah Nusa Penida',
          subtitle:
            'Temukan Pantai Kelingking yang ikonik, Broken Beach, dan pesisir pantai yang menakjubkan dengan tur privat harian kami.',
        },
        {
          title: 'Berenang Bersama Manta Ray Raksasa',
          subtitle:
            'Menyelam ke air jernih Manta Bay dan rasakan petualangan snorkeling yang tak terlupakan.',
        },
        {
          title: 'Petualangan Seru ATV & Rafting di Ubud',
          subtitle:
            'Taklukkan trek ATV hutan berlumpur dan arungi jeram Sungai Ayung bersama pemandu lokal profesional.',
        },
      ],
      ctaPackages: 'Lihat Paket',
      ctaBook: 'Booking Sekarang',
    },
    stats: {
      travelers: 'Wisatawan',
      destinations: 'Destinasi',
      years: 'Tahun Pengalaman',
      rating: 'Rating',
      satisfied: 'Wisatawan Puas',
      rebooking: 'Booking Ulang',
    },
    packages: {
      eyebrow: 'Paket Wisata',
      title: 'Paket Wisata Rekomendasi',
      subtitle:
        'Pilih paket wisata terbaik dengan harga terjangkau dan perjalanan yang jelas, semua diurus dari awal sampai akhir.',
      detail: 'Detail',
      book: 'Booking',
      startingFrom: 'Mulai dari',
      perPerson: '/ orang',
    },
    why: {
      eyebrow: 'Keunggulan Kami',
      title: 'Kenapa Pilih Kami?',
      subtitle:
        'Kami memberikan pengalaman wisata terbaik dengan tim lokal profesional dan terpercaya.',
      items: [
        {
          title: 'Tim Lokal Berpengalaman',
          text: 'Pemandu asli Bali yang hafal setiap spot, arus, dan terumbu karang.',
        },
        {
          title: 'Harga Terjangkau',
          text: 'Harga jujur dan lengkap tanpa biaya tersembunyi atau kejutan.',
        },
        {
          title: 'Garansi Keamanan',
          text: 'Sopir berlisensi, pemandu terlatih, dan peralatan yang aman.',
        },
        {
          title: 'Layanan 24/7',
          text: 'Konfirmasi instan dan dukungan langsung lewat WhatsApp kapan saja.',
        },
      ],
    },
    destinations: {
      eyebrow: 'Jelajahi Indonesia',
      title: 'Destinasi Populer',
      subtitle:
        'Bali memiliki keindahan alam yang tiada duanya. Temukan destinasi impian Anda.',
      explore: 'Jelajahi',
      tours: 'tur',
      from: 'mulai',
      viewAll: 'Lihat semua paket',
    },
    testimonials: {
      eyebrow: 'Testimoni',
      title: 'Apa Kata Mereka?',
      subtitle:
        'Cerita nyata dari para traveler yang sudah merasakan pengalaman bersama kami.',
    },
    contact: {
      eyebrow: 'Hubungi Kami',
      title: 'Siap Untuk Liburan?',
      subtitle:
        'Kirim pesan lewat WhatsApp dan kami akan bantu merencanakan liburan impian Anda.',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      facebook: 'Facebook',
      address: 'Alamat',
      addressValue: 'Denpasar, Bali, Indonesia',
      email: 'Email',
      formTitle: 'Kirim Pesan via WhatsApp',
      formSubtitle: 'Isi formulir dan pesan Anda langsung terkirim ke WhatsApp.',
      name: 'Nama Lengkap',
      namePlaceholder: 'Masukkan nama Anda',
      phone: 'Nomor WhatsApp',
      phonePlaceholder: 'Masukkan nomor Anda',
      dest: 'Destinasi Tujuan',
      destPlaceholder: 'Pilih destinasi',
      message: 'Pesan (opsional)',
      messagePlaceholder: 'Tulis pesan Anda di sini…',
      send: 'Kirim via WhatsApp',
      note: 'Anda akan diarahkan ke WhatsApp untuk mengirim pesan.',
    },
    map: {
      eyebrow: 'Lokasi Kami',
      title: 'Kunjungi Kantor Kami',
      subtitle: 'Berlokasi di Denpasar, Bali, tim kami siap mengoordinasikan liburan impian Anda.',
      addressTitle: 'Alamat Kantor',
      addressValue: 'Jl. Pakisaji Gang Cenganasari XIV No. 10, Kesiman, Denpasar, Bali 80239',
      contactTitle: 'Telepon / WhatsApp',
      emailTitle: 'Alamat Email',
      openBtn: 'Buka di Google Maps',
    },
    footer: {
      tagline:
        'Operator wisata lokal yang menghadirkan petualangan Bali & Nusa Penida yang aman, autentik, dan tak terlupakan.',
      navTitle: 'Navigasi',
      destTitle: 'Destinasi',
      contactTitle: 'Kontak',
      rights: 'Hak cipta dilindungi.',
      madeIn: 'Dibuat dengan sepenuh hati di Bali, Indonesia',
      privacy: 'Kebijakan Privasi',
      terms: 'Ketentuan Layanan',
    },
    common: {
      bookWhatsapp: 'Booking via WhatsApp',
      itinerary: 'Rangkaian Perjalanan',
      includes: 'Termasuk',
      close: 'Tutup',
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)['en'];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}
