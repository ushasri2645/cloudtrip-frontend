import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CitiesProvider } from "../contexts/Cities/CitiesProvider";

describe("App Component", () => {
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
  it("renders Navbar component", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CitiesProvider>
          <App />
        </CitiesProvider>
      </QueryClientProvider>
    );

    const navTextInstances = screen.getAllByText(/CloudTrip/i);
    expect(navTextInstances.length).toBeGreaterThanOrEqual(1);
  });

  it("renders Footer component", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CitiesProvider>
          <App />
        </CitiesProvider>
      </QueryClientProvider>
    );
    const footerText = screen.getByText(/All rights reserved/i);
    expect(footerText).toBeInTheDocument();
  });
});
