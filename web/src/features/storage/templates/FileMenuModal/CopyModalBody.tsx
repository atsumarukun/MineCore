import { ApolloError } from "@apollo/client";
import { Button, HStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { DirList } from "../DirList";
import { useCopyFileMutation } from "@/gql/graphql";
import { useGetPath } from "../../hooks";

type Props = {
  name: string;
  refetch: () => void;
  onClose: () => void;
};

export function CopyModalBody({ name, refetch, onClose }: Props) {
  const path = useGetPath();

  const [key, setKey] = useState(path);
  const [copy] = useCopyFileMutation({
    onCompleted() {
      refetch();
    },
  });
  const toast = useToast();

  const onCopy = async () => {
    try {
      await copy({
        variables: {
          key: `${path}/${name}`,
          destination: `${key}/${name}`,
        },
      });
      toast({
        title: "コピーしました.",
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
        <Button onClick={onCopy}>ここにコピー</Button>
      </HStack>
    </>
  );
}
