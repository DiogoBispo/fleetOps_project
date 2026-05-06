import type { FastifyInstance } from 'fastify';
import { contractService } from '../services/contractService.js';

export async function contractRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return contractService.getAll();
  });

  fastify.get('/:id', async (request) => {
    const { id } = request.params as { id: string };
    return contractService.getById(id);
  });

  fastify.get('/vehicle/:vehicleId', async (request) => {
    const { vehicleId } = request.params as { vehicleId: string };
    return contractService.getByVehicleId(vehicleId);
  });
}