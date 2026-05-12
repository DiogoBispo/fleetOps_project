import { useQuery } from "@tanstack/react-query";

export interface FleetSummary {
  totalVehicles: number;
  byStatus: Record<string, number>;
}

async function fetchFleetSummary(): Promise<FleetSummary> {
  const res = await fetch("/api/reports/fleet-summary");
  if (!res.ok) throw new Error("Failed to fetch fleet summary");
  return res.json();
}

export function useFleetSummary() {
  return useQuery({
    queryKey: ["fleet-summary"],
    queryFn: fetchFleetSummary,
  });
}
