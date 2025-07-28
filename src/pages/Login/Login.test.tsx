import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./login";

describe("Login Component", () => {
  test("renders login form elements", () => {
    render(<Login />);

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();

    expect(
      screen.getByText(/login to continue your journey/i)
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  test("submits the form without error", () => {
    render(<Login />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByRole("button", { name: /log in/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("password123");
  });
});
