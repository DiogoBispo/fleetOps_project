import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { VehicleList } from "./pages/VehicleList";
import { Dashboard } from "./pages/Dashboard";
import { Reports } from "./pages/Reports";
import { Alerts } from "./pages/Alerts";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="vehicles" element={<VehicleList />} />
        <Route path="reports" element={<Reports />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}
