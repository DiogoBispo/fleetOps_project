export type VehicleStatus = 'ATIVO' | 'INATIVO' | 'OFICINA' | 'SINISTRO' | 'PENDING';
export type ContractStatus = 'ATIVO' | 'VENCIDO' | 'PENDENTE';
export type CostType = 'RENTAL' | 'FUEL' | 'WORKSHOP' | 'OTHER';
export type AlertType = 'CONTRACT_EXPIRED' | 'CONTRACT_EXPIRING' | 'ZERO_RENTAL' | 'NO_CONTRACT';
export type UserRole = 'ADMIN' | 'OPERACAO' | 'CLIENTE';

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  type: string;
  status: VehicleStatus;
  state: string;
  city: string;
  costCenter?: string;
  accountItem?: string;
  rentalCompany?: string;
  createdAt: string;
  updatedAt: string;
  clientId?: string;
}

export interface Contract {
  id: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  kmLimit: number;
  monthlyValue: number;
  status: ContractStatus;
  createdAt: string;
  updatedAt: string;
  clientId?: string;
}

export interface Cost {
  id: string;
  vehicleId: string;
  type: CostType;
  description: string;
  amount: number;
  date: string;
  createdAt: string;
  clientId?: string;
}

export interface Alert {
  id: string;
  vehicleId?: string;
  type: AlertType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  clientId?: string;
}

export interface DailyLog {
  id: string;
  vehicleId: string;
  date: string;
  km: number;
  driver?: string;
  notes?: string;
  createdAt: string;
  clientId?: string;
}

export interface Client {
  id: string;
  name: string;
  document?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Workshop {
  id: string;
  vehicleId: string;
  serviceType: string;
  description: string;
  scheduledDate: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  clientId?: string;
}

export interface RequestContext {
  clientId: string;
  userRole: UserRole;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}