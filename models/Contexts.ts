import { createContext, useContext } from "react";
import { AvailableLanguagesState } from "./AvailableLanguagesState";
import { SidebarState } from "./sidebarState";

export const SideBarContext = createContext<SidebarState | undefined>(undefined);

export function useSideBarContext() {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error("useSideBarContext must be used within a SideBarState");
  }
  return context;
}

export const LanguagesContext = createContext<AvailableLanguagesState | undefined>(undefined);

export function useLanguagesContext() {
  const context = useContext(LanguagesContext);
  if (context === undefined) {
    throw new Error("useLanguagesContext must be used within a LanguagesState");
  }
  return context;
}