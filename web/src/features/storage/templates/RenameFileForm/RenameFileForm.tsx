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
import { GetFilesDocument, useMoveFileMutation } from "@/gql/graphql";
import { useGetPath } from "../../hooks";

type Props = {
  name: string;
  onClose: () => void;
};

export function RenameFileForm({ name, onClose }: Props) {
  const path = useGetPath();

  const [rename] = useMoveFileMutation({
    onCompleted() {
      toast({
        title: "更新しました.",
        status: "success",
        duration: 5000,
      });
      onClose();
    },
    onError(e) {
      toast({
        title: "エラーが発生しました.",
        description: e.message,
        status: "error",
        duration: 5000,
      });
    },
    refetchQueries: [GetFilesDocument],
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
    await rename({
      variables: {
        input: [
          {
            key: `${path}/${name}`,
            destination: `${path}/${data.name}${
              name.includes(".") ? name.substring(name.lastIndexOf(".")) : ""
            }`,
          },
        ],
      },
    });
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
