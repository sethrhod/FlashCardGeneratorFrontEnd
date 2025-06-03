import { Client, IError } from "@/lib/apiClient";
import Result from "@/models/Result";

export async function handleGetDecks(api: Client) {
  const response = await api.getDecks();

  if (response.isFailed) {
    throw new Error(`Error fetching decks: ${response.errors?.map((e: IError) => e.message).join(", ")}`);
  }

  if (!response.value || Object.keys(response.value).length === 0) {
    throw new Error("No decks available");
  }

  // Convert class instances to plain objects
  const decks = JSON.parse(JSON.stringify(response.value));
  return decks;
}