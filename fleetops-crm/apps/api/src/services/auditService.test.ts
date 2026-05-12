import { describe, expect, it } from "bun:test";
import { createAuditService } from "./auditService";

describe("auditService", () => {
  it("gera alertas para veiculos sem contrato ativo", () => {
    const inserted: Array<{ type: string; vehicleId: string }> = [];

    const service = createAuditService({
      findAllVehicles: () => [{ id: "v1", plate: "ABC-1234", clientId: null }],
      findAllContracts: () => [],
      findAllCosts: () => [],
      insertAlert: (alert) => inserted.push({ type: alert.type, vehicleId: alert.vehicleId }),
    });

    const result = service.run();
    expect(result.processedVehicles).toBe(1);
    expect(result.createdAlerts).toBeGreaterThan(0);
    expect(inserted[0].vehicleId).toBe("v1");
    expect(inserted[0].type).toBe("NO_CONTRACT");
  });
});
