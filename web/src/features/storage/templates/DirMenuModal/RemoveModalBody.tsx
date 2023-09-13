import { useRemoveFilesMutation } from "@/gql/graphql";
import { RefetchContext } from "@/providers/RefetchProvider";
import { ApolloError } from "@apollo/client";
import { Button, HStack, Text, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { SelectedFileKeysContext } from "../../provides/SelectedFileKeysProvider";
import { SelectModeContext } from "@/providers/SelectModeProvider";

type Props = {
  onClose: () => void;
};

export function RemoveModalBody({ onClose }: Props) {
  const refetchContext = useContext(RefetchContext);
  const selectModeContext = useContext(SelectModeContext);
  const selectedFileKeysContext = useContext(SelectedFileKeysContext);

  const [remove] = useRemoveFilesMutation({
    onCompleted() {
      refetchContext.fn?.refetch();
    },
  });
  const toast = useToast();

  const onRemove = async () => {
    try {
      await remove({
        variables: {
          keys: selectedFileKeysContext.selectedFileKeys,
        },
      });
      toast({
        title: "削除しました.",
        status: "success",
        duration: 5000,
      });
      selectModeContext.setSelectMode(false);
      selectedFileKeysContext.setSelectedFileKeys([]);
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
      <Text>選択したファイルを削除しますか？</Text>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button onClick={onRemove}>削除</Button>
        <Button onClick={onClose}>キャンセル</Button>
      </HStack>
    </>
  );
}
