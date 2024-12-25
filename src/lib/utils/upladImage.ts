'use server';
import { bucket } from '@/lib/service/firebase';
export const uploadImage = async (blob: Blob): Promise<string> => {
  try {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `images/${timestamp}-${randomString}.png`;

    // 將 Blob 轉換為 Buffer
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 在 Firebase Storage 上創建文件引用
    const file = bucket.file(fileName);

    // 上傳文件到 Firebase Storage
    await file.save(buffer, {
      metadata: {
        contentType: 'image/png', // 設置文件類型
      },
      public: true, // 設置為公開訪問（可選）
    });

    // 獲取公開的文件 URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return publicUrl; 
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};