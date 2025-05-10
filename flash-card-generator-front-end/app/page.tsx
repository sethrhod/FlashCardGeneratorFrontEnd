import DecksList from "./decks/page";
import React from 'react';
import { Client } from '../apiClient';
import nodeFetch from 'node-fetch';

export default async function Home() {
  const api = new Client('https://localhost:7017', { fetch: nodeFetch as any });
  const response = await api.getTestDecks();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <DecksList decks={response.value} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
