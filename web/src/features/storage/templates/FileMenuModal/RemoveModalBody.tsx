import { useRemoveFilesMutation } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";
import { Button, HStack, Text, useToast } from "@chakra-ui/react";

type Props = {
  filekey: string;
  refetch: () => void;
  onClose: () => void;
};

export function RemoveModalBody({ filekey, refetch, onClose }: Props) {
  const [remove] = useRemoveFilesMutation({
    variables: { keys: [filekey] },
    onCompleted() {
      refetch();
    },
  });
  const toast = useToast();

  const onRemove = async () => {
    try {
      await remove();
      toast({
        title: "削除しました.",
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
      <Text>ファイルを削除しますか？</Text>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button onClick={onRemove}>削除</Button>
        <Button onClick={onClose}>キャンセル</Button>
      </HStack>
    </>
  );
}
