import { ObservableQuery } from "@apollo/client";
import { Dispatch, ReactNode, createContext, useState } from "react";

type RefetchContextProps = {
  fn: { refetch: ObservableQuery["refetch"] } | undefined;
  setFn: Dispatch<{ refetch: ObservableQuery["refetch"] } | undefined>;
};

export const RefetchContext = createContext<RefetchContextProps>({
  fn: undefined,
  setFn: () => undefined,
});

type Props = {
  children: ReactNode;
};

export function RefetchProvider({ children }: Props) {
  const [fn, setFn] = useState<
    { refetch: ObservableQuery["refetch"] } | undefined
  >(undefined);

  return (
    <RefetchContext.Provider value={{ fn, setFn }}>
      {children}
    </RefetchContext.Provider>
  );
}
