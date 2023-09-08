import { useGetDirsQuery, useMoveFileMutation } from "@/gql/graphql";
import { ApolloError } from "@apollo/client";
import {
  Button,
  Center,
  HStack,
  Icon,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuFolderInput } from "react-icons/lu";

type Props = {
  path: string;
  name: string;
  refetch: () => void;
  onClose: () => void;
};

export function MoveModalBody({ path, name, refetch, onClose }: Props) {
  const [key, setKey] = useState(path);
  const { loading, error, data } = useGetDirsQuery({
    variables: { path: key },
  });
  const [move] = useMoveFileMutation({
    onCompleted() {
      refetch();
    },
  });
  const toast = useToast();

  const onClick = async () => {
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

  if (loading)
    return (
      <Center>
        <Spinner my={8} />
      </Center>
    );

  if (!data || error) {
    toast({
      title: "エラーが発生しました.",
      description: error?.message,
      status: "error",
      duration: 5000,
    });
    onClose();
  }

  return (
    <>
      {key !== "" && (
        <Button
          w="100%"
          justifyContent="left"
          onClick={() => setKey(key.substring(0, key.lastIndexOf("/")))}
        >
          <Icon as={LuFolderInput} boxSize={6} mr={6} />
          ../
        </Button>
      )}
      {data?.files.map((dir) => (
        <Button
          w="100%"
          justifyContent="left"
          key={dir.key}
          onClick={() => setKey(dir.key)}
        >
          <Icon as={LuFolderInput} boxSize={6} mr={6} />
          {dir.name}
        </Button>
      ))}
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button onClick={onClick}>ここに移動</Button>
      </HStack>
    </>
  );
}
