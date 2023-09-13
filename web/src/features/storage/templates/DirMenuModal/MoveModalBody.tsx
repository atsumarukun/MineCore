import { useMoveFileMutation } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";
import { Button, HStack, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DirList } from "../DirList";
import { useGetPath } from "../../hooks";
import { RefetchContext } from "@/providers/RefetchProvider";
import { SelectedFileKeysContext } from "../../provides/SelectedFileKeysProvider";

type Props = {
  onClose: () => void;
};

export function MoveModalBody({ onClose }: Props) {
  const path = useGetPath();
  const refetchContext = useContext(RefetchContext);
  const selectedFileKeysContext = useContext(SelectedFileKeysContext);

  const [key, setKey] = useState(path);
  const [move] = useMoveFileMutation({
    onCompleted() {
      refetchContext.fn?.refetch();
    },
  });
  const toast = useToast();

  const onMove = async () => {
    try {
      await move({
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
        title: "移動しました.",
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
      <DirList dirkey={key} setKey={setKey} onClose={onClose} />
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button onClick={onMove}>ここに移動</Button>
      </HStack>
    </>
  );
}
