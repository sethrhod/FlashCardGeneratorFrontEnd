import { createContext, useContext } from "react";
import { SidebarState } from "./SidebarState";
import { Language } from "../lib/apiClient";
import { DecksState } from "./DecksState";
import { AvailableLanguagesState } from "./AvailableLanguagesState";

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

export const DecksContext = createContext<DecksState | undefined>(undefined);

export function useDecksContext() {
  const context = useContext(DecksContext);
  if (context === undefined) {
    throw new Error("useDecksContext must be used within a DecksState");
  }
  return context;
}