import { Article } from '@/app/(web)/article/[articleId]/type';
import { GetResponse } from '../../type';

const getArticle = async (articleId: string): Promise<GetResponse<Article>> => {
  const response = await fetch(`/api/article/${articleId}`);
  const data = await response.json();
  return data;
};

export { getArticle };