import {
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
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
        <InputGroup>
          <InputLeftElement pl={4} color="whiteAlpha.300">
            <Icon as={BiSearch} boxSize={5} />
          </InputLeftElement>
          <Input
            rounded={20}
            pl={12}
            bgColor="blackAlpha.500"
            border="unset"
            {...register("name")}
          />
        </InputGroup>
      </HStack>
    </form>
  );
}
