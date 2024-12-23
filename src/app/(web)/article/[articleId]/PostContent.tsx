'use client';
import { useEffect, useState } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];
// 這是客戶端組件
export default function PostContent({ articleId }: { articleId: string }) {
 const [editorState, setEditorState] = useState<EditorState | null>(null);
 const [loading, setLoading] = useState(true);
  useEffect(() => {
   const fetchPost = async () => {
     try {
       const response = await fetch(`/api/article/${articleId}`);
       const post = await response.json();
       
       const contentState = convertFromRaw(JSON.parse(post.content));
       setEditorState(EditorState.createWithContent(contentState));
     } catch (error) {
       console.error('Error fetching post:', error);
     } finally {
       setLoading(false);
     }
   };
    fetchPost();
 }, [articleId]);
  if (loading) return <div>Loading...</div>;
 if (!editorState) return <div>Post not found</div>;
  return (
   <div className="max-w-4xl mx-auto p-4">
     <div className="prose prose-lg">
       <Editor
         editorState={editorState}
         onChange={() => {}}
         plugins={plugins}
         readOnly={true}
       />
     </div>
   </div>
 );
}