import { eq } from 'drizzle-orm';
import { db, contracts } from '@fleetops/db';

export const contractRepository = {
  findAll(clientId?: string) {
    const query = clientId
      ? db.select().from(contracts).where(eq(contracts.clientId, clientId))
      : db.select().from(contracts);
    return query.all();
  },

  findById(id: string) {
    return db.select().from(contracts).where(eq(contracts.id, id)).get();
  },

  findByVehicleId(vehicleId: string) {
    return db.select().from(contracts).where(eq(contracts.vehicleId, vehicleId)).all();
  },
};
