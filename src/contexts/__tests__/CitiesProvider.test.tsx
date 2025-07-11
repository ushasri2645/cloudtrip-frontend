import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCities } from "../../services/FetchCities";
import { CitiesProvider } from "../Cities/CitiesProvider";
import { TestConsumer } from "../Cities/TestConsumer";

vi.mock("../../services/FetchCities", () => ({
  fetchCities: vi.fn(),
}));

describe("Tests for CitiesProvider", () => {
  let queryClient: QueryClient;
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it("should load, fetch cities from API and renders cities", async () => {
    vi.mocked(fetchCities).mockResolvedValue(["Mumbai", "London"]);
    render(
      <QueryClientProvider client={queryClient}>
        <CitiesProvider>
          <TestConsumer />
        </CitiesProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Mumbai")).toBeInTheDocument();
      expect(screen.getByText("London")).toBeInTheDocument();
    });
  });

  it("should show error message if fetchCities throws error", async () => {
    vi.mocked(fetchCities).mockRejectedValue(new Error("Fetch failed"));
    render(
      <QueryClientProvider client={queryClient}>
        <CitiesProvider>
          <TestConsumer />
        </CitiesProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(screen.getByText(/Fetch failed/i)).toBeInTheDocument();
    });
  });

  it("should return empty array if no cities fetched", async () => {
    vi.mocked(fetchCities).mockResolvedValue([]);
    render(
      <QueryClientProvider client={queryClient}>
        <CitiesProvider>
          <TestConsumer />
        </CitiesProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Mumbai")).not.toBeInTheDocument();
      expect(screen.queryByText("London")).not.toBeInTheDocument();
    });
  });

  it("should show 'No context' when used outside of provider", () => {
    render(<TestConsumer />); 
    expect(screen.getByText("No context")).toBeInTheDocument();
  });
});
