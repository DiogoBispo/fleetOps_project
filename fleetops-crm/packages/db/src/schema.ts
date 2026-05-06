import { sqliteTable, text, integer, real, primaryKey } from 'drizzle-orm/sqlite-core';

export const clients = sqliteTable('clients', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  document: text('document'),
  active: integer('active').default(1).notNull(),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
});

export const vehicles = sqliteTable('vehicles', {
  id: text('id').primaryKey(),
  plate: text('plate').notNull().unique(),
  model: text('model').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull().default('PENDING'),
  state: text('state').notNull(),
  city: text('city').notNull(),
  costCenter: text('cost_center'),
  accountItem: text('account_item'),
  rentalCompany: text('rental_company'),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
  clientId: text('client_id').references(() => clients.id),
});

export const contracts = sqliteTable('contracts', {
  id: text('id').primaryKey(),
  vehicleId: text('vehicle_id').notNull().references(() => vehicles.id),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  kmLimit: integer('km_limit').notNull(),
  monthlyValue: real('monthly_value').notNull(),
  status: text('status').notNull().default('PENDING'),
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
  clientId: text('client_id').references(() => clients.id),
});

export const costs = sqliteTable('costs', {
  id: text('id').primaryKey(),
  vehicleId: text('vehicle_id').notNull().references(() => vehicles.id),
  type: text('type').notNull(),
  description: text('description').notNull(),
  amount: real('amount').notNull(),
  date: text('date').notNull(),
  createdAt: text('created_at'),
  clientId: text('client_id').references(() => clients.id),
});

export const alerts = sqliteTable('alerts', {
  id: text('id').primaryKey(),
  vehicleId: text('vehicle_id').references(() => vehicles.id),
  type: text('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  read: integer('read').default(0).notNull(),
  createdAt: text('created_at'),
  clientId: text('client_id').references(() => clients.id),
});

export const dailyLogs = sqliteTable('daily_logs', {
  id: text('id').primaryKey(),
  vehicleId: text('vehicle_id').notNull().references(() => vehicles.id),
  date: text('date').notNull(),
  km: integer('km').notNull(),
  driver: text('driver'),
  notes: text('notes'),
  createdAt: text('created_at'),
  clientId: text('client_id').references(() => clients.id),
});

export const workshops = sqliteTable('workshops', {
  id: text('id').primaryKey(),
  vehicleId: text('vehicle_id').notNull().references(() => vehicles.id),
  serviceType: text('service_type').notNull(),
  description: text('description').notNull(),
  scheduledDate: text('scheduled_date').notNull(),
  status: text('status').notNull().default('PENDING'),
  createdAt: text('created_at'),
  clientId: text('client_id').references(() => clients.id),
});

export type Client = typeof clients.$inferSelect;
export type Vehicle = typeof vehicles.$inferSelect;
export type Contract = typeof contracts.$inferSelect;
export type Cost = typeof costs.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type DailyLog = typeof dailyLogs.$inferSelect;
export type Workshop = typeof workshops.$inferSelect;