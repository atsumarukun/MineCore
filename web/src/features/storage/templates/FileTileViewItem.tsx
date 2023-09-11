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

type Props = {
  file: GetFilesQuery["files"][number];
  onClick: () => void;
  refetch: () => void;
};

export function FileTileViewItem({ file, onClick, refetch }: Props) {
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
      <FileMenuModal
        file={file}
        refetch={refetch}
        position="absolute"
        right={0}
        zIndex={1}
        display={file.name === "../" ? "none" : "block"}
      />
      <ConditionalLink href={`/storage${file.key}`} isLink={file.isDir}>
        <ConditionalButton onClick={onClick} isButton={!file.isDir}>
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
        </ConditionalButton>
      </ConditionalLink>
    </GridItem>
  );
}
