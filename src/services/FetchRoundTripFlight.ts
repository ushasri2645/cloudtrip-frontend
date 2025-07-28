import type { FlightSearchFormData } from "../types/FlightSearchForm";
import type { RoundTripSearchResult } from "../types/RoundTripSearchResult";
import { fetchFlights } from "./FetchFlights";

export const fetchRoundTripFlights = async (
  formData: FlightSearchFormData
): Promise<RoundTripSearchResult> => {
  try {
    const returnDetails: FlightSearchFormData = {
      returnDate: formData.returnDate,
      source: formData.destination,
      destination: formData.source,
      date: formData.returnDate,
      passengers: formData.passengers,
      class_type: formData.class_type,
    };
    const onwardFlights = await fetchFlights(formData);
    const returnFlights = await fetchFlights(returnDetails);
    return { onwards: onwardFlights, return: returnFlights };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
