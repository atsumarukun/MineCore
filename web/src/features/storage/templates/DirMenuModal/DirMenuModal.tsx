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
import { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { ModalStatus } from ".";
import { DefaultModalBody } from "./DefaultModalBody";
import { MakeModalBody } from "./MakeModalBody";
import { PrevieModalBody } from "./PreviewModalBody";
import { UploadModalBody } from "./UploadModalBody";
import { RemoveModalBody } from "./RemoveModalBody";
import { MoveModalBody } from "./MoveModalBody";
import { CopyModalBody } from "./CopyModalBody";

export function DirMenuModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState(ModalStatus.default);

  useEffect(() => {
    setStatus(ModalStatus.default);
  }, [isOpen]);

  return (
    <>
      <Button p={0} onClick={onOpen}>
        <Icon as={CgMenuGridO} boxSize={6} />
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ディレクトリメニュー</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {status === ModalStatus.default && (
              <DefaultModalBody setStatus={setStatus} onClose={onClose} />
            )}
            {status === ModalStatus.make && <MakeModalBody onClose={onClose} />}
            {status === ModalStatus.preview && (
              <PrevieModalBody onClose={onClose} />
            )}
            {status === ModalStatus.upload && (
              <UploadModalBody onClose={onClose} />
            )}
            {status === ModalStatus.move && <MoveModalBody onClose={onClose} />}
            {status === ModalStatus.copy && <CopyModalBody onClose={onClose} />}
            {status === ModalStatus.remove && (
              <RemoveModalBody onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
