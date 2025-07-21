import { render, screen } from "@testing-library/react";
import AboutUs from "./AboutUs";

describe("AboutUs Component", () => {
  test("renders AboutUs section with heading and content", () => {
    render(<AboutUs />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "About CloudTrip ✈️"
    );

    expect(
      screen.getByText(/travel should be joyful, seamless, and memorable/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Built with passion by travel enthusiasts/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Simple. Smart. Secure/i)).toBeInTheDocument();
  });
});
