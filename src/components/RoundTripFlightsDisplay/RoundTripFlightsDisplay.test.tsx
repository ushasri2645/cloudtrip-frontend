import { fireEvent, render, screen } from "@testing-library/react";
import type { RoundTripSearchResult } from "../../types/RoundTripSearchResult";
import { RoundTripResults } from "./RoundTripFlightsDisplay";

const mockData: RoundTripSearchResult = {
  onwards: [
    {
      flight_number: "AI101",
      source: "HYD",
      destination: "DEL",
      departure_date: "2025-08-10",
      departure_time: "10:00",
      arrival_date: "2025-08-10",
      arrival_time: "12:00",
      class_type: "economy",
      available_seats: 5,
      total_fare: 6000,
      price_per_person: 2000,
      base_price: 1800,
      extra_price: 200,
    },
  ],
  return: [
    {
      flight_number: "AI102",
      source: "DEL",
      destination: "HYD",
      departure_date: "2025-08-15",
      departure_time: "18:00",
      arrival_date: "2025-08-15",
      arrival_time: "20:00",
      class_type: "economy",
      available_seats: 5,
      total_fare: 6000,
      price_per_person: 2000,
      base_price: 1800,
      extra_price: 200,
    },
  ],
};

describe("RoundTripResults", () => {
  it("renders onward flights by default", () => {
    render(
      <RoundTripResults data={mockData} passengers={2} selectedCurrency="INR" />
    );
    const elements = screen.getAllByText("HYD → DEL");
    expect(elements.length).toBeGreaterThanOrEqual(1);
    expect(elements[0].tagName).toBe("BUTTON");
    expect(screen.getByText("Flight AI101")).toBeInTheDocument();
    expect(screen.queryByText("Flight AI102")).not.toBeInTheDocument();
  });

  it("switches to return flights on tab click", () => {
    render(
      <RoundTripResults data={mockData} passengers={2} selectedCurrency="INR" />
    );
    const elements = screen.getAllByText("DEL → HYD");
    expect(elements.length).toBeGreaterThanOrEqual(1);
    fireEvent.click(elements[0]);
    expect(elements[0].tagName).toBe("BUTTON");
    expect(screen.getByText("Flight AI102")).toBeInTheDocument();
    expect(screen.queryByText("Flight AI101")).not.toBeInTheDocument();
  });

  it("has both direction buttons", () => {
    render(
      <RoundTripResults data={mockData} passengers={2} selectedCurrency="INR" />
    );
    const onwardElements = screen.getAllByText("HYD → DEL");
    expect(onwardElements.length).toBeGreaterThanOrEqual(1);
    const returnElements = screen.getAllByText("DEL → HYD");
    expect(returnElements.length).toBeGreaterThanOrEqual(1);
  });
});
