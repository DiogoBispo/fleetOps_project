import { beforeAll, describe, expect, it, mock } from "bun:test";

let createCostService: typeof import("./costService").createCostService;

beforeAll(async () => {
  mock.module("@fleetops/db", () => ({
    db: {},
    costs: {},
  }));
  ({ createCostService } = await import("./costService"));
});

describe("costService", () => {
  it("calcula resumo por tipo e total", () => {
    const service = createCostService({
      findAll: () => [],
      findByVehicleId: () => [
        {
          id: "1",
          vehicleId: "v1",
          type: "RENTAL",
          description: "rental",
          amount: 100,
          date: "2026-05-01",
          createdAt: "2026-05-01",
          clientId: null,
        },
        {
          id: "2",
          vehicleId: "v1",
          type: "FUEL",
          description: "fuel",
          amount: 50,
          date: "2026-05-02",
          createdAt: "2026-05-02",
          clientId: null,
        },
      ],
    });

    const summary = service.getSummary("v1");
    expect(summary.total).toBe(150);
    expect(summary.byType.RENTAL).toBe(100);
    expect(summary.byType.FUEL).toBe(50);
  });
});
