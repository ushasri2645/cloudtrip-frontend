import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "../../constants/api";
import { bookFlight } from "../BookFlight";
import type { FlightSearchResult } from "../../types/FlightSearchResult";

const mockFlight: FlightSearchResult = {
  flight_number: "XY123",
  source: "New York",
  destination: "London",
  departure_date: "2025-07-20",
  departure_time: "10:30",
  arrival_date: "2025-07-21",
  arrival_time: "02:00",
  class_type: "economy",
  economy_seats: 50,
  business_seats: 10,
  first_class_seats: 5,
  base_price: 300,
  extra_price: 50,
  price_per_person: 350,
  total_fare: 700,
};

describe("Tests for bookFlight service", () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("should return true when booking succeeds", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ updated: true }),
    });
    const result = await bookFlight(mockFlight, 2);
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flight: mockFlight, passengers: 2 }),
    });
    expect(result).toBe(true);
  });

  it("should throw an error when response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({ error: "Server error occurred" }),
    });
    await expect(bookFlight(mockFlight, 2)).rejects.toThrow(
      "Server error occurred"
    );
  });

  it("should throw an error when fetch itself fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network failure"));
    await expect(bookFlight(mockFlight, 2)).rejects.toThrow(
      "Network failure"
    );
  });
});









