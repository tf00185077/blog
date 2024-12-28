'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// @ts-expect-error no declaration file
import { EditorState, convertFromRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];
import { Box, Stack, Text } from '@chakra-ui/react';
import { Article } from './type';
import Loading from '@/app/(web)/_components/Loading';
import { getArticle } from '@/lib/service/article/articleId';
export default function PostContent({ articleId }: { articleId: string; }) {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [post, setPost] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getArticle(articleId);
        if (response.status === 'error') return router.push('/404');
        const post = response.data;
        if (!post) return;

        const contentState = convertFromRaw(JSON.parse(post.content));
        setEditorState(EditorState.createWithContent(contentState));
        setPost(post);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [router, articleId]);
  if (loading) return <Loading />;
  return (
    <Box border={'1px solid'} borderColor={'gray.200'} spaceY={4} mx='auto' my={4} maxWidth={'1600px'} p={6}>
      <Stack gap={4}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Text fontSize={'3xl'} fontWeight={'bold'}>{post?.title}</Text>
          <Text fontSize={'sm'} color={'gray.400'} fontWeight={'bold'}>written date :{post?.createdAt.split('T')[0]}</Text>
        </Stack>
        <Text fontSize={'sm'} color={'gray.400'} fontWeight={'bold'}>Tag:{post?.tag}</Text>
        <Text fontSize={'xl'} color={'gray.400'} fontWeight={'bold'}>{post?.subtitle}</Text>
        <Editor
          editorState={editorState}
          plugins={plugins}
          readOnly={true}
        />
      </Stack>
    </Box>
  );
}