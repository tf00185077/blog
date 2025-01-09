'use client';
import { Stack } from '@chakra-ui/react';
import ContactMe from './ContactMe';
import TypewriterText from './TypeMachine';
const TextArea = () => {

  return (
    <Stack bg='white' w='1060px' color={'black'} border={'none'} borderRadius='xl'
      zIndex={2} position={'relative'}
      flexDirection={'column'} gap={4} p={6} top={6} left={6}
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
