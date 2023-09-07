import { EllipsisText } from "@/components/parts/EllipsisText";
import { GetFilesQuery } from "@/gql/graphql";
import {
  Button,
  ButtonProps,
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
import { BsThreeDotsVertical } from "react-icons/bs";
import { ModalStatus } from ".";
import { DefaultModalBody } from "./DefaultModalBody";
import { RemoveModalBody } from "./RemoveModalBody";
import { RenameModalBody } from "./RenameModalBody";

type Props = {
  file: GetFilesQuery["files"][number];
  path: string;
  refetch: () => void;
} & ButtonProps;

export function FileMenuModal({ file, path, refetch, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState(ModalStatus.default);

  useEffect(() => {
    setStatus(ModalStatus.default);
  }, [isOpen]);

  return (
    <>
      <Button {...props} onClick={onOpen}>
        <Icon as={BsThreeDotsVertical} boxSize={4} />
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <EllipsisText>{file.name}</EllipsisText>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {status === ModalStatus.default && (
              <DefaultModalBody setStatus={setStatus} />
            )}
            {status === ModalStatus.rename && (
              <RenameModalBody
                name={file.name}
                path={path}
                refetch={refetch}
                onClose={onClose}
              />
            )}
            {status === ModalStatus.remove && (
              <RemoveModalBody
                filekey={file.key}
                refetch={refetch}
                onClose={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
