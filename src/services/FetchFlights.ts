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
    const data = await response.json();
    if (!response.ok) {
      const errorMessages = data.errors
        ? data.errors.join(", ")
        : "Unknown error";
      throw new Error(errorMessages);
    }
    return data.flights;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network Error. Try again later");
    }
    throw new Error(`${(error as Error).message}`);
  }
};
