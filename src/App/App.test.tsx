import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { App } from "./App";

vi.mock("../components/Navbar/Navbar", () => ({
  default: () => <div>Mock Navbar</div>,
}));

vi.mock("../components/Footer/Footer", () => ({
  default: () => <div>Mock Footer</div>,
}));

vi.mock("../pages/HomePage", () => ({
  default: () => <div>Home Page</div>,
}));

vi.mock("../pages/Login/Login", () => ({
  default: () => <div>Login Page</div>,
}));

describe("App routing with Vitest", () => {
  test("renders Navbar and Footer on all routes", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Navbar")).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
  });

  test("renders HomePage at '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders Login page at '/login'", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("shows nothing for unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/random"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.queryByText("Home Page")).not.toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });
});
