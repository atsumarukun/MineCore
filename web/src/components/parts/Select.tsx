import { Box, ButtonProps } from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  value: string;
  select: Dispatch<SetStateAction<string[]>>;
  isSelectMode: boolean;
  children: ReactNode;
} & ButtonProps;

export function Select({
  select,
  value,
  isSelectMode,
  children,
  ...props
}: Props) {
  return (
    <>
      {isSelectMode ? (
        <Box
          as="button"
          onClick={() =>
            select((values) =>
              values.includes(value)
                ? values.filter((v) => v !== value)
                : [...values, value]
            )
          }
          {...props}
        >
          {children}
        </Box>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
