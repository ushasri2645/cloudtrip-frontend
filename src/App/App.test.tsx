import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CitiesProvider } from "../contexts/Cities/CitiesProvider";
import { App } from "./App";

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
          <BrowserRouter>
            <App />
          </BrowserRouter>
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
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CitiesProvider>
      </QueryClientProvider>
    );
    const footerText = screen.getByText(/All rights reserved/i);
    expect(footerText).toBeInTheDocument();
  });
});
