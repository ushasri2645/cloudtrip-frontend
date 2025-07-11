import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FlightSearchForm } from "./SearchForm";

import {
  CitiesContext,
  type CitiesContextType,
} from "../../contexts/Cities/CitiesContext";

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
  it("should render all form fields", () => {
    renderWithCitiesContext();
    expect(screen.getByLabelText(/Source/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Departure Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Passengers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Class Type/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Search Flights/i })
    ).toBeInTheDocument();
  });

  it("should render cities in datalists", () => {
    renderWithCitiesContext({ cities: ["Mumbai", "Delhi", "Bangalore"] });
    const datalist = document.querySelector("#source-list");
    expect(datalist).toBeInTheDocument();
    const options = datalist!.querySelectorAll("option");
    expect(options.length).toBe(3);
    const values = Array.from(options).map((opt) => opt.getAttribute("value"));
    expect(values).toEqual(["Mumbai", "Delhi", "Bangalore"]);
  });

  it("should call refetch when refresh button is clicked", async () => {
    const refetch = vi.fn().mockResolvedValue(undefined);
    renderWithCitiesContext({ refetch });

    const refreshBtn = screen.getByRole("button", { name: /Refresh Cities/i });
    fireEvent.click(refreshBtn);

    await waitFor(() => {
      expect(refetch).toHaveBeenCalled();
    });
  });

  it("should render class type select with all options", () => {
    renderWithCitiesContext({
      cities: [],
    });
    const select = screen.getByLabelText(/class type/i);
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("economy");
    const options = screen.getAllByRole("option");
    const classTypeOptions = options.filter((opt) =>
      ["Economy", "Business", "First Class"].includes(opt.textContent || "")
    );
    expect(classTypeOptions).toHaveLength(3);
    expect(classTypeOptions.map((option) => option.textContent)).toEqual([
      "Economy",
      "Business",
      "First Class",
    ]);

    expect(
      classTypeOptions.map((option) => option.getAttribute("value"))
    ).toEqual(["economy", "business", "first_class"]);
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
});
