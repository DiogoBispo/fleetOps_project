import { and, eq, gte, lte } from 'drizzle-orm';
import { costs, db } from '@fleetops/db';

export const costRepository = {
  findAll(clientId?: string) {
    const query = clientId
      ? db.select().from(costs).where(eq(costs.clientId, clientId))
      : db.select().from(costs);
    return query.all();
  },

  findByVehicleId(vehicleId: string) {
    return db.select().from(costs).where(eq(costs.vehicleId, vehicleId)).all();
  },

  findByDateRange(startDate: string, endDate: string) {
    return db
      .select()
      .from(costs)
      .where(and(gte(costs.date, startDate), lte(costs.date, endDate)))
      .all();
  },
};
