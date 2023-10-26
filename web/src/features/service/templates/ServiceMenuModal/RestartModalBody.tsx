import { GetServicesDocument, useRestartServiceMutation } from "@/gql/graphql";
import { Button, HStack, Text, useToast } from "@chakra-ui/react";

type Props = {
  path: string;
  onClose: () => void;
};

export function RestartModalBody({ path, onClose }: Props) {
  const toast = useToast();

  const [restart] = useRestartServiceMutation({
    variables: {
      path: path,
    },
    onCompleted() {
      toast({
        title: "再起動しました.",
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

  const onRestart = async () => {
    await restart();
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
