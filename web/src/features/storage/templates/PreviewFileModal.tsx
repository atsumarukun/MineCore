import { EllipsisText } from "@/components/parts/EllipsisText";
import { GetFilesQuery } from "@/gql/graphql";
import {
  Button,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
  file?: GetFilesQuery["files"][number];
  onChangeFile: (dIndex: number) => void;
  isOpen: boolean;
  onClose: () => void;
};

export function PreviewFileModal({
  file,
  onChangeFile,
  isOpen,
  onClose,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const toast = useToast();

  useEffect(() => {
    videoRef.current?.load();
  }, [file]);

  if (!file) {
    if (isOpen) {
      toast({
        title: "ファイルの取得に失敗しました.",
        status: "error",
        duration: 5000,
      });
      onClose();
    }
    return <></>;
  }

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
            href={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file.key}`}
            fontWeight="light"
          >
            {file.name}
          </EllipsisText>
        </ModalHeader>
        <ModalCloseButton zIndex={1} />
        <ModalBody maxW="75vw" p={0}>
          {file.type === "image" && (
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file.key}`}
              maxH="75vh"
              objectFit="contain"
            />
          )}
          {(file.type === "video" || file.type === "audio") && (
            <video
              controls
              autoPlay
              loop
              ref={videoRef}
              style={{
                maxWidth: "75vw",
                maxHeight: "75vh",
                width: file.type === "audio" ? "75vw" : "",
              }}
            >
              <source
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file.key}`}
              />
            </video>
          )}
          {file.type === "text" && (
            <iframe
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file.key}`}
              style={{
                width: "75vw",
                height: "75vh",
                marginTop: "50px",
                backgroundColor: "white",
              }}
            />
          )}
          <Button
            h={14}
            position="absolute"
            bgColor="blackAlpha.700"
            rounded={50}
            opacity={0.1}
            left={-20}
            top="50%"
            transform="translateY(-50%)"
            _hover={{ opacity: 1 }}
            onClick={() => onChangeFile(-1)}
          >
            <Icon as={IoIosArrowBack} boxSize={6} />
          </Button>
          <Button
            h={14}
            position="absolute"
            bgColor="blackAlpha.700"
            rounded={50}
            opacity={0.1}
            right={-20}
            top="50%"
            transform="translateY(-50%)"
            _hover={{ opacity: 1 }}
            onClick={() => onChangeFile(1)}
          >
            <Icon as={IoIosArrowForward} boxSize={6} />
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
