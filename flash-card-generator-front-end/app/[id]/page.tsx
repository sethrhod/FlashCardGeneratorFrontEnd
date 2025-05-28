"use client";
import React, { useEffect } from "react";
import Card from "@/components/flashCard";
import { useDecksContext, useSideBarContext } from "@/models/Contexts";
import { useParams } from "next/navigation";

export default function DeckPage() {
  const { id } = useParams();
  const decksCtx = useDecksContext();
  const deck = decksCtx.Decks.find((d) => d.id === id);
  useEffect(() => {
    decksCtx.setSelectedDeck(deck!);
  }, [deck]);

  return (
    <div className="flex flex-col items-center overflow-scroll">
      <ul className="flex flex-col items-center w-full mt-4">
        {deck?.flashCards?.map((c) => (
          <li key={c.id} className="mb-4 w-full h-full flex justify-center">
            <Card card={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}
