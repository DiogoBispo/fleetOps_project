import { and, eq } from 'drizzle-orm';
import { alerts, db } from '@fleetops/db';

export const alertRepository = {
  findAll(clientId?: string) {
    const query = clientId
      ? db.select().from(alerts).where(eq(alerts.clientId, clientId))
      : db.select().from(alerts);
    return query.all();
  },

  findActive(clientId?: string) {
    if (clientId) {
      return db
        .select()
        .from(alerts)
        .where(and(eq(alerts.clientId, clientId), eq(alerts.read, 0)))
        .all();
    }
    return db.select().from(alerts).where(eq(alerts.read, 0)).all();
  },

  markAsRead(id: string) {
    return db.update(alerts).set({ read: 1 }).where(eq(alerts.id, id)).run();
  },
};
