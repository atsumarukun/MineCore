import { defineStyleConfig } from "@chakra-ui/react";

export const Modal = defineStyleConfig({
  baseStyle: {
    header: {
      bgColor: "#333333",
    },
    body: {
      bgColor: "#333333",
    },
    footer: {
      bgColor: "#333333",
    },
    dialog: {
      rounded: 0,
      mx: 4,
    },
  },
});
