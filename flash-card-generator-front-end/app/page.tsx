import MyDecks from "./decks/page";
import React from 'react';
import { Client } from '../models/apiClient';
import nodeFetch from 'node-fetch';

export default async function Home() {
  const api = new Client('https://localhost:7017', { fetch: nodeFetch as any });
  const response = await api.getTestDecks();

  return (
    <MyDecks decks={response.value} />
  );
}
