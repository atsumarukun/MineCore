import { Button, Circle, Icon, Text, VStack, useToast } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import { MdFileUpload } from "react-icons/md";
import { useGetPath, useUpload } from "../../hooks";
import { ApolloError } from "@apollo/client";
import { useDropzone } from "react-dropzone";
import { RefetchContext } from "@/providers/RefetchProvider";

type Props = {
  onClose: () => void;
};

export function UploadModalBody({ onClose }: Props) {
  const path = useGetPath();
  const toast = useToast();
  const refetchContext = useContext(RefetchContext);

  const upload = useUpload();

  const onDrop = useCallback(
    async (files: File[]) => {
      try {
        await upload({
          files: files,
          onCompleted() {
            refetchContext.fn?.refetch();
          },
        });
        toast({
          title: "アップロードしました.",
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
    },
    [path]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <VStack spacing={6} py={16} {...getRootProps()}>
      <input {...getInputProps()} />
      <Circle bgColor="blackAlpha.500" p={8}>
        <Icon as={MdFileUpload} boxSize={16} color="whiteAlpha.700" />
      </Circle>
      <VStack>
        <Text>アップロードするファイルをドラッグ＆ドロップ</Text>
        <Text fontSize="sm" color="whiteAlpha.700">
          または下記ボタンから追加
        </Text>
      </VStack>
      <Button bgColor="blackAlpha.500">ファイルを選択</Button>
    </VStack>
  );
}
