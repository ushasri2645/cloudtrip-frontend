import { render, screen } from "@testing-library/react";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import { FlightsDisplay } from "./FlightsDisplay";

const mockFlights: FlightSearchResult[] = [
  {
    flight_number: "AB123",
    source: "Paris",
    destination: "Rome",
    departure_date: "2025-07-20",
    departure_time: "08:00",
    arrival_date: "2025-07-20",
    arrival_time: "10:00",
    class_type: "economy",
    economy_seats: 20,
    business_seats: 5,
    first_class_seats: 2,
    base_price: 150,
    extra_price: 25,
    price_per_person: 175,
    total_fare: 350,
  },
];

describe("FlightsDisplay", () => {
  it("should render a message when there are no flights", () => {
    render(<FlightsDisplay flights={[]} passengers={2} />);
    expect(screen.getByText("No flights found")).toBeInTheDocument();
  });

  it("should render flight results when flights are available", () => {
    render(<FlightsDisplay flights={mockFlights} passengers={2} />);
    expect(screen.getByText("Flight AB123")).toBeInTheDocument();
    expect(screen.queryByText("No flights found")).not.toBeInTheDocument();
  });

  it("should render the previous and next buttons", () => {
    render(<FlightsDisplay flights={mockFlights} passengers={2} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
