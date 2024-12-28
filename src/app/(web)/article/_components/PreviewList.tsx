'use client';

import { Stack } from "@chakra-ui/react";
import Preview from "./Preview";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { get } from "@/lib/service/article";
import Loading from "@/app/(web)/_components/Loading";
import { Article } from "../_helper/type";

export const PreviewList = () => {
  const [posts, setPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const page = searchParams.get('page');
    const size = searchParams.get('size');
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await get({ page: Number(page), size: Number(size) });
        const posts = response.data ?? [];
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams]);
  if (loading) return <Loading />;
  return (
    <Stack gap={4} direction="row" flexWrap="wrap" >
      {posts.map(({ id, title, tag, createdAt, subtitle }, index) => (
        <Preview key={index} id={id} title={title} tag={tag} createdAt={createdAt} subtitle={subtitle} />
      ))}
    </Stack>
  );
};