import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/Button";
import { Drawer } from "./components/Drawer";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "blackAlpha.800",
        color: "white",
      },
      html: {
        height: "100%",
      },
    },
  },
  components: {
    Button,
    Drawer,
  },
});
