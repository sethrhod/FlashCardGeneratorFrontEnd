import { Language } from "@/lib/apiClient";

export interface AvailableLanguagesState {
  availableLanguages: { [key: string]: Language };
}