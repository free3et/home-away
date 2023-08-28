import { createContext, useContext, useState } from "react";
import { PlaceProps } from "../types/PlaceTypes";

interface SearchContextType {
  searchResults: PlaceProps[];
  setSearchResults: React.Dispatch<React.SetStateAction<PlaceProps[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  hasSearched: boolean;
  setHasSearched: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SearchProviderProps {
  children: React.ReactNode;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<PlaceProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults,
        searchTerm,
        setSearchTerm,
        hasSearched,
        setHasSearched,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
