import { ReactNode } from "react";
import { Header } from "./Header";
import { Box } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Box pt={16} mx={6}>
        {children}
      </Box>
    </>
  );
}
