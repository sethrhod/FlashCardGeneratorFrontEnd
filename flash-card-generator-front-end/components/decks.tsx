import React, { use } from 'react';
import { IDeck, IFlashCard } from '../apiClient';
import Card from './flashCard';

export default function Decks({
  deck,
}: {
  deck: IDeck
}) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {
          deck.flashCards == null ? (
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold">No cards available</p>
            </div>
          ) : (
            deck.flashCards.map((card: IFlashCard) => (
            <Card key={card.id} card={card} />
          )))
        }
      </div>
    </div>
  );
}