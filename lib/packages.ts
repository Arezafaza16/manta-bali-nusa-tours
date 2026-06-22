import 'server-only';
import { connectToDatabase } from './mongodb';
import { PackageModel, type PackageDoc } from './models/Package';
import { allPackages } from './data';
import { formatPrice } from './i18n';
import type { TourPackage } from './types';

type LeanPackage = Omit<PackageDoc, '_id'> & { _id: { toString(): string } };

/** Map a database document to the shape the public site already understands. */
function docToTour(doc: LeanPackage): TourPackage {
  const destinations = doc.destinations ?? [];
  return {
    id: doc._id.toString(),
    title: doc.title,
    category: doc.category as TourPackage['category'],
    description: doc.description ?? '',
    descriptionId: doc.descriptionId || undefined,
    duration: doc.duration || undefined,
    durationId: doc.durationId || undefined,
    priceValue: doc.priceValue,
    startingPrice: formatPrice(doc.priceValue),
    image: doc.image,
    featured: Boolean(doc.featured),
    itinerary:
      destinations.length > 0
        ? [{ label: 'Destinations', items: destinations }]
        : [],
    includes: doc.includes ?? [],
  };
}

/**
 * Seed the collection from the bundled packages on first run. Uses
 * `ordered: false` so that if two first-requests race, the unique `title`
 * index makes duplicate inserts no-ops instead of creating copies.
 */
async function seedFromStatic(): Promise<void> {
  try {
    await PackageModel.insertMany(
      allPackages.map((p, i) => ({
        title: p.title,
        category: p.category,
        description: p.description,
        descriptionId: p.descriptionId ?? '',
        duration: p.duration ?? '',
        durationId: p.durationId ?? '',
        priceValue: p.priceValue,
        image: p.image,
        destinations: p.itinerary.flatMap((g) => g.items),
        includes: p.includes,
        featured: p.featured,
        order: i,
      })),
      { ordered: false },
    );
  } catch (err) {
    // Ignore duplicate-key errors (E11000) from a concurrent seed.
    if (!(err instanceof Error) || !err.message.includes('E11000')) {
      throw err;
    }
  }
}

/**
 * Public package list for the homepage. Reads from MongoDB; seeds it from the
 * built-in packages the first time, and falls back to the static list if the
 * database is unreachable so the site never breaks.
 */
export async function getPackages(): Promise<TourPackage[]> {
  try {
    await connectToDatabase();
    const count = await PackageModel.estimatedDocumentCount();
    if (count === 0) {
      await seedFromStatic();
    }
    const docs = await PackageModel.find()
      .sort({ order: 1, createdAt: 1 })
      .lean<LeanPackage[]>();
    return docs.map(docToTour);
  } catch (err) {
    console.error('[packages] DB read failed, using static fallback:', err);
    return allPackages;
  }
}

export { docToTour };
export type { LeanPackage };
