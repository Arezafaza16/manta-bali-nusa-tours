import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import { PackageModel } from '@/lib/models/Package';
import { getCategories } from '@/lib/categories';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';
import StudioDashboard from '@/components/studio/StudioDashboard';
import type { StudioPackage } from '@/components/studio/types';
import type { TourCategory } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function loadPackages(): Promise<StudioPackage[]> {
  await connectToDatabase();
  const docs = await PackageModel.find().sort({ order: 1, createdAt: 1 }).lean();
  return docs.map((d) => ({
    _id: String(d._id),
    title: d.title,
    category: d.category as TourCategory,
    description: d.description ?? '',
    descriptionId: d.descriptionId ?? '',
    duration: d.duration ?? '',
    durationId: d.durationId ?? '',
    priceValue: d.priceValue,
    image: d.image ?? '',
    destinations: d.destinations ?? [],
    includes: d.includes ?? [],
    featured: Boolean(d.featured),
    order: d.order ?? 0,
  }));
}

export default async function StudioPage() {
  const cookieStore = await cookies();
  const session = await verifySessionToken(
    cookieStore.get(SESSION_COOKIE)?.value,
  );
  if (!session) redirect('/studio/login');

  let initialPackages: StudioPackage[] = [];
  let initialCategories: string[] = [];
  try {
    [initialPackages, initialCategories] = await Promise.all([
      loadPackages(),
      getCategories(),
    ]);
  } catch (err) {
    console.error('[studio] failed to load data:', err);
  }

  return (
    <StudioDashboard
      initialPackages={initialPackages}
      initialCategories={initialCategories}
      email={session.email}
    />
  );
}
