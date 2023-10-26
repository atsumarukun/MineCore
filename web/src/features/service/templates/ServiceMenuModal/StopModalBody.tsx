import { GetServicesDocument, useStopServiceMutation } from "@/gql/graphql";
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
      toast({
        title: "停止しました.",
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

  const onStop = async () => {
    await stop();
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
