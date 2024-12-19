type UploadImageResult = {
  type: 'image';
  content: string;
  height: number;
  width: number;
  originalHeight: number;
  originalWidth: number;
};

export const handleImageUpload = (file: File): Promise<UploadImageResult> => {
  return new Promise((resolve, reject) => {
    // 檢查檔案類型
    if (!file.type.startsWith('image/')) {
      reject('請上傳圖片檔案');
      return;
    }

    // 檢查檔案大小（例如限制 5MB）
    // const maxSize = 5 * 1024 * 1024;
    // if (file.size > maxSize) {
    //   onError?.('圖片大小不能超過 5MB');
    //   return;
    // }

    const reader = new FileReader();
    const imgMaxWidth = 400;
    const imgMaxHeight = 400;
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        let newWidth = img.width;
        let newHeight = img.height;

        if (img.width > imgMaxWidth || img.height > imgMaxHeight) {
          const widthRatio = imgMaxWidth / img.width;
          const heightRatio = imgMaxHeight / img.height;
          const ratio = Math.min(widthRatio, heightRatio);

          newWidth = Math.floor(img.width * ratio);
          newHeight = Math.floor(img.height * ratio);
        }
        resolve({
          type: 'image',
          content: reader.result as string,
          originalHeight: img.height,
          originalWidth: img.width,
          height: newHeight,
          width: newWidth
        });
      };
      img.src = reader.result as string;
    };

    reader.onerror = () => {
      reject('圖片讀取失敗，請重試');
    };

    reader.readAsDataURL(file);
  });
};