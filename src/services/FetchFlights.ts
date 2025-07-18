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
    console.log(data);

    if (response.status === 400) {
      const message =
        (data.errors && data.errors.join(", ")) ||
        data.message ||
        "Bad Request";
      throw new Error(`${message}`);
    }

    if (response.status === 404) {
      const message = data.message || "Not Found";
      throw new Error(`${message}`);
    }

    if (response.status === 409) {
      const message = data.message || "All flights are fully booked.";
      throw new Error(`${message}`);
    }

    if (response.status >= 500) {
      throw new Error("Server Error. Please try again later.");
    }
    if (!response.ok) {
      const errorMessages =
        (data.errors && data.errors.join(", ")) ||
        data.message ||
        "Unknown error";
      throw new Error(errorMessages);
    }
    return data.flights;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network Error. Please check your connection.");
    }
    throw new Error((error as Error).message);
  }
};
