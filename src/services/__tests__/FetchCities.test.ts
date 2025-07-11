import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "../../constants/api";
import { fetchCities } from "../FetchCities";

describe("Tests for fetchCities service", () => {
  let originalFetch: typeof fetch;
  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("should return cities when API call is successful", async () => {
    const mockCities = ["New York", "London", "Paris"];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ cities: mockCities }),
    })
    const cities = await fetchCities();
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/cities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(cities).toEqual(mockCities);
  });

  it("should throw an error when response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({}),
    })
    await expect(fetchCities()).rejects.toThrow(
      "Failed to fetch cities. Status: 500"
    );
  });

  it("should throw an error when fetch itself fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network failure"))
    await expect(fetchCities()).rejects.toThrow("Network failure");
  });
});