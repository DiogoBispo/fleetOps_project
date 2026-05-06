import { eq } from 'drizzle-orm';
import { db, alerts } from '@fleetops/db';
import type { Alert } from '@fleetops/types';

function toAlert(row: typeof alerts.$inferSelect): Alert {
  return {
    id: row.id,
    vehicleId: row.vehicleId ?? undefined,
    type: row.type as Alert['type'],
    title: row.title,
    message: row.message,
    read: Boolean(row.read),
    createdAt: row.createdAt ?? '',
    clientId: row.clientId ?? undefined,
  };
}

export const alertService = {
  getAll(clientId?: string) {
    const query = clientId
      ? db.select().from(alerts).where(eq(alerts.clientId, clientId))
      : db.select().from(alerts);
    return query.all().map(toAlert);
  },

  getActive(clientId?: string) {
    const baseQuery = clientId
      ? db.select().from(alerts).where(eq(alerts.clientId, clientId))
      : db.select().from(alerts);
    return baseQuery.where(eq(alerts.read, 0)).all().map(toAlert);
  },

  markAsRead(id: string) {
    db.update(alerts).set({ read: 1 }).where(eq(alerts.id, id)).run();
    return { success: true };
  },
};