import type { Vehicle } from '@fleetops/types';

interface VehicleTableProps {
  vehicles: Vehicle[];
}

const statusStyles: Record<string, string> = {
  ATIVO: 'bg-emerald-100 text-emerald-800',
  INATIVO: 'bg-slate-100 text-slate-800',
  OFICINA: 'bg-amber-100 text-amber-800',
  SINISTRO: 'bg-rose-100 text-rose-800',
  PENDING: 'bg-indigo-100 text-indigo-800',
};

export function VehicleTable({ vehicles }: VehicleTableProps) {
  if (vehicles.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Nenhum veículo encontrado para os filtros selecionados.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50 text-left text-sm text-slate-600">
          <tr>
            <th className="px-4 py-4 font-semibold">Placa</th>
            <th className="px-4 py-4 font-semibold">Modelo</th>
            <th className="px-4 py-4 font-semibold">Tipo</th>
            <th className="px-4 py-4 font-semibold">Status</th>
            <th className="px-4 py-4 font-semibold">Localização</th>
            <th className="px-4 py-4 font-semibold">Atualizado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="hover:bg-slate-50">
              <td className="px-4 py-4 text-sm font-medium text-slate-900">{vehicle.plate}</td>
              <td className="px-4 py-4 text-sm text-slate-700">{vehicle.model}</td>
              <td className="px-4 py-4 text-sm text-slate-700">{vehicle.type}</td>
              <td className="px-4 py-4 text-sm">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[vehicle.status] ?? 'bg-slate-100 text-slate-800'}`}>
                  {vehicle.status}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">{vehicle.city}, {vehicle.state}</td>
              <td className="px-4 py-4 text-sm text-slate-500">{new Date(vehicle.updatedAt).toLocaleDateString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
