import { ApiException, Client, IDeck } from "@/lib/apiClient";

export async function handleGetDecks(api: Client): Promise<IDeck[] | ApiException> {
  let response;
  try {
    response = await api.getDecks();
    if (response.isFailed) {
      throw new Error(
        `Error fetching decks: ${response.errors
          ?.map((e) => e.message)
          .join(", ")}`
      );
    }
    if (!response.value) {
      throw new Error("Returned value is null or undefined");
    }
  }
  catch (error) {
  if (error instanceof ApiException) {
    console.error("API error details:", error);
    return error;
    } else {
      console.error("Error fetching decks:", error);
    }
  }

  if (!response) {
    console.error("No response received from API");
    return [];
  }

  // Convert class instances to plain objects
  const decks = JSON.parse(JSON.stringify(response.value));
  return decks;
}