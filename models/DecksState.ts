import { IDeck } from "../lib/apiClient";

export interface DecksState {
  Decks: IDeck[];
  selectedDeck: IDeck | null;
  setDecks : (items: IDeck[]) => void;
  setSelectedDeck : (item: IDeck) => void;
}