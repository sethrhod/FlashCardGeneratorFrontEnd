import DeckOptions from "./deckOptions";
import FilterOptions from "./filterOptions";

export interface SidebarState {
  filterOptions: FilterOptions;
  setFilterOptions: (opts: FilterOptions) => void;

  deckOptions: DeckOptions;
  setDeckOptions: (opts: DeckOptions) => void;
}