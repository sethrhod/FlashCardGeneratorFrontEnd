import "./globals.css";
import { Client } from "@/models/apiClient";
import nodeFetch from 'node-fetch';
import ClientRootLayout from "./clientRootLayout";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const api = new Client('https://localhost:7017', { fetch: nodeFetch as any });

  const availableLanguagesResponse = await api.getAvailableLanguages();

  if (availableLanguagesResponse.isFailed) {
    console.error("Error fetching available languages:", availableLanguagesResponse.errors);
    return <div>Error loading languages</div>;
  }
  if (availableLanguagesResponse.value == null || availableLanguagesResponse.value.length === 0) {
    console.error("No available languages found");
    return <div>No languages available</div>;
  }

  const testDeckResponse = await api.getDecks();

  if (testDeckResponse.isFailed) {
    console.error("Error fetching test decks:", testDeckResponse.errors);
    return <div>Error loading decks</div>;
  }
  if (testDeckResponse.value == null || testDeckResponse.value.length === 0) {
    console.error("No test decks found");
    return <div>No decks available</div>;
  }

    // Convert class instances to plain objects before passing to client components
  const plainDecks = JSON.parse(JSON.stringify(testDeckResponse.value));
  const plainLanguages = JSON.parse(JSON.stringify(availableLanguagesResponse.value));

  return (
    <html lang="en">
      <body className="flex">
        <ClientRootLayout
          decks={plainDecks}
          availableLanguages={plainLanguages}
        >
          {children}
        </ClientRootLayout>
      </body>
    </html>
  );
}