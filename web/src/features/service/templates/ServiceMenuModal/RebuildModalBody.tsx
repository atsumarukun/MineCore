import { GetServicesDocument, useRebuildServiceMutation } from "@/gql/graphql";
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
      toast({
        title: "再構築しました.",
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
    refetchQueries: [GetServicesDocument],
  });

  const onRebuild = async () => {
    await rebuild();
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
