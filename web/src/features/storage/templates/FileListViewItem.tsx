import { GetFilesQuery } from "@/gql/graphql";
import { Box, HStack, Icon, Image, Text } from "@chakra-ui/react";
import { FileMenuModal } from "./FileMenuModal";
import { IconType } from "react-icons";
import {
  FaFile,
  FaFileAlt,
  FaFileAudio,
  FaFileImage,
  FaFileVideo,
  FaFolder,
} from "react-icons/fa";
import { ConditionalButton } from "@/components/parts/ConditionalButton";
import { ConditionalLink } from "@/components/parts/ConditionalLink";
import { EllipsisText } from "@/components/parts/EllipsisText";
import { useContext } from "react";
import { SelectModeContext } from "@/providers/SelectModeProvider";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdOutlineIndeterminateCheckBox,
} from "react-icons/md";
import { SelectedFileKeysContext } from "../provides/SelectedFileKeysProvider";
import { Select } from "@/components/parts/Select";

type Props = {
  file: GetFilesQuery["files"][number];
  onClick: () => void;
};

export function FileListViewItem({ file, onClick }: Props) {
  const selectModeContext = useContext(SelectModeContext);
  const selectedFileKeysContext = useContext(SelectedFileKeysContext);

  let icon: IconType;
  switch (file.type) {
    case "dir":
      icon = FaFolder;
      break;
    case "image":
      icon = FaFileImage;
      break;
    case "video":
      icon = FaFileVideo;
      break;
    case "audio":
      icon = FaFileAudio;
      break;
    case "text":
      icon = FaFileAlt;
      break;
    default:
      icon = FaFile;
      break;
  }

  const getSizeText = (size: number) => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 ** 2) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else if (size < 1024 ** 3) {
      return `${(size / 1024 ** 2).toFixed(1)} MB`;
    } else {
      return `${(size / 1024 ** 3).toFixed(1)} GB`;
    }
  };

  return (
    <HStack w="100%" borderBottom="1px" borderColor="whiteAlpha.500">
      <ConditionalLink
        minW={0}
        flexGrow={1}
        href={`/storage${file.key}`}
        isLink={file.isDir && !selectModeContext.selectMode}
      >
        <ConditionalButton
          minW={0}
          flexGrow={1}
          onClick={onClick}
          isButton={!file.isDir && !selectModeContext.selectMode}
        >
          <Select
            select={selectedFileKeysContext.setSelectedFileKeys}
            value={file.key}
            isSelectMode={selectModeContext.selectMode && file.name !== "../"}
            minW={0}
            flexGrow={1}
          >
            <Box
              minW={0}
              flexGrow={1}
              mr={file.name === "../" && !selectModeContext.selectMode ? 14 : 0}
            >
              <HStack p={4}>
                {selectModeContext.selectMode && (
                  <Icon
                    as={
                      file.name === "../"
                        ? MdOutlineIndeterminateCheckBox
                        : selectedFileKeysContext.selectedFileKeys.includes(
                            file.key
                          )
                        ? MdCheckBox
                        : MdCheckBoxOutlineBlank
                    }
                    boxSize={6}
                    mr={2}
                  />
                )}
                {file.type === "image" ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file.key}`}
                    boxSize={8}
                    objectFit="contain"
                    mr={4}
                  />
                ) : (
                  <Icon as={icon} boxSize={6} ml={1} mr={5} />
                )}
                <EllipsisText textAlign="left" w="75%">
                  {file.name}
                </EllipsisText>
                <HStack>
                  <Text
                    w={20}
                    textAlign="left"
                    display={{ base: "none", md: "block" }}
                  >
                    {getSizeText(file.size ?? 0)}
                  </Text>
                  <Text
                    textAlign="left"
                    ml={12}
                    display={{ base: "none", xl: "block" }}
                  >
                    {file.name === "../"
                      ? " - - - - - - - "
                      : `${new Date(file.updated_at).toLocaleDateString()}`}
                  </Text>
                </HStack>
              </HStack>
            </Box>
          </Select>
        </ConditionalButton>
      </ConditionalLink>
      {!selectModeContext.selectMode && (
        <FileMenuModal
          file={file}
          ml="auto"
          display={file.name === "../" ? "none" : "block"}
        />
      )}
    </HStack>
  );
}
