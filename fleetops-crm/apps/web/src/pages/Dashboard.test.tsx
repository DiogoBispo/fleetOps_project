import { render, screen } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { useVehicles } from "../hooks/useVehicles";
import { useFleetSummary } from "../hooks/useFleetSummary";
import { useActiveAlerts } from "../hooks/useActiveAlerts";

vi.mock("../hooks/useVehicles", () => ({ useVehicles: vi.fn() }));
vi.mock("../hooks/useFleetSummary", () => ({ useFleetSummary: vi.fn() }));
vi.mock("../hooks/useActiveAlerts", () => ({ useActiveAlerts: vi.fn() }));

const mockedUseVehicles = vi.mocked(useVehicles);
const mockedUseFleetSummary = vi.mocked(useFleetSummary);
const mockedUseActiveAlerts = vi.mocked(useActiveAlerts);

describe("Dashboard states", () => {
  it("mostra placeholders durante loading", () => {
    mockedUseVehicles.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    } as any);
    mockedUseFleetSummary.mockReturnValue({ data: undefined, isLoading: true } as any);
    mockedUseActiveAlerts.mockReturnValue({ data: undefined, isLoading: true } as any);

    render(<Dashboard />);
    expect(screen.getByText("Total de veículos")).toBeInTheDocument();
    expect(screen.getAllByText("-").length).toBeGreaterThan(0);
  });

  it("mostra erro quando vehicles falha", () => {
    mockedUseVehicles.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as any);
    mockedUseFleetSummary.mockReturnValue({ data: undefined, isLoading: false } as any);
    mockedUseActiveAlerts.mockReturnValue({ data: undefined, isLoading: false } as any);

    render(<Dashboard />);
    expect(
      screen.getByText("Não foi possível carregar os dados do dashboard no momento.")
    ).toBeInTheDocument();
  });

  it("mostra estado vazio de veículos recentes", () => {
    mockedUseVehicles.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    } as any);
    mockedUseFleetSummary.mockReturnValue({
      data: { totalVehicles: 0, byStatus: {} },
      isLoading: false,
    } as any);
    mockedUseActiveAlerts.mockReturnValue({
      data: [],
      isLoading: false,
    } as any);

    render(<Dashboard />);
    expect(screen.getByText("Nenhum veículo recente encontrado.")).toBeInTheDocument();
  });
});
