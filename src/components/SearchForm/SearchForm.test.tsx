import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  CitiesContext,
  type CitiesContextType,
} from "../../contexts/Cities/CitiesContext";
import { fetchFlights } from "../../services/FetchFlights";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import { FlightSearchForm } from "./SearchForm";

vi.mock("../../services/FetchFlights", () => ({
  fetchFlights: vi.fn(),
}));

const renderWithCitiesContext = (
  mockContext: Partial<CitiesContextType> = {}
) => {
  const contextValue: CitiesContextType = {
    cities: ["Mumbai", "Delhi"],
    loading: false,
    error: null,
    refetch: vi.fn().mockResolvedValue(undefined),
    ...mockContext,
  };

  return render(
    <CitiesContext.Provider value={contextValue}>
      <FlightSearchForm />
    </CitiesContext.Provider>
  );
};

describe("Test for FlightSearchForm />", () => {

  it("should render cities in datalists", () => {
    renderWithCitiesContext({ cities: ["Mumbai", "Delhi", "Bangalore"] });
    const datalist = document.querySelector("#source-list");
    expect(datalist).toBeInTheDocument();
    const options = datalist!.querySelectorAll("option");
    expect(options.length).toBe(3);
    const values = Array.from(options).map((opt) => opt.getAttribute("value"));
    expect(values).toEqual(["Mumbai", "Delhi", "Bangalore"]);
  });

  it("should update form fields on change", () => {
    renderWithCitiesContext({
      cities: ["Mumbai", "Delhi"],
    });

    const sourceInput = screen.getByLabelText(/source/i);
    fireEvent.change(sourceInput, {
      target: { name: "source", value: "Mumbai" },
    });
    expect(sourceInput).toHaveValue("Mumbai");
    const destInput = screen.getByLabelText(/destination/i);
    fireEvent.change(destInput, {
      target: { name: "destination", value: "Delhi" },
    });
    expect(destInput).toHaveValue("Delhi");
    const dateInput = screen.getByLabelText(/departure date/i);
    fireEvent.change(dateInput, {
      target: { name: "date", value: "2025-08-01" },
    });
    expect(dateInput).toHaveValue("2025-08-01");
    const passengersInput = screen.getByLabelText(/number of passengers/i);
    fireEvent.change(passengersInput, {
      target: { name: "passengers", value: 3 },
    });
    expect(passengersInput).toHaveValue(3);
    const classSelect = screen.getByLabelText(/class type/i);
    fireEvent.change(classSelect, {
      target: { name: "class_type", value: "business" },
    });
    expect(classSelect).toHaveValue("business");
  });

  it("should submit the form and displays flights on success", async () => {
    const mockFlights: FlightSearchResult[] = [
      {
        flight_number: "F100",
        source: "Mumbai",
        destination: "Delhi",
        departure_time: "2025-08-01T10:00:00Z",
        arrival_time: "2025-08-01T14:00:00Z",
        total_fare: 500,
        departure_date: "2025-08-01",
        arrival_date: "2025-08-01",
        class_type: "economy",
        available_seats: 10,
        price_per_person: 10,
        base_price: 10,
        extra_price: 10,
      },
    ];
    vi.mocked(fetchFlights).mockResolvedValue(mockFlights);
    renderWithCitiesContext();
    fireEvent.change(screen.getByLabelText(/source/i), {
      target: { name: "source", value: "Mumbai" },
    });
    fireEvent.change(screen.getByLabelText(/destination/i), {
      target: { name: "destination", value: "Delhi" },
    });
    fireEvent.change(screen.getByLabelText(/departure date/i), {
      target: { name: "date", value: "2025-08-01" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Search Flights/i }));
    await waitFor(() => {
      expect(fetchFlights).toHaveBeenCalled();
    });
    expect(screen.getByText(/F100/i)).toBeInTheDocument();
  });

  it("should throw error if getFlights fails after search is clicked", async () => {
    vi.mocked(fetchFlights).mockRejectedValueOnce(new Error("Failed to fetch"));
    window.alert = vi.fn();
    renderWithCitiesContext();
    fireEvent.change(screen.getByLabelText(/source/i), {
      target: { name: "source", value: "Mumbai" },
    });
    fireEvent.change(screen.getByLabelText(/destination/i), {
      target: { name: "destination", value: "Delhi" },
    });
    fireEvent.change(screen.getByLabelText(/departure date/i), {
      target: { name: "date", value: "2025-08-01" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Search Flights/i }));
    await waitFor(() => {
      expect(fetchFlights).toHaveBeenCalled();
    });
  });

  it("swaps source and destination when swap button is clicked", () => {
    renderWithCitiesContext();

    const sourceInput = screen.getByLabelText("Source:") as HTMLInputElement;
    const destinationInput = screen.getByLabelText(
      "Destination:"
    ) as HTMLInputElement;
    fireEvent.change(sourceInput, { target: { value: "Bangalore" } });
    fireEvent.change(destinationInput, { target: { value: "London" } });
    expect(sourceInput.value).toBe("Bangalore");
    expect(destinationInput.value).toBe("London");
    const swapButton = screen.getByRole("button", {
      name: /swap/i,
    });
    fireEvent.click(swapButton);
    expect(sourceInput.value).toBe("London");
    expect(destinationInput.value).toBe("Bangalore");
  });

  it("should render previous and next buttons after search", async () => {
    const mockFlights: FlightSearchResult[] = [
      {
        flight_number: "F100",
        source: "Mumbai",
        destination: "Delhi",
        departure_time: "2025-08-01T10:00:00Z",
        arrival_time: "2025-08-01T14:00:00Z",
        total_fare: 500,
        departure_date: "2025-08-01",
        arrival_date: "2025-08-01",
        class_type: "economy",
        available_seats: 10,
        price_per_person: 10,
        base_price: 10,
        extra_price: 10,
      },
    ];

    vi.mocked(fetchFlights).mockResolvedValueOnce(mockFlights);
    renderWithCitiesContext();

    fireEvent.change(screen.getByLabelText(/source/i), {
      target: { name: "source", value: "Mumbai" },
    });
    fireEvent.change(screen.getByLabelText(/destination/i), {
      target: { name: "destination", value: "Delhi" },
    });
    fireEvent.change(screen.getByLabelText(/departure date/i), {
      target: { name: "date", value: "2025-08-01" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Search Flights/i }));

    await waitFor(() => {
      expect(fetchFlights).toHaveBeenCalled();
    });

    expect(
      screen.getByRole("button", { name: /Previous/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
  });

  it("should not render previous and next buttons before search", () => {
    renderWithCitiesContext();
    expect(
      screen.queryByRole("button", { name: /Previous/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Next/i })
    ).not.toBeInTheDocument();
  });

  it("should render previous and next buttons when flights are available", async () => {
    const mockFlights: FlightSearchResult[] = [
      {
        flight_number: "F100",
        source: "Mumbai",
        destination: "Delhi",
        departure_time: "2025-08-01T10:00:00Z",
        arrival_time: "2025-08-01T14:00:00Z",
        total_fare: 500,
        departure_date: "2025-08-01",
        arrival_date: "2025-08-01",
        class_type: "economy",
        available_seats: 10,
        price_per_person: 10,
        base_price: 10,
        extra_price: 10,
      },
    ];
    vi.mocked(fetchFlights).mockResolvedValueOnce(mockFlights);

    renderWithCitiesContext();
    fireEvent.change(screen.getByLabelText(/source/i), {
      target: { name: "source", value: "Mumbai" },
    });
    fireEvent.change(screen.getByLabelText(/destination/i), {
      target: { name: "destination", value: "Delhi" },
    });
    fireEvent.change(screen.getByLabelText(/departure date/i), {
      target: { name: "date", value: "2025-08-01" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Search Flights/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Previous/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
    });
  });

  it("should not render previous and next buttons when no flights are available after search", async () => {
    vi.mocked(fetchFlights).mockResolvedValueOnce([]);

    renderWithCitiesContext();
    fireEvent.change(screen.getByLabelText(/source/i), {
      target: { name: "source", value: "Mumbai" },
    });
    fireEvent.change(screen.getByLabelText(/destination/i), {
      target: { name: "destination", value: "Delhi" },
    });
    fireEvent.change(screen.getByLabelText(/departure date/i), {
      target: { name: "date", value: "2025-08-01" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Search Flights/i }));

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /Previous/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /Next/i })
      ).not.toBeInTheDocument();
    });
  });

  it("should disable previous button if date is today", async () => {
    const today = new Date().toISOString().split("T")[0];
    const mockFlights: FlightSearchResult[] = [
      {
        flight_number: "F100",
        source: "Mumbai",
        destination: "Delhi",
        departure_time: `${today}T10:00:00Z`,
        arrival_time: `${today}T14:00:00Z`,
        total_fare: 500,
        departure_date: today,
        arrival_date: today,
        class_type: "economy",
        available_seats: 10,
        price_per_person: 10,
        base_price: 10,
        extra_price: 10,
      },
    ];
    vi.mocked(fetchFlights).mockResolvedValueOnce(mockFlights);

    renderWithCitiesContext();
    fireEvent.change(screen.getByLabelText(/source/i), {
      target: { name: "source", value: "Mumbai" },
    });
    fireEvent.change(screen.getByLabelText(/destination/i), {
      target: { name: "destination", value: "Delhi" },
    });
    fireEvent.change(screen.getByLabelText(/departure date/i), {
      target: { name: "date", value: today },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Search Flights/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Previous/i })).toBeDisabled();
    });
  });

  it("should disable next button if date is max date", async () => {
    const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3))
      .toISOString()
      .split("T")[0];
    const mockFlights: FlightSearchResult[] = [
      {
        flight_number: "F200",
        source: "Mumbai",
        destination: "Delhi",
        departure_time: `${maxDate}T09:00:00Z`,
        arrival_time: `${maxDate}T12:00:00Z`,
        total_fare: 450,
        departure_date: maxDate,
        arrival_date: maxDate,
        class_type: "economy",
        available_seats: 10,
        price_per_person: 10,
        base_price: 10,
        extra_price: 10,
      },
    ];
    vi.mocked(fetchFlights).mockResolvedValueOnce(mockFlights);

    renderWithCitiesContext();
    fireEvent.change(screen.getByLabelText(/source/i), {
      target: { name: "source", value: "Mumbai" },
    });
    fireEvent.change(screen.getByLabelText(/destination/i), {
      target: { name: "destination", value: "Delhi" },
    });
    fireEvent.change(screen.getByLabelText(/departure date/i), {
      target: { name: "date", value: maxDate },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Search Flights/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Next/i })).toBeDisabled();
    });
  });

  it("should render the flights available on clicking previous button", async () => {
    const initialDate = "2025-08-02";
    const prevDate = "2025-08-01";

    const initialFlights: FlightSearchResult[] = [
      {
        flight_number: "F200",
        source: "Mumbai",
        destination: "Delhi",
        departure_time: `${initialDate}T10:00:00Z`,
        arrival_time: `${initialDate}T14:00:00Z`,
        total_fare: 600,
        departure_date: initialDate,
        arrival_date: initialDate,
        class_type: "economy",
        available_seats: 10,
        price_per_person: 10,
        base_price: 10,
        extra_price: 10,
      },
    ];

    const prevFlights: FlightSearchResult[] = [
      {
        flight_number: "F100",
        source: "Mumbai",
        destination: "Delhi",
        departure_time: `${prevDate}T10:00:00Z`,
        arrival_time: `${prevDate}T14:00:00Z`,
        total_fare: 500,
        departure_date: prevDate,
        arrival_date: prevDate,
        class_type: "economy",
        available_seats: 10,
        price_per_person: 10,
        base_price: 10,
        extra_price: 10,
      },
    ];

    vi.mocked(fetchFlights).mockResolvedValueOnce(initialFlights);
    renderWithCitiesContext();

    fireEvent.change(screen.getByLabelText(/source/i), {
      target: { name: "source", value: "Mumbai" },
    });
    fireEvent.change(screen.getByLabelText(/destination/i), {
      target: { name: "destination", value: "Delhi" },
    });
    fireEvent.change(screen.getByLabelText(/departure date/i), {
      target: { name: "date", value: initialDate },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Search Flights/i }));

    await waitFor(() => {
      expect(fetchFlights).toHaveBeenCalledWith(
        expect.objectContaining({ date: initialDate })
      );
    });

    vi.mocked(fetchFlights).mockResolvedValueOnce(prevFlights);

    fireEvent.click(screen.getByRole("button", { name: /Previous/i }));

    await waitFor(() => {
      expect(fetchFlights).toHaveBeenCalledWith(
        expect.objectContaining({ date: prevDate })
      );
      expect(screen.getByText(/F100/)).toBeInTheDocument();
    });
  });

  it("should render the flights available on clicking next button", async () => {
    const initialDate = "2025-08-01";
    const nextDate = "2025-08-02";

    const initialFlights: FlightSearchResult[] = [
      {
        flight_number: "F100",
        source: "Mumbai",
        destination: "Delhi",
        departure_time: `${initialDate}T10:00:00Z`,
        arrival_time: `${initialDate}T14:00:00Z`,
        total_fare: 500,
        departure_date: initialDate,
        arrival_date: initialDate,
        class_type: "economy",
        available_seats: 10,
        price_per_person: 10,
        base_price: 10,
        extra_price: 10,
      },
    ];

    const nextFlights: FlightSearchResult[] = [
      {
        flight_number: "F200",
        source: "Mumbai",
        destination: "Delhi",
        departure_time: `${nextDate}T10:00:00Z`,
        arrival_time: `${nextDate}T14:00:00Z`,
        total_fare: 600,
        departure_date: nextDate,
        arrival_date: nextDate,
        class_type: "economy",
        available_seats: 10,
        price_per_person: 10,
        base_price: 10,
        extra_price: 10,
      },
    ];

    vi.mocked(fetchFlights).mockResolvedValueOnce(initialFlights);
    renderWithCitiesContext();

    fireEvent.change(screen.getByLabelText(/source/i), {
      target: { name: "source", value: "Mumbai" },
    });
    fireEvent.change(screen.getByLabelText(/destination/i), {
      target: { name: "destination", value: "Delhi" },
    });
    fireEvent.change(screen.getByLabelText(/departure date/i), {
      target: { name: "date", value: initialDate },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Search Flights/i }));

    await waitFor(() => {
      expect(fetchFlights).toHaveBeenCalledWith(
        expect.objectContaining({ date: initialDate })
      );
    });

    vi.mocked(fetchFlights).mockResolvedValueOnce(nextFlights);

    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    await waitFor(() => {
      expect(fetchFlights).toHaveBeenCalledWith(
        expect.objectContaining({ date: nextDate })
      );
      expect(screen.getByText(/F200/)).toBeInTheDocument();
    });
  });

  it("should handle error and show alert message when adjustDate fails", async () => {
    const mockFlights: FlightSearchResult[] = [
      {
        flight_number: "F300",
        source: "Mumbai",
        destination: "Delhi",
        departure_time: "2025-08-02T08:00:00Z",
        arrival_time: "2025-08-02T10:00:00Z",
        total_fare: 700,
        departure_date: "2025-08-02",
        arrival_date: "2025-08-02",
        class_type: "economy",
        available_seats: 10,
        price_per_person: 10,
        base_price: 10,
        extra_price: 10,
      },
    ];

    vi.mocked(fetchFlights)
      .mockResolvedValueOnce(mockFlights)
      .mockRejectedValueOnce(new Error("Failed to fetch adjusted date"));

    renderWithCitiesContext();

    fireEvent.change(screen.getByLabelText(/source/i), {
      target: { name: "source", value: "Mumbai" },
    });
    fireEvent.change(screen.getByLabelText(/destination/i), {
      target: { name: "destination", value: "Delhi" },
    });
    fireEvent.change(screen.getByLabelText(/departure date/i), {
      target: { name: "date", value: "2025-08-02" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Search Flights/i }));

    await waitFor(() => {
      expect(screen.getByText(/F300/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to fetch adjusted date/i)
      ).toBeInTheDocument();
    });

    expect(screen.queryByText(/F300/i)).not.toBeInTheDocument();
  });
});
