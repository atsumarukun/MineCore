import { Dispatch, ReactNode, createContext, useState } from "react";

type SelectModeContextProps = {
  selectMode: boolean;
  setSelectMode: Dispatch<boolean>;
};

export const SelectModeContext = createContext<SelectModeContextProps>({
  selectMode: false,
  setSelectMode: () => false,
});

type Props = {
  children: ReactNode;
};

export function SelectModeProvider({ children }: Props) {
  const [selectMode, setSelectMode] = useState(false);

  return (
    <SelectModeContext.Provider value={{ selectMode, setSelectMode }}>
      {children}
    </SelectModeContext.Provider>
  );
}
