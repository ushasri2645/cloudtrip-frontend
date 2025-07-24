import { describe, it, expect, vi, beforeEach } from "vitest";
import type { FlightSearchFormData } from "../../types/FlightSearchForm";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import { fetchFlights } from "../FetchFlights";
import { fetchRoundTripFlights } from "../FetchRoundTripFlight";
// import { fetchRoundTripFlights } from "../FetchRoundTripFlight";

vi.mock("../../services/FetchFlights", () => ({
  fetchFlights: vi.fn(),
}));

const mockFlight: FlightSearchResult = {
  flight_number: "AI-101",
  source: "DEL",
  destination: "BOM",
  departure_time: "2025-08-01T10:00:00Z",
  arrival_time: "2025-08-01T12:00:00Z",
  class_type: "economy",
  departure_date: "",
  arrival_date: "",
  available_seats: 0,
  total_fare: 0,
  price_per_person: 0,
  base_price: 0,
  extra_price: 0,
};

describe("Test for fetchRoundTripFlights", () => {
  const mockFormData: FlightSearchFormData = {
    source: "DEL",
    destination: "BOM",
    date: "2025-08-01",
    returnDate: "2025-08-05",
    passengers: 2,
    class_type: "economy",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch onward and return flights correctly", async () => {
    (fetchFlights as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      mockFlight,
    ]);

    const result = await fetchRoundTripFlights(mockFormData);

    expect(fetchFlights).toHaveBeenCalledTimes(2);
    expect(fetchFlights).toHaveBeenCalledWith(mockFormData);
    expect(fetchFlights).toHaveBeenCalledWith({
      source: "BOM",
      destination: "DEL",
      date: "2025-08-05",
      returnDate: "2025-08-05",
      passengers: 2,
      class_type: "economy",
    });

    expect(result).toEqual({
      onwards: [mockFlight],
      return: [mockFlight],
    });
  });

  it("should throw an error if fetchFlights fails", async () => {
    (fetchFlights as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("API failed")
    );

    await expect(fetchRoundTripFlights(mockFormData)).rejects.toThrow(
      "API failed"
    );
    expect(fetchFlights).toHaveBeenCalledTimes(1);
  });
});
