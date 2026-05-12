import Excel from 'exceljs';
import { db, vehicles, contracts, costs } from '@fleetops/db';
import { parseIngestionRow } from '@fleetops/core';
import { generateId } from '@fleetops/utils';

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

  const headerRow = worksheet.getRow(1);
  const headers = headerRow.values as Array<string | number | undefined>;

  let imported = 0;
  const errors: string[] = [];

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header

    const rowValues = row.values as Array<string | number | Date | undefined>;
    const rowData: Record<string, unknown> = {};
    for (let i = 1; i < headers.length; i++) {
      const header = headers[i];
      if (!header) continue;
      rowData[String(header)] = rowValues[i];
    }

    try {
      const parsed = parseIngestionRow(rowData);
      if (!parsed.row) {
        errors.push(`Row ${rowNumber}: ${parsed.errors.join(', ')}`);
        return;
      }

      const data = parsed.row;
      const vehicleId = generateId();
      const now = new Date().toISOString();

      db.insert(vehicles).values({
        id: vehicleId,
        plate: data.plate,
        model: data.model,
        type: data.type,
        status: data.status as string,
        state: data.state,
        city: data.city,
        costCenter: data.costCenter ?? null,
        accountItem: data.accountItem ?? null,
        rentalCompany: data.rentalCompany ?? null,
        createdAt: now,
        updatedAt: now,
        clientId: clientId ?? null,
      }).run();

      if (data.contractStartDate && data.contractEndDate) {
        db.insert(contracts).values({
          id: generateId(),
          vehicleId,
          startDate: data.contractStartDate,
          endDate: data.contractEndDate,
          kmLimit: data.contractKmLimit ?? 0,
          monthlyValue: data.contractMonthlyValue ?? 0,
          status: 'PENDING',
          createdAt: now,
          updatedAt: now,
          clientId: clientId ?? null,
        }).run();
      }

      if (data.costAmount !== undefined && data.costDate) {
        db.insert(costs).values({
          id: generateId(),
          vehicleId,
          type: (data.costType ?? 'OTHER') as string,
          description: data.costDescription ?? '',
          amount: data.costAmount,
          date: data.costDate,
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
