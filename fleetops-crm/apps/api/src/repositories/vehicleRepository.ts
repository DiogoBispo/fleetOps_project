import { eq } from 'drizzle-orm';
import { db, vehicles } from '@fleetops/db';
import type { Vehicle } from '@fleetops/types';

export const vehicleRepository = {
  findAll(clientId?: string) {
    const query = clientId
      ? db.select().from(vehicles).where(eq(vehicles.clientId, clientId))
      : db.select().from(vehicles);
    return query.all();
  },

  findById(id: string) {
    return db.select().from(vehicles).where(eq(vehicles.id, id)).get();
  },

  create(data: typeof vehicles.$inferInsert) {
    return db.insert(vehicles).values(data).run();
  },

  update(id: string, data: Partial<typeof vehicles.$inferInsert>) {
    return db.update(vehicles).set(data).where(eq(vehicles.id, id)).run();
  },

  delete(id: string) {
    return db.delete(vehicles).where(eq(vehicles.id, id)).run();
  },
};
