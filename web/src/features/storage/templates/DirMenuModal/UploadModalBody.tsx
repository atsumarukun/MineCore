import { Button, Circle, Icon, Text, VStack, useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { MdFileUpload } from "react-icons/md";
import { useGetPath, useUpload } from "../../hooks";
import { useDropzone } from "react-dropzone";
import { GetFilesDocument } from "@/gql/graphql";

type Props = {
  onClose: () => void;
};

export function UploadModalBody({ onClose }: Props) {
  const path = useGetPath();
  const toast = useToast();

  const upload = useUpload({
    onCompleted() {
      toast({
        title: "アップロードしました.",
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

  const onDrop = useCallback(
    async (files: File[]) => {
      await upload({
        variables: {
          key: path,
          files: files,
        },
      });
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
