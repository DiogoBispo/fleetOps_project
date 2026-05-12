import type { Cost } from '@fleetops/types';

type CostRow = {
  id: string;
  vehicleId: string;
  type: string;
  description: string;
  amount: number;
  date: string;
  createdAt: string | null;
  clientId: string | null;
};

function toCost(row: CostRow): Cost {
  return {
    id: row.id,
    vehicleId: row.vehicleId,
    type: row.type as Cost['type'],
    description: row.description,
    amount: row.amount,
    date: row.date,
    createdAt: row.createdAt ?? '',
    clientId: row.clientId ?? undefined,
  };
}

type CostRepository = {
  findAll: (clientId?: string) => CostRow[];
  findByVehicleId: (vehicleId: string) => CostRow[];
};

export function createCostService(repository: CostRepository) {
  return {
    getAll(clientId?: string) {
      return repository.findAll(clientId).map(toCost);
    },

    getByVehicleId(vehicleId: string) {
      return repository.findByVehicleId(vehicleId).map(toCost);
    },

    getSummary(vehicleId: string) {
      const vehicleCosts = repository.findByVehicleId(vehicleId).map(toCost);
      const total = vehicleCosts.reduce((sum, c) => sum + c.amount, 0);
      const byType = vehicleCosts.reduce((acc, c) => {
        acc[c.type] = (acc[c.type] ?? 0) + c.amount;
        return acc;
      }, {} as Record<string, number>);
      return { total, byType };
    },
  };
}
