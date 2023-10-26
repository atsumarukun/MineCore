import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MakeDirFormSchema, makeDirFormSchema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetFilesDocument, useMakeDirMutation } from "@/gql/graphql";
import { useGetPath } from "../../hooks";

type Props = {
  onClose: () => void;
};

export function MakeDirForm({ onClose }: Props) {
  const path = useGetPath();
  const toast = useToast();

  const [make] = useMakeDirMutation({
    onCompleted() {
      toast({
        title: "作成しました.",
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
  } = useForm<MakeDirFormSchema>({
    resolver: zodResolver(makeDirFormSchema),
  });

  const onMake: SubmitHandler<MakeDirFormSchema> = async (data) => {
    await make({
      variables: {
        key: `${path}/${data.name}`,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onMake)}>
      <FormControl>
        <FormLabel> ディレクトリ名</FormLabel>
        {errors.name && <Text color="red.500">{errors.name.message}</Text>}
        <Input {...register("name")} />
      </FormControl>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button type="submit">作成</Button>
      </HStack>
    </form>
  );
}
