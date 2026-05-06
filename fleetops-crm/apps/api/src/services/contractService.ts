import { eq } from 'drizzle-orm';
import { db, contracts } from '@fleetops/db';
import type { Contract } from '@fleetops/types';
import { generateId } from '@fleetops/utils';

function toContract(row: typeof contracts.$inferSelect): Contract {
  return {
    id: row.id,
    vehicleId: row.vehicleId,
    startDate: row.startDate,
    endDate: row.endDate,
    kmLimit: row.kmLimit,
    monthlyValue: row.monthlyValue,
    status: row.status as Contract['status'],
    createdAt: row.createdAt ?? '',
    updatedAt: row.updatedAt ?? '',
    clientId: row.clientId ?? undefined,
  };
}

export const contractService = {
  getAll(clientId?: string) {
    const query = clientId
      ? db.select().from(contracts).where(eq(contracts.clientId, clientId))
      : db.select().from(contracts);
    return query.all().map(toContract);
  },

  getById(id: string) {
    const row = db.select().from(contracts).where(eq(contracts.id, id)).get();
    return row ? toContract(row) : null;
  },

  getByVehicleId(vehicleId: string) {
    return db.select().from(contracts).where(eq(contracts.vehicleId, vehicleId)).all().map(toContract);
  },
};