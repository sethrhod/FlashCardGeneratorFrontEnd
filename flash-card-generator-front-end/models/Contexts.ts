import { createContext, useContext } from "react";
import {SidebarState} from "./sidebarState";

export const SideBarContext = createContext<SidebarState | undefined>(undefined);

export function useSideBarContext() {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error("useSideBarContext must be used within a SideBarState");
  }
  return context;
}