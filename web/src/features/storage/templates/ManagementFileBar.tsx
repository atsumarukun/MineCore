import { Button, HStack, Icon, Input } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { ManagementFileMenuModal } from "./ManagementFileMenuModal";

type Props = {
  path: string;
  refetch: () => void;
};

export function ManagementFileBar({ path, refetch }: Props) {
  return (
    <HStack w="100%">
      <HStack w="100%" spacing={0} py={4}>
        <Input
          placeholder="検索"
          rounded={0}
          roundedLeft={20}
          bgColor="blackAlpha.500"
          border="unset"
        />
        <Button bgColor="whiteAlpha.300" rounded={0} roundedRight={20} px={6}>
          <Icon as={BiSearch} boxSize={5} />
        </Button>
      </HStack>
      <ManagementFileMenuModal path={path} refetch={refetch} />
    </HStack>
  );
}
