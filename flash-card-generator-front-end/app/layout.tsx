import "./globals.css";
import { Client } from "@/models/apiClient";
import nodeFetch from 'node-fetch';
import ClientRootLayout from "./clientRootLayout";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  //read secrets.json file
  const secrets = await import("../secrets.json");

  const clientId = secrets["Authentication"]["Google"]["ClientId"];
  if (!clientId) {
    throw new Error("ClientId not found in secrets.json");
  }

  const api = new Client('https://localhost:7017', { fetch: nodeFetch as any });

  const availableLanguagesResponse = await api.getAvailableLanguages();

  if (availableLanguagesResponse.isFailed) {
    console.error("Error fetching available languages:", availableLanguagesResponse.errors);
    return <div>Error loading languages</div>;
  }
  if (availableLanguagesResponse.value == null) {
    console.error("No available languages found");
    return <div>No languages available</div>;
  }
  const getDecksResponse = await api.getDecks();

  if (getDecksResponse.isFailed) {
    console.error("Error fetching test decks:", getDecksResponse.errors);
    return <div>Error loading decks</div>;
  }
  if (getDecksResponse.value == null || getDecksResponse.value.length === 0) {
    console.error("No test decks found");
    return <div>No decks available</div>;
  }

    // Convert class instances to plain objects before passing to client components
  const plainDecks = JSON.parse(JSON.stringify(getDecksResponse.value));
  const plainLanguages = JSON.parse(JSON.stringify(availableLanguagesResponse.value));

  return (
    <GoogleOAuthProvider clientId={clientId} >
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
    </GoogleOAuthProvider>
  );
}