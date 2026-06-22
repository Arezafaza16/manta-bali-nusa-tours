import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import { PackageModel } from '@/lib/models/Package';
import { sanitizePackage } from '@/lib/sanitizePackage';

type Ctx = { params: Promise<{ id: string }> };

function isValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function PUT(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  if (!isValidId(id)) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }
  try {
    const body = await req.json().catch(() => ({}));
    const data = sanitizePackage(body);
    if (!data.title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }
    await connectToDatabase();
    const updated = await PackageModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updated) {
      return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    }
    return NextResponse.json({
      package: { ...updated, _id: String(updated._id) },
    });
  } catch (err) {
    if (err instanceof Error && err.message.includes('E11000')) {
      return NextResponse.json(
        { error: 'A package with this title already exists.' },
        { status: 409 },
      );
    }
    console.error('[api/packages PUT]', err);
    return NextResponse.json(
      { error: 'Failed to update package.' },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  if (!isValidId(id)) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }
  try {
    await connectToDatabase();
    const deleted = await PackageModel.findByIdAndDelete(id).lean();
    if (!deleted) {
      return NextResponse.json({ error: 'Not found.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[api/packages DELETE]', err);
    return NextResponse.json(
      { error: 'Failed to delete package.' },
      { status: 500 },
    );
  }
}
