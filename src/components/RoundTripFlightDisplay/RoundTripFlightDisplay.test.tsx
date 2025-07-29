import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import RoundTripFlightDisplay from "./RoundTripFlightDisplay";

const mockFlight: FlightSearchResult = {
  flight_number: "AI202",
  source: "HYD",
  destination: "DEL",
  departure_date: "2025-08-01T06:00:00Z",
  arrival_date: "2025-08-01T08:30:00Z",
  available_seats: 12,
  base_price: 5000,
  extra_price: 1500,
  total_fare: 6500,
  class_type: "economy",
  departure_time: "",
  arrival_time: "",
  price_per_person: 0,
  recurrence_days: "",
};

describe("Tests for RoundTripFlightDisplay", () => {
  const mockHandleOnwardSelect = vi.fn();
  const mockHandleReturnSelect = vi.fn();
  const mockSetOpen = vi.fn();

  it("should render flight route and number", () => {
    render(
      <RoundTripFlightDisplay
        flight={mockFlight}
        passengers={2}
        selectedCurrency="INR"
        handleOnwardSelect={mockHandleOnwardSelect}
        handleReturnSelect={mockHandleReturnSelect}
        tab="onwards"
        isSelected={true}
        setOpen={mockSetOpen}
        selectedOnward={null}
        selectedReturn={null}
      />
    );

    expect(screen.getByText("HYD → DEL")).toBeInTheDocument();
    expect(screen.getByText(/Flight AI202/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Total Fare for 2 passengers/i)
    ).toBeInTheDocument();
  });

  it("should call handleOnwardSelect when 'Next' is clicked in onwards tab", async () => {
    render(
      <RoundTripFlightDisplay
        flight={mockFlight}
        passengers={1}
        selectedCurrency="INR"
        handleOnwardSelect={mockHandleOnwardSelect}
        handleReturnSelect={mockHandleReturnSelect}
        tab="onwards"
        isSelected={true}
        setOpen={mockSetOpen}
        selectedOnward={null}
        selectedReturn={null}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Next/i }));
    await waitFor(() => {
      expect(mockHandleOnwardSelect).toHaveBeenCalledWith(mockFlight);
    });
  });

  it("should call handleReturnSelect and setOpen when 'Next' is clicked in return tab", async () => {
    render(
      <RoundTripFlightDisplay
        flight={mockFlight}
        passengers={1}
        selectedCurrency="INR"
        handleOnwardSelect={mockHandleOnwardSelect}
        handleReturnSelect={mockHandleReturnSelect}
        tab="return"
        isSelected={true}
        setOpen={mockSetOpen}
        selectedOnward={null}
        selectedReturn={null}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Next/i }));
    await waitFor(() => {
      expect(mockHandleReturnSelect).toHaveBeenCalledWith(mockFlight);
      expect(mockSetOpen).toHaveBeenCalledWith(true);
    });
  });

  it("should disable 'Next' button in return tab if not selected", () => {
    render(
      <RoundTripFlightDisplay
        flight={mockFlight}
        passengers={1}
        selectedCurrency="INR"
        handleOnwardSelect={mockHandleOnwardSelect}
        handleReturnSelect={mockHandleReturnSelect}
        tab="return"
        isSelected={false}
        setOpen={mockSetOpen}
        selectedOnward={null}
        selectedReturn={null}
      />
    );

    const button = screen.getByRole("button", { name: /Next/i });
    expect(button).toBeDisabled();
  });

  it("should display price breakdown correctly", () => {
    render(
      <RoundTripFlightDisplay
        flight={mockFlight}
        passengers={1}
        selectedCurrency="INR"
        handleOnwardSelect={mockHandleOnwardSelect}
        handleReturnSelect={mockHandleReturnSelect}
        tab="onwards"
        isSelected={true}
        setOpen={mockSetOpen}
        selectedOnward={null}
        selectedReturn={null}
      />
    );

    expect(screen.getByText(/Base price:/i)).toBeInTheDocument();
    expect(screen.getByText(/Dynamic Price:/i)).toBeInTheDocument();
  });
  it("should apply selectedCard class when flight is selected", () => {
    render(
      <RoundTripFlightDisplay
        flight={mockFlight}
        passengers={1}
        selectedCurrency="INR"
        handleOnwardSelect={mockHandleOnwardSelect}
        handleReturnSelect={mockHandleReturnSelect}
        tab="onwards"
        isSelected={true}
        setOpen={mockSetOpen}
        selectedOnward={mockFlight}
        selectedReturn={null}
      />
    );
    const allDivs = document.querySelectorAll("div");

    const selectedCardExists = Array.from(allDivs).some((div) =>
      div.className.includes("selectedCard")
    );

    expect(selectedCardExists).toBe(true);
  });
});
