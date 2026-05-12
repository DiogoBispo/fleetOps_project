import { beforeAll, describe, expect, it, mock } from "bun:test";

let createReportService: typeof import("./reportService").createReportService;

beforeAll(async () => {
  mock.module("@fleetops/db", () => ({
    db: {},
    vehicles: {},
    contracts: {},
    costs: {},
  }));
  ({ createReportService } = await import("./reportService"));
});

describe("reportService", () => {
  it("consolida frota por status", () => {
    const service = createReportService({
      findAllVehicles: () => [
        { id: "1", status: "PENDING" },
        { id: "2", status: "PENDING" },
        { id: "3", status: "ATIVO" },
      ] as any,
      findAllContracts: () => [],
      findCostsByDateRange: () => [],
    });

    const summary = service.getFleetSummary();
    expect(summary.totalVehicles).toBe(3);
    expect(summary.byStatus.PENDING).toBe(2);
    expect(summary.byStatus.ATIVO).toBe(1);
  });

  it("calcula analise de custos", () => {
    const service = createReportService({
      findAllVehicles: () => [],
      findAllContracts: () => [],
      findCostsByDateRange: () => [
        { type: "RENTAL", amount: 100 },
        { type: "RENTAL", amount: 50 },
        { type: "FUEL", amount: 25 },
      ] as any,
    });

    const analysis = service.getCostAnalysis("2026-05-01", "2026-05-31");
    expect(analysis.total).toBe(175);
    expect(analysis.byType.RENTAL).toBe(150);
    expect(analysis.byType.FUEL).toBe(25);
  });
});
