'use client';
import dynamic from 'next/dynamic';
import React, { Suspense } from "react";
import Loading from '../_components/Loading';
const RichTextEditor = dynamic(() => import('./_component/RichTextEditor'), { ssr: false, loading: () => <Loading /> });

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-main">TEXT EDITOR</h1>
      <Suspense fallback={<Loading />}>
        <RichTextEditor />
      </Suspense>
    </div>
  );
}