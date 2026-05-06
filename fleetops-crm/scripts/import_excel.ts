import Excel from 'exceljs';
import { db, vehicles, contracts, costs } from '@fleetops/db';
import { generateId } from '@fleetops/utils';
import type { Vehicle, Contract, Cost } from '@fleetops/types';

interface ExcelRow {
  placa?: string;
  modelo?: string;
  tipo?: string;
  status?: string;
  estado?: string;
  cidade?: string;
  centro_custo?: string;
  item_contabil?: string;
  locadora?: string;
  data_inicio?: string;
  data_fim?: string;
  km_limite?: number;
  valor_mensal?: number;
  data_custo?: string;
  tipo_custo?: string;
  descricao_custo?: string;
  valor_custo?: number;
}

export async function importFromExcel(filePath: string, clientId?: string): Promise<{
  imported: number;
  errors: string[];
}> {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  const imported = 0;
  const errors: string[] = [];

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header

    const data = row.values as unknown as ExcelRow;

    try {
      const vehicleId = generateId();
      const now = new Date().toISOString();

      db.insert(vehicles).values({
        id: vehicleId,
        plate: data.placa?.toUpperCase() ?? '',
        model: data.model ?? '',
        type: data.tipo ?? '',
        status: (data.status ?? 'PENDING') as string,
        state: data.estado ?? '',
        city: data.cidade ?? '',
        costCenter: data.centro_custo ?? null,
        accountItem: data.item_contabil ?? null,
        rentalCompany: data.locadora ?? null,
        createdAt: now,
        updatedAt: now,
        clientId: clientId ?? null,
      }).run();

      if (data.data_inicio && data.data_fim) {
        db.insert(contracts).values({
          id: generateId(),
          vehicleId,
          startDate: data.data_inicio,
          endDate: data.data_fim,
          kmLimit: data.km_limite ?? 0,
          monthlyValue: data.valor_mensal ?? 0,
          status: 'PENDING',
          createdAt: now,
          updatedAt: now,
          clientId: clientId ?? null,
        }).run();
      }

      if (data.valor_custo && data.data_custo) {
        db.insert(costs).values({
          id: generateId(),
          vehicleId,
          type: (data.tipo_custo ?? 'OTHER') as string,
          description: data.descricao_custo ?? '',
          amount: data.valor_custo,
          date: data.data_custo,
          createdAt: now,
          clientId: clientId ?? null,
        }).run();
      }

      imported++;
    } catch (error) {
      errors.push(`Row ${rowNumber}: ${error}`);
    }
  });

  return { imported, errors };
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: bun import_excel.ts <file.xlsx> [clientId]');
  process.exit(1);
}

importFromExcel(filePath, process.argv[3])
  .then(result => {
    console.log(`Imported ${result.imported} records`);
    if (result.errors.length > 0) {
      console.error('Errors:', result.errors);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });