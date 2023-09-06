import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  isLink: boolean;
  children: ReactNode;
};

export function ConditionalLink({ href, isLink, children }: Props) {
  return <>{isLink ? <Link href={href}>{children}</Link> : <>{children}</>}</>;
}
