import { API_URL } from "../constants/api";
import type { FlightSearchFormData } from "../types/FlightSearchForm";
import type { FlightSearchResult } from "../types/FlightSearchResult";

export const fetchFlights = async (
  formData: FlightSearchFormData
): Promise<FlightSearchResult[]> => {
  try {
    const response = await fetch(`${API_URL}/flights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch flights");
    }

    const data = await response.json();
    return data.flights;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};
