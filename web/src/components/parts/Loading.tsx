import { Center, Spinner } from "@chakra-ui/react";

export function Loading() {
  return (
    <Center
      h="100%"
      w="100%"
      bgColor="whiteAlpha.400"
      position="absolute"
      top={0}
      left={0}
    >
      <Spinner boxSize={12} />
    </Center>
  );
}
