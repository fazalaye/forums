import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

/**
 * Returns a mongoose connection, or null when MONGODB_URI is not configured.
 * Callers must treat a null return as "demo mode" and fall back to seed data
 * instead of throwing, so the site keeps working without a database.
 */
export async function dbConnect() {
  if (!MONGODB_URI) return null;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error("MongoDB connection error:", err.message);
    return null;
  }

  return cached.conn;
}
