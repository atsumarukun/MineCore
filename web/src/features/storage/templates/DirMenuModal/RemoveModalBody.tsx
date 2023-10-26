import { GetFilesDocument, useRemoveFilesMutation } from "@/gql/graphql";
import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { SelectedFileKeysContext } from "../../provides/SelectedFileKeysProvider";

type Props = {
  onClose: () => void;
};

export function RemoveModalBody({ onClose }: Props) {
  const selectedFileKeysContext = useContext(SelectedFileKeysContext);
  const toast = useToast();

  const [remove] = useRemoveFilesMutation({
    variables: {
      keys: selectedFileKeysContext.selectedFileKeys,
    },
    onCompleted() {
      toast({
        title: "削除しました.",
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
    refetchQueries: [GetFilesDocument],
  });

  const onRemove = async () => {
    await remove();
  };

  return (
    <>
      <Text>選択したファイルを削除しますか？</Text>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button onClick={onRemove}>削除</Button>
        <Button onClick={onClose}>キャンセル</Button>
      </HStack>
    </>
  );
}
