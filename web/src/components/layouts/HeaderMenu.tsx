import {
  Button,
  Divider,
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
import Link from "next/link";
import { ButtonLink } from "../parts/ButtonLink";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { FaRegFolderOpen } from "react-icons/fa";
import { TbApps } from "react-icons/tb";
import { RiSettings3Line } from "react-icons/ri";

export function HeaderMenu() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [router.pathname]);

  return (
    <>
      <Button onClick={onOpen}>
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
          <DrawerBody px={6}>
            <VStack w="100%" my={4} spacing={4}>
              <ButtonLink href="/storage" w="100%" justifyContent="left">
                <Icon as={FaRegFolderOpen} boxSize={6} mr={6} />
                ストレージ
              </ButtonLink>
              <ButtonLink href="/service" w="100%" justifyContent="left">
                <Icon as={TbApps} boxSize={6} mr={6} />
                サービス
              </ButtonLink>
              <Divider />
              <ButtonLink href="#" w="100%" justifyContent="left">
                <Icon as={RiSettings3Line} boxSize={6} mr={6} />
                設定
              </ButtonLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
