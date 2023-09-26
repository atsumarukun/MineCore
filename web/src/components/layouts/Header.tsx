import { Flex, Text } from "@chakra-ui/react";
import { HeaderMenu } from "./HeaderMenu";
import Link from "next/link";
import { BG_COLOR } from "@/styles/constants";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useRunCommandMutation } from "@/gql/graphql";
import { Alert } from "../templates/Alert";

export function Header() {
  const [shutdown] = useRunCommandMutation({
    variables: {
      command: "sudo shutdown -h now",
    },
  });

  const onShutdown = async () => {
    await shutdown();
  };

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
      <Alert
        title="シャットダウン"
        icon={AiOutlinePoweroff}
        onClick={onShutdown}
        ml="auto"
      />
    </Flex>
  );
}
