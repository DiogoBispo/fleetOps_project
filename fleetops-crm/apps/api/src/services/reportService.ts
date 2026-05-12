import { isContractExpiring } from '@fleetops/utils';

type VehicleRow = { status: string };
type ContractRow = { endDate: string };
type CostRow = { type: string; amount: number };

type ReportRepository = {
  findAllVehicles: () => VehicleRow[];
  findAllContracts: () => ContractRow[];
  findCostsByDateRange: (startDate?: string, endDate?: string) => CostRow[];
};

export function createReportService(repository: ReportRepository) {
  return {
    getFleetSummary() {
      const allVehicles = repository.findAllVehicles();
      const byStatus = allVehicles.reduce((acc, v) => {
        acc[v.status] = (acc[v.status] ?? 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        totalVehicles: allVehicles.length,
        byStatus,
      };
    },

    getCostAnalysis(startDate?: string, endDate?: string) {
      const allCosts = repository.findCostsByDateRange(startDate, endDate);

      const byType = allCosts.reduce((acc, c) => {
        acc[c.type] = (acc[c.type] ?? 0) + c.amount;
        return acc;
      }, {} as Record<string, number>);

      const total = allCosts.reduce((sum, c) => sum + c.amount, 0);
      return { total, byType };
    },

    getContractExpiration() {
      const allContracts = repository.findAllContracts();
      const expiring = allContracts.filter((c) => isContractExpiring(c));

      return {
        total: expiring.length,
        contracts: expiring,
      };
    },
  };
}
