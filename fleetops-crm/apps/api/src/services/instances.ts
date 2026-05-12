import { vehicleService } from './vehicleService';
import { createAlertService } from './alertService';
import { createContractService } from './contractService';
import { createCostService } from './costService';
import { createReportService } from './reportService';
import { createAuditService } from './auditService';
import { alertRepository } from '../repositories/alertRepository';
import { auditRepository } from '../repositories/auditRepository';
import { contractRepository } from '../repositories/contractRepository';
import { costRepository } from '../repositories/costRepository';
import { reportRepository } from '../repositories/reportRepository';

export { vehicleService };
export const alertService = createAlertService(alertRepository);
export const contractService = createContractService(contractRepository);
export const costService = createCostService(costRepository);
export const reportService = createReportService(reportRepository);
export const auditService = createAuditService(auditRepository);
