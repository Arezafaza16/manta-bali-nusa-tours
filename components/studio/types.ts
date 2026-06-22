import type { TourCategory } from '@/lib/types';

export interface StudioPackage {
  _id: string;
  title: string;
  category: TourCategory;
  description: string;
  descriptionId: string;
  duration: string;
  durationId: string;
  priceValue: number;
  image: string;
  destinations: string[];
  includes: string[];
  featured: boolean;
  order: number;
}

export type PackageDraft = Omit<StudioPackage, '_id'>;
