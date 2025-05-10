'use client';
import React from 'react';
import { IFlashCard } from "@/apiClient";
import Card from "@/components/flashCard";
import useDeckStore from "@/store";

export default function DeckItem() {
  const { selectedDeck } = useDeckStore();

   return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">{selectedDeck?.name}</h1>
      <p>This is the deck page.</p>
      <p>Deck ID: {selectedDeck?.id}</p>
      <div>
        <h2 className="text-xl font-semibold">Cards:</h2>
        <ul className="list-disc pl-5">
          {selectedDeck?.flashCards && selectedDeck.flashCards.map((card: IFlashCard) => (
            <Card key={card.id} card={card} />
          ))}
        </ul>
      </div>
    </div>
  );
}