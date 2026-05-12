import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alerts } from "./Alerts";
import { useAlerts, useMarkAlertAsRead } from "../hooks/useAlerts";

vi.mock("../hooks/useAlerts", () => ({
  useAlerts: vi.fn(),
  useMarkAlertAsRead: vi.fn(),
}));

const mockedUseAlerts = vi.mocked(useAlerts);
const mockedUseMarkAlertAsRead = vi.mocked(useMarkAlertAsRead);

describe("Alerts page", () => {
  it("mostra loading", () => {
    mockedUseAlerts.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);
    mockedUseMarkAlertAsRead.mockReturnValue({ mutate: vi.fn() } as any);

    render(<Alerts />);
    expect(screen.getByText("Carregando alertas...")).toBeInTheDocument();
  });

  it("ordena por severidade e dispara marcar como lido", async () => {
    const user = userEvent.setup();
    const mutate = vi.fn();
    mockedUseAlerts.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        {
          id: "a2",
          title: "Sem contrato",
          message: "Sem contrato ativo",
          type: "NO_CONTRACT",
          read: false,
          createdAt: "2026-05-12T00:00:00.000Z",
        },
        {
          id: "a1",
          title: "Contrato expirado",
          message: "Contrato venceu",
          type: "CONTRACT_EXPIRED",
          read: false,
          createdAt: "2026-05-11T00:00:00.000Z",
        },
      ],
    } as any);
    mockedUseMarkAlertAsRead.mockReturnValue({ mutate } as any);

    render(<Alerts />);

    const titles = screen.getAllByText(/Sem contrato|Contrato expirado/);
    expect(titles[0]).toHaveTextContent("Contrato expirado");

    await user.click(screen.getAllByRole("button", { name: "Marcar como lido" })[0]);
    expect(mutate).toHaveBeenCalledWith("a1");
  });
});
