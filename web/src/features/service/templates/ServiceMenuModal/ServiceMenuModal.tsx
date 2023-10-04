import { EllipsisText } from "@/components/parts/EllipsisText";
import { GetServicesQuery } from "@/gql/graphql";
import {
  Button,
  ButtonProps,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ModalStatus } from "./index";
import { DefaultModalBody } from "./DefaultModalBody";
import { StartModalBody } from "./StartModalBody";
import { StopModalBody } from "./StopModalBody";
import { RestartModalBody } from "./RestartModalBody";
import { RebuildModalBody } from "./RebuildModalBody";

type Props = {
  service: GetServicesQuery["services"][number];
} & ButtonProps;

export function ServiceMenuModal({ service, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState(ModalStatus.default);

  useEffect(() => {
    setStatus(ModalStatus.default);
  }, [isOpen]);

  return (
    <>
      <Button {...props} onClick={onOpen}>
        <Icon as={BsThreeDotsVertical} boxSize={4} />
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <EllipsisText>{service.name}</EllipsisText>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {status === ModalStatus.default && (
              <DefaultModalBody
                setStatus={setStatus}
                serviceStatus={service.status}
              />
            )}
            {status === ModalStatus.start && (
              <StartModalBody path={service.path} onClose={onClose} />
            )}
            {status === ModalStatus.stop && (
              <StopModalBody path={service.path} onClose={onClose} />
            )}
            {status === ModalStatus.restart && (
              <RestartModalBody path={service.path} onClose={onClose} />
            )}
            {status === ModalStatus.rebuild && (
              <RebuildModalBody path={service.path} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
