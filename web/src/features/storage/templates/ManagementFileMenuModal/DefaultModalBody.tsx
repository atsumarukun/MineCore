import { Button, Icon, VStack } from "@chakra-ui/react";
import { Dispatch } from "react";
import { LuFolderPlus } from "react-icons/lu";
import { ModalStatus } from ".";

type Props = {
  setStatus: Dispatch<number>;
};

export function DefaultModalBody({ setStatus }: Props) {
  return (
    <VStack w="100%">
      <Button
        w="100%"
        justifyContent="left"
        onClick={() => setStatus(ModalStatus.make)}
      >
        <Icon as={LuFolderPlus} boxSize={6} mr={6} />
        フォルダ作成
      </Button>
    </VStack>
  );
}
