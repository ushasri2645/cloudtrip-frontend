import { render, screen, fireEvent } from "@testing-library/react";
import { CustomAlert } from "./CustomAlert";
import { vi } from "vitest";

describe("Tests for CustomAlert Component", () => {
  it("should render success title and message", () => {
    const message = "Booking completed successfully!";
    const onClose = vi.fn();

    render(<CustomAlert message={message} failure={false} onClose={onClose} />);
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should render failure title and message", () => {
    const message = "Booking could not be completed.";
    const onClose = vi.fn();

    render(<CustomAlert message={message} failure={true} onClose={onClose} />);
    expect(screen.getByText("Booking Failed")).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should call onClose when OK button is clicked", () => {
    const message = "Any message";
    const onClose = vi.fn();

    render(<CustomAlert message={message} failure={false} onClose={onClose} />);

    const button = screen.getByText("OK");
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalled();
  });
});
