'use client';
import { useEffect, useState } from "react";
import { SideBarContext, LanguagesContext } from "@/models/Contexts";
import Sidebar from "@/components/sidebar";
import { SidebarState } from "@/models/sidebarState";
import FilterOptions from "@/models/filterOptions";
import DeckOptions from "@/models/deckOptions";
import useDeckStore from "@/models/store";
import { Language, IDeck, Deck } from "@/models/apiClient";

export default function ClientRootLayout({
  children,
  decks,
  availableLanguages,
}: {
  children: React.ReactNode;
  decks: Deck[];
  availableLanguages: Language[];
}) {
  const { setDecks } = useDeckStore();

  useEffect(() => {
    setDecks(decks);
  }, [decks]);

  const [sidebarState, setSidebarState] = useState<SidebarState>({
    filterOptions: new FilterOptions(),
    setFilterOptions: () => {},
    filterOptionsVisible: false,
    setFilterOptionsVisible: () => {},
    deckOptions: new DeckOptions(),
    setDeckOptions: () => {},
    deckOptionsVisible: false,
    setDeckOptionsVisible: () => {},
  });

  return (
    <SideBarContext.Provider value={{
      ...sidebarState,
      setFilterOptions: (opts: FilterOptions) => {
        setSidebarState((prevState) => ({
          ...prevState,
          filterOptions: opts,
        }));
      },
      setDeckOptions: (opts: DeckOptions) => {
        setSidebarState((prevState) => ({
          ...prevState,
          deckOptions: opts,
        }));
      },
    }}>
      <LanguagesContext.Provider value={availableLanguages}>
        <Sidebar />
        <main className="flex flex-col w-full min-h-screen bg-gray-900">
          <header id="header" className="flex w-full items-center bg-gray-800 shadow-md p-4 border-l-4 border-l-gray-900">
            <h1 className="text-2xl font-bold">Current Route</h1>
          </header>
          {children}
        </main>
      </LanguagesContext.Provider>
    </SideBarContext.Provider>
  );
}