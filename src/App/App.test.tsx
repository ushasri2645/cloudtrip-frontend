import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App Component", () => {
  it("renders the Navbar component", () => {
    render(<App />);
    const brandName = screen.getByText(/CloudTrip/i);
    expect(brandName).toBeInTheDocument();
  });

  it("renders the navigation element", () => {
    render(<App />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
});