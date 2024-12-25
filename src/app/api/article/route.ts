import { NextResponse } from "next/server";
import { getMongoCollection } from "@/lib/db";
export async function GET() {
  const { collection, client } = await getMongoCollection('Articles');

  try {
    const posts = await collection.find({})
      .sort({ createdAt: -1 }) // 最新的排在前面
      .toArray();

    return NextResponse.json(posts);
  } catch (error) {
    console.error('MongoDB operation failed:', error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await client.close();
  }
}