import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App/App.tsx";
import { CitiesProvider } from "./contexts/Cities/CitiesProvider.tsx";
import "./styles/theme.css";

const queryClient = new QueryClient();

export const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CitiesProvider>{children}</CitiesProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RootProvider>
        <App />
      </RootProvider>
    </BrowserRouter>
  </StrictMode>
);
