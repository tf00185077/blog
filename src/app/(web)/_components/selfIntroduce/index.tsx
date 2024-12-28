import Photo from './Photo';
import ContactMe from '../ContactMe';
import { Stack, Text } from '@chakra-ui/react';
const SelfIntroduce = () => {
  return (
    <Stack borderBottom={'1px solid'} borderColor={'gray.500'} p={6} flexDirection={{ base: 'column', md: 'row' }} justifyContent={'center'} alignItems={'center'} gap={{ base: 4, md: 24 }}>
      <Photo />
      <Stack flexDirection={'column'} gap={4}>
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
    </Stack >
  );
};

export default SelfIntroduce;