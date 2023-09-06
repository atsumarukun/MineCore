import { ConditionalLink } from "@/components/parts/ConditionalLink";
import { GetFilesQuery } from "@/gql/graphql";
import { Center, GridItem, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
  file: GetFilesQuery["files"][number];
  icon: IconType;
};

export function FileTileViewItem({ file, icon }: Props) {
  return (
    <ConditionalLink href={file.name} isLink={file.isDir}>
      <GridItem bgColor="gray.100" aspectRatio={1 / 1} position="relative">
        <Center h="100%">
          <Icon as={icon} boxSize={"25%"} />
        </Center>
        <Text
          position="absolute"
          color="white"
          bgColor="blackAlpha.500"
          bottom="0"
          w="100%"
          textAlign="center"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          px="2"
        >
          {file.name}
        </Text>
      </GridItem>
    </ConditionalLink>
  );
}
