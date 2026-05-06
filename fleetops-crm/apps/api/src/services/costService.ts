import { eq } from 'drizzle-orm';
import { db, costs } from '@fleetops/db';
import type { Cost } from '@fleetops/types';

function toCost(row: typeof costs.$inferSelect): Cost {
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

export const costService = {
  getAll(clientId?: string) {
    const query = clientId
      ? db.select().from(costs).where(eq(costs.clientId, clientId))
      : db.select().from(costs);
    return query.all().map(toCost);
  },

  getByVehicleId(vehicleId: string) {
    return db.select().from(costs).where(eq(costs.vehicleId, vehicleId)).all().map(toCost);
  },

  getSummary(vehicleId: string) {
    const vehicleCosts = this.getByVehicleId(vehicleId);
    const total = vehicleCosts.reduce((sum, c) => sum + c.amount, 0);
    const byType = vehicleCosts.reduce((acc, c) => {
      acc[c.type] = (acc[c.type] ?? 0) + c.amount;
      return acc;
    }, {} as Record<string, number>);
    return { total, byType };
  },
};