import { GetFilesQuery } from "@/gql/graphql";
import {
  Grid,
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
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <EllipsisText
              as={Link}
              href={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file?.key}`}
            >
              {file?.name}
            </EllipsisText>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
