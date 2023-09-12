import { HStack } from "@chakra-ui/react";
import { DirMenuModal } from "./DirMenuModal";
import { SearchFileForm } from "./SearchFileForm";
import { HandleViewButton } from "./HandleViewButton";

type Props = {
  refetch: () => void;
};

export function ManagementFileBar({ refetch }: Props) {
  return (
    <HStack w="100%">
      <SearchFileForm />
      <HStack spacing={0}>
        <HandleViewButton />
        <DirMenuModal refetch={refetch} />
      </HStack>
    </HStack>
  );
}
