import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Navbar from "./Navbar";
import styles from "./Navbar.module.css";

describe("Navbar Component", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("should renders without crashing", () => {
    render(<Navbar />);
    const brandName = screen.getByText(/CloudTrip/i);
    expect(brandName).toBeInTheDocument();
  });

  it("should renders logo image with correct alt text", () => {
    render(<Navbar />);
    const logo = screen.getByAltText(/CloudTrip Logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src");
  });

  it("should has the correct class names applied", () => {
    render(<Navbar />);
    const navElement = screen.getByRole("navigation");
    expect(navElement).toHaveClass(styles.navbar);
  });

  it("should calls scrollIntoView when About Us button is clicked", () => {
    const aboutSection = document.createElement("div");
    aboutSection.setAttribute("id", "about-us");
    document.body.appendChild(aboutSection);

    render(<Navbar />);

    const aboutUsButton = screen.getByRole("button", { name: /about us/i });
    fireEvent.click(aboutUsButton);

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    document.body.removeChild(aboutSection);
  });
  it("should calls scrollIntoView when Recomendations button is clicked", () => {
    const aboutSection = document.createElement("div");
    aboutSection.setAttribute("id", "about-us");
    document.body.appendChild(aboutSection);

    render(<Navbar />);

    const aboutUsButton = screen.getByRole("button", { name: /recommendations/i });
    fireEvent.click(aboutUsButton);

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    document.body.removeChild(aboutSection);
  });
});
