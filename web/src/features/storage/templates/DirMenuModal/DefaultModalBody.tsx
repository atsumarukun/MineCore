import { Button, HStack, Icon, VStack, useToast } from "@chakra-ui/react";
import { Dispatch, useContext } from "react";
import { LuFileOutput, LuFolderPlus } from "react-icons/lu";
import { MdOutlineImage, MdOutlineHideImage } from "react-icons/md";
import { PiUploadSimple } from "react-icons/pi";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import { ModalStatus } from ".";
import { BiSelectMultiple } from "react-icons/bi";
import { SelectModeContext } from "@/providers/SelectModeProvider";
import { SelectedFileKeysContext } from "../../provides/SelectedFileKeysProvider";
import { FiDownload, FiTrash } from "react-icons/fi";
import { IoMdCopy } from "react-icons/io";
import { useDownload } from "../../hooks";
import { ApolloError } from "@apollo/client";
import { Loading } from "@/components/parts/Loading";

type Props = {
  setStatus: Dispatch<number>;
  onClose: () => void;
};

export function DefaultModalBody({ setStatus, onClose }: Props) {
  const router = useRouter();
  const toast = useToast();
  const token = parseCookies().token;
  const selectModeContext = useContext(SelectModeContext);
  const selectedFileKeysContext = useContext(SelectedFileKeysContext);

  const [download, { loading }] = useDownload({
    name: "downloads.zip",
    keys: selectedFileKeysContext.selectedFileKeys,
  });

  const onSetSelectMode = () => {
    if (selectModeContext.selectMode) {
      selectedFileKeysContext.setSelectedFileKeys([]);
      selectModeContext.setSelectMode(false);
    } else {
      selectModeContext.setSelectMode(true);
    }
    onClose();
  };

  const onDownload = async () => {
    try {
      await download();
      toast({
        title: "ダウンロードしました.",
        status: "success",
        duration: 5000,
      });
      onSetSelectMode();
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

  const onDestroyToken = () => {
    destroyCookie({}, "token");
    onClose();
    router.reload();
  };

  return (
    <>
      {loading && <Loading />}
      {selectModeContext.selectMode ? (
        <VStack w="100%">
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
          <HStack w="100%" justifyContent="right" mt={8}>
            <Button onClick={onSetSelectMode}>キャンセル</Button>
          </HStack>
        </VStack>
      ) : (
        <VStack w="100%">
          <Button
            w="100%"
            justifyContent="left"
            onClick={() => setStatus(ModalStatus.make)}
          >
            <Icon as={LuFolderPlus} boxSize={6} mr={6} />
            ディレクトリ作成
          </Button>
          <Button w="100%" justifyContent="left" onClick={onSetSelectMode}>
            <Icon as={BiSelectMultiple} boxSize={6} mr={6} />
            一括操作
          </Button>
          {token ? (
            <Button w="100%" justifyContent="left" onClick={onDestroyToken}>
              <Icon as={MdOutlineHideImage} boxSize={6} mr={6} />
              隠しファイル非表示
            </Button>
          ) : (
            <Button
              w="100%"
              justifyContent="left"
              onClick={() => setStatus(ModalStatus.auth)}
            >
              <Icon as={MdOutlineImage} boxSize={6} mr={6} />
              隠しファイル表示
            </Button>
          )}
          <Button
            w="100%"
            justifyContent="left"
            onClick={() => setStatus(ModalStatus.upload)}
          >
            <Icon as={PiUploadSimple} boxSize={6} mr={6} />
            アップロード
          </Button>
        </VStack>
      )}
    </>
  );
}
