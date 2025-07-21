import { render, screen } from "@testing-library/react";
import SpecialOffers from "./SpecialOffers";

describe("SpecialOffers component", () => {
  it("should render the heading correctly", () => {
    render(<SpecialOffers />);
    const heading = screen.getByRole("heading", { name: /recommended places/i });
    expect(heading).toBeInTheDocument();
  });

  it("should render all offer cards", () => {
    render(<SpecialOffers />);
    const cards = screen.getAllByRole("img");
    expect(cards.length).toBe(3);
  });

  it("should display each destination title", () => {
    render(<SpecialOffers />);
    expect(screen.getByText(/los angeles/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /paris/i })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Sydney/i })).toBeInTheDocument();
  });

  it("should render correct descriptions", () => {
    render(<SpecialOffers />);
    expect(
      screen.getByText(/glamorous escape with Hollywood tours/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/elegance of Paris with gourmet dining/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Opera House, Bondi Beach, and harbor cruises/i)
    ).toBeInTheDocument();
  });
});
