import { ObjectId } from 'mongodb';
import { NextResponse } from "next/server";
import { getMongoCollection } from "@/lib/db";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ articleId: string; }> }
) {
  const { collection, client } = await getMongoCollection('Test');
  try {
    // const articleId = params.articleId;
    const articleId = (await params).articleId;
    const post = await collection.findOne({
      _id: new ObjectId(articleId)
    });
    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('MongoDB operation failed:', error);
    return NextResponse.json(
      { message: "Error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}