import type { FastifyInstance } from 'fastify';
import { costService } from '../services/instances.js';

export async function costRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return costService.getAll();
  });

  fastify.get('/vehicle/:vehicleId', async (request) => {
    const { vehicleId } = request.params as { vehicleId: string };
    return costService.getByVehicleId(vehicleId);
  });

  fastify.get('/summary/:vehicleId', async (request) => {
    const { vehicleId } = request.params as { vehicleId: string };
    return costService.getSummary(vehicleId);
  });
}