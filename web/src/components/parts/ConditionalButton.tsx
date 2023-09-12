import { Box, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  isButton: boolean;
  children: ReactNode;
} & ButtonProps;

export function ConditionalButton({ isButton, children, ...props }: Props) {
  return (
    <>
      {isButton ? (
        <Box as="button" {...props}>
          {children}
        </Box>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
