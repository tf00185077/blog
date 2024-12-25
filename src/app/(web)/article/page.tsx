'use client';
import { useEffect, useState } from 'react';
// @ts-expect-error no declaration file
import { EditorState } from 'draft-js';
import Link from 'next/link';
export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/article');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">文章</h1>
      <div className="space-y-4">
        {posts.map((post: EditorState) => (
          <div key={post._id} className="border p-4 rounded-lg shadow">
            <Link href={`/article/${post._id}`}>
              <div className="hover:text-blue-500">
                {/* 顯示內容預覽 */}
                <p className="text-gray-600">
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}