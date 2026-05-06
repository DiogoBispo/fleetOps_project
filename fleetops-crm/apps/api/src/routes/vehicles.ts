import type { FastifyInstance } from 'fastify';
import { vehicleService } from '../services/vehicleService.js';
import { vehicleSchema } from '@fleetops/core';

export async function vehicleRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return vehicleService.getAll();
  });

  fastify.get('/:id', async (request) => {
    const { id } = request.params as { id: string };
    return vehicleService.getById(id);
  });

  fastify.post('/', async (request) => {
    const data = vehicleSchema.parse(request.body);
    return vehicleService.create(data);
  });

  fastify.put('/:id', async (request) => {
    const { id } = request.params as { id: string };
    const data = vehicleSchema.partial().parse(request.body);
    return vehicleService.update(id, data);
  });

  fastify.delete('/:id', async (request) => {
    const { id } = request.params as { id: string };
    return vehicleService.delete(id);
  });
}