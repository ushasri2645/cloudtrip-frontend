import { createContext } from "react";

export type CitiesContextType = {
  cities: string[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export const CitiesContext = createContext<CitiesContextType | undefined>(undefined);