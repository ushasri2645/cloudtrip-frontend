import { render, screen } from "@testing-library/react";
import { Hero } from "./HeroSection";

describe("Hero Component", () => {
  it("should renders the main heading", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", {
      name: /Travel Beyond Boundaries/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
