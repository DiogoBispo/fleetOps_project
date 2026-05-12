import { useQuery } from "@tanstack/react-query";
import type { Alert } from "@fleetops/types";

async function fetchActiveAlerts(): Promise<Alert[]> {
  const res = await fetch("/api/alerts/active");
  if (!res.ok) throw new Error("Failed to fetch active alerts");
  return res.json();
}

export function useActiveAlerts() {
  return useQuery({
    queryKey: ["active-alerts"],
    queryFn: fetchActiveAlerts,
  });
}
