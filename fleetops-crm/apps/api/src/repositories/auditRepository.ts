import { alerts, contracts, costs, db, vehicles } from '@fleetops/db';

export const auditRepository = {
  findAllVehicles() {
    return db.select().from(vehicles).all();
  },

  findAllContracts() {
    return db.select().from(contracts).all();
  },

  findAllCosts() {
    return db.select().from(costs).all();
  },

  insertAlert(input: typeof alerts.$inferInsert) {
    db.insert(alerts).values(input).run();
  },
};
