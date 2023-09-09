import { EllipsisText } from "@/components/parts/EllipsisText";
import { GetFilesQuery } from "@/gql/graphql";
import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  file?: GetFilesQuery["files"][number];
  isOpen: boolean;
  onClose: () => void;
};

export function PreviewFileModal({ file, isOpen, onClose }: Props) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="auto">
      <ModalOverlay />
      <ModalContent w="fit-content">
        <ModalHeader
          py={2}
          px={3}
          w="100%"
          bg="none"
          position="absolute"
          zIndex={1}
        >
          <EllipsisText
            as={Link}
            href={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file?.key}`}
            fontWeight="light"
          >
            {file?.name}
          </EllipsisText>
        </ModalHeader>
        <ModalCloseButton zIndex={1} />
        <ModalBody maxW="75vw" p={0}>
          {file?.type === "image" && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file.key}`}
              maxH="75vh"
              objectFit="contain"
            />
          )}
          {(file?.type === "video" || file?.type === "audio") && (
            <video controls autoPlay loop style={{ width: "75vh" }}>
              <source
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file.key}`}
              />
            </video>
          )}
          {file?.type === "text" && (
            <iframe
              id="iframe"
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file?.key}`}
              style={{
                width: "75vw",
                marginTop: "50px",
                backgroundColor: "white",
              }}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}