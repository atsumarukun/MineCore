import { ApolloError } from "@apollo/client";
import { Button, HStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { DirList } from "../DirList";
import { GetFilesDocument, useCopyFileMutation } from "@/gql/graphql";
import { useGetPath } from "../../hooks";

type Props = {
  name: string;
  onClose: () => void;
};

export function CopyModalBody({ name, onClose }: Props) {
  const path = useGetPath();

  const [key, setKey] = useState(path);
  const [copy] = useCopyFileMutation({
    onCompleted() {
      onClose();
    },
    refetchQueries: [GetFilesDocument],
  });
  const toast = useToast();

  const onCopy = async () => {
    try {
      await copy({
        variables: {
          input: [
            {
              key: `${path}/${name}`,
              destination: `${key}/${name}`,
            },
          ],
        },
      });
      toast({
        title: "コピーしました.",
        status: "success",
        duration: 5000,
      });
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
