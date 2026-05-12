import type { FastifyInstance } from 'fastify';
import { alertService } from '../services/instances.js';

export async function alertRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return alertService.getAll();
  });

  fastify.get('/active', async () => {
    return alertService.getActive();
  });

  fastify.put('/:id/read', async (request) => {
    const { id } = request.params as { id: string };
    return alertService.markAsRead(id);
  });
}