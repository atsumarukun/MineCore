import { Button, ButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
} & ButtonProps;

export function ButtonLink({ href, children, ...props }: Props) {
  return (
    <Button
      as={Link}
      href={href}
      variant="ghost"
      h="fit-content"
      px={0}
      {...props}
    >
      {children}
    </Button>
  );
}
