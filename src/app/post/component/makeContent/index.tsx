'use client';
import { Article } from "../../helper/type";
// import Image from "next/image";

const MakeContent = ({ article, inputTextHandler, addContent }:
  {
    article: Article;
    inputTextHandler: (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void;
    addContent: () => void;
  }) => {
  return (
    <div className="flex flex-col">
      {/* 輸入區域 */}
      <div className="flex flex-col gap-4">
        <div className="min-h-[200px] bg-white border rounded-md">
          {article.content.map((item, index) => {
            return <textarea key={index}
              className="w-full p-2 border rounded-md resize-none overflow-hidden"
              rows={1}
              style={{ height: '40px' }}
              placeholder="請輸入文章內容"
              onChange={e => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
                inputTextHandler(e, index);
              }}
              value={item.content} />;
          })
          }
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default MakeContent;