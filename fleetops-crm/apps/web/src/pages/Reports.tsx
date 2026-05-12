import { Card, CardContent, CardHeader, CardTitle } from "@fleetops/ui";

export function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          Relatórios
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Relatórios</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios da frota</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Em breve teremos painéis completos de custos, contratos e alertas
            para acompanhar o desempenho da frota.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
