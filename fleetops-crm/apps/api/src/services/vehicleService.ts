import type { Vehicle } from '@fleetops/types';
import { vehicleRepository } from '../repositories/vehicleRepository';
import { generateId } from '@fleetops/utils';

function toVehicle(row: any): Vehicle {
  return {
    id: row.id,
    plate: row.plate,
    model: row.model,
    type: row.type,
    status: row.status as Vehicle['status'],
    state: row.state,
    city: row.city,
    costCenter: row.costCenter ?? undefined,
    accountItem: row.accountItem ?? undefined,
    rentalCompany: row.rentalCompany ?? undefined,
    createdAt: row.createdAt ?? '',
    updatedAt: row.updatedAt ?? '',
    clientId: row.clientId ?? undefined,
  };
}

export const vehicleService = {
  getAll(clientId?: string) {
    const rows = vehicleRepository.findAll(clientId);
    return rows.map(toVehicle);
  },

  getById(id: string) {
    const row = vehicleRepository.findById(id);
    return row ? toVehicle(row) : null;
  },

  create(data: Partial<Vehicle>) {
    const now = new Date().toISOString();
    const id = generateId();
    const entity = {
      id,
      plate: data.plate!,
      model: data.model!,
      type: data.type!,
      status: data.status ?? 'PENDING',
      state: data.state!,
      city: data.city!,
      costCenter: data.costCenter ?? null,
      accountItem: data.accountItem ?? null,
      rentalCompany: data.rentalCompany ?? null,
      createdAt: now,
      updatedAt: now,
      clientId: data.clientId ?? null,
    };
    vehicleRepository.create(entity);
    return { id, ...data };
  },

  update(id: string, data: Partial<Vehicle>) {
    const now = new Date().toISOString();
    const updates: Record<string, unknown> = { updatedAt: now };
    if (data.plate) updates.plate = data.plate;
    if (data.model) updates.model = data.model;
    if (data.type) updates.type = data.type;
    if (data.status) updates.status = data.status;
    if (data.state) updates.state = data.state;
    if (data.city) updates.city = data.city;
    if (data.costCenter) updates.costCenter = data.costCenter;
    if (data.accountItem) updates.accountItem = data.accountItem;
    if (data.rentalCompany) updates.rentalCompany = data.rentalCompany;

    vehicleRepository.update(id, updates);
    return this.getById(id);
  },

  delete(id: string) {
    vehicleRepository.delete(id);
    return { success: true };
  },
};