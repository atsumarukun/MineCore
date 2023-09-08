import { Button, Icon, VStack } from "@chakra-ui/react";
import { Dispatch } from "react";
import { ModalStatus } from ".";
import { FiDownload, FiTrash } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";
import { LuFileOutput } from "react-icons/lu";
import { IoMdCopy } from "react-icons/io";
import { useDownload } from "../../hooks";

type Props = {
  name: string;
  filekey: string;
  setStatus: Dispatch<number>;
};

export function DefaultModalBody({ name, filekey, setStatus }: Props) {
  const download = useDownload({ name: name, filekey: filekey });

  const onDownload = async () => {
    await download();
  };

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
        onClick={() => setStatus(ModalStatus.copy)}
      >
        <Icon as={IoMdCopy} boxSize={6} mr={6} />
        コピー
      </Button>
      <Button w="100%" justifyContent="left" onClick={onDownload}>
        <Icon as={FiDownload} boxSize={6} mr={6} />
        ダウンロード
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
