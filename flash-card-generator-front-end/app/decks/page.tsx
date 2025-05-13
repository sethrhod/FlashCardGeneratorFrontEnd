'use client';
import React, { useEffect, useState } from 'react';
import { IDeck } from '../../models/apiClient'
import useDeckStore from "@/models/store";
import { useRouter } from 'next/navigation';
import {useSideBarContext} from "@/models/Contexts";

export default function MyDecks({
  decks,
}: {
  decks: IDeck[];
}) {
  const { setDecks, setSelectedDeck, Decks } = useDeckStore();
  const router = useRouter();
  const sidebarContext = useSideBarContext();
  const [filteredDecks, setFilteredDecks] = useState<IDeck[] | null>(null);

  useEffect(() => {
    setDecks(decks);
  }
  , [decks]);

  useEffect(() => {
    if (sidebarContext.filterOptions.Language) {
      setFilteredDecks((filteredDecks || []).concat(Decks.filter((deck) => deck.targetLanguage == sidebarContext.filterOptions.Language)));
    }
    if (sidebarContext.filterOptions.LanguageLevel !== null && sidebarContext.filterOptions.LanguageLevel !== undefined) {
      setFilteredDecks((filteredDecks || []).concat(Decks.filter((deck) => deck.level == sidebarContext.filterOptions.LanguageLevel)));
    }
    if (sidebarContext.filterOptions.LanguageLevel === null && sidebarContext.filterOptions.Language === null) {
      setFilteredDecks(null);
    }
  }, [sidebarContext]);

  const handleDeckClick = (deck: IDeck) => {
    setSelectedDeck(deck);
    router.push(`/decks/${deck.id}`);
  }

  const deckItem = (deck: IDeck) => {
    return (
      <li
        key={deck.id}
        className="flex space-x-6 items-center justify-center p-4 mb-4 border-b-4 border-b-gray-800 shadow-md rounded-lg text-gray-100 hover:bg-gray-800"
        onClick={() => handleDeckClick(deck)}
      >
        <p>{deck.name}</p>
        <p>{deck.originalLanguage.textCode}</p>
        <p>{deck.targetLanguage.textCode}</p>
        <p>{deck.level}</p>
      </li>
    );
  }

  return (
    <ul className="flex flex-col p-4 bg-gray-900">
      {filteredDecks !== null
        ? filteredDecks.map((deck) => (
            deckItem(deck)
          ))
        : Decks.map((deck) => (
            deckItem(deck)
          ))}
    </ul>
  );
}