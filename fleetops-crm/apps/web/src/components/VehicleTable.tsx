import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
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
            <th className="px-4 py-4 font-semibold text-right">Ações</th>
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
              <td className="px-4 py-4 text-right">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button
                      type="button"
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Detalhes
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-900/45" />
                    <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white p-6 shadow-2xl">
                      <div className="mb-6 flex items-start justify-between gap-4">
                        <div>
                          <Dialog.Title className="text-xl font-bold text-slate-900">
                            Detalhes do veículo
                          </Dialog.Title>
                          <Dialog.Description className="mt-1 text-sm text-slate-500">
                            Informações operacionais e cadastrais.
                          </Dialog.Description>
                        </div>
                        <Dialog.Close asChild>
                          <button
                            aria-label="Fechar detalhes"
                            className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </Dialog.Close>
                      </div>

                      <dl className="space-y-4 text-sm">
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <dt className="text-slate-500">Placa</dt>
                          <dd className="mt-1 font-semibold text-slate-900">{vehicle.plate}</dd>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <dt className="text-slate-500">Modelo</dt>
                          <dd className="mt-1 font-semibold text-slate-900">{vehicle.model}</dd>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <dt className="text-slate-500">Tipo</dt>
                          <dd className="mt-1 font-semibold text-slate-900">{vehicle.type}</dd>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <dt className="text-slate-500">Status</dt>
                          <dd className="mt-1 font-semibold text-slate-900">{vehicle.status}</dd>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <dt className="text-slate-500">Localização</dt>
                          <dd className="mt-1 font-semibold text-slate-900">{vehicle.city}, {vehicle.state}</dd>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <dt className="text-slate-500">Centro de custo</dt>
                          <dd className="mt-1 font-semibold text-slate-900">{vehicle.costCenter ?? 'Não informado'}</dd>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <dt className="text-slate-500">Locadora</dt>
                          <dd className="mt-1 font-semibold text-slate-900">{vehicle.rentalCompany ?? 'Não informado'}</dd>
                        </div>
                      </dl>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
