import { Button, HStack, Icon, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { SearchFileFormSchema, searchFileFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function SearchFileForm() {
  const { register } = useForm<SearchFileFormSchema>({
    resolver: zodResolver(searchFileFormSchema),
  });

  return (
    <form style={{ width: "100%" }}>
      <HStack w="100%" spacing={0}>
        <Input
          placeholder="検索"
          rounded={0}
          roundedLeft={20}
          bgColor="blackAlpha.500"
          border="unset"
          {...register("name")}
        />
        <Button
          bgColor="whiteAlpha.300"
          rounded={0}
          roundedRight={20}
          px={6}
          type="submit"
        >
          <Icon as={BiSearch} boxSize={5} />
        </Button>
      </HStack>
    </form>
  );
}
