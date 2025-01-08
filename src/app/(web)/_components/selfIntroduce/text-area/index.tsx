'use client';
import { Stack, Text } from '@chakra-ui/react';
import ContactMe from './ContactMe';
import RenderBox from "../../three/renderBox";
import { createHuman } from '../../three/mine-craft/human';
import { useState, useEffect, useRef } from "react";
const TextArea = () => {
  const [initialized, setInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current && !initialized) {
      const { scene, renderer, camera, controls, cleanup } = RenderBox(containerRef.current, {
        width: 200,
        height: 200,
        position: 'absolute',
        fullCover: true,
        fitContainer: true
      });
       const { model: humanModel, animate: humanAnimate } = createHuman();
      scene.add(humanModel);
       let animationFrameId: number;
      const animate = (timestamp: number = 0) => {
        animationFrameId = requestAnimationFrame(animate);
        humanAnimate(timestamp);
        controls.update();
        renderer.render(scene, camera);
      };
       animate(0);
      setInitialized(true);
       return () => {
        if (initialized) {
          cancelAnimationFrame(animationFrameId);
          cleanup?.();
        }
      };
    }
  }, [initialized]);
  return (
    <Stack ref={containerRef} flexDirection={'column'} gap={4}>
      <Stack color={'text.main'}>
        <Text fontSize={'2xl'} fontWeight={'bold'} mb={4}>Hello, I&apos;m Tim</Text>
        <Text fontSize={'lg'} >
          I&apos;m a passionate Frontend Developer specializing in modern web technologies.
        </Text>
        <Text fontSize={'lg'} mt={3} >
          My expertise includes React, Next.js, Vue.js, and Nuxt.js. I&apos;m also proficient
          with Docker for containerization and Git for version control.
        </Text>
        <Text fontSize={'lg'} mt={3} >
          I regularly share my experiences about web development on this blog.
          Feel free to explore my articles and connect with me.
        </Text>
        <Text fontSize={'lg'} mt={3} >
          I&apos;m always excited to exchange ideas and learn from fellow developers!
        </Text>
      </Stack>
      <ContactMe />
    </Stack>
  );
};

export default TextArea;
