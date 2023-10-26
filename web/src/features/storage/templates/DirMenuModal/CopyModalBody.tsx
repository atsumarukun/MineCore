import { Button, HStack, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DirList } from "../DirList";
import { GetFilesDocument, useCopyFileMutation } from "@/gql/graphql";
import { useGetPath } from "../../hooks";
import { SelectedFileKeysContext } from "../../provides/SelectedFileKeysProvider";

type Props = {
  onClose: () => void;
};

export function CopyModalBody({ onClose }: Props) {
  const path = useGetPath();
  const selectedFileKeysContext = useContext(SelectedFileKeysContext);
  const toast = useToast();

  const [key, setKey] = useState(path);
  const [copy] = useCopyFileMutation({
    variables: {
      input: selectedFileKeysContext.selectedFileKeys.map((v) => {
        return {
          key: v,
          destination: `${key}/${v.substring(v.lastIndexOf("/") + 1)}`,
        };
      }),
    },
    onCompleted() {
      toast({
        title: "コピーしました.",
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

  const onCopy = async () => {
    await copy();
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
