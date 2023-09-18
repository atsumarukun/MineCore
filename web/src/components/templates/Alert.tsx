import { ApolloError } from "@apollo/client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  HStack,
  Icon,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IconType } from "react-icons";

type Props = {
  title: string;
  icon: IconType;
  onClick: () => void;
} & ButtonProps;

export function Alert({ title, icon, onClick, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();

  const handleClick = () => {
    try {
      onClick();
      toast({
        title: `${title}しました.`,
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
      <Button onClick={onOpen} {...props}>
        <Icon as={icon} boxSize={6} />
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent mx="5">
          <AlertDialogHeader>確認</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody whiteSpace="pre-wrap">
            <Text>{title}しますか？</Text>
            <HStack w="100%" justifyContent="right" mt={8}>
              <Button onClick={handleClick}>実行</Button>
              <Button onClick={onClose}>キャンセル</Button>
            </HStack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
