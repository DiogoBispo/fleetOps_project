import { Card, CardContent, CardHeader, CardTitle } from "@fleetops/ui";

export function Alerts() {
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
          <p className="text-slate-600">
            Aqui serão exibidos alertas críticos de contrato, renovação e
            manutenção para sua frota.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
