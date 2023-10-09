import { useRestartServiceMutation } from "@/gql/graphql";
import { RefetchContext } from "@/providers/RefetchProvider";
import { ApolloError } from "@apollo/client";
import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import { useContext } from "react";

type Props = {
  path: string;
  onClose: () => void;
};

export function RestartModalBody({ path, onClose }: Props) {
  const refetchContext = useContext(RefetchContext);
  const toast = useToast();

  const [restart] = useRestartServiceMutation({
    variables: {
      path: path,
    },
    onCompleted() {
      refetchContext.fn?.refetch();
    },
  });

  const onRestart = async () => {
    try {
      await restart();
      toast({
        title: "再起動しました.",
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
    <>
      <Text>再起動しますか？</Text>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button onClick={onRestart}>再起動</Button>
        <Button onClick={onClose}>キャンセル</Button>
      </HStack>
    </>
  );
}
