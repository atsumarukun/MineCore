import { Flex, Text } from "@chakra-ui/react";
import { HeaderMenu } from "./HeaderMenu";
import Link from "next/link";
import { BG_COLOR } from "@/styles/constants";

export function Header() {
  return (
    <Flex
      w="100%"
      alignItems="center"
      position="fixed"
      p={2}
      bgColor={BG_COLOR}
      zIndex={1}
    >
      <HeaderMenu />
      <Text as={Link} href="/" fontSize={18} ml={2}>
        MineCore
      </Text>
    </Flex>
  );
}
