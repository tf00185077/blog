'use server';
import fs from 'fs/promises';
import path from 'path';
export const uploadImage = async (blob: Blob): Promise<string> => {
 try {
   // 生成唯一的檔名
   const timestamp = Date.now();
   const randomString = Math.random().toString(36).substring(2, 15);
   const fileName = `${timestamp}-${randomString}.png`;
   
   // 轉換 blob 為 Buffer
   const arrayBuffer = await blob.arrayBuffer();
   const buffer = Buffer.from(arrayBuffer);
   
   // 確保目標資料夾存在
   const uploadDir = path.join(process.cwd(), 'public', 'uploads');
   console.log({uploadDir});
   await fs.mkdir(uploadDir, { recursive: true });
   
   // 寫入檔案
   const filePath = path.join(uploadDir, fileName);
   await fs.writeFile(filePath, buffer);
   
   // 返回可以訪問的 URL 路徑
   return `/uploads/${fileName}`;
 } catch (error) {
   console.error('Error uploading image:', error);
   throw new Error('Failed to upload image');
 }
};