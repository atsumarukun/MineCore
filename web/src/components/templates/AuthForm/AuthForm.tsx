import { SubmitHandler, useForm } from "react-hook-form";
import { AuthFormSchema, authFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAuthMutation } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

type Props = {
  onClose: () => void;
};

export function AuthForm({ onClose }: Props) {
  const [auth] = useAuthMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormSchema>({
    resolver: zodResolver(authFormSchema),
  });
  const toast = useToast();
  const router = useRouter();

  const onAuth: SubmitHandler<AuthFormSchema> = async (data) => {
    try {
      const res = await auth({
        variables: {
          password: data.password,
        },
      });
      if (!res.data?.auth) throw new Error("Token does not exist.");
      setCookie(null, "token", res.data.auth, {
        maxAge: 60 * 60,
        path: "/",
      });
      onClose();
      router.reload();
    } catch (e) {
      if (e instanceof ApolloError || e instanceof Error) {
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
    <form onSubmit={handleSubmit(onAuth)}>
      <FormControl>
        <FormLabel>パスワード</FormLabel>
        {errors.password && (
          <Text color="red.500">{errors.password.message}</Text>
        )}
        <Input {...register("password")} type="password" />
      </FormControl>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button type="submit">認証</Button>
      </HStack>
    </form>
  );
}
