import { Button, Icon, VStack } from "@chakra-ui/react";
import { Dispatch } from "react";
import { ModalStatus } from ".";
import { FiTrash } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";
import { LuFileOutput } from "react-icons/lu";

type Props = {
  setStatus: Dispatch<number>;
};

export function DefaultModalBody({ setStatus }: Props) {
  return (
    <VStack w="100%">
      <Button
        w="100%"
        justifyContent="left"
        onClick={() => setStatus(ModalStatus.rename)}
      >
        <Icon as={BsPencil} boxSize={6} mr={6} />
        名前変更
      </Button>
      <Button
        w="100%"
        justifyContent="left"
        onClick={() => setStatus(ModalStatus.move)}
      >
        <Icon as={LuFileOutput} boxSize={6} mr={6} />
        移動
      </Button>
      <Button
        w="100%"
        justifyContent="left"
        color="red.500"
        onClick={() => setStatus(ModalStatus.remove)}
      >
        <Icon as={FiTrash} boxSize={6} mr={6} />
        削除
      </Button>
    </VStack>
  );
}
