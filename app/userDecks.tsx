"use client";
import React, { useEffect, useState } from "react";
import { IDeck, Language } from "../lib/apiClient";
import { useRouter } from "next/navigation";
import { useSideBarContext } from "@/models/Contexts";
import DisplayLevel from "@/scripts/language-level-converter";
import FindLanguageName from "@/scripts/language-name-finder";

interface UserDecksProps {
  decks: IDeck[];
}

export default function UserDecks(props: UserDecksProps) {
  const router = useRouter();
  const sidebarContext = useSideBarContext();
  const [filteredDecks, setFilteredDecks] = useState<IDeck[] | null>(null);

  console.log("UserDecks component mounted");

  useEffect(() => {
    sidebarContext.setDeckOptionsVisible(false);
    sidebarContext.setFilterOptionsVisible(true);
    sidebarContext.setHeader("Decks");
  }, []);

  useEffect(() => {
    if (sidebarContext.filterOptions.Language) {
      setFilteredDecks(
        (filteredDecks || []).concat(
          props.decks.filter(
            (deck) =>
              deck.targetLanguage ==
              sidebarContext.filterOptions.Language?.enumCode
          )
        )
      );
    }
    if (
      sidebarContext.filterOptions.LanguageLevel !== null &&
      sidebarContext.filterOptions.LanguageLevel !== undefined
    ) {
      setFilteredDecks(
        (filteredDecks || []).concat(
          props.decks.filter(
            (deck) => deck.level == sidebarContext.filterOptions.LanguageLevel
          )
        )
      );
    }
    if (
      sidebarContext.filterOptions.LanguageLevel === null &&
      sidebarContext.filterOptions.Language === null
    ) {
      setFilteredDecks(null);
    }
  }, [sidebarContext]);

  const handleDeckClick = (deck: IDeck) => {
    router.push(`/decks/${deck.id}`);
  };

  function DeckInfo({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h6 className="text-sm text-gray-500">{label}</h6>
        <p className="text-md text-gray-100 font-bold">{value}</p>
      </div>
    );
  }

  const deckItem = (deck: IDeck) => {
    return (
      <li
        key={deck.id}
        className="flex space-x-6 items-center justify-center p-4 mb-4 border-b-4 border-b-gray-800 shadow-md rounded-lg text-gray-500 hover:bg-gray-800"
        onClick={() => handleDeckClick(deck)}
      >
        <DeckInfo label="Name" value={deck.name} />
        <DeckInfo
          label="Original Language"
          value={FindLanguageName(deck.originalLanguage)}
        />
        <DeckInfo
          label="Target Language"
          value={FindLanguageName(deck.targetLanguage)}
        />
        <DeckInfo label="Level" value={DisplayLevel(deck.level)} />
      </li>
    );
  };

  if (props.decks == null || undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading decks...</p>
      </div>
    );
  }

  if (props.decks.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No decks available for this user</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col p-4 bg-gray-900 self-center md:w-1/2 w-full h-screen overflow-y-auto">
      {filteredDecks !== null
        ? filteredDecks.map((deck) => deckItem(deck))
        : props.decks.map((deck) => deckItem(deck))}
    </ul>
  );
}
