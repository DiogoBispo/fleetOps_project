import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useVehicles } from '../hooks/useVehicles';
import { VehicleTable } from '../components/VehicleTable';

const statusLabelMap: Record<string, string> = {
  ATIVO: 'Ativo',
  INATIVO: 'Inativo',
  OFICINA: 'Oficina',
  SINISTRO: 'Sinistro',
  PENDING: 'Pendente',
};

export function VehicleList() {
  const { data: vehicles, isLoading } = useVehicles();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('ALL');
  const [city, setCity] = useState('ALL');
  const [type, setType] = useState('ALL');

  const vehicleList = vehicles ?? [];

  const statusOptions = useMemo(
    () => Array.from(new Set(vehicleList.map((vehicle) => vehicle.status))).sort(),
    [vehicleList]
  );
  const cityOptions = useMemo(
    () => Array.from(new Set(vehicleList.map((vehicle) => vehicle.city))).sort(),
    [vehicleList]
  );
  const typeOptions = useMemo(
    () => Array.from(new Set(vehicleList.map((vehicle) => vehicle.type))).sort(),
    [vehicleList]
  );

  const filteredVehicles = useMemo(() => {
    return vehicleList.filter((vehicle) => {
      const searchText = [vehicle.plate, vehicle.model, vehicle.type, vehicle.city, vehicle.state]
        .join(' ')
        .toLowerCase();
      const matchesQuery = searchText.includes(query.toLowerCase());
      const matchesStatus = status === 'ALL' || vehicle.status === status;
      const matchesCity = city === 'ALL' || vehicle.city === city;
      const matchesType = type === 'ALL' || vehicle.type === type;

      return matchesQuery && matchesStatus && matchesCity && matchesType;
    });
  }, [city, query, status, type, vehicleList]);

  const clearFilters = () => {
    setQuery('');
    setStatus('ALL');
    setCity('ALL');
    setType('ALL');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Veículos</p>
          <h1 className="text-3xl font-bold text-slate-900">Lista de veículos</h1>
          <p className="mt-1 text-sm text-slate-600">Filtre a frota por status, tipo, cidade e pesquisa rápida.</p>
        </div>
        <button
          type="button"
          onClick={clearFilters}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Limpar filtros
        </button>
      </div>

      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <label className="block w-full">
          <span className="mb-2 block text-sm font-medium text-slate-700">Busca</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Digite placa, modelo ou cidade"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            >
              <option value="ALL">Todos</option>
              {statusOptions.map((item) => (
                <option key={item} value={item}>
                  {statusLabelMap[item] ?? item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Cidade</span>
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            >
              <option value="ALL">Todas</option>
              {cityOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Tipo</span>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            >
              <option value="ALL">Todos</option>
              {typeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total na frota</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{vehicleList.length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Filtrados</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{filteredVehicles.length}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Cidades</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{cityOptions.length}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">Carregando veículos...</div>
      ) : (
        <VehicleTable vehicles={filteredVehicles} />
      )}
    </div>
  );
}
