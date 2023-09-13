import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type SelectedFileKeysContextProps = {
  selectedFileKeys: string[];
  setSelectedFileKeys: Dispatch<SetStateAction<string[]>>;
};

export const SelectedFileKeysContext =
  createContext<SelectedFileKeysContextProps>({
    selectedFileKeys: [],
    setSelectedFileKeys: () => [],
  });

type Props = {
  children: ReactNode;
};

export function SelectedFileKeysProvider({ children }: Props) {
  const [selectedFileKeys, setSelectedFileKeys] = useState<string[]>([]);

  return (
    <SelectedFileKeysContext.Provider
      value={{ selectedFileKeys, setSelectedFileKeys }}
    >
      {children}
    </SelectedFileKeysContext.Provider>
  );
}
