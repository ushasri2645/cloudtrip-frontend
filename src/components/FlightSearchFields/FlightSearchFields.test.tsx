import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FlightSearchFields } from "./FlightSearchFields";
import type { FlightSearchFormData } from "../../types/FlightSearchForm";

const mockFormData: FlightSearchFormData = {
  source: "",
  destination: "",
  date: "2025-08-01",
  passengers: 1,
  class_type: "economy",
};

describe("Test for FlightSearchFields Component", () => {
  it("should renders all form fields properly", () => {
    render(
      <FlightSearchFields
        formData={mockFormData}
        handleChange={vi.fn()}
        handleSwap={vi.fn()}
        cities={["Mumbai", "Delhi"]}
        todayString="2025-07-01"
        maxDateString="2025-12-31"
        handleCurrencyChange={vi.fn()}
        selectedCurrency="INR"
      />
    );

    expect(screen.getByLabelText(/Source/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Departure Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Passengers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Class Type/i)).toBeInTheDocument();
  });

  it("renders currency dropdown with default value and triggers handler on change", () => {
    const mockHandleCurrencyChange = vi.fn();

    render(
      <FlightSearchFields
        formData={mockFormData}
        handleChange={vi.fn()}
        handleSwap={vi.fn()}
        cities={["Mumbai", "Delhi"]}
        todayString="2025-07-01"
        maxDateString="2025-12-31"
        handleCurrencyChange={mockHandleCurrencyChange}
        selectedCurrency="INR"
      />
    );

    const dropdowns = screen.getAllByRole("combobox");
    const currencyDropdown = dropdowns[0];

    expect(currencyDropdown).toHaveValue("INR");
  });

  it("should call handleChange on input change", () => {
    const handleChange = vi.fn();
    render(
      <FlightSearchFields
        formData={mockFormData}
        handleChange={handleChange}
        handleSwap={vi.fn()}
        cities={["Mumbai", "Delhi"]}
        todayString="2025-07-01"
        maxDateString="2025-12-31"
        handleCurrencyChange={vi.fn()}
        selectedCurrency="INR"
      />
    );

    fireEvent.change(screen.getByLabelText(/Source/i), {
      target: { name: "source", value: "Mumbai" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("should calls handleSwap when swap button is clicked", () => {
    const handleSwap = vi.fn();
    render(
      <FlightSearchFields
        formData={mockFormData}
        handleChange={vi.fn()}
        handleSwap={handleSwap}
        cities={["Mumbai", "Delhi"]}
        todayString="2025-07-01"
        maxDateString="2025-12-31"
        handleCurrencyChange={vi.fn()}
        selectedCurrency="INR"
      />
    );

    const swapButton = screen.getByRole("button", { name: /Swap/i });
    fireEvent.click(swapButton);
    expect(handleSwap).toHaveBeenCalled();
  });
});
