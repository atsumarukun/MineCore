import { GetServicesDocument, useStartServiceMutation } from "@/gql/graphql";
import { Button, HStack, Text, useToast } from "@chakra-ui/react";

type Props = {
  path: string;
  onClose: () => void;
};

export function StartModalBody({ path, onClose }: Props) {
  const toast = useToast();

  const [start] = useStartServiceMutation({
    variables: {
      path: path,
    },
    onCompleted() {
      toast({
        title: "起動しました.",
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

  const onStart = async () => {
    await start();
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
