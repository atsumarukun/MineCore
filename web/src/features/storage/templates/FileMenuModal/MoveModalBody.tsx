import { useMoveFileMutation } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";
import { Button, HStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { DirList } from "../DirList";
import { useGetPath } from "../../hooks";

type Props = {
  name: string;
  refetch: () => void;
  onClose: () => void;
};

export function MoveModalBody({ name, refetch, onClose }: Props) {
  const path = useGetPath();

  const [key, setKey] = useState(path);
  const [move] = useMoveFileMutation({
    onCompleted() {
      refetch();
    },
  });
  const toast = useToast();

  const onMove = async () => {
    try {
      await move({
        variables: {
          key: `${path}/${name}`,
          destination: `${key}/${name}`,
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
