'use server';
import { NextResponse } from "next/server";
import { getMongoCollection } from "@/lib/db";
import { PostResponse } from "@/lib/service/type";
import { createImageMap, processImage } from "./helper";

const POST = async (req: Request): Promise<NextResponse<PostResponse>> => {
  const formData = await req.formData();
  const contentStr = formData.get('content') as string;
  const rawContent = JSON.parse(contentStr);
  const images = formData.getAll('images');
  console.log('收到的 images:', JSON.stringify(images, null, 2));
  const imageMap = createImageMap(rawContent.entityMap);
  
  // 解析 JSON 字串
  const parsedImages = images.map(img => {
    try {
      return JSON.parse(img.toString());
    } catch (e) {
      console.error('解析圖片資料失敗:', e);
      return null;
    }
  });
   // 過濾有效的圖片資料
  const imageFiles = parsedImages.filter((image): image is any => 
    image !== null && 
    typeof image === 'object' &&
    'name' in image &&
    'size' in image &&
    'type' in image &&
    'displayWidth' in image &&
    'displayHeight' in image &&
    'originalWidth' in image &&
    'originalHeight' in image
  );
  
  console.log('處理後的圖片檔案:', imageFiles);
  
  // 處理圖片
  await Promise.all(
    imageFiles.map(image =>
      processImage(image, imageMap)
    )
  );

  const contentToSave = {
    content: JSON.stringify(rawContent),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const { collection, client } = await getMongoCollection('Test');
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