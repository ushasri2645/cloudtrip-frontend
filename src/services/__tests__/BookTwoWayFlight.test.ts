import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "../../constants/api";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import { bookTwoWayFlight } from "../BookTwoWayFlight";

export const mockOnwardFlight: FlightSearchResult = {
  flight_number: "AI101",
  source: "Hyderabad",
  destination: "Delhi",
  departure_date: "2025-08-01T06:00:00.000Z",
  departure_time: "06:00 AM",
  arrival_date: "2025-08-01T08:00:00.000Z",
  arrival_time: "08:00 AM",
  class_type: "economy",
  available_seats: 3,
  total_fare: 5250,
  price_per_person: 5250,
  base_price: 3500,
  extra_price: 1750,
};

export const mockReturnFlight: FlightSearchResult = {
  flight_number: "AI202",
  source: "Delhi",
  destination: "Hyderabad",
  departure_date: "2025-08-10T13:15:00.000Z",
  departure_time: "01:15 PM",
  arrival_date: "2025-08-10T15:45:00.000Z",
  arrival_time: "03:45 PM",
  class_type: "economy",
  available_seats: 4,
  total_fare: 5500,
  price_per_person: 5500,
  base_price: 3600,
  extra_price: 1900,
};


describe("bookTwoWayFlight service", () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("should send correct payload and return updated response on success", async () => {
    const mockUpdatedResponse = {
      updated: {
        bookingIds: ["ON123-BOOKED", "RT456-BOOKED"],
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockUpdatedResponse),
    });

    const passengers = 2;

    const result = await bookTwoWayFlight(
      mockOnwardFlight,
      mockReturnFlight,
      passengers
    );

    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/round_trip_booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookings: [
          { ...mockOnwardFlight, passengers },
          { ...mockReturnFlight, passengers },
        ],
      }),
    });

    expect(result).toEqual(mockUpdatedResponse.updated);
  });

  it("should throw an error if API response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ error: "Booking failed" }),
    });

    await expect(
      bookTwoWayFlight(mockOnwardFlight, mockReturnFlight, 2)
    ).rejects.toThrow("Booking failed");
  });

  it("should throw an error if fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    await expect(
      bookTwoWayFlight(mockOnwardFlight, mockReturnFlight, 2)
    ).rejects.toThrow("Network error");
  });
});
