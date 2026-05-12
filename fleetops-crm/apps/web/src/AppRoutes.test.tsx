import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

function renderWithRouter(initialEntry: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <AppRoutes />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("App layout and routing", () => {
  it("renderiza layout base com sidebar e topbar", () => {
    renderWithRouter("/reports");

    expect(screen.getByText("FleetOps")).toBeInTheDocument();
    expect(screen.getByText("Visão geral da frota")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Relatórios" })).toBeInTheDocument();
  });

  it("navega da página de relatórios para alertas pelo menu lateral", async () => {
    const user = userEvent.setup();
    renderWithRouter("/reports");

    await user.click(screen.getByRole("link", { name: /Alertas/i }));
    expect(screen.getByRole("heading", { name: "Alertas da frota" })).toBeInTheDocument();
  });
});
