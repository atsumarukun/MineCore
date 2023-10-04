import { Button, Icon, VStack } from "@chakra-ui/react";
import { Dispatch } from "react";
import { ModalStatus } from "./index";
import { VscDebugStart } from "react-icons/vsc";
import { LiaStopCircle } from "react-icons/lia";
import { MdRestartAlt, MdOutlineBuild } from "react-icons/md";
import { Status } from "@/gql/graphql";

type Props = {
  serviceStatus: string;
  setStatus: Dispatch<number>;
};

export function DefaultModalBody({ serviceStatus, setStatus }: Props) {
  return (
    <VStack w="100%">
      <Button
        w="100%"
        justifyContent="left"
        onClick={() => setStatus(ModalStatus.start)}
        isDisabled={serviceStatus === Status.Running}
      >
        <Icon as={VscDebugStart} boxSize={6} mr={6} />
        起動
      </Button>
      <Button
        w="100%"
        justifyContent="left"
        onClick={() => setStatus(ModalStatus.stop)}
        isDisabled={serviceStatus === Status.Exited}
      >
        <Icon as={LiaStopCircle} boxSize={6} mr={6} />
        停止
      </Button>
      <Button
        w="100%"
        justifyContent="left"
        onClick={() => setStatus(ModalStatus.restart)}
        isDisabled={serviceStatus === Status.Exited}
      >
        <Icon as={MdRestartAlt} boxSize={6} mr={6} />
        再起動
      </Button>
      <Button
        w="100%"
        justifyContent="left"
        onClick={() => setStatus(ModalStatus.rebuild)}
      >
        <Icon as={MdOutlineBuild} boxSize={6} mr={6} />
        再構築
      </Button>
    </VStack>
  );
}
