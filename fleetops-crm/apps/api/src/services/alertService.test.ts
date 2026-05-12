import { beforeAll, describe, expect, it, mock } from "bun:test";

let createAlertService: typeof import("./alertService").createAlertService;

beforeAll(async () => {
  mock.module("@fleetops/db", () => ({
    db: {},
    alerts: {},
  }));
  ({ createAlertService } = await import("./alertService"));
});

describe("alertService", () => {
  it("retorna apenas alertas ativos mapeados", () => {
    const service = createAlertService({
      findAll: () => [],
      findActive: () => [
        {
          id: "a1",
          vehicleId: "v1",
          type: "NO_CONTRACT",
          title: "Sem contrato",
          message: "Veiculo sem contrato",
          read: 0,
          createdAt: "2026-05-01",
          clientId: null,
        },
      ],
      markAsRead: () => ({ changes: 1 }),
    });

    const active = service.getActive();
    expect(active).toHaveLength(1);
    expect(active[0].read).toBe(false);
    expect(active[0].type).toBe("NO_CONTRACT");
  });
});
