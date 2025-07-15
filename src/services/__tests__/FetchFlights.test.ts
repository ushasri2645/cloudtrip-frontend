import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "../../constants/api";
import type { FlightSearchFormData } from "../../types/FlightSearchForm";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
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

    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/flights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockFormData),
    });
    expect(flights).toEqual(mockFlights);
  });

  it("should throw error when source destination are same", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({
        errors: ["Source and destination must be different"],
      }),
    });
    mockFormData.source = "Banglore";
    mockFormData.destination = "Banglore";
    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "Source and destination must be different"
    );
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/flights`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockFormData),
    });
  });
  it("should throw 'Unknown error' when errors key is missing in response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow("Unknown error");
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/flights`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockFormData),
    });
  });
  it("should throw network error message when fetch fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError("Network down"));

    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "Network Error. Try again later"
    );

    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/flights`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockFormData),
    });
  });
});
