import {
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { SearchFileFormSchema, searchFileFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function SearchFileForm() {
  const router = useRouter();
  const { register, setValue, handleSubmit } = useForm<SearchFileFormSchema>({
    resolver: zodResolver(searchFileFormSchema),
  });

  const onSubmit: SubmitHandler<SearchFileFormSchema> = (data) => {
    if (data.name) {
      router.push({
        query: {
          ...router.query,
          name: data.name,
        },
      });
    } else {
      delete router.query.name;
      router.push({
        query: {
          ...router.query,
        },
      });
    }
  };

  useEffect(() => {
    setValue(
      "name",
      typeof router.query.name === "string" ? router.query.name : ""
    );
  }, [router.query]);

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
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
            autoComplete="off"
            {...register("name")}
          />
        </InputGroup>
      </HStack>
    </form>
  );
}
