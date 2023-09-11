import { HStack } from "@chakra-ui/react";
import { DirMenuModal } from "./DirMenuModal";
import { SearchFileForm } from "./SearchFileForm";

type Props = {
  refetch: () => void;
};

export function ManagementFileBar({ refetch }: Props) {
  return (
    <HStack w="100%">
      <SearchFileForm />
      <DirMenuModal refetch={refetch} />
    </HStack>
  );
}
