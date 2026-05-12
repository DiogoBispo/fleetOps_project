import type { Alert } from '@fleetops/types';

type AlertRow = {
  id: string;
  vehicleId: string | null;
  type: string;
  title: string;
  message: string;
  read: number;
  createdAt: string | null;
  clientId: string | null;
};

function toAlert(row: AlertRow): Alert {
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

type AlertRepository = {
  findAll: (clientId?: string) => AlertRow[];
  findActive: (clientId?: string) => AlertRow[];
  markAsRead: (id: string) => unknown;
};

export function createAlertService(repository: AlertRepository) {
  return {
    getAll(clientId?: string) {
      return repository.findAll(clientId).map(toAlert);
    },

    getActive(clientId?: string) {
      return repository.findActive(clientId).map(toAlert);
    },

    markAsRead(id: string) {
      repository.markAsRead(id);
      return { success: true };
    },
  };
}
