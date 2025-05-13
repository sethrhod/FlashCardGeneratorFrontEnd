'use client';
import {SideBarContext} from "@/models/Contexts";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import { SidebarState } from "@/models/sidebarState";
import FilterOptions from "@/models/filterOptions";
import DeckOptions from "@/models/deckOptions";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  var initialState: SidebarState = {
    filterOptions: new FilterOptions(),
    setFilterOptions: (opts: FilterOptions) => {},
    deckOptions: new DeckOptions(),
    setDeckOptions: (opts: DeckOptions) => {},
  };
  
  const [sidebarState, setSidebarState] = useState(initialState);

  return (
    <html lang="en">
      <body className="flex">
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
          <Sidebar />
          <main className="flex flex-col w-full min-h-screen bg-gray-900">
            <header id="header" className="flex w-full items-center bg-gray-800 shadow-md p-4 border-l-4 border-l-gray-900">
              <h1 className="text-2xl font-bold">Current Route</h1>
            </header>
            {children}
          </main>
        </SideBarContext.Provider>
      </body>
    </html>
  );
}
