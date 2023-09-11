import { HStack } from "@chakra-ui/react";
import { ManagementFileMenuModal } from "./ManagementFileMenuModal";
import { SearchFileForm } from "./SearchFileForm";

type Props = {
  refetch: () => void;
};

export function ManagementFileBar({ refetch }: Props) {
  return (
    <HStack w="100%">
      <SearchFileForm />
      <ManagementFileMenuModal refetch={refetch} />
    </HStack>
  );
}
