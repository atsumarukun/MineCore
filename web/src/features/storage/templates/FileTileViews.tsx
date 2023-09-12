import { GetFilesQuery } from "@/gql/graphql";
import { Grid, useDisclosure } from "@chakra-ui/react";
import { FileTileViewItem } from "./FileTileViewItem";
import { useState } from "react";
import { PreviewFileModal } from "./PreviewFileModal";
import { useGetPath } from "../hooks";

type Props = {
  files: GetFilesQuery["files"];
};

export function FileTileViews({ files }: Props) {
  const path = useGetPath();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<GetFilesQuery["files"][number]>();

  const onPreview = (file: GetFilesQuery["files"][number] | undefined) => {
    setFile(file);
    onOpen();
  };

  const onChangeFile = (dIndex: number) => {
    const previewAbleFiles = files.filter((file) => file.type != "dir");
    const previewFile =
      previewAbleFiles[
        (previewAbleFiles.indexOf(file ?? previewAbleFiles[0]) +
          dIndex +
          previewAbleFiles.length) %
          previewAbleFiles.length
      ];
    setFile(previewFile);
  };

  return (
    <>
      <Grid
        gap={8}
        my={8}
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
            onClick={() => onPreview(undefined)}
          />
        )}
        {files.map((file) => (
          <FileTileViewItem
            file={file}
            onClick={() => onPreview(file.isDir ? undefined : file)}
            key={file.key}
          />
        ))}
      </Grid>
      <PreviewFileModal
        file={file}
        onChangeFile={onChangeFile}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
