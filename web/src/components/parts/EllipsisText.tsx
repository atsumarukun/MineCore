import { ThemingProps, Text, TextProps, LinkProps } from "@chakra-ui/react";

export function EllipsisText({
  children,
  ...props
}: TextProps & ThemingProps & LinkProps) {
  return (
    <Text
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      overflow="hidden"
      display="block"
      {...props}
    >
      {children}
    </Text>
  );
}
