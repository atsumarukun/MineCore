import { EllipsisText } from "@/components/parts/EllipsisText";
import { GetServicesQuery, Status } from "@/gql/graphql";
import {
  BackgroundProps,
  Button,
  Circle,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

type Props = {
  service: GetServicesQuery["services"][number];
};

export function ServiceListViewItem({ service }: Props) {
  let color: BackgroundProps["backgroundColor"];
  switch (service.status) {
    case Status.Running:
      color = "green.300";
      break;
    case Status.Exited:
      color = "red.300";
      break;
    case Status.Partial:
      color = "yellow.300";
      break;
  }

  return (
    <HStack w="100%" borderBottom="1px" borderColor="whiteAlpha.500">
      <HStack w="100%" p={4}>
        <EllipsisText w={{ base: "45%", md: "30%" }}>
          {service.name}
        </EllipsisText>
        <HStack>
          <Circle bgColor={color} p={1} />
          <Text fontSize="sm">{service.status}</Text>
          <Text
            textAlign="left"
            ml={24}
            display={{ base: "none", xl: "block" }}
          >
            {service.path}
          </Text>
        </HStack>
      </HStack>
      <Button ml="auto">
        <Icon as={BsThreeDotsVertical} boxSize={4} />
      </Button>
    </HStack>
  );
}
