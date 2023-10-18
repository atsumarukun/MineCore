import { useRebuildServiceMutation } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";
import { Button, HStack, Text, useToast } from "@chakra-ui/react";

type Props = {
  path: string;
  onClose: () => void;
};

export function RebuildModalBody({ path, onClose }: Props) {
  const toast = useToast();

  const [rebuild] = useRebuildServiceMutation({
    variables: {
      path: path,
    },
    onCompleted() {
      onClose();
    },
    refetchQueries: ["GetServices"],
  });

  const onRebuild = async () => {
    try {
      await rebuild();
      toast({
        title: "再構築しました.",
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
      <Text>再構築しますか？</Text>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button onClick={onRebuild}>再構築</Button>
        <Button onClick={onClose}>キャンセル</Button>
      </HStack>
    </>
  );
}
