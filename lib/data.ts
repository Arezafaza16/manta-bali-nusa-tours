import type { TourPackage, Testimonial, Destination } from './types';

export const WHATSAPP_NUMBER = '6282147863974';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = 'mantabalinusa@gmail.com';
export const INSTAGRAM_HANDLE = 'mantabalinusa';
export const INSTAGRAM_LINK = 'https://instagram.com/mantabalinusa';

export function waLink(message?: string): string {
  if (!message) return WHATSAPP_LINK;
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
}

export const bestSellers: TourPackage[] = [
  {
    id: 'nusa-penida-snorkeling-west',
    title: 'Nusa Penida Snorkeling & West Tour',
    category: 'Best Seller',
    description:
      'Swim with manta rays at Manta Bay, snorkel pristine reefs, then explore the iconic cliffs of West Nusa Penida in one unforgettable day.',
    descriptionId:
      'Berenang bersama manta di Manta Bay, snorkeling di terumbu karang, lalu jelajahi tebing ikonik Nusa Penida Barat dalam satu hari.',
    duration: 'Full Day',
    durationId: '1 Hari Penuh',
    startingPrice: 'IDR 975K',
    priceValue: 975000,
    image: '/images/pkg_snorkeling_west.png',
    featured: true,
    itinerary: [
      {
        items: [
          'Fast Boat to Nusa Penida',
          'Manta Bay',
          'Gamat Bay',
          'Crystal Bay',
          'Lunch',
          'Kelingking Beach',
          'Broken Beach',
          "Angel's Billabong",
          'Return to Bali',
        ],
      },
    ],
    includes: [
      'Return Fast Boat Ticket',
      'Shared Snorkeling Boat',
      'Snorkeling Equipment',
      'Lunch',
      'Private Transportation',
      'Mineral Water',
      'Entrance Fees',
      'Insurance',
    ],
  },
  {
    id: 'ubud-full-day-adventure',
    title: 'Ubud Full Day Adventure',
    category: 'Best Seller',
    description:
      'A high-energy day through the heart of Ubud. Ride ATVs through jungle trails, raft white-water rapids, and chase waterfalls.',
    descriptionId:
      'Hari penuh adrenalin di jantung Ubud. Berkendara ATV menembus hutan, arung jeram, dan mengejar air terjun.',
    duration: 'Full Day',
    durationId: '1 Hari Penuh',
    startingPrice: 'IDR 1.25M',
    priceValue: 1250000,
    image: '/images/pkg_ubud_adventure.png',
    featured: true,
    itinerary: [
      {
        label: 'Activities',
        items: [
          'ATV Adventure',
          'White Water Rafting',
          'Tegenungan Waterfall',
          'Monkey Forest',
        ],
      },
    ],
    includes: [
      'ATV Ticket',
      'Rafting Ticket',
      'Lunch',
      'Private Transportation',
      'Entrance Fees',
      'Insurance',
    ],
  },
  {
    id: '2-days-ubud-nusa-penida',
    title: '2 Days Ubud & Nusa Penida Adventure',
    category: 'Best Seller',
    description:
      'The ultimate combo: a thrilling day in Ubud followed by an island day exploring Nusa Penida’s legendary coastline.',
    descriptionId:
      'Kombinasi terbaik: satu hari seru di Ubud dilanjutkan menjelajah garis pantai legendaris Nusa Penida.',
    duration: '2 Days 1 Night',
    durationId: '2 Hari 1 Malam',
    startingPrice: 'IDR 1.85M',
    priceValue: 1850000,
    image: '/images/pkg_snorkeling_west.png',
    featured: true,
    itinerary: [
      {
        label: 'Day 1: Ubud',
        items: [
          'ATV Adventure',
          'White Water Rafting',
          'Tegenungan Waterfall',
          'Monkey Forest',
        ],
      },
      {
        label: 'Day 2: Nusa Penida',
        items: [
          'Manta Bay',
          'Gamat Bay',
          'Crystal Bay',
          'Kelingking Beach',
          'Broken Beach',
          "Angel's Billabong",
        ],
      },
    ],
    includes: [
      'Hotel Pickup & Drop-off',
      'Fast Boat Ticket',
      'Snorkeling Equipment',
      'Lunches',
      'Private Transportation',
      'Entrance Fees',
    ],
  },
];

export const nusaPenidaTours: TourPackage[] = [
  {
    id: 'nusa-penida-west',
    title: 'Nusa Penida West Tour',
    category: 'Nusa Penida Tours',
    description:
      'Discover the postcard-famous west coast, featuring towering cliffs, natural rock arches and turquoise lagoons.',
    descriptionId:
      'Jelajahi pesisir barat yang ikonik dengan tebing menjulang, gerbang batu alami, dan laguna biru toska.',
    duration: 'Full Day',
    durationId: '1 Hari Penuh',
    startingPrice: 'IDR 725K',
    priceValue: 725000,
    image: '/images/pkg_nusa_west.png',
    featured: false,
    itinerary: [
      {
        label: 'Destinations',
        items: [
          'Kelingking Beach',
          'Broken Beach',
          "Angel's Billabong",
          'Crystal Bay Beach',
        ],
      },
    ],
    includes: [
      'Return Fast Boat Ticket',
      'Private Transportation',
      'Lunch',
      'Entrance Fees',
    ],
  },
  {
    id: 'nusa-penida-east',
    title: 'Nusa Penida East Tour',
    category: 'Nusa Penida Tours',
    description:
      'Escape the crowds on the wild east coast with dramatic staircases, hidden beaches and panoramic viewpoints.',
    descriptionId:
      'Hindari keramaian di pesisir timur yang liar dengan tangga dramatis, pantai tersembunyi, dan panorama memukau.',
    duration: 'Full Day',
    durationId: '1 Hari Penuh',
    startingPrice: 'IDR 725K',
    priceValue: 725000,
    image: '/images/pkg_nusa_east.png',
    featured: false,
    itinerary: [
      {
        label: 'Destinations',
        items: [
          'Diamond Beach',
          'Atuh Beach',
          'Tree House',
          'Thousand Islands Viewpoint',
        ],
      },
    ],
    includes: [
      'Return Fast Boat Ticket',
      'Private Transportation',
      'Lunch',
      'Entrance Fees',
    ],
  },
  {
    id: 'nusa-penida-west-east',
    title: 'Nusa Penida West & East Combination Tour',
    category: 'Nusa Penida Tours',
    description:
      'See the very best of both coasts in a single action-packed day around the island.',
    descriptionId:
      'Lihat yang terbaik dari kedua pesisir dalam satu hari penuh petualangan mengelilingi pulau.',
    duration: 'Full Day',
    durationId: '1 Hari Penuh',
    startingPrice: 'IDR 985K',
    priceValue: 985000,
    image: '/images/pkg_nusa_combo.png',
    featured: false,
    itinerary: [
      {
        label: 'Destinations',
        items: [
          'Kelingking Beach',
          'Broken Beach',
          "Angel's Billabong",
          'Diamond Beach',
          'Tree House',
          'Thousand Islands Viewpoint',
        ],
      },
    ],
    includes: [
      'Return Fast Boat Ticket',
      'Private Transportation',
      'Lunch',
      'Entrance Fees',
    ],
  },
  {
    id: 'nusa-penida-2d1n',
    title: 'Nusa Penida 2 Days 1 Night Package',
    category: 'Nusa Penida Tours',
    description:
      'Stay overnight on the island and explore at a relaxed pace: west coast on day one, east coast on day two.',
    descriptionId:
      'Menginap di pulau dan menjelajah santai: pesisir barat di hari pertama, timur di hari kedua.',
    duration: '2 Days 1 Night',
    durationId: '2 Hari 1 Malam',
    startingPrice: 'IDR 1.45M',
    priceValue: 1450000,
    image: '/images/pkg_nusa_combo.png',
    featured: false,
    itinerary: [
      { label: 'Day 1', items: ['West Coast Tour'] },
      { label: 'Day 2', items: ['East Coast Tour'] },
    ],
    includes: [
      'Accommodation',
      'Breakfast',
      'Lunches',
      'Transportation',
      'Entrance Fees',
    ],
  },
];

export const ubudAdventures: TourPackage[] = [
  {
    id: 'atv-rafting',
    title: 'ATV & Rafting Adventure',
    category: 'Ubud Adventures',
    description:
      'Double the adrenaline with muddy ATV trails in the morning and roaring river rapids in the afternoon.',
    descriptionId:
      'Dobel adrenalin dengan trek ATV berlumpur di pagi hari dan arung jeram menderu di siang hari.',
    duration: 'Full Day',
    durationId: '1 Hari Penuh',
    startingPrice: 'IDR 1.15M',
    priceValue: 1150000,
    image: '/images/pkg_atv_rafting.png',
    featured: false,
    itinerary: [
      { label: 'Destinations', items: ['ATV Quad Track', 'Ayung River Rafting'] },
    ],
    includes: [
      'ATV Ticket',
      'Rafting Ticket',
      'Lunch',
      'Private Transportation',
      'Entrance Fees',
      'Insurance',
    ],
  },
  {
    id: 'atv-tegenungan-monkey',
    title: 'ATV, Tegenungan & Monkey Forest',
    category: 'Ubud Adventures',
    description:
      'Ride through jungle and rice fields, cool off at Tegenungan Waterfall and meet the locals at Monkey Forest.',
    descriptionId:
      'Berkendara menembus hutan dan sawah, menyegarkan diri di Air Terjun Tegenungan, lalu sapa penghuni Monkey Forest.',
    duration: 'Full Day',
    durationId: '1 Hari Penuh',
    startingPrice: 'IDR 950K',
    priceValue: 950000,
    image: '/images/pkg_atv_monkey.png',
    featured: false,
    itinerary: [
      {
        label: 'Destinations',
        items: ['ATV Adventure', 'Tegenungan Waterfall', 'Sacred Monkey Forest'],
      },
    ],
    includes: [
      'ATV Ticket',
      'Lunch',
      'Private Transportation',
      'Entrance Fees',
      'Insurance',
    ],
  },
  {
    id: 'atv-handara-ulun-danu',
    title: 'ATV, Handara Gate & Ulun Danu Beratan',
    category: 'Ubud Adventures',
    description:
      'Pair an ATV ride with Bali’s most photogenic landmarks, including the Handara Gate and the floating lake temple.',
    descriptionId:
      'Padukan ATV dengan landmark paling fotogenik di Bali seperti Gerbang Handara dan pura terapung Ulun Danu.',
    duration: 'Full Day',
    durationId: '1 Hari Penuh',
    startingPrice: 'IDR 1.1M',
    priceValue: 1100000,
    image: '/images/pkg_atv_handara.png',
    featured: false,
    itinerary: [
      {
        label: 'Destinations',
        items: ['ATV Adventure', 'Handara Gate', 'Ulun Danu Beratan Temple'],
      },
    ],
    includes: [
      'ATV Ticket',
      'Lunch',
      'Private Transportation',
      'Entrance Fees',
      'Insurance',
    ],
  },
  {
    id: 'atv-tegenungan-cepung-rice',
    title: 'ATV, Tegenungan, Tukad Cepung & Rice Terrace',
    category: 'Ubud Adventures',
    description:
      'A full day of waterfalls and landscapes, including the cathedral-like light beams of Tukad Cepung.',
    descriptionId:
      'Hari penuh air terjun dan lanskap, termasuk pancaran cahaya bak katedral di Tukad Cepung.',
    duration: 'Full Day',
    durationId: '1 Hari Penuh',
    startingPrice: 'IDR 1.15M',
    priceValue: 1150000,
    image: '/images/pkg_atv_terraces.png',
    featured: false,
    itinerary: [
      {
        label: 'Destinations',
        items: [
          'ATV Adventure',
          'Tegenungan Waterfall',
          'Tukad Cepung Waterfall',
          'Tegallalang Rice Terrace',
        ],
      },
    ],
    includes: [
      'ATV Ticket',
      'Lunch',
      'Private Transportation',
      'Entrance Fees',
      'Insurance',
    ],
  },
];

export const allPackages: TourPackage[] = [
  ...bestSellers,
  ...nusaPenidaTours,
  ...ubudAdventures,
];

export const destinations: Destination[] = [
  {
    id: 'nusa-penida',
    name: 'Nusa Penida',
    area: 'Klungkung, Bali',
    areaId: 'Klungkung, Bali',
    image: '/images/hero_slide_1.png',
    size: 'lg',
    tours: 6,
    priceFrom: 725000,
    tagline: 'Towering cliffs, hidden beaches and snorkeling with manta rays.',
    taglineId:
      'Tebing menjulang, pantai tersembunyi, dan snorkeling bersama manta.',
  },
  {
    id: 'ubud',
    name: 'Ubud',
    area: 'Gianyar, Bali',
    areaId: 'Gianyar, Bali',
    image: '/images/pkg_atv_terraces.png',
    size: 'md',
    tours: 4,
    priceFrom: 950000,
    tagline: 'Jungle ATV rides, white-water rafting and waterfalls.',
    taglineId: 'ATV menembus hutan, arung jeram, dan air terjun.',
  },
  {
    id: 'diamond-beach',
    name: 'Diamond Beach',
    area: 'East Nusa Penida',
    areaId: 'Nusa Penida Timur',
    image: '/images/pkg_nusa_east.png',
    size: 'md',
    tours: 2,
    priceFrom: 725000,
    tagline: 'Cliffside stairways down to powder-white sand.',
    taglineId: 'Tangga tebing menuju pasir putih lembut.',
  },
  {
    id: 'bali',
    name: 'Bali',
    area: 'Island of the Gods',
    areaId: 'Pulau Dewata',
    image: '/images/pkg_ubud_adventure.png',
    size: 'sm',
    tours: 11,
    priceFrom: 725000,
    tagline: 'Temples, beaches and emerald rice terraces.',
    taglineId: 'Pura, pantai, dan teras sawah hijau zamrud.',
  },
  {
    id: 'manta-bay',
    name: 'Manta Bay',
    area: 'Nusa Penida',
    areaId: 'Nusa Penida',
    image: '/images/hero_slide_2.png',
    size: 'sm',
    tours: 3,
    priceFrom: 975000,
    tagline: 'Swim alongside gentle, giant manta rays.',
    taglineId: 'Berenang berdampingan dengan manta raksasa yang jinak.',
  },
];

export interface StatItem {
  key: string;
  value: number;
  suffix: string;
  decimals?: number;
}

export const heroStats: StatItem[] = [
  { key: 'travelers', value: 5000, suffix: '+' },
  { key: 'destinations', value: 50, suffix: '+' },
  { key: 'years', value: 7, suffix: '+' },
  { key: 'rating', value: 4.9, suffix: '/5', decimals: 1 },
];

export const proofStats: StatItem[] = [
  { key: 'satisfied', value: 5000, suffix: '+' },
  { key: 'rating', value: 4.9, suffix: '/5', decimals: 1 },
  { key: 'rebooking', value: 98, suffix: '%' },
  { key: 'destinations', value: 50, suffix: '+' },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sophie Laurent',
    country: 'France',
    avatar: '/images/avatar_sophie.png',
    rating: 5,
    text: 'Swimming with manta rays was the highlight of our whole Bali trip. The team handled everything, from pickup and fast boats to snorkeling gear. Flawless from start to finish.',
    textId:
      'Berenang bersama manta jadi momen terbaik liburan kami di Bali. Tim mengurus semuanya, mulai dari penjemputan, fast boat, hingga alat snorkeling. Sempurna dari awal sampai akhir.',
  },
  {
    id: 't2',
    name: 'James Carter',
    country: 'Australia',
    avatar: '/images/avatar_james.png',
    rating: 5,
    text: 'The Ubud ATV and rafting combo was pure adrenaline. Our guide was hilarious and made sure we got the best photos. Worth every rupiah.',
    textId:
      'Kombinasi ATV dan rafting di Ubud benar-benar memacu adrenalin. Pemandu kami seru dan memastikan kami dapat foto terbaik. Sangat sepadan.',
  },
  {
    id: 't3',
    name: 'Mia Tanaka',
    country: 'Japan',
    avatar: '/images/avatar_mia.png',
    rating: 5,
    text: 'Kelingking Beach in person is even more stunning than the photos. Everything was private and comfortable, making it perfect for our honeymoon.',
    textId:
      'Pantai Kelingking aslinya jauh lebih menakjubkan dari foto. Semuanya privat dan nyaman, sangat sempurna untuk bulan madu kami.',
  },
  {
    id: 't4',
    name: 'David Müller',
    country: 'Germany',
    avatar: '/images/avatar_david.png',
    rating: 5,
    text: 'Instant confirmation on WhatsApp and a driver waiting at our hotel right on time. Super professional local operator. Highly recommend.',
    textId:
      'Konfirmasi instan lewat WhatsApp dan sopir sudah menunggu di hotel tepat waktu. Operator lokal yang sangat profesional. Sangat direkomendasikan.',
  },
  {
    id: 't5',
    name: 'Isabella Rossi',
    country: 'Italy',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'The 2-day Ubud and Nusa Penida package was the best decision. So much packed in, yet never rushed. The crew genuinely cares about your experience.',
    textId:
      'Paket 2 hari Ubud dan Nusa Penida adalah keputusan terbaik. Padat tapi tidak terburu-buru. Timnya benar-benar peduli pada pengalaman kami.',
  },
  {
    id: 't6',
    name: 'Liam O’Brien',
    country: 'Ireland',
    avatar:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Crystal Bay snorkeling was unreal, with clear water and tons of fish. Great prices compared to other operators and zero hidden fees. Will book again.',
    textId:
      'Snorkeling di Crystal Bay luar biasa dengan air jernih dan banyak ikan. Harga bersaing dan tanpa biaya tersembunyi. Pasti pesan lagi.',
  },
];
