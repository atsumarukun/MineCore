import { useGetDirsQuery } from "@/gql/graphql";
import { Button, Center, Icon, Spinner, useToast } from "@chakra-ui/react";
import { Dispatch } from "react";
import { LuFolderInput } from "react-icons/lu";

type Props = {
  dirkey: string;
  setKey: Dispatch<string>;
  onClose: () => void;
};

export function DirList({ dirkey, setKey, onClose }: Props) {
  const { loading, error, data } = useGetDirsQuery({
    variables: { path: dirkey },
  });
  const toast = useToast();

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
      {dirkey !== "" && (
        <Button
          w="100%"
          justifyContent="left"
          onClick={() => setKey(dirkey.substring(0, dirkey.lastIndexOf("/")))}
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
    </>
  );
}
