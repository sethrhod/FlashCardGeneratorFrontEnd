import { Client } from "@/lib/apiClient";
import handleGetAvailableLanguages from "./actions/handleGetAvailableLanguages";
import { handleGetDecks } from "./actions/handleGetDecks";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth-config";
import nodeFetch from "node-fetch";
import UserDecks from "./userDecks";

export default async function Home() {
  // 1) Auth guard
  const session = await getServerSession(authConfig);

  if (!session) redirect("/login");

  let decks, languages;
  try {
    // 2) Server-side fetch
    const api = new Client("https://localhost:7017", {
      fetch: nodeFetch as any,
    });
    decks = await handleGetDecks(api);
    languages = await handleGetAvailableLanguages(api);
  } catch (error) {
    console.error("Error fetching data:", error);
    redirect("/error");
  }

  return (
    <UserDecks decks={decks} languages={languages} />
  );
}
