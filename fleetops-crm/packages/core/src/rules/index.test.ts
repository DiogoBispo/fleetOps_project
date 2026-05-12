import { describe, expect, it } from "bun:test";
import {
  calculateMonthlyCosts,
  checkContractExpirationAlert,
  checkMaintenanceNeeded,
  runAudit,
  validateRentalCost,
  validateVehiclePlate,
} from "./index";
import type { Contract, Cost, Vehicle } from "@fleetops/types";

function makeVehicle(): Vehicle {
  return {
    id: "v1",
    plate: "ABC-1234",
    model: "Onix",
    type: "HATCH",
    status: "PENDING",
    state: "SP",
    city: "Sao Paulo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function makeContract(endDate: string): Contract {
  return {
    id: "c1",
    vehicleId: "v1",
    startDate: "2026-01-01",
    endDate,
    kmLimit: 3000,
    monthlyValue: 2000,
    status: "PENDENTE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function makeCost(amount: number, type: Cost["type"] = "RENTAL"): Cost {
  return {
    id: "k1",
    vehicleId: "v1",
    type,
    description: "teste",
    amount,
    date: "2026-05-01",
    createdAt: new Date().toISOString(),
  };
}

describe("runAudit", () => {
  it("gera alerta quando nao existe contrato", () => {
    const alerts = runAudit(makeVehicle());
    expect(alerts.some((a) => a.type === "NO_CONTRACT")).toBe(true);
  });

  it("gera alerta de contrato vencido", () => {
    const past = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    const alerts = runAudit(makeVehicle(), makeContract(past));
    expect(alerts.some((a) => a.type === "CONTRACT_EXPIRED")).toBe(true);
  });

  it("gera alerta para custo de aluguel zerado", () => {
    const future = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const alerts = runAudit(makeVehicle(), makeContract(future), makeCost(0, "RENTAL"));
    expect(alerts.some((a) => a.type === "ZERO_RENTAL")).toBe(true);
  });
});

describe("regras auxiliares", () => {
  it("valida faixa aceitavel do aluguel", () => {
    const ok = validateRentalCost(makeVehicle(), makeContract("2027-01-01"), makeCost(2000));
    const low = validateRentalCost(makeVehicle(), makeContract("2027-01-01"), makeCost(1500));
    expect(ok.valid).toBe(true);
    expect(low.valid).toBe(false);
  });

  it("nao alerta expiracao para contrato ja vencido", () => {
    const past = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    const result = checkContractExpirationAlert(makeContract(past));
    expect(result.shouldAlert).toBe(false);
    expect(result.daysLeft).toBeLessThan(0);
  });

  it("alerta expiracao para contrato proximo", () => {
    const near = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
    const result = checkContractExpirationAlert(makeContract(near));
    expect(result.shouldAlert).toBe(true);
  });

  it("formata e valida placa", () => {
    const valid = validateVehiclePlate("abc1d23");
    const invalid = validateVehiclePlate("abc123");
    expect(valid.valid).toBe(true);
    expect(valid.formatted).toBe("ABC-1D23");
    expect(invalid.valid).toBe(false);
  });

  it("soma custos mensais", () => {
    const total = calculateMonthlyCosts([makeCost(10), makeCost(20), makeCost(30)]);
    expect(total).toBe(60);
  });

  it("detecta projecao de km acima do limite", () => {
    const risk = checkMaintenanceNeeded(4000, 3000, 30);
    const ok = checkMaintenanceNeeded(2000, 3000, 30);
    expect(risk.needed).toBe(true);
    expect(ok.needed).toBe(false);
  });
});
