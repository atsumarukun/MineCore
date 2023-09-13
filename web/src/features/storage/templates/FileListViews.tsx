import { GetFilesQuery } from "@/gql/graphql";
import { Box, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { FileListViewItem } from "./FileListViewItem";
import { useContext, useState } from "react";
import { PreviewFileModal } from "./PreviewFileModal";
import { useGetPath } from "../hooks";
import { SelectModeContext } from "@/providers/SelectModeProvider";
import { DIR_SIZE } from "../constants";

type Props = {
  files: GetFilesQuery["files"];
};

export function FileListViews({ files }: Props) {
  const selectModeContext = useContext(SelectModeContext);
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
      <VStack spacing={0} my={8}>
        <HStack w="100%" borderBottom="1px" borderColor="whiteAlpha.500">
          <HStack w="100%">
            <Text
              textAlign="left"
              w="75%"
              mr={selectModeContext.selectMode ? 20 : 10}
              ml={selectModeContext.selectMode ? 10 : 0}
            >
              ファイル名
            </Text>
            <HStack>
              <Text
                w={20}
                textAlign="left"
                display={{ base: "none", md: "block" }}
              >
                サイズ
              </Text>
              <Text
                ml={12}
                w={20}
                textAlign="left"
                display={{ base: "none", xl: "block" }}
              >
                更新日
              </Text>
            </HStack>
          </HStack>
          <Box boxSize={8} ml={8} />
        </HStack>
        {path && (
          <FileListViewItem
            file={{
              name: "../",
              key: path.substring(0, path.lastIndexOf("/")),
              type: "dir",
              isDir: true,
              size: DIR_SIZE,
            }}
            onClick={() => onPreview(undefined)}
          />
        )}
        {files.map((file) => (
          <FileListViewItem
            file={file}
            key={file.key}
            onClick={() => onPreview(file.isDir ? undefined : file)}
          />
        ))}
      </VStack>
      <PreviewFileModal
        file={file}
        onChangeFile={onChangeFile}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
