import Image from 'next/image';

const Photo = () => {
  return (
    <Image
      src="/cv.jpeg"
      alt="Photo"
      width={200}
      height={200}
      className="rounded-full" // 添加 Tailwind CSS 圓形類
      style={{
        objectFit: 'cover' // 確保圖片填滿容器並保持比例
      }}
    />
  );
};

export default Photo;