import { Search, Bell, Plus } from "lucide-react";

export function Topbar() {
  return (
    <div className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Bem-vindo de volta
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Visão geral da frota
          </h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative block w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Buscar veículos, contratos ou alertas"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </label>

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
              <Plus className="h-4 w-4" />
              Novo registro
            </button>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
