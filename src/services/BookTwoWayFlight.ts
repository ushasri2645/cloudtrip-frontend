import { API_URL } from "../constants/api";
import type { FlightSearchResult } from "../types/FlightSearchResult";

export const bookTwoWayFlight = async (
  onWardsFlight: FlightSearchResult,
  returnFlights: FlightSearchResult,
  passengers: number
) => {
  try {
    const onwardFlightWithPassengers = {
      ...onWardsFlight,
      passengers: passengers,
    };

    const returnFlightWithPassengers = {
      ...returnFlights,
      passengers: passengers,
    };
    const response = await fetch(`${API_URL}/round_trip_booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookings: [onwardFlightWithPassengers, returnFlightWithPassengers],
      }),
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
