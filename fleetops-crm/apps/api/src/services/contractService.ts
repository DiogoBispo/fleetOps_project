import type { Contract } from '@fleetops/types';

type ContractRow = {
  id: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  kmLimit: number;
  monthlyValue: number;
  status: string;
  createdAt: string | null;
  updatedAt: string | null;
  clientId: string | null;
};

function toContract(row: ContractRow): Contract {
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

type ContractRepository = {
  findAll: (clientId?: string) => ContractRow[];
  findById: (id: string) => ContractRow | undefined;
  findByVehicleId: (vehicleId: string) => ContractRow[];
};

export function createContractService(repository: ContractRepository) {
  return {
    getAll(clientId?: string) {
      return repository.findAll(clientId).map(toContract);
    },

    getById(id: string) {
      const row = repository.findById(id);
      return row ? toContract(row) : null;
    },

    getByVehicleId(vehicleId: string) {
      return repository.findByVehicleId(vehicleId).map(toContract);
    },
  };
}
