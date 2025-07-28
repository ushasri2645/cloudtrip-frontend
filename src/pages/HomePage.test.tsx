import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { describe, it, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CitiesProvider } from "../contexts/Cities/CitiesProvider";

describe("HomePage", () => {
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
  it("renders all main sections", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CitiesProvider>
            <HomePage />
        </CitiesProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/Travel Beyond Boundaries/i)).toBeInTheDocument(); 
    expect(screen.getByText(/Search Flights/i)).toBeInTheDocument();            
    expect(screen.getByText(/Recommended Places/i)).toBeInTheDocument();            
    expect(screen.getByText(/About CloudTrip/i)).toBeInTheDocument();                 
  });
});
