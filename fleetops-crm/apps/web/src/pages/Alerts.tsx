import { useMemo } from "react";
import type { Alert } from "@fleetops/types";
import { Card, CardContent, CardHeader, CardTitle } from "@fleetops/ui";
import { useAlerts, useMarkAlertAsRead } from "../hooks/useAlerts";

const severityByType: Record<Alert["type"], "CRITICAL" | "HIGH" | "MEDIUM"> = {
  CONTRACT_EXPIRED: "CRITICAL",
  ZERO_RENTAL: "CRITICAL",
  NO_CONTRACT: "HIGH",
  CONTRACT_EXPIRING: "MEDIUM",
};

const severityWeight = {
  CRITICAL: 3,
  HIGH: 2,
  MEDIUM: 1,
};

function getSeverity(type: Alert["type"]) {
  return severityByType[type] ?? "MEDIUM";
}

export function Alerts() {
  const { data, isLoading, isError } = useAlerts();
  const markAsRead = useMarkAlertAsRead();
  const alerts = data ?? [];

  const sortedAlerts = useMemo(() => {
    return [...alerts].sort((a, b) => {
      const bySeverity = severityWeight[getSeverity(b.type)] - severityWeight[getSeverity(a.type)];
      if (bySeverity !== 0) return bySeverity;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [alerts]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          Alertas
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Alertas da frota</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monitoração ativa</CardTitle>
        </CardHeader>
        <CardContent>
          {isError ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
              Não foi possível carregar os alertas no momento.
            </div>
          ) : isLoading ? (
            <p className="text-slate-600">Carregando alertas...</p>
          ) : sortedAlerts.length === 0 ? (
            <p className="text-slate-600">Nenhum alerta ativo no momento.</p>
          ) : (
            <div className="space-y-3">
              {sortedAlerts.map((alert) => {
                const severity = getSeverity(alert.type);
                return (
                  <div
                    key={alert.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{alert.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{alert.message}</p>
                        <div className="mt-2 flex items-center gap-2 text-xs">
                          <span className="rounded-full bg-slate-900 px-2 py-1 font-semibold text-white">
                            {severity}
                          </span>
                          <span className="text-slate-500">
                            {new Date(alert.createdAt).toLocaleString("pt-BR")}
                          </span>
                        </div>
                      </div>
                      {!alert.read && (
                        <button
                          type="button"
                          onClick={() => markAsRead.mutate(alert.id)}
                          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          Marcar como lido
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
