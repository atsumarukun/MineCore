import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { FaRegFolderOpen } from "react-icons/fa";
import Link from "next/link";
import { ButtonLink } from "../parts/ButtonLink";

export function HeaderMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        <Icon as={FiMenu} boxSize={6} />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader p={2}>
            <Button variant="ghost" onClick={onClose}>
              <Icon as={FiMenu} boxSize={6} />
            </Button>
            <Text as={Link} href="/" fontSize={18} fontWeight="normal" ml={2}>
              MineCore
            </Text>
          </DrawerHeader>
          <DrawerBody p={2}>
            <VStack w="100%">
              <ButtonLink href="/storage" w="100%" justifyContent="left">
                <Icon as={FaRegFolderOpen} boxSize={6} mr={6} />
                ストレージ
              </ButtonLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
