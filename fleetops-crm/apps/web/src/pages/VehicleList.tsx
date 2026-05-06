import { useVehicles } from '../hooks/useVehicles';
import { VehicleTable } from '../components/VehicleTable';

export function VehicleList() {
  const { data: vehicles, isLoading } = useVehicles();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Veículos</h1>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <VehicleTable vehicles={vehicles ?? []} />
      )}
    </div>
  );
}