"use client";
import { useState, useEffect } from "react";
import {
  SideBarContext,
  LanguagesContext,
  DecksContext,
} from "@/models/Contexts";
import Sidebar from "@/components/sidebar";
import { Deck, Language, IDeck } from "@/lib/apiClient";
import { SidebarState } from "@/models/SidebarState";
import { DecksState } from "@/models/DecksState";
import User from "@/models/User";
import FilterOptions from "@/models/FilterOptions";
import DeckOptions from "@/models/DeckOptions";
import { AvailableLanguagesState } from "@/models/AvailableLanguagesState";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarState, setSidebarState] = useState<SidebarState>({
    filterOptions: new FilterOptions(),
    setFilterOptions: (opts: FilterOptions) => {
      setSidebarState((prevState) => ({
        ...prevState,
        filterOptions: opts,
      }));
    },
    filterOptionsVisible: false,
    setFilterOptionsVisible: () => {},
    deckOptions: new DeckOptions(),
    setDeckOptions: (opts: DeckOptions) => {
      setSidebarState((prevState) => ({
        ...prevState,
        deckOptions: opts,
      }));
    },
    deckOptionsVisible: false,
    setDeckOptionsVisible: () => {},
    header: null,
    setHeader: (header: string) => {
      setSidebarState((prevState) => ({
        ...prevState,
        header,
      }));
    },
    user: null,
    setUser: (user: User | null) => {
      setSidebarState((prevState) => ({
        ...prevState,
        user,
      }));
    },
    Error: null,
    setError: (error: string | null) => {
      setSidebarState((prevState) => ({
        ...prevState,
        Error: error,
      }));
    },
  });

  const [decksState, setDecksState] = useState<DecksState>({
    Decks: [],
    selectedDeck: null,
    setDecks: (items: IDeck[]) => {
      setDecksState((prevState) => ({
        ...prevState,
        Decks: items,
      }));
    },
    setSelectedDeck: (item: IDeck) => {
      setDecksState((prevState) => ({
        ...prevState,
        selectedDeck: item,
      }));
    },
  });

  const [availableLanguages, setAvailableLanguages] = useState<AvailableLanguagesState>({
    availableLanguages: {},
    setAvailableLanguages: (languages: { [key: string]: Language }) => {
      setAvailableLanguages((prevState) => ({
        ...prevState,
        availableLanguages: languages,
      }));
    },
  });


  return (
    <>
      <SideBarContext.Provider value={{ ...sidebarState }}>
        <LanguagesContext.Provider value={{ ...availableLanguages }}>
          <DecksContext.Provider value={{ ...decksState }}>
            <Sidebar />
            <main className="flex flex-col w-full h-screen bg-gray-900">
              <div className="p-4 bg-gray-800 shadow-md z-10">
                {sidebarState.Error && (
                  <div className="text-red-500 text-center">
                    {sidebarState.Error}
                  </div>
                )}
                <h1 className="text-2xl self-center text-center text-blue-300 font-black leading-8">
                  {sidebarState.header || "loading..."}
                </h1>
              </div>
              {children}
            </main>
          </DecksContext.Provider>
        </LanguagesContext.Provider>
      </SideBarContext.Provider>
    </>
  );
}
