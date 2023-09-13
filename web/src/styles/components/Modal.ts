import { defineStyleConfig } from "@chakra-ui/react";
import { BG_COLOR } from "../constants";

export const Modal = defineStyleConfig({
  baseStyle: {
    header: {
      bgColor: BG_COLOR,
    },
    body: {
      bgColor: BG_COLOR,
    },
    footer: {
      bgColor: BG_COLOR,
    },
    dialog: {
      rounded: 0,
      mx: 4,
    },
  },
});
