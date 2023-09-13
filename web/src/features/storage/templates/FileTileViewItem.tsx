import { ConditionalLink } from "@/components/parts/ConditionalLink";
import { EllipsisText } from "@/components/parts/EllipsisText";
import { GetFilesQuery } from "@/gql/graphql";
import { Center, GridItem, Icon, Image } from "@chakra-ui/react";
import {
  FaFolder,
  FaFileAlt,
  FaFileImage,
  FaFileVideo,
  FaFile,
  FaFileAudio,
} from "react-icons/fa";
import { FileMenuModal } from "./FileMenuModal";
import { ConditionalButton } from "@/components/parts/ConditionalButton";
import { IconType } from "react-icons";
import { useContext } from "react";
import { SelectModeContext } from "@/providers/SelectModeProvider";
import { SelectedFileKeysContext } from "../provides/SelectedFileKeysProvider";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { Select } from "@/components/parts/Select";

type Props = {
  file: GetFilesQuery["files"][number];
  onClick: () => void;
};

export function FileTileViewItem({ file, onClick }: Props) {
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

  return (
    <GridItem
      aspectRatio={1 / 1}
      position="relative"
      bgImage={
        file.type === "image"
          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${file.key}`
          : ""
      }
      bgSize="cover"
    >
      <ConditionalLink
        href={`/storage${file.key}`}
        isLink={file.isDir && !selectModeContext.selectMode}
      >
        <ConditionalButton
          w="100%"
          h="100%"
          onClick={onClick}
          isButton={!file.isDir && !selectModeContext.selectMode}
        >
          <Select
            w="100%"
            h="100%"
            select={selectedFileKeysContext.setSelectedFileKeys}
            value={file.key}
            isSelectMode={selectModeContext.selectMode && file.name !== "../"}
            minW={0}
            flexGrow={1}
          >
            {selectModeContext.selectMode && (
              <Icon
                as={
                  file.name === "../"
                    ? AiOutlineMinusCircle
                    : selectedFileKeysContext.selectedFileKeys.includes(
                        file.key
                      )
                    ? MdCheckCircle
                    : MdRadioButtonUnchecked
                }
                position="absolute"
                top={1}
                left={1}
                boxSize={6}
                zIndex={1}
              />
            )}
            {file.type === "image" ? (
              <Center
                bgColor="blackAlpha.700"
                w="100%"
                h="100%"
                position="absolute"
                top={0}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${file.key}`}
                  h="100%"
                  objectFit="contain"
                />
              </Center>
            ) : (
              <Center h="100%" bgColor="blackAlpha.500">
                <Icon as={icon} boxSize={"25%"} />
              </Center>
            )}
            <Center
              w="100%"
              h="auto"
              bgColor="blackAlpha.500"
              position="absolute"
              bottom={0}
            >
              <Center w="100%" bgColor="whiteAlpha.600" px={2}>
                <EllipsisText>{file.name}</EllipsisText>
              </Center>
            </Center>
          </Select>
        </ConditionalButton>
      </ConditionalLink>
      {!selectModeContext.selectMode && (
        <FileMenuModal
          file={file}
          position="absolute"
          top={0}
          right={0}
          display={file.name === "../" ? "none" : "block"}
        />
      )}
    </GridItem>
  );
}
