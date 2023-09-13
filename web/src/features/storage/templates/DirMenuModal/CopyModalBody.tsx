import { ApolloError } from "@apollo/client";
import { Button, HStack, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DirList } from "../DirList";
import { useCopyFileMutation } from "@/gql/graphql";
import { useGetPath } from "../../hooks";
import { RefetchContext } from "@/providers/RefetchProvider";
import { SelectModeContext } from "@/providers/SelectModeProvider";
import { SelectedFileKeysContext } from "../../provides/SelectedFileKeysProvider";

type Props = {
  onClose: () => void;
};

export function CopyModalBody({ onClose }: Props) {
  const path = useGetPath();
  const refetchContext = useContext(RefetchContext);
  const selectModeContext = useContext(SelectModeContext);
  const selectedFileKeysContext = useContext(SelectedFileKeysContext);

  const [key, setKey] = useState(path);
  const [copy] = useCopyFileMutation({
    onCompleted() {
      refetchContext.fn?.refetch();
    },
  });
  const toast = useToast();

  const onCopy = async () => {
    try {
      await copy({
        variables: {
          input: selectedFileKeysContext.selectedFileKeys.map((v) => {
            return {
              key: v,
              destination: `${key}/${v.substring(v.lastIndexOf("/") + 1)}`,
            };
          }),
        },
      });
      toast({
        title: "コピーしました.",
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
      <DirList dirkey={key} setKey={setKey} onClose={onClose} />
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button onClick={onCopy}>ここにコピー</Button>
      </HStack>
    </>
  );
}
