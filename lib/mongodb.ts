import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Cached connection so Next.js (which re-imports modules on hot reload and per
 * serverless invocation) doesn't open a new connection every time.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to .env.local');
  }
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
