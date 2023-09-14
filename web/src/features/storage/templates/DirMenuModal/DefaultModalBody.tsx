import { Button, HStack, Icon, VStack } from "@chakra-ui/react";
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
import { FiTrash } from "react-icons/fi";
import { IoMdCopy } from "react-icons/io";

type Props = {
  setStatus: Dispatch<number>;
  onClose: () => void;
};

export function DefaultModalBody({ setStatus, onClose }: Props) {
  const router = useRouter();
  const token = parseCookies().token;
  const selectModeContext = useContext(SelectModeContext);
  const selectedFileKeysContext = useContext(SelectedFileKeysContext);

  const onSetSelectMode = () => {
    if (selectModeContext.selectMode) {
      selectedFileKeysContext.setSelectedFileKeys([]);
      selectModeContext.setSelectMode(false);
    } else {
      selectModeContext.setSelectMode(true);
    }
    onClose();
  };

  const onDestroyToken = () => {
    destroyCookie({}, "token");
    onClose();
    router.reload();
  };

  return (
    <>
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
