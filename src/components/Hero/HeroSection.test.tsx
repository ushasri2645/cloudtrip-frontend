import { render, screen } from "@testing-library/react";
import { Hero } from "./HeroSection";

describe("Hero Component", () => {
  it("renders the main heading", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", {
      name: /Travel Beyond Boundaries/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the subheader paragraph", () => {
    render(<Hero />);
    const subHeader = screen.getByText(
      /Search for flights to your dream destinations and book with ease./i
    );
    expect(subHeader).toBeInTheDocument();
  });
});
