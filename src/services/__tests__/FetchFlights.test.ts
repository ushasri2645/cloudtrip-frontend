import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FlightSearchFormData } from "../../types/FlightSearchForm";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import { fetchFlights } from "../FetchFlights";

const mockFormData: FlightSearchFormData = {
  source: "JFK",
  destination: "LAX",
  date: "2025-08-01",
  passengers: 1,
  class_type: "economy",
  returnDate: ""
};

const mockFlights: FlightSearchResult[] = [
  {
    flight_number: "AA100",
    source: "JFK",
    destination: "LAX",
    departure_time: "2025-08-01T10:00:00Z",
    arrival_time: "2025-08-01T13:00:00Z",
    total_fare: 299.99,
    departure_date: "",
    arrival_date: "",
    class_type: "economy",
    available_seats: 10,
    price_per_person: 0,
    base_price: 0,
    extra_price: 0,
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
      status: 200,
      json: vi.fn().mockResolvedValue({ flights: mockFlights }),
    });

    const flights = await fetchFlights(mockFormData);
    expect(flights).toEqual(mockFlights);
  });
  it("should throw error message from errors array if present for 400", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({
        errors: ["Source is required", "Destination is required"],
      }),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "Source is required, Destination is required"
    );
  });
  it("should throw error message from message field if errors array not present", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({
        message: "Invalid input data",
      }),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "Invalid input data"
    );
  });

  it("should throw 404 Not Found error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: vi.fn().mockResolvedValue({ message: "No flights found" }),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "No flights found"
    );
  });

  it("should throw 409 Conflict error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 409,
      json: vi
        .fn()
        .mockResolvedValue({ message: "All flights are fully booked." }),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "All flights are fully booked."
    );
  });

  it("should throw 500 Server Error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "Server Error. Please try again later."
    );
  });

  it("should fallback to unknown error when no message or errors provided", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 422,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow("Unknown error");
  });

  it("should show fallback error from errors array", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 422,
      json: vi.fn().mockResolvedValue({
        errors: ["Departure time must be in future"],
      }),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "Departure time must be in future"
    );
  });

  it("should throw network error on fetch failure", async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError("Network down"));

    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "Network Error. Please check your connection."
    );
  });
  it("should throw 'Bad Request' if neither errors nor message is present for 400", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow("Bad Request");
  });
  it("should throw 'Not Found' if message is missing for 404", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow("Not Found");
  });
  it("should throw default 409 error message if message is missing", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 409,
      json: vi.fn().mockResolvedValue({}),
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "All flights are fully booked."
    );
  });
  it("should throw generic error message if unknown error is thrown", async () => {
    const customError = new Error("Something went wrong internally");

    global.fetch = vi.fn().mockImplementation(() => {
      throw customError;
    });

    await expect(fetchFlights(mockFormData)).rejects.toThrow(
      "Something went wrong internally"
    );
  });
});
