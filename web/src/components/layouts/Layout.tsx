import { ReactNode } from "react";
import { Header } from "./Header";
import { Box, Flex } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Flex pt={16} mx={6} minH="100vh" alignItems="normal">
        <Box w="100%">{children}</Box>
      </Flex>
    </>
  );
}
