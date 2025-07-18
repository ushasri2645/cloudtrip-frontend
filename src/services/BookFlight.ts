import { API_URL } from "../constants/api";
import type { FlightSearchResult } from "../types/FlightSearchResult";

export const bookFlight = async (
  flight: FlightSearchResult,
  passengers: number
) => {
  try {
    const response = await fetch(`${API_URL}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flight, passengers }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data.error}`);
    }
    return data.updated;
  } catch (error) {
    throw new Error(`${error}`);
  }
};