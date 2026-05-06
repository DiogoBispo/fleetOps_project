import type { Vehicle, Contract, Cost, Alert } from '@fleetops/types';
import { isContractExpiring, calculateDaysBetween } from '@fleetops/utils';

export function runAudit(vehicle: Vehicle, contract?: Contract, cost?: Cost): Partial<Alert>[] {
  const alerts: Partial<Alert>[] = [];
  const today = new Date().toISOString();

  if (!contract) {
    alerts.push({
      type: 'NO_CONTRACT',
      severity: 'HIGH',
      message: `Veículo ${vehicle.plate} está sem contrato ativo.`,
    });
  } else if (contract.endDate < today) {
    alerts.push({
      type: 'CONTRACT_EXPIRED',
      severity: 'CRITICAL',
      message: `Contrato do veículo ${vehicle.plate} expirou em ${contract.endDate}.`,
    });
  }

  if (cost && cost.amount <= 0 && cost.type === 'RENTAL') {
    alerts.push({
      type: 'ZERO_RENTAL',
      severity: 'CRITICAL',
      message: `Veículo ${vehicle.plate} apresenta custo de aluguel zerado no mês.`,
    });
  }

  return alerts;
}

export function validateRentalCost(vehicle: Vehicle, contract: Contract, cost: Cost): { valid: boolean; error?: string } {
  if (cost.type !== 'RENTAL') {
    return { valid: true };
  }

  if (cost.amount < contract.monthlyValue * 0.9) {
    return { valid: false, error: 'Custo de aluguel abaixo de 90% do valor do contrato' };
  }

  if (cost.amount > contract.monthlyValue * 1.1) {
    return { valid: false, error: 'Custo de aluguel acima de 110% do valor do contrato' };
  }

  return { valid: true };
}

export function checkContractExpirationAlert(contract: Contract): { shouldAlert: boolean; daysLeft: number } {
  const endDate = new Date(contract.endDate);
  const now = new Date();
  const daysLeft = calculateDaysBetween(now, contract.endDate);

  return {
    shouldAlert: daysLeft <= 30 && daysLeft > 0,
    daysLeft,
  };
}

export function validateVehiclePlate(plate: string): { valid: boolean; formatted?: string; error?: string } {
  const cleaned = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

  if (cleaned.length !== 7) {
    return { valid: false, error: 'Placa deve ter 7 caracteres' };
  }

  const formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  return { valid: true, formatted };
}

export function calculateMonthlyCosts(costs: Cost[]): number {
  return costs.reduce((sum, cost) => sum + cost.amount, 0);
}

export function checkMaintenanceNeeded(dailyKm: number, contractKmLimit: number, contractDays: number): { needed: boolean; reason?: string } {
  const dailyAverage = dailyKm / contractDays;
  const projectedKm = dailyAverage * 30;

  if (projectedKm > contractKmLimit) {
    return {
      needed: true,
      reason: `Média diária de ${dailyAverage.toFixed(0)} km excede o limite de ${contractKmLimit} km/mês`,
    };
  }

  return { needed: false };
}