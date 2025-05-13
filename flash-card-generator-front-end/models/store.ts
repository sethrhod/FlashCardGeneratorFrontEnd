import { create } from 'zustand'
import { IDeck } from './apiClient';

interface IDeckStore {
  Decks: IDeck[]
  selectedDeck: IDeck | null
  setDecks: (items: IDeck[]) => void
  setSelectedDeck: (item: IDeck | null) => void
}

const useDeckStore = create<IDeckStore>((set) => ({
  Decks: [],
  selectedDeck: null,
  setDecks: (items) => set(() => ({ Decks: items })),
  setSelectedDeck: (item) => set(() => ({ selectedDeck: item })),
}));

export default useDeckStore;