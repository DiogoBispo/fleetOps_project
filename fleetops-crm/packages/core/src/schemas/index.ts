import { z } from 'zod';

export const vehicleSchema = z.object({
  id: z.string().optional(),
  plate: z.string().min(7).max(8),
  model: z.string().min(1),
  type: z.string().min(1),
  status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'PENDING']).default('PENDING'),
  state: z.string().min(1),
  city: z.string().min(1),
  costCenter: z.string().optional(),
  accountItem: z.string().optional(),
  rentalCompany: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  clientId: z.string().optional(),
});

export const contractSchema = z.object({
  id: z.string().optional(),
  vehicleId: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  kmLimit: z.number().positive(),
  monthlyValue: z.number().positive(),
  status: z.enum(['ACTIVE', 'EXPIRED', 'CANCELLED', 'PENDING']).default('PENDING'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  clientId: z.string().optional(),
});

export const costSchema = z.object({
  id: z.string().optional(),
  vehicleId: z.string().min(1),
  type: z.enum(['RENTAL', 'MAINTENANCE', 'FUEL', 'INSURANCE', 'OTHER']),
  description: z.string().min(1),
  amount: z.number().positive(),
  date: z.string(),
  createdAt: z.string().optional(),
  clientId: z.string().optional(),
});

export const alertSchema = z.object({
  id: z.string().optional(),
  vehicleId: z.string().optional(),
  type: z.enum(['CONTRACT_EXPIRING', 'OVER_MILEAGE', 'MAINTENANCE_DUE', 'INSPECTION_DUE']),
  title: z.string().min(1),
  message: z.string().min(1),
  read: z.boolean().default(false),
  createdAt: z.string().optional(),
  clientId: z.string().optional(),
});

export const dailyLogSchema = z.object({
  id: z.string().optional(),
  vehicleId: z.string().min(1),
  date: z.string(),
  km: z.number().positive(),
  driver: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.string().optional(),
  clientId: z.string().optional(),
});

export const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  document: z.string().optional(),
  active: z.boolean().default(true),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});