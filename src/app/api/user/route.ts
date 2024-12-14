'use server';
import { NextResponse } from "next/server";
import { getMongoCollection } from "@/lib/db";
export async function GET() {
  const { client } = await getMongoCollection("Test");
  await client.connect();
  const db = client.db("BLOG");
  const data = await db.collection("Test").find({}).toArray();
  await client.close();
  return NextResponse.json(data);
}