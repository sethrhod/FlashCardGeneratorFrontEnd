import React from "react";
import { redirect } from "next/navigation";
import { Client, FlashCard, IDeck } from "@/lib/apiClient";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth-config";
import nodeFetch from "node-fetch";
import Deck from "@/components/deck";
import handleGetFlashCardsByDeckId from "@/lib/HandleGetFlashCardsWithId";
import handleGetDeckById from "@/lib/HandleGetDeckById";

export default async function DeckPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;

  if (!deckId) {
    throw new Error("Invalid deck id");
  }

  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/login");
  }

  const api = new Client("https://localhost:7017", {
    fetch: nodeFetch as any,
  });
  api.setToken(session.accessToken);

  let deck: IDeck | null = null;
  try {
    deck = await handleGetDeckById(api, deckId);
  } catch (error) {
    console.error("Error fetching deck:", error);
    return <div>Error fetching deck: {error instanceof Error ? error.message : "Unknown error"}</div>;
  }

  let flashCards: FlashCard[] | null = null;
  try {
    flashCards = await handleGetFlashCardsByDeckId(api, deckId);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return <div>Error fetching flashcards: {error instanceof Error ? error.message : "Unknown error"}</div>;
  }

  if (!deck) {
    console.error("Deck not found");
    return <div>Deck not found</div>;
  }
  if (!flashCards) {
    console.error("Flashcards not found for deck:", deckId);
    return <div>Flashcards not found for this deck</div>;
  }

  deck.flashCards = flashCards;

  return (
    <div className="flex flex-col items-center overflow-scroll">
      <Deck deck={deck} />
    </div>
  );
}
