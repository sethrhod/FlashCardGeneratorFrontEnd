import { Client, IError, Language } from "@/lib/apiClient";
import Result from "@/models/Result";


export default async function handleGetAvailableLanguages(api: Client) {
  const response = await api.getAvailableLanguages();

  if (response.isFailed) {
    throw new Error(
      `Error fetching languages: ${response.errors?.map((e: IError) => e.message).join(", ")}`
    );
  }
  if (!response.value || Object.keys(response.value).length === 0) {
    throw new Error("No languages available");
  }
  // Convert class instances to plain objects
  const availableLanguages = JSON.parse(
    JSON.stringify(response.value)
  )
  return availableLanguages;
}