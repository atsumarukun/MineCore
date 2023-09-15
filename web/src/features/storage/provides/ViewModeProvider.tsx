import { parseCookies, setCookie } from "nookies";
import { Dispatch, ReactNode, createContext, useEffect, useState } from "react";

export const ViewMode = {
  tile: 0,
  list: 1,
};

type ViewModeContextProps = {
  viewMode: number;
  setViewMode: Dispatch<number>;
};

export const ViewModeContext = createContext<ViewModeContextProps>({
  viewMode: ViewMode.tile,
  setViewMode: () => ViewMode.tile,
});

type Props = {
  children: ReactNode;
};

export function ViewModeProvider({ children }: Props) {
  const [viewMode, setViewMode] = useState(
    Object.keys(ViewMode).indexOf(parseCookies().viewMode) ?? ViewMode.tile
  );

  useEffect(() => {
    setCookie(null, "viewMode", viewMode === ViewMode.tile ? "tile" : "list");
  }, [viewMode]);

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}
