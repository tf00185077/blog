import { Stack } from '@chakra-ui/react';
import TextArea from './text-area';
import Three from '../three';

const SelfIntroduce = () => {
  return (
    <Stack borderBottom={'1px solid'} borderColor={'gray.500'} p={6} flexDirection={{ base: 'column', md: 'row' }} justifyContent={'center'} alignItems={'center'} gap={{ base: 4, md: 24 }}>
      <Three />
      <TextArea />
    </Stack >
  );
};

export default SelfIntroduce;