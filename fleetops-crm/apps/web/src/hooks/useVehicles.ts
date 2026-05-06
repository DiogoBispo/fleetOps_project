import { useQuery } from '@tanstack/react-query';
import type { Vehicle } from '@fleetops/types';

async function fetchVehicles(): Promise<Vehicle[]> {
  const res = await fetch('/api/vehicles');
  if (!res.ok) throw new Error('Failed to fetch vehicles');
  return res.json();
}

export function useVehicles() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  });
}