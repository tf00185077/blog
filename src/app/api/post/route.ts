'use server';
import { NextResponse } from "next/server";
import { getMongoCollection } from "@/lib/db";
export async function POST(req: Request) {
  const { content } = await req.json();
  const { collection, client } = await getMongoCollection('Test');
  try {
    await collection.insertOne({ content, createdAt: new Date(), updatedAt: new Date() });
    return NextResponse.json({ message: "save success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await client.close();
  }

}