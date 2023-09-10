import { HStack } from "@chakra-ui/react";
import { ManagementFileMenuModal } from "./ManagementFileMenuModal";
import { SearchFileForm } from "./SearchFileForm";

type Props = {
  path: string;
  refetch: () => void;
};

export function ManagementFileBar({ path, refetch }: Props) {
  return (
    <HStack w="100%" mb={8}>
      <SearchFileForm />
      <ManagementFileMenuModal path={path} refetch={refetch} />
    </HStack>
  );
}
