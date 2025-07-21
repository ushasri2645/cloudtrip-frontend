import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NavigationButtons } from './NavigationButtons'

describe("NavigationButtons", () => {
  it("should render both Previous and Next buttons", () => {
    render(
      <NavigationButtons
        isPrevDisabled={false}
        isNextDisabled={false}
        onPrev={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /Previous/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
  });

  it("should disable the Previous button when isPrevDisabled is true", () => {
    render(
      <NavigationButtons
        isPrevDisabled={true}
        isNextDisabled={false}
        onPrev={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /Previous/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Next/i })).not.toBeDisabled();
  });

  it("should disable the Next button when isNextDisabled is true", () => {
    render(
      <NavigationButtons
        isPrevDisabled={false}
        isNextDisabled={true}
        onPrev={() => {}}
        onNext={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /Next/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Previous/i })).not.toBeDisabled();
  });

  it("should call onPrev and onNext when buttons are clicked", () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();

    render(
      <NavigationButtons
        isPrevDisabled={false}
        isNextDisabled={false}
        onPrev={onPrev}
        onNext={onNext}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Previous/i }));
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
