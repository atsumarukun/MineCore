import { Text, TextProps } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  isLink: boolean;
  children: ReactNode;
} & TextProps;

export function ConditionalLink({ href, isLink, children, ...props }: Props) {
  return (
    <>
      {isLink ? (
        <Text as={Link} href={href} {...props}>
          {children}
        </Text>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
