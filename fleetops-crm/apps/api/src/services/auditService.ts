import { runAudit } from '@fleetops/core';
import { generateId } from '@fleetops/utils';

type VehicleRow = { id: string; plate: string; clientId: string | null };
type ContractRow = { vehicleId: string; status: string };
type CostRow = { vehicleId: string; date: string };
type AlertInsert = {
  id: string;
  vehicleId: string;
  type: string;
  title: string;
  message: string;
  read: number;
  createdAt: string;
  clientId: string | null;
};

type AuditRepository = {
  findAllVehicles: () => VehicleRow[];
  findAllContracts: () => ContractRow[];
  findAllCosts: () => CostRow[];
  insertAlert: (input: AlertInsert) => void;
};

export function createAuditService(repository: AuditRepository) {
  return {
    run() {
      const allVehicles = repository.findAllVehicles();
      const allContracts = repository.findAllContracts();
      const allCosts = repository.findAllCosts();
      let created = 0;

      for (const vehicle of allVehicles) {
        const contract = allContracts.find((c) => c.vehicleId === vehicle.id && c.status === 'ACTIVE');
        const latestCost = allCosts
          .filter((c) => c.vehicleId === vehicle.id)
          .sort((a, b) => b.date.localeCompare(a.date))[0];

        const findings = runAudit(vehicle as any, contract as any, latestCost as any);
        for (const finding of findings) {
          repository.insertAlert({
            id: generateId(),
            vehicleId: vehicle.id,
            type: String(finding.type ?? 'UNKNOWN'),
            title: String(finding.type ?? 'UNKNOWN').replace(/_/g, ' '),
            message: String(finding.message ?? 'Audit finding'),
            read: 0,
            createdAt: new Date().toISOString(),
            clientId: vehicle.clientId,
          });
          created++;
        }
      }

      return { processedVehicles: allVehicles.length, createdAlerts: created };
    },
  };
}
