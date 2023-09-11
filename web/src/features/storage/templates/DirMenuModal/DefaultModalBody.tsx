import { Button, Icon, VStack } from "@chakra-ui/react";
import { Dispatch } from "react";
import { LuFolderPlus } from "react-icons/lu";
import { MdOutlineImage, MdOutlineHideImage } from "react-icons/md";
import { PiUploadSimple } from "react-icons/pi";
import { destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import { ModalStatus } from ".";

type Props = {
  setStatus: Dispatch<number>;
  onClose: () => void;
};

export function DefaultModalBody({ setStatus, onClose }: Props) {
  const router = useRouter();
  const token = parseCookies().token;

  const onDestroyToken = () => {
    destroyCookie({}, "token");
    onClose();
    router.reload();
  };

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
      {token ? (
        <Button w="100%" justifyContent="left" onClick={onDestroyToken}>
          <Icon as={MdOutlineHideImage} boxSize={6} mr={6} />
          隠しファイル非表示
        </Button>
      ) : (
        <Button
          w="100%"
          justifyContent="left"
          onClick={() => setStatus(ModalStatus.preview)}
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
  );
}
