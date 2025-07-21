import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  it("should renders footer with logo and current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} CloudTrip | All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("should renders logo image with correct alt text", () => {
    render(<Footer />);
    const logo = screen.getByAltText(/CloudTrip Logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src");
  });
});
