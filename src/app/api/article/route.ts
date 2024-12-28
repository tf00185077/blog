import { NextRequest, NextResponse } from "next/server";
import { getMongoCollection } from "@/lib/db";
import { GetResponse } from "@/lib/service/type";
import { Article } from "@/app/(web)/article/_helper/type";
export async function GET(request: NextRequest): Promise<NextResponse<GetResponse<Article[]>>> {
  const { collection, client } = await getMongoCollection('Articles');

  try {
    const searchParams = request.nextUrl.searchParams;
    const page = (searchParams.get('page')) ?? undefined;
    const size = (searchParams.get('size')) ?? undefined;
    const posts = await collection.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: (Number(page) - 1) * Number(size) },
      { $limit: Number(size) },
      { $project: { id: "$_id", title: 1, tag: 1, createdAt: 1, subtitle: "$sub_title" } },
    ]).toArray() as Article[];
    return NextResponse.json({ status: 'success', data: posts });
  } catch (error) {
    console.error('MongoDB operation failed:', error);
    return NextResponse.json({ status: 'error', message: "Error" });
  } finally {
    await client.close();
  }
}