import { Client, IError, Language } from "@/models/apiClient";
import Result from "@/models/Result";


export default async function handleGetAvailableLanguages(api: Client) {
  try {
    const response = await api.getAvailableLanguages();

    if (response.isFailed) {
      console.error("Error fetching available languages:", response.errors);
      return { success: false, errors: response.errors, message: "Failed to fetch available languages"};
    }
    if (!response.value || Object.keys(response.value).length === 0) {
      console.warn("No available languages found");
      return { success: false, message: "No languages available", errors: undefined};
    }
    // Convert class instances to plain objects
    const languages = JSON.parse(JSON.stringify(response.value));
        // Convert class instances to plain objects
    const availableLanguages = JSON.parse(
      JSON.stringify(response.value)
    ) as { [key: string]: Language };
    return availableLanguages;
  } catch (error) {
    return { success: false, message: "An error occurred while fetching languages", errors: error instanceof IError ? [error] : undefined };
  }
}