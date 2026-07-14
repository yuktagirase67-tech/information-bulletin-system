import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/bulletinDB";

if (!MONGODB_URI) {
  throw new Error("Please define the MongoDB URI");
}

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => mongoose);
  }

  cached!.conn = await cached!.promise;

  return cached!.conn;
}

export default connectDB;