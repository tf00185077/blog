'use server';
import { NextResponse } from "next/server";
import { getMongoCollection } from "@/lib/db";
import { PostResponse } from "@/lib/service/type";
import { createImageMap, processImage } from "./helper";

const POST = async (req: Request): Promise<NextResponse<PostResponse>> => {
  const formData = await req.formData();
  const contentStr = formData.get('content') as string;
  const title = formData.get('title') as string;
  const tag = formData.get('tag') as string;
  const subtitle = formData.get('subtitle') as string;
  const rawContent = JSON.parse(contentStr);
  const images = formData.getAll('images') as File[];
  const imageMap = createImageMap(rawContent.entityMap);
  
  const parsedImages = [];
  for (const img of images) {

    try {
      parsedImages.push(
        img,
        {
        size: img.size,
        type: img.type,
        name: img.name,
        lastModified: img.lastModified,
      });
    } catch (e) {
      console.error('解析圖片資料失敗:', e);
      return NextResponse.json({ status: 'error', message: "Error extract post images" });
    }
  }
  
  // 處理圖片
  await Promise.all(
    parsedImages.map(image =>
      image instanceof File && processImage(image, imageMap)
    )
  );
  const contentToSave = {
    content: JSON.stringify(rawContent),
    createdAt: new Date(),
    updatedAt: new Date(),
    title,
    sub_title:subtitle,
    tag,
  };

  const { collection, client } = await getMongoCollection('Articles');
  try {
    await collection.insertOne({ ...contentToSave });
    return NextResponse.json({ status: 'success', message: "save success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 'error', message: "Error saving post" });
  } finally {
    await client.close();
  }

};

export { POST };