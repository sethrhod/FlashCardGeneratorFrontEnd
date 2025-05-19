import { createContext, useContext } from "react";
import {SidebarState} from "./sidebarState";
import { Language } from "./apiClient";

export const SideBarContext = createContext<SidebarState | undefined>(undefined);

export function useSideBarContext() {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error("useSideBarContext must be used within a SideBarState");
  }
  return context;
}

export const LanguagesContext = createContext<Language[] | undefined>(undefined);

export function useLanguagesContext() {
  const context = useContext(LanguagesContext);
  if (context === undefined) {
    throw new Error("useLanguagesContext must be used within a LanguagesState");
  }
  return context;
}