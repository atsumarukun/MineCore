import { useStartServiceMutation } from "@/gql/graphql";
import { RefetchContext } from "@/providers/RefetchProvider";
import { ApolloError } from "@apollo/client";
import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import { useContext } from "react";

type Props = {
  path: string;
  onClose: () => void;
};

export function StartModalBody({ path, onClose }: Props) {
  const refetchContext = useContext(RefetchContext);
  const toast = useToast();

  const [start] = useStartServiceMutation({
    variables: {
      path: path,
    },
    onCompleted() {
      refetchContext.fn?.refetch();
    },
  });

  const onStart = async () => {
    try {
      await start();
      toast({
        title: "起動しました.",
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
      <Text>起動しますか？</Text>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button onClick={onStart}>起動</Button>
        <Button onClick={onClose}>キャンセル</Button>
      </HStack>
    </>
  );
}
