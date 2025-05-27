import { Client, IError } from "@/models/apiClient";
import Result from "@/models/Result";


export async function handleGetDecks(api: Client) {
  try {
    const response = await api.getDecks();

    if (response.isFailed) {
      console.error("Error fetching decks:", response.errors);
      return { success: false, errors: response.errors, message: "Failed to fetch decks" };
    }
    
    if (!response.value || Object.keys(response.value).length === 0) {
      console.warn("No decks found");
      return { success: false, message: "No decks available", errors: undefined };
    }

    // Convert class instances to plain objects
    const decks = JSON.parse(JSON.stringify(response.value));
    return decks;  
  } catch (error) {
    return { success: false, message: "An error occurred while fetching decks", errors: error instanceof IError ? [error] : undefined };
  }
}