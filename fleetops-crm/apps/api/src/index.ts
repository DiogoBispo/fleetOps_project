import Fastify from 'fastify';
import cors from '@fastify/cors';
import { vehicleRoutes } from './routes/vehicles.js';
import { contractRoutes } from './routes/contracts.js';
import { costRoutes } from './routes/costs.js';
import { alertRoutes } from './routes/alerts.js';
import { reportRoutes } from './routes/reports.js';

const server = Fastify({
  logger: true,
});

await server.register(cors, {
  origin: true,
});

await server.register(vehicleRoutes, { prefix: '/api/vehicles' });
await server.register(contractRoutes, { prefix: '/api/contracts' });
await server.register(costRoutes, { prefix: '/api/costs' });
await server.register(alertRoutes, { prefix: '/api/alerts' });
await server.register(reportRoutes, { prefix: '/api/reports' });

server.get('/api/health', async () => ({ status: 'ok' }));

const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server running at http://localhost:3001');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();