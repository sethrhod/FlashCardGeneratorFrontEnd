import { IDeck } from "./apiClient";

export interface DecksState {
  Decks: IDeck[];
  selectedDeck: IDeck | null;
  setDecks : (items: IDeck[]) => void;
  setSelectedDeck : (item: IDeck) => void;
}