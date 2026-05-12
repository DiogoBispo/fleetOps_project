import { NavLink } from "react-router-dom";
import { BarChart3, Bell, FileText, Home, Truck } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/vehicles", label: "Veículos", icon: Truck },
  { to: "/reports", label: "Relatórios", icon: FileText },
  { to: "/alerts", label: "Alertas", icon: Bell },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-white p-6 xl:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            FleetOps
          </p>
          <p className="text-lg font-semibold text-slate-900">
            Controle de Frotas
          </p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm">
        <p className="font-semibold text-slate-900">Resumo rápido</p>
        <p className="mt-2 text-xs text-slate-500">
          Acesse o dashboard para ver métricas, sinais e alertas da frota em
          tempo real.
        </p>
      </div>
    </aside>
  );
}
