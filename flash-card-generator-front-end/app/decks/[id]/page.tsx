'use client';
import React, { useEffect } from 'react';
import { IFlashCard } from "@/models/apiClient";
import Card from "@/components/flashCard";
import { useDecksContext, useSideBarContext } from '@/models/Contexts';

export default function DeckItem() {
  const sidebarContext = useSideBarContext();
  const deckContext = useDecksContext();

  useEffect(() => {
    sidebarContext.setDeckOptionsVisible(true);
    sidebarContext.setFilterOptionsVisible(false);
    sidebarContext.setHeader(deckContext.selectedDeck?.name || "Deck");
  }
  , []);

   return (
    <div className="flex flex-col items-center overflow-scroll">
      <ul className="flex flex-col items-center w-full mt-4">
        {deckContext.selectedDeck?.flashCards && deckContext.selectedDeck.flashCards.map((card: IFlashCard) => (
          <li key={card.id} className="mb-4 w-full h-full flex justify-center">
            <Card card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
}