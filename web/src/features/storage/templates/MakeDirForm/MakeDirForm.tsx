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
import { useMakeDirMutation } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";
import { useGetPath } from "../../hooks";
import { useContext } from "react";
import { RefetchContext } from "@/providers/RefetchProvider";
type Props = {
  onClose: () => void;
};

export function MakeDirForm({ onClose }: Props) {
  const path = useGetPath();
  const toast = useToast();
  const refetchContext = useContext(RefetchContext);

  const [make] = useMakeDirMutation({
    onCompleted() {
      refetchContext.fn?.refetch();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MakeDirFormSchema>({
    resolver: zodResolver(makeDirFormSchema),
  });

  const onMake: SubmitHandler<MakeDirFormSchema> = async (data) => {
    try {
      await make({
        variables: {
          key: `${path}/${data.name}`,
        },
      });
      toast({
        title: "作成しました.",
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
    <form onSubmit={handleSubmit(onMake)}>
      <FormControl>
        <FormLabel>フォルダ名</FormLabel>
        {errors.name && <Text color="red.500">{errors.name.message}</Text>}
        <Input {...register("name")} />
      </FormControl>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button type="submit">作成</Button>
      </HStack>
    </form>
  );
}
