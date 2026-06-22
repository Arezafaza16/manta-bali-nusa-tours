import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { PackageModel } from '@/lib/models/Package';
import { sanitizePackage } from '@/lib/sanitizePackage';

export async function GET() {
  try {
    await connectToDatabase();
    const docs = await PackageModel.find().sort({ order: 1, createdAt: 1 }).lean();
    const packages = docs.map((d) => ({ ...d, _id: String(d._id) }));
    return NextResponse.json({ packages });
  } catch (err) {
    console.error('[api/packages GET]', err);
    return NextResponse.json(
      { error: 'Failed to load packages.' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const data = sanitizePackage(body);
    if (!data.title) {
      return NextResponse.json(
        { error: 'Title is required.' },
        { status: 400 },
      );
    }
    await connectToDatabase();
    const created = await PackageModel.create(data);
    return NextResponse.json(
      { package: { ...created.toObject(), _id: String(created._id) } },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof Error && err.message.includes('E11000')) {
      return NextResponse.json(
        { error: 'A package with this title already exists.' },
        { status: 409 },
      );
    }
    console.error('[api/packages POST]', err);
    return NextResponse.json(
      { error: 'Failed to create package.' },
      { status: 500 },
    );
  }
}
