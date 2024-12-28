'use client';
import { Suspense } from 'react';
import { Box, } from '@chakra-ui/react';
import Loading from '@/app/(web)/_components/Loading';
import { PreviewList } from './_components/PreviewList';
export default function PostsList() {

  return (
    <Box p={6}>
      <h1 className="text-2xl font-bold mb-4">文章</h1>
      <Suspense fallback={<Loading />}>
        <PreviewList />
      </Suspense>
    </Box>
  );
}