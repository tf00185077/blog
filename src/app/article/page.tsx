import getProps from './props';
import { Suspense } from 'react';

const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="p-8 bg-gray-200 rounded">
        Loading...
      </div>
    </div>
  );
};

async function ArticleContent() {
  const result = await getProps();
  const data = await result.json();

  return (
    <div>
      {data.response.map((item: { _id: string, name: string; }) => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );
}

const Article = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <ArticleContent />
    </Suspense>
  );
};

export default Article;
