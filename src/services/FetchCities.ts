import { API_URL } from "../constants/api";

export const fetchCities = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/cities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch cities. Status: ${response.status}`);
    }
    const data: { cities: string[] } = await response.json();
    return data.cities;
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};
