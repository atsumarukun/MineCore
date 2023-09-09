import { GetFilesQuery } from "@/gql/graphql";
import {
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FileTileViewItem } from "../parts/FileTileViewItem";
import { useState } from "react";
import { EllipsisText } from "@/components/parts/EllipsisText";
import Link from "next/link";

type Props = {
  path: string;
  files: GetFilesQuery["files"];
  refetch: () => void;
};

export function FileTileViews({ path, files, refetch }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<GetFilesQuery["files"][number]>();

  const onPreview = (file: GetFilesQuery["files"][number] | undefined) => {
    setFile(file);
    onOpen();
  };

  return (
    <>
      <Grid
        gap={8}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
      >
        {path && (
          <FileTileViewItem
            file={{
              name: "../",
              key: path.substring(0, path.lastIndexOf("/")),
              type: "dir",
              isDir: true,
            }}
            path={path}
            onClick={() => onPreview(undefined)}
            refetch={refetch}
          />
        )}
        {files.map((file) => (
          <FileTileViewItem
            file={file}
            path={path}
            onClick={() => onPreview(file.isDir ? undefined : file)}
            refetch={refetch}
            key={file.key}
          />
        ))}
      </Grid>
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
    </>
  );
}
