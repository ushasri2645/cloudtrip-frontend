import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FlightSearchFormData } from "../../types/FlightSearchForm";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import { API_URL } from "../../constants/api";
import { fetchFlights } from "../FetchFlights";

const mockFormData: FlightSearchFormData = {
  source: "JFK",
  destination: "LAX",
  date: "2025-08-01",
  passengers: 0,
  class_type: "economy",
};

const mockFlights: Partial<FlightSearchResult>[] = [
  {
    flight_number: "AA100",
    source: "JFK",
    destination: "LAX",
    departure_time: "2025-08-01T10:00:00Z",
    arrival_time: "2025-08-01T13:00:00Z",
    total_fare: 299.99,
  },
];

describe("Tests for fetchFlights service", () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("should return flights when API call is successful", async () => {
   global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        flights: mockFlights,
      }),
    });

    const flights = await fetchFlights(mockFormData);

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}/flights`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockFormData),
      }
    );
    expect(flights).toEqual(mockFlights);
  });

  it("should throw an error when response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "Failed to fetch flights"
    );
  });

  it("should throw an error when fetch itself fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network failure"));

    await expect(fetchFlights(mockFormData)).rejects.toThrow("Network failure");
  });
});
