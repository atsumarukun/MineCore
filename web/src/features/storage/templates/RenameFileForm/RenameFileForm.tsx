import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RenameFileFormSchema, renameFileFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMoveFileMutation } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";
import { useGetPath } from "../../hooks";
import { useContext } from "react";
import { RefetchContext } from "@/providers/RefetchProvider";

type Props = {
  name: string;
  onClose: () => void;
};

export function RenameFileForm({ name, onClose }: Props) {
  const path = useGetPath();
  const refetchContext = useContext(RefetchContext);

  const [rename] = useMoveFileMutation({
    onCompleted() {
      refetchContext.fn?.refetch();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RenameFileFormSchema>({
    resolver: zodResolver(renameFileFormSchema),
  });
  const toast = useToast();

  const onRename: SubmitHandler<RenameFileFormSchema> = async (data) => {
    try {
      await rename({
        variables: {
          key: `${path}/${name}`,
          destination: `${path}/${data.name}${
            name.includes(".") ? name.substring(name.lastIndexOf(".")) : ""
          }`,
        },
      });
      toast({
        title: "更新しました.",
        status: "success",
        duration: 5000,
      });
      onClose();
    } catch (e) {
      if (e instanceof ApolloError) {
        toast({
          title: "エラーが発生しました.",
          description: e.message,
          status: "error",
          duration: 5000,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onRename)}>
      <FormControl>
        <FormLabel>ファイル名</FormLabel>
        {errors.name && <Text color="red.500">{errors.name.message}</Text>}
        <Input
          defaultValue={
            name.includes(".") ? name.substring(0, name.lastIndexOf(".")) : name
          }
          {...register("name")}
        />
      </FormControl>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button type="submit">更新</Button>
      </HStack>
    </form>
  );
}
