import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { CategoryModel } from '@/lib/models/Category';

export async function GET() {
  try {
    await connectToDatabase();
    const docs = await CategoryModel.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return NextResponse.json({
      categories: docs.map((d) => ({ ...d, _id: String(d._id) })),
    });
  } catch (err) {
    console.error('[api/categories GET]', err);
    return NextResponse.json(
      { error: 'Failed to load categories.' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name ?? '').trim();
    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required.' },
        { status: 400 },
      );
    }
    if (name.length > 60) {
      return NextResponse.json(
        { error: 'Category name is too long.' },
        { status: 400 },
      );
    }
    await connectToDatabase();
    const count = await CategoryModel.estimatedDocumentCount();
    const created = await CategoryModel.create({ name, order: count });
    return NextResponse.json(
      { category: { ...created.toObject(), _id: String(created._id) } },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof Error && err.message.includes('E11000')) {
      return NextResponse.json(
        { error: 'That category already exists.' },
        { status: 409 },
      );
    }
    console.error('[api/categories POST]', err);
    return NextResponse.json(
      { error: 'Failed to create category.' },
      { status: 500 },
    );
  }
}
