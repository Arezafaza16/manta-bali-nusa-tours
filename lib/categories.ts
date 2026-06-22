import 'server-only';
import { connectToDatabase } from './mongodb';
import { CategoryModel } from './models/Category';
import { TOUR_CATEGORIES } from './types';

/** Seed the default categories on first run (race-safe via the unique index). */
async function seedDefaults(): Promise<void> {
  try {
    await CategoryModel.insertMany(
      TOUR_CATEGORIES.map((name, i) => ({ name, order: i })),
      { ordered: false },
    );
  } catch (err) {
    if (!(err instanceof Error) || !err.message.includes('E11000')) throw err;
  }
}

/**
 * Category names for the studio dropdown & filters. Reads from MongoDB, seeds
 * the defaults the first time, and falls back to the defaults on any error.
 */
export async function getCategories(): Promise<string[]> {
  try {
    await connectToDatabase();
    const count = await CategoryModel.estimatedDocumentCount();
    if (count === 0) await seedDefaults();
    const docs = await CategoryModel.find()
      .sort({ order: 1, createdAt: 1 })
      .lean<{ name: string }[]>();
    const names = docs.map((d) => d.name).filter(Boolean);
    return names.length ? names : [...TOUR_CATEGORIES];
  } catch (err) {
    console.error('[categories] read failed, using defaults:', err);
    return [...TOUR_CATEGORIES];
  }
}
