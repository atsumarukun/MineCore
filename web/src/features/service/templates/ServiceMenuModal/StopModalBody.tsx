import { useStopServiceMutation } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";
import { Button, HStack, Text, useToast } from "@chakra-ui/react";

type Props = {
  path: string;
  onClose: () => void;
};

export function StopModalBody({ path, onClose }: Props) {
  const toast = useToast();

  const [stop] = useStopServiceMutation({
    variables: {
      path: path,
    },
    onCompleted() {
      onClose();
    },
    refetchQueries: ["GetServices"],
  });

  const onStop = async () => {
    try {
      await stop();
      toast({
        title: "停止しました.",
        status: "success",
        duration: 5000,
      });
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
      <Text>停止しますか？</Text>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button onClick={onStop}>停止</Button>
        <Button onClick={onClose}>キャンセル</Button>
      </HStack>
    </>
  );
}
