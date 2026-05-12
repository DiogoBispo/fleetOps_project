import type { FastifyInstance } from 'fastify';
import { auditService } from '../services/instances.js';

export async function auditRoutes(fastify: FastifyInstance) {
  fastify.post('/run', async () => {
    return auditService.run();
  });
}
