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

type Props = {
  refetch: () => void;
};

export function DirMenuModal({ refetch }: Props) {
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
          <ModalHeader>ファイルメニュー</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {status === ModalStatus.default && (
              <DefaultModalBody setStatus={setStatus} onClose={onClose} />
            )}
            {status === ModalStatus.make && (
              <MakeModalBody refetch={refetch} onClose={onClose} />
            )}
            {status === ModalStatus.preview && (
              <PrevieModalBody onClose={onClose} />
            )}
            {status === ModalStatus.upload && (
              <UploadModalBody refetch={refetch} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
