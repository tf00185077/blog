type Article = {
  title: string;
  contents: ContentItem[];
  logo: string;
};

type ContentItem = {
  id: number;        // 用於排序和識別
  type: 'text' | 'image';
  content: string;
  height?: number;
  width?: number;
  originalHeight?: number;
  originalWidth?: number;
};

const emptyArticle: Article = {
  title: '',
  contents: [{ id: 0, type: 'text', content: '' }],
  logo: '',
};

export type { Article, ContentItem };
export { emptyArticle };
