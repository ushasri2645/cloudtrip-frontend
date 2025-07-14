import { render, screen } from "@testing-library/react";
import type { FlightSearchResult } from "../../types/FlightSearchResult";
import FlightDisplay from "./FlightDisplay";

const mockFlight: FlightSearchResult = {
    flight_number: "XY123",
    source: "New York",
    destination: "London",
    departure_date: "2025-07-20",
    departure_time: "10:30",
    arrival_date: "2025-07-21",
    arrival_time: "02:00",
    class_type: "economy",
    economy_seats: 50,
    business_seats: 10,
    first_class_seats: 5,
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
        expect(screen.getByText("2025-07-20 at 10:30")).toBeInTheDocument();
        expect(screen.getByText("2025-07-21 at 02:00")).toBeInTheDocument();
        expect(screen.getByText("ECONOMY")).toBeInTheDocument();
        expect(screen.getByText("50")).toBeInTheDocument();
        expect(screen.getByText("Total Fare for 2 passengers:")).toBeInTheDocument();
        expect(screen.getByText("$700.00")).toBeInTheDocument();
        expect(screen.getByText("Price per person:")).toBeInTheDocument();
        expect(screen.getByText("$350.00")).toBeInTheDocument();
        expect(screen.getByText("Base price:")).toBeInTheDocument();
        expect(screen.getByText("$300.00")).toBeInTheDocument();
        expect(screen.getByText("Dynamic Price:")).toBeInTheDocument();
        expect(screen.getByText("$50.00")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Book Now" })).toBeInTheDocument();
    });

     it("should render flight information correctly for one passenger", () => {
        render(<FlightDisplay flight={mockFlight} passengers={1} />);
        expect(screen.getByText("Total Fare for 1 passenger:")).toBeInTheDocument();
    });
});
