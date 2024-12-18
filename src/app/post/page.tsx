'use client';
import { useState } from 'react';
import UpdatePreviewPhoto from './component/updatePreviewPhoto';
import { Article, emptyArticle } from './helper/type';
import Preview from './component/preview';
import MakeContent from './component/makeContent';
const Post = () => {
  const [article, setArticle] = useState<Article>(emptyArticle);
  const inputTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    console.log(article);
    setArticle({ ...article, content: article.content.map((item, i) => i === index ? { ...item, content: e.target.value } : item) });
  };
  const addContent = () => {
    setArticle({ ...article, content: [...article.content, { id: '', type: 'text', content: '', order: 0 }] });
  };
  return (
    <div className="w-full h-full p-6">
      <h1 className="text-4xl font-bold mb-6 text-text-main">BLOG POST</h1>

      <div className="space-y-4">
        {/* 標題輸入 */}
        <div>
          <label className="block text-sm font-medium mb-1">標題</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="請輸入標題"
          />
        </div>
        <UpdatePreviewPhoto />

        {/* 內容輸入 */}
        <div className="flex gap-4">
          <div className="w-2/3">
            <label className="block text-sm font-medium mb-1">文章內容</label>
            <MakeContent article={article} inputTextHandler={inputTextHandler} addContent={addContent} />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">預覽</label>
            <div className="border rounded-md p-2 min-h-[200px]">
              <Preview article={article} />
            </div>
          </div>
        </div>

        {/* 送出按鈕 */}
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
          發布文章
        </button>
      </div>
    </div>
  );
};

export default Post;