/** Default categories seeded on first run. Admins can add more in /studio. */
export const TOUR_CATEGORIES = [
  'Best Seller',
  'Nusa Penida Tours',
  'Ubud Adventures',
] as const;

/** Categories are dynamic (stored in the database), so this is just a string. */
export type TourCategory = string;

export interface ItineraryGroup {
  label?: string;
  items: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  category: TourCategory;
  description: string;
  /** Optional Indonesian description; falls back to `description` when absent. */
  descriptionId?: string;
  /** Short duration badge text, e.g. "Full Day". */
  duration?: string;
  durationId?: string;
  startingPrice: string;
  priceValue: number;
  image: string;
  featured: boolean;
  itinerary: ItineraryGroup[];
  includes: string[];
}

export interface Destination {
  id: string;
  name: string;
  /** Short sub-label, e.g. "Klungkung, Bali". */
  area: string;
  areaId?: string;
  image: string;
  /** Bento span size. */
  size: 'lg' | 'md' | 'sm';
  /** Number of tours covering this destination (badge). */
  tours: number;
  /** Lowest tour price for this destination. */
  priceFrom: number;
  /** One-line teaser revealed on hover. */
  tagline: string;
  taglineId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  avatar: string;
  rating: number;
  text: string;
  /** Optional Indonesian translation of the quote. */
  textId?: string;
}
