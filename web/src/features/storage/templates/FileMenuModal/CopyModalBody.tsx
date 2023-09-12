import { ApolloError } from "@apollo/client";
import { Button, HStack, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DirList } from "../DirList";
import { useCopyFileMutation } from "@/gql/graphql";
import { useGetPath } from "../../hooks";
import { RefetchContext } from "@/providers/RefetchProvider";

type Props = {
  name: string;
  onClose: () => void;
};

export function CopyModalBody({ name, onClose }: Props) {
  const path = useGetPath();
  const refetchContext = useContext(RefetchContext);

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
