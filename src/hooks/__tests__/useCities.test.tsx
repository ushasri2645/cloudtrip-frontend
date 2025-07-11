import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import {
  CitiesContext,
  type CitiesContextType,
} from "../../contexts/Cities/CitiesContext";
import { useCities } from "../useCities";

describe("Test for useCities hook", () => {
  it("should return context correctly if used inside CitiesProvider", () => {
    const mockContext: CitiesContextType = {
      cities: ["Mumbai", "London"],
      loading: false,
      error: null,
      refetch: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CitiesContext.Provider value={mockContext}>
        {children}
      </CitiesContext.Provider>
    );

    const { result } = renderHook(() => useCities(), { wrapper });
    expect(result.current).toEqual(mockContext);
  });

  it("should throw an error if used outside of CitiesProvider", () => {
    expect(() => {
      renderHook(() => useCities());
    }).toThrow("useCities must be used within a CitiesProvider");
  });
});
