import { HStack } from "@chakra-ui/react";
import { DirMenuModal } from "./DirMenuModal";
import { SearchFileForm } from "./SearchFileForm";
import { HandleViewButton } from "./HandleViewButton";

export function ManagementFileBar() {
  return (
    <HStack w="100%">
      <SearchFileForm />
      <HStack spacing={0}>
        <HandleViewButton />
        <DirMenuModal />
      </HStack>
    </HStack>
  );
}
