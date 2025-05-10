'use client';
import React, { useEffect } from 'react';
import { IDeck } from '../../apiClient'
import useDeckStore from "@/store";
import { useRouter } from 'next/navigation';

export default function DecksList({
  decks,
}: {
  decks: IDeck[];
}) {
  const { setDecks, setSelectedDeck } = useDeckStore();
  const router = useRouter();

  useEffect(() => {
    setDecks(decks);
  }
  , [decks]);

  const handleDeckClick = (deck: IDeck) => {
    setSelectedDeck(deck);
    router.push(`/decks/${deck.id}`);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {
          decks.map((deck) => (
            <button
              key={deck.id}
              className="flex flex-col items-center w-full justify-between p-4 bg-white shadow-md rounded-lg text-black"
              onClick={() => handleDeckClick(deck)}
            >
              <p>{deck.name}</p>
            </button>
          ))
        }
      </div>
    </div>
  );
}