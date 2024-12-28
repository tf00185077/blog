'use client';
import dynamic from 'next/dynamic';
import React, { Suspense } from "react";
import Loading from '../_components/Loading';
import { Box } from '@chakra-ui/react';
const RichTextEditor = dynamic(() => import('./_component/RichTextEditor'), { ssr: false, loading: () => <Loading /> });

export default function Home() {
  return (
    <Box spaceY="4" p="4">
      <h1 className="text-2xl font-bold text-text-main">文章編輯</h1>
      <Suspense fallback={<Loading />}>
        <RichTextEditor />
      </Suspense>
    </Box>
  );
}