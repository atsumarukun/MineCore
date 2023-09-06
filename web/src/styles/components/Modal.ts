import { defineStyleConfig } from "@chakra-ui/react";

export const Modal = defineStyleConfig({
  baseStyle: {
    header: {
      backgroundColor: "blackAlpha.800",
    },
    body: {
      backgroundColor: "blackAlpha.800",
    },
    footer: {
      backgroundColor: "blackAlpha.800",
    },
    overlay: {
      backgroundColor: "whiteAlpha.300",
    },
    dialog: {
      rounded: 0,
    },
  },
});
