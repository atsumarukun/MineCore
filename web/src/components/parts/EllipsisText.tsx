import { ThemingProps, Text, TextProps } from "@chakra-ui/react";

export function EllipsisText({ children, ...props }: TextProps & ThemingProps) {
  return (
    <Text
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      overflow="hidden"
      {...props}
    >
      {children}
    </Text>
  );
}
