import type { Vehicle } from '@fleetops/types';

interface VehicleTableProps {
  vehicles: Vehicle[];
}

export function VehicleTable({ vehicles }: VehicleTableProps) {
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">Placa</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Modelo</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Tipo</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Localização</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{vehicle.plate}</td>
              <td className="px-4 py-3 text-sm">{vehicle.model}</td>
              <td className="px-4 py-3 text-sm">{vehicle.type}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    vehicle.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {vehicle.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                {vehicle.city}, {vehicle.state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}