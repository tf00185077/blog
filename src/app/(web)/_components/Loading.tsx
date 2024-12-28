import { Stack, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return <Stack w="full" h="full" justifyContent="center" alignItems="center">
    <Spinner borderWidth={2} size="lg" />
  </Stack>;
};

export default Loading;
