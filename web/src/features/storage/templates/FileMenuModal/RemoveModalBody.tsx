import { Button, HStack, Text } from "@chakra-ui/react";

type Props = {
  onClose: () => void;
};

export function RemoveModalBody({ onClose }: Props) {
  return (
    <>
      <Text>ファイルを削除しますか？</Text>
      <HStack w="100%" justifyContent="right" mt={8}>
        <Button>削除</Button>
        <Button onClick={onClose}>キャンセル</Button>
      </HStack>
    </>
  );
}
