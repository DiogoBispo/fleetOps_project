import { useMemo } from 'react';
import { useVehicles } from '../hooks/useVehicles';
import { Card, CardContent, CardHeader, CardTitle } from '@fleetops/ui';

export function Dashboard() {
  const { data: vehicles, isLoading } = useVehicles();
  const list = vehicles ?? [];

  const statusCounts = useMemo(() => {
    return list.reduce((acc, vehicle) => {
      acc[vehicle.status] = (acc[vehicle.status] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [list]);

  const cityCounts = useMemo(() => {
    return Object.entries(
      list.reduce((acc, vehicle) => {
        acc[vehicle.city] = (acc[vehicle.city] ?? 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [list]);

  const recentVehicles = useMemo(() => {
    return [...list]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [list]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Dashboard</p>
          <h1 className="text-3xl font-bold text-slate-900">Visão geral da frota</h1>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-sm text-slate-500">Última atualização</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{isLoading ? '...' : new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de veículos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-slate-900">{isLoading ? '-' : list.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-emerald-700">{isLoading ? '-' : statusCounts.ATIVO ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-indigo-700">{isLoading ? '-' : statusCounts.PENDING ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Em oficina</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-amber-700">{isLoading ? '-' : statusCounts.OFICINA ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle>Distribuição por status</CardTitle>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Atualizado
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {(['ATIVO', 'INATIVO', 'OFICINA', 'SINISTRO', 'PENDING'] as const).map((status) => (
                <div key={status} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-600">{status}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{statusCounts[status] ?? 0}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top cidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cityCounts.length === 0 ? (
                <p className="text-sm text-slate-500">Sem dados de localização.</p>
              ) : (
                cityCounts.map(([city, count]) => (
                  <div key={city} className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                    <span className="font-medium text-slate-700">{city}</span>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{count}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimos veículos adicionados</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Carregando veículos...</p>
          ) : recentVehicles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Placa</th>
                    <th className="px-4 py-3">Modelo</th>
                    <th className="px-4 py-3">Tipo</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Entrada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recentVehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{vehicle.plate}</td>
                      <td className="px-4 py-3 text-slate-700">{vehicle.model}</td>
                      <td className="px-4 py-3 text-slate-700">{vehicle.type}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{new Date(vehicle.createdAt).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Nenhum veículo recente encontrado.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
