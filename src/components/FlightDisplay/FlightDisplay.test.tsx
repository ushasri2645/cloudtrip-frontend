import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { bookFlight } from "../../services/BookFlight";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import FlightDisplay from "./FlightDisplay";

vi.mock("../../services/BookFlight");

const mockFlight: FlightSearchResult = {
  flight_number: "XY123",
  source: "New York",
  destination: "London",
  departure_date: "2025-07-20",
  departure_time: "10:30",
  arrival_date: "2025-07-21",
  arrival_time: "02:00",
  class_type: "economy",
  available_seats: 50,
  base_price: 300,
  extra_price: 50,
  price_per_person: 350,
  total_fare: 700,
};

describe("FlightDisplay", () => {
  it("should render flight information correctly for passengers greater than 2", () => {
    render(<FlightDisplay flight={mockFlight} passengers={2} />);
    expect(screen.getByText("New York → London")).toBeInTheDocument();
    expect(screen.getByText("Flight XY123")).toBeInTheDocument();
    expect(screen.getByText("2025-07-20 at 12:00 AM")).toBeInTheDocument();
    expect(screen.getByText("2025-07-21 at 12:00 AM")).toBeInTheDocument();
    expect(screen.getByText("ECONOMY")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(
      screen.getByText("Total Fare for 2 passengers:")
    ).toBeInTheDocument();
    expect(screen.getByText(/\$700/)).toBeInTheDocument();

    expect(screen.getByText("Base price:")).toBeInTheDocument();
        expect(screen.getByText(/\$300/)).toBeInTheDocument();

    expect(screen.getByText("Dynamic Price:")).toBeInTheDocument();
        expect(screen.getByText(/\$50/)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Book Now" })
    ).toBeInTheDocument();
  });

  it("should render flight information correctly for one passenger", () => {
    render(<FlightDisplay flight={mockFlight} passengers={1} />);
    expect(screen.getByText("Total Fare for 1 passenger:")).toBeInTheDocument();
  });

  it("should show success alert on booking success", async () => {
    vi.mocked(bookFlight).mockResolvedValue(true);
    render(<FlightDisplay flight={mockFlight} passengers={2} />);
    const button = screen.getByRole("button", { name: "Book Now" });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText("Booking Successful!")).toBeInTheDocument();
    });
  });

  it("should shows failur alert on booking error", async () => {
    vi.mocked(bookFlight).mockRejectedValue(new Error("Server error"));
    render(<FlightDisplay flight={mockFlight} passengers={2} />);
    const button = screen.getByRole("button", { name: "Book Now" });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText("Server error")).toBeInTheDocument();
    });
  });

  it("should get CustomAlert component visible on booking success and navigates on close", async () => {
    vi.mocked(bookFlight).mockResolvedValue(true);
    render(<FlightDisplay flight={mockFlight} passengers={2} />);
    fireEvent.click(screen.getByRole("button", { name: "Book Now" }));
    await waitFor(() => {
      expect(screen.getByText("Booking Successful!")).toBeInTheDocument();
    });
    expect(screen.getByText("Success")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "OK" }));
    expect(window.location.href).toBe("http://localhost:3000/");
  });

  it("should get CustomAlert component visible on booking failure and does NOT navigate", async () => {
    vi.mocked(bookFlight).mockRejectedValue(new Error("Something went wrong"));
    render(<FlightDisplay flight={mockFlight} passengers={2} />);
    fireEvent.click(screen.getByRole("button", { name: "Book Now" }));
    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
    expect(screen.getByText("Booking Failed")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "OK" }));
    expect(window.location.href).not.toBe("/");
  });
});
