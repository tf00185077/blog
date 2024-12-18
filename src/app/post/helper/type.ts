type Article = {
  title: string;
  content: ContentItem[];
  logo: string;
};

type ContentItem = {
  id: string;        // 用於排序和識別
  type: 'text' | 'image';
  content: string;
  order: number;     // 用於維護順序
};

const emptyArticle: Article = {
  title: '',
  content: [{ id: '', type: 'text', content: '', order: 0 }, { id: '', type: 'text', content: '', order: 0 }],
  logo: '',
};

export type { Article, ContentItem };
export { emptyArticle };
