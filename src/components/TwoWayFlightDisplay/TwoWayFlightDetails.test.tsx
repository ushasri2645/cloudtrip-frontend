import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import TwoWayFlightDetails from "./TwoWayFlightDetails";

vi.mock("../CustomAlert/CustomAlert", () => ({
  CustomAlert: ({
    message,
    onClose,
  }: {
    message: string;
    onClose: () => void;
  }) => (
    <div>
      <div>{message}</div>
      <button onClick={onClose}>Close Alert</button>
    </div>
  ),
}));

vi.mock("../../services/BookTwoWayFlight", () => ({
  bookTwoWayFlight: vi.fn(),
}));

import { bookTwoWayFlight } from "../../services/BookTwoWayFlight";

const mockOnwardFlight: FlightSearchResult = {
  flight_number: "AI101",
  class_type: "economy",
  source: "DEL",
  destination: "BLR",
  departure_date: "2025-08-01",
  departure_time: "06:00",
  arrival_date: "2025-08-01",
  arrival_time: "08:00",
  available_seats: 20,
  base_price: 4000,
  extra_price: 1000,
  total_fare: 5000,
  price_per_person: 0,
  recurrence_days: ""
};

const mockReturnFlight: FlightSearchResult = {
  flight_number: "AI102",
  class_type: "economy",
  source: "BLR",
  destination: "DEL",
  departure_date: "2025-08-05",
  departure_time: "10:00",
  arrival_date: "2025-08-05",
  arrival_time: "12:00",
  available_seats: 18,
  base_price: 4500,
  extra_price: 1500,
  total_fare: 6000,
  price_per_person: 0,
  recurrence_days: ""
};

const setup = () => {
  const onModalClose = vi.fn();

  render(
    <TwoWayFlightDetails
      onwardFlight={mockOnwardFlight}
      returnFlight={mockReturnFlight}
      onModalClose={onModalClose}
      passengers={2}
    />
  );

  return { onModalClose };
};

describe("Tests for TwoWayFlightDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render flight details correctly", () => {
    setup();

    expect(screen.getByText("Round Trip Flight Details")).toBeInTheDocument();
    expect(screen.getByText(/Onward Flight/)).toBeInTheDocument();
    expect(screen.getByText(/Return Flight/)).toBeInTheDocument();
    expect(screen.getByText(/AI101/)).toBeInTheDocument();
    expect(screen.getByText(/AI102/)).toBeInTheDocument();
    expect(
      screen.getByText(/Total Fare \(Before Discount\):/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Book Now/i })
    ).toBeInTheDocument();
  });

  it("should show success message on successful booking", async () => {
    vi.mocked(bookTwoWayFlight).mockResolvedValue(true);

    setup();

    fireEvent.click(screen.getByRole("button", { name: /Book Now/i }));

    await screen.findByText("Round Trip Booking Successful!");
    expect(bookTwoWayFlight).toHaveBeenCalled();
  });

  it("should show error message on booking failure", async () => {
    vi.mocked(bookTwoWayFlight).mockRejectedValue(new Error("Booking failed"));

    setup();

    fireEvent.click(screen.getByRole("button", { name: /Book Now/i }));

    await screen.findByText("Booking failed");
  });

  it("should call onModalClose when close button is clicked", () => {
    const { onModalClose } = setup();

    fireEvent.click(screen.getByText("✕"));
    expect(onModalClose).toHaveBeenCalled();
  });

  it("should clear alert and redirect to home on successful booking alert close", async () => {
    vi.mocked(bookTwoWayFlight).mockResolvedValue(true);
    const { onModalClose } = setup();
    fireEvent.click(screen.getByRole("button", { name: /Book Now/i }));
    await screen.findByText("Round Trip Booking Successful!");
    fireEvent.click(screen.getByRole("button", { name: /Close Alert/i }));
    expect(onModalClose).toHaveBeenCalled();
    expect(window.location.pathname).toBe("/");
  });
  
});
