import { db, vehicles, contracts } from '@fleetops/db';
import { costRepository } from './costRepository';

export const reportRepository = {
  findAllVehicles() {
    return db.select().from(vehicles).all();
  },

  findAllContracts() {
    return db.select().from(contracts).all();
  },

  findCostsByDateRange(startDate?: string, endDate?: string) {
    if (startDate && endDate) {
      return costRepository.findByDateRange(startDate, endDate);
    }
    return costRepository.findAll();
  },
};
