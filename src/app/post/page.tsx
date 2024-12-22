'use client'
import dynamic from 'next/dynamic';
import React from "react";
const RichTextEditor = dynamic(()=>import('./component/RichTextEditor'),{ssr:false})

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-main">TEXT EDITOR</h1>
      <RichTextEditor />
    </div>
  );
}