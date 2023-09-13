import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { ModalStatus } from ".";
import { DefaultModalBody } from "./DefaultModalBody";
import { MakeModalBody } from "./MakeModalBody";
import { AuthModalBody } from "./AuthModalBody";
import { UploadModalBody } from "./UploadModalBody";
import { RemoveModalBody } from "./RemoveModalBody";
import { MoveModalBody } from "./MoveModalBody";
import { CopyModalBody } from "./CopyModalBody";
import { SelectModeContext } from "@/providers/SelectModeProvider";
import { SelectedFileKeysContext } from "../../provides/SelectedFileKeysProvider";

export function DirMenuModal() {
  const selectModeContext = useContext(SelectModeContext);
  const selectedFileKeysContext = useContext(SelectedFileKeysContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState(ModalStatus.default);

  useEffect(() => {
    setStatus(ModalStatus.default);
  }, [isOpen]);

  const handleClose = () => {
    selectModeContext.setSelectMode(false);
    selectedFileKeysContext.setSelectedFileKeys([]);
    onClose();
  };

  return (
    <>
      <Button p={0} onClick={onOpen}>
        <Icon as={CgMenuGridO} boxSize={6} />
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ディレクトリメニュー</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {status === ModalStatus.default && (
              <DefaultModalBody setStatus={setStatus} onClose={onClose} />
            )}
            {status === ModalStatus.make && <MakeModalBody onClose={onClose} />}
            {status === ModalStatus.auth && <AuthModalBody onClose={onClose} />}
            {status === ModalStatus.upload && (
              <UploadModalBody onClose={onClose} />
            )}
            {status === ModalStatus.move && (
              <MoveModalBody onClose={handleClose} />
            )}
            {status === ModalStatus.copy && (
              <CopyModalBody onClose={handleClose} />
            )}
            {status === ModalStatus.remove && (
              <RemoveModalBody onClose={handleClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
