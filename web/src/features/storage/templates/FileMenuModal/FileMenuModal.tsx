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
import Link from "next/link";
import { ModalStatus } from ".";
import { DefaultModalBody } from "./DefaultModalBody";
import { RemoveModalBody } from "./RemoveModalBody";
import { RenameModalBody } from "./RenameModalBody";
import { MoveModalBody } from "./MoveModalBody";
import { CopyModalBody } from "./CopyModalBody";

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
            <EllipsisText
              as={Link}
              href={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file.key}`}
            >
              {file.name}
            </EllipsisText>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {status === ModalStatus.default && (
              <DefaultModalBody
                name={file.name}
                filekey={file.key}
                setStatus={setStatus}
                onClose={onClose}
              />
            )}
            {status === ModalStatus.rename && (
              <RenameModalBody
                name={file.name}
                path={path}
                refetch={refetch}
                onClose={onClose}
              />
            )}
            {status === ModalStatus.move && (
              <MoveModalBody
                path={path}
                name={file.name}
                refetch={refetch}
                onClose={onClose}
              />
            )}
            {status === ModalStatus.copy && (
              <CopyModalBody
                path={path}
                name={file.name}
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
