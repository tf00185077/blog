import { ObjectId } from 'mongodb';
import { NextResponse } from "next/server";
import { getMongoCollection } from "@/lib/db";
import { Article } from '@/app/(web)/article/[articleId]/type';
import { GetResponse } from '@/lib/service/type';
export async function GET(
  request: Request,
  { params }: { params: Promise<{ articleId: string; }>; }
): Promise<NextResponse<GetResponse<Article>>> {
  const { collection, client } = await getMongoCollection('Articles');

  try {
    const articleId = (await params).articleId;
    const post = await collection.findOne({
      _id: new ObjectId(articleId)
    });
    if (!post) return NextResponse.json({ status: 'error', message: "Post not found" });
    const article = { ...post, subtitle: post['sub_title'] } as unknown as Article;
    return NextResponse.json({ status: 'success', data: article });
  } catch (error) {
    console.error('MongoDB operation failed:', error);
    return NextResponse.json({ status: 'error', message: "Error" });
  } finally {
    await client.close();
  }

}