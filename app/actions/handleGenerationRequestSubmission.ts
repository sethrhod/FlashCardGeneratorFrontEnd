'use server';
import { GenerationRequestDTO, LanguageLevel } from "@/lib/apiClient";
import { Client } from "@/lib/apiClient";
import nodeFetch from 'node-fetch';
import { redirect } from 'next/navigation'

export default async function handleGenerationRequestSubmission(prevState: any, formData: FormData) {
  const generationRequest = new GenerationRequestDTO();
  generationRequest.deckName = formData.get("deck-name") as string;
  generationRequest.originalLanguage = formData.get("original-language") as string;
  generationRequest.targetLanguage = formData.get("target-language") as string;
  generationRequest.level = formData.get("language-level") as string;

  if (!generationRequest.deckName) {
    console.error("Deck name is required");
    return { message: 'Please enter a valid deck name' }
  }
  if (!generationRequest.originalLanguage) {
    console.error("Original language is required");
    return { message: 'Please select a valid original language' }
  }
  if (!generationRequest.targetLanguage) {
    console.error("Target language is required");
    return { message: 'Please select a valid target language' }
  }

  try {
    const api = new Client('https://localhost:7017', { fetch: nodeFetch as any });
    api.setToken(prevState.token);
    await api.createDeck(generationRequest);
  }
  catch (error) {
    console.error("Error creating deck:", error);
    return { message: 'An error occurred while creating the deck' }
  }

  return redirect(`/`);
}