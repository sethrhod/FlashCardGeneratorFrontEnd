
import DeckOptions from "./DeckOptions";
import FilterOptions from "./FilterOptions";
import User from "./User";


export interface SidebarState {
  filterOptions: FilterOptions;
  setFilterOptions: (opts: FilterOptions) => void;

  filterOptionsVisible: boolean;
  setFilterOptionsVisible: (visible: boolean) => void;

  header: string | null;
  setHeader: (header: string) => void;

  deckOptions: DeckOptions;
  setDeckOptions: (opts: DeckOptions) => void;

  deckOptionsVisible: boolean;
  setDeckOptionsVisible: (visible: boolean) => void;

  user: User | null;
  setUser: (user: User | null) => void;

  Error: string | null;
  setError: (error: string | null) => void;
}