import { GetServicesQuery } from "@/gql/graphql";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ServiceListViewItem } from "./ServiceListViewItem";

type Props = {
  services: GetServicesQuery["services"];
};

export function ServiceListViews({ services }: Props) {
  return (
    <>
      <VStack spacing={0} my={8}>
        <HStack w="100%" borderBottom="1px" borderColor="whiteAlpha.500">
          <Text
            textAlign="left"
            w={{ base: "calc(45% - 24px)", md: "calc(30% - 12px)" }}
          >
            サービス名
          </Text>
          <HStack>
            <Text textAlign="left">ステータス</Text>
            <Text
              textAlign="left"
              ml={24}
              display={{ base: "none", xl: "block" }}
            >
              サービスパス
            </Text>
          </HStack>
          <Box boxSize={8} ml={8} />
        </HStack>
        {services.map((service) => (
          <ServiceListViewItem service={service} key={service.path} />
        ))}
      </VStack>
    </>
  );
}
