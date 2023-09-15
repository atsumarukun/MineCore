import { Button, Icon, VStack, useToast } from "@chakra-ui/react";
import { Dispatch } from "react";
import { ModalStatus } from ".";
import { FiDownload, FiTrash } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";
import { LuFileOutput } from "react-icons/lu";
import { IoMdCopy } from "react-icons/io";
import { useDownload } from "../../hooks";
import { ApolloError } from "@apollo/client";
import { Loading } from "@/components/parts/Loading";

type Props = {
  name: string;
  filekey: string;
  isDir: boolean;
  setStatus: Dispatch<number>;
  onClose: () => void;
};

export function DefaultModalBody({
  name,
  filekey,
  isDir,
  setStatus,
  onClose,
}: Props) {
  const [download, { loading }] = useDownload({
    name: isDir ? `${name}.zip` : name,
    keys: [filekey],
  });
  const toast = useToast();

  const onDownload = async () => {
    try {
      await download();
      toast({
        title: "ダウンロードしました.",
        status: "success",
        duration: 5000,
      });
      onClose();
    } catch (e) {
      if (e instanceof ApolloError) {
        toast({
          title: "エラーが発生しました.",
          description: e.message,
          status: "error",
          duration: 5000,
        });
      }
    }
  };

  return (
    <>
      {loading && <Loading />}
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
    </>
  );
}
