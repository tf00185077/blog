'use client';
import { Stack } from '@chakra-ui/react';
import ContactMe from './ContactMe';
import TypewriterText from './TypeMachine';
import { useEffect, useRef } from 'react';
const TextArea = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    // 創建 MutationObserver 來監聽內容變化
    const mutationObserver = new MutationObserver(() => {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      });
    });
    // 配置觀察選項
    const config = {
      childList: true,      // 監聽子節點的增減
      subtree: true,        // 監聽所有後代節點
      characterData: true   // 監聽文本內容變化
    };
    // 開始觀察
    mutationObserver.observe(element, config);
    // 清理函數
    return () => {
      mutationObserver.disconnect();
    };
  }, []); // 只在組件掛載時執行一次
  return (
    <Stack ref={scrollRef} bg='white' w={{ base: 'calc(100% - 24px)', md: '960px' }} maxH={{ base: '300px', md: 'auto' }} overflow={'auto'} m='auto' color={'black'} border={'none'} borderRadius='xl'
      zIndex={2} position={'relative'}
      flexDirection={'column'} gap={4} p={{ base: 4, md: 6 }} top={6}
      boxShadow='0px 0px 12px 8px rgba(255, 255, 255, 0.1), 0px 0px 12px 8px rgba(255,255, 255, 0.1), 0px 0px 12px 8px rgba(255,255, 255, 0.1)'
    >
      <Stack color={'text.main'}>
        <TypewriterText fontSize={'2xl'} text="Hello, I&apos;m Tim" />
        <TypewriterText startrDelayTime={1000} text="I&apos;m a passionate Frontend Developer specializing in modern web technologies." />
        <TypewriterText startrDelayTime={1000 + 4000} text="My expertise includes React, Next.js, Vue.js, and Nuxt.js. I&apos;m also proficient
          with Docker for containerization and Git for version control." />
        <TypewriterText startrDelayTime={6000 + 7000} text="I regularly share my experiences about web development on this blog.
          Feel free to explore my articles and connect with me." />
        <TypewriterText startrDelayTime={6000 + 7000 + 7000} text="I&apos;m always excited to exchange ideas and learn from fellow developers!" />

      </Stack>
      <ContactMe />
    </Stack>
  );
};

export default TextArea;
