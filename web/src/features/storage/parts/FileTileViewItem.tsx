import { ConditionalLink } from "@/components/parts/ConditionalLink";
import { EllipsisText } from "@/components/parts/EllipsisText";
import { GetFilesQuery } from "@/gql/graphql";
import { Center, Flex, GridItem, Icon } from "@chakra-ui/react";
import { FaFolder, FaFileAlt } from "react-icons/fa";

type Props = {
  file: GetFilesQuery["files"][number];
};

export function FileTileViewItem({ file }: Props) {
  return (
    <ConditionalLink href={`/storage${file.key}`} isLink={file.isDir}>
      <GridItem bgColor="gray.100" aspectRatio={1 / 1} position="relative">
        <Center h="100%">
          <Icon as={file.isDir ? FaFolder : FaFileAlt} boxSize={"25%"} />
        </Center>
        <Flex
          w="100%"
          justifyContent="center"
          bgColor="blackAlpha.500"
          position="absolute"
          px={2}
          bottom="0"
        >
          <EllipsisText color="white">{file.name}</EllipsisText>
        </Flex>
      </GridItem>
    </ConditionalLink>
  );
}
