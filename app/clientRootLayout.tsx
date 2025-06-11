"use client";
import { useState } from "react";
import { SideBarContext, LanguagesContext } from "@/models/Contexts";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/sidebar";
import { Language } from "@/lib/apiClient";
import User from "@/models/User";
import { SidebarState } from "@/models/sidebarState";
import FilterOptions from "@/models/filterOptions";
import DeckOptions from "@/models/deckOptions";
import { Session } from "next-auth";

interface ClientRootLayoutProps {
  children: React.ReactNode;
  languages: { [key: string]: Language };
  session: Session | null;
}

export default function ClientRootLayout({
  children,
  languages,
  session,
}: ClientRootLayoutProps) {
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

  return (
    <>
      <SessionProvider session={session}>
        <SideBarContext.Provider value={{ ...sidebarState }}>
          <LanguagesContext.Provider value={{ availableLanguages: languages }}>
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
          </LanguagesContext.Provider>
        </SideBarContext.Provider>
      </SessionProvider>
    </>
  );
}
