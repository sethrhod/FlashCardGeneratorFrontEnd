import DeckOptions from "./deckOptions";
import FilterOptions from "./filterOptions";

export interface SidebarState {
  filterOptions: FilterOptions;
  setFilterOptions: (opts: FilterOptions) => void;
  filterOptionsVisible: boolean;
  setFilterOptionsVisible: (visible: boolean) => void;

  deckOptions: DeckOptions;
  setDeckOptions: (opts: DeckOptions) => void;
  deckOptionsVisible: boolean;
  setDeckOptionsVisible: (visible: boolean) => void;
}