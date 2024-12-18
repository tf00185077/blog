'use client';
import { useState } from 'react';
import Image from 'next/image';

const UpdateLogo = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1">文章預覽圖</label>
      <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-md overflow-hidden flex items-center justify-center">
        {previewImage ? (
          <Image
            src={previewImage}
            alt="Preview"
            className="w-full h-full object-contain"
            width={200}
            height={200}
          />
        ) : (
          <div className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">點擊上傳圖片</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handlePreviewImage}
          className="absolute inset-0 w-48 h-48 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default UpdateLogo;
