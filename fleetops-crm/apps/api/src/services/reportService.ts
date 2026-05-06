import { db, vehicles, contracts, costs } from '@fleetops/db';
import { isContractExpiring } from '@fleetops/utils';
import { gte, and, sql } from 'drizzle-orm';

export const reportService = {
  getFleetSummary() {
    const allVehicles = db.select().from(vehicles).all();
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
    let query = db.select().from(costs);
    if (startDate && endDate) {
      query = query.where(and(gte(costs.date, startDate), gte(costs.date, endDate)) as typeof query;
    }
    const allCosts = query.all();

    const byType = allCosts.reduce((acc, c) => {
      acc[c.type] = (acc[c.type] ?? 0) + c.amount;
      return acc;
    }, {} as Record<string, number>);

    const total = allCosts.reduce((sum, c) => sum + c.amount, 0);
    return { total, byType };
  },

  getContractExpiration() {
    const allContracts = db.select().from(contracts).all();
    const expiring = allContracts.filter(c => isContractExpiring(c));

    return {
      total: expiring.length,
      contracts: expiring,
    };
  },
};