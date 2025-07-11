import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the welcome message", () => {
    render(<App />);
    expect(screen.getByText(/Welcome to Cloud Trip/i)).toBeTruthy();
  });
});
