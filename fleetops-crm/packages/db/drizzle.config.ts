import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: './src/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: process.env.DB_PATH || './data/fleetops.db',
  },
} satisfies Config;