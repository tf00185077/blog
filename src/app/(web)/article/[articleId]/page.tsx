import PostContent from './PostContent';

// 这是服务端组件
export default async function PostPage({ params }: { params: { articleId: string } }) {
  const { articleId } = await params; // 添加 await

  return <PostContent articleId={articleId} />;
}