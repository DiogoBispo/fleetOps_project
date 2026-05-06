import { db, vehicles, contracts, costs, alerts } from '@fleetops/db';
import { runAudit as coreAudit } from '@fleetops/core';
import { generateId } from '@fleetops/utils';

async function runAudit() {
  const allVehicles = db.select().from(vehicles).all();
  const allContracts = db.select().from(contracts).all();
  const allCosts = db.select().from(costs).all();

  const results: any[] = [];

  for (const vehicle of allVehicles) {
    const contract = allContracts.find(c => c.vehicleId === vehicle.id && c.status === 'ACTIVE');
    const vehicleCosts = allCosts.filter(c => c.vehicleId === vehicle.id);
    
    // Simplificação para o mês atual
    const latestCost = vehicleCosts.sort((a, b) => b.date.localeCompare(a.date))[0];

    const auditFindings = coreAudit(vehicle as any, contract as any, latestCost as any);

    for (const finding of auditFindings) {
      results.push({ ...finding, vehicleId: vehicle.id });

      db.insert(alerts).values({
        id: generateId(),
        vehicleId: vehicle.id,
        type: finding.type!,
        title: finding.type!.replace(/_/g, ' '),
        message: finding.message!,
        read: 0,
        createdAt: new Date().toISOString(),
        clientId: vehicle.clientId,
      }).run();
    }
  }

  return results;
}

console.log('Running audit...');

runAudit()
  .then(results => {
    console.log(`\nAudit complete. Found ${results.length} issues:\n`);

    const bySeverity = { HIGH: 0, MEDIUM: 0, LOW: 0 };
    for (const result of results) {
      bySeverity[result.severity]++;
    }

    console.log(`  HIGH: ${bySeverity.HIGH}`);
    console.log(`  MEDIUM: ${bySeverity.MEDIUM}`);
    console.log(`  LOW: ${bySeverity.LOW}\n`);

    for (const result of results) {
      console.log(`[${result.severity}] ${result.type}: ${result.message}`);
    }
  })
  .catch(error => {
    console.error('Audit failed:', error);
    process.exit(1);
  });