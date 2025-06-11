import { ApiException, Client } from "@/lib/apiClient";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth-config";
import nodeFetch from "node-fetch";
import UserDecks from "./userDecks";
import { handleGetDecks } from "@/lib/handleGetDecks";

export default async function Home() {
  // 1) Auth guard
  const session = await getServerSession(authConfig);

  if (!session) redirect("/login");

  // set the token for the API client
  if (!session.accessToken) {
    console.error("No access token found in session");
    redirect("/login");
  }

  const api = new Client("https://localhost:7017", {
    fetch: nodeFetch as any,
  });
  api.setToken(session.accessToken);

  const decksResult = await handleGetDecks(api);
  if (decksResult instanceof ApiException) {
    console.error("Error fetching decks:", decksResult);
    return <div>Error fetching decks: {decksResult.message}</div>;
  }

  return <UserDecks decks={decksResult} />;
}
