'use client';
import { Article } from "../../helper/type";
import UploadImage from "./uploadImage";
import Image from "next/image";
const MakeContent = ({ article, inputTextHandler, imageUploadHandler }:
  {
    article: Article;
    inputTextHandler: (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void;
    imageUploadHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
  return (
    <div className="flex flex-col">
      {/* 輸入區域 */}
      <div className="flex flex-col gap-4">
        <div className="min-h-[200px] bg-white border rounded-md">
          {article.contents.sort((a, b) => a.id - b.id).map(({ id, type, content, height, width }, index) => {
            switch (type) {
              case 'text':
                return <textarea key={id}
                  className="w-full p-2 border rounded-md resize-none overflow-hidden"
                  rows={1}
                  style={{ height: '40px' }}
                  placeholder="請輸入文章內容"
                  onChange={e => {
                    console.log(id);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                    inputTextHandler(e, index);
                  }}
                  value={content} />;
              case 'image':
                return <Image width={width} height={height} key={id} src={content} alt={`content-${index}`} />;
              default:
                return null;
            }
          })
          }
        </div>
        <UploadImage imageUploadHandler={imageUploadHandler} />
      </div>
    </div>
  );
};

export default MakeContent;