import { useQuery } from "@tanstack/react-query";
import { fetchCities } from "../../services/FetchCities";
import { CitiesContext } from "./CitiesContext";

export const CitiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: 24 * 60 * 60 * 1000, 
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <CitiesContext.Provider
      value={{
        cities: data || [],
        loading: isLoading,
        error: error ? error.message : null,
        refetch,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
