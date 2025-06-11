import { Client, IError } from "@/lib/apiClient";

export default async function handleGetFlashCardsByDeckId(api: Client, id: string) {
  const response = await api.getFlashCardsByDeckId(id);

  if (response.isFailed) {
    throw new Error(
      `Error fetching decks: ${response.errors
        ?.map((e: IError) => e.message)
        .join(", ")}`
    );
  }

  if (!response.value) {
    throw new Error("Returned value is null or undefined");
  }

  // Convert class instances to plain objects
  const decks = JSON.parse(JSON.stringify(response.value));
  return decks;
}
