import { useVehicles } from '../hooks/useVehicles';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { VehicleTable } from '../components/VehicleTable';

export function Dashboard() {
  const { data: vehicles, isLoading } = useVehicles();

  const totalVehicles = vehicles?.length ?? 0;
  const activeVehicles = vehicles?.filter(v => v.status === 'ACTIVE').length ?? 0;
  const pendingContracts = vehicles?.filter(v => v.status === 'PENDING').length ?? 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de Veículos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{isLoading ? '-' : totalVehicles}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">{isLoading ? '-' : activeVehicles}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contratos Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-yellow-600">{isLoading ? '-' : pendingContracts}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}