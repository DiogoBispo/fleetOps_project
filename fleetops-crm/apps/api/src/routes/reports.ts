import type { FastifyInstance } from 'fastify';
import { reportService } from '../services/instances.js';

export async function reportRoutes(fastify: FastifyInstance) {
  fastify.get('/fleet-summary', async () => {
    return reportService.getFleetSummary();
  });

  fastify.get('/cost-analysis', async (request) => {
    const { startDate, endDate } = request.query as { startDate?: string; endDate?: string };
    return reportService.getCostAnalysis(startDate, endDate);
  });

  fastify.get('/contract-expiration', async () => {
    return reportService.getContractExpiration();
  });
}