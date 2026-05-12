import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Alert } from "@fleetops/types";

async function fetchAlerts(): Promise<Alert[]> {
  const res = await fetch("/api/alerts");
  if (!res.ok) throw new Error("Failed to fetch alerts");
  return res.json();
}

async function markAlertAsRead(id: string): Promise<void> {
  const res = await fetch(`/api/alerts/${id}/read`, { method: "PUT" });
  if (!res.ok) throw new Error("Failed to mark alert as read");
}

export function useAlerts() {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
  });
}

export function useMarkAlertAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAlertAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      queryClient.invalidateQueries({ queryKey: ["active-alerts"] });
    },
  });
}
