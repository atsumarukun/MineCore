import { ConditionalLink } from "@/components/parts/ConditionalLink";
import { EllipsisText } from "@/components/parts/EllipsisText";
import { GetFilesQuery } from "@/gql/graphql";
import { Center, Flex, GridItem, Icon } from "@chakra-ui/react";
import { FaFolder, FaFileAlt } from "react-icons/fa";
import { FileMenuModal } from "../templates/FileMenuModal";

type Props = {
  file: GetFilesQuery["files"][number];
};

export function FileTileViewItem({ file }: Props) {
  return (
    <GridItem bgColor="blackAlpha.500" aspectRatio={1 / 1} position="relative">
      <FileMenuModal file={file} position="absolute" right={0} />
      <ConditionalLink href={`/storage${file.key}`} isLink={file.isDir}>
        <Center h="100%">
          <Icon as={file.isDir ? FaFolder : FaFileAlt} boxSize={"25%"} />
        </Center>
        <Flex
          w="100%"
          justifyContent="center"
          bgColor="whiteAlpha.500"
          position="absolute"
          px={2}
          bottom={0}
        >
          <EllipsisText>{file.name}</EllipsisText>
        </Flex>
      </ConditionalLink>
    </GridItem>
  );
}
