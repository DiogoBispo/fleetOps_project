import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VehicleTable } from "./VehicleTable";
import type { Vehicle } from "@fleetops/types";

const vehicles: Vehicle[] = [
  {
    id: "v1",
    plate: "ABC-1234",
    model: "Onix",
    type: "HATCH",
    status: "ATIVO",
    state: "SP",
    city: "Sao Paulo",
    costCenter: "CC-01",
    accountItem: "AI-01",
    rentalCompany: "Localiza",
    createdAt: "2026-05-01T00:00:00.000Z",
    updatedAt: "2026-05-10T00:00:00.000Z",
  },
];

describe("VehicleTable details drawer", () => {
  it("abre e fecha detalhes do veículo", async () => {
    const user = userEvent.setup();
    render(<VehicleTable vehicles={vehicles} />);

    await user.click(screen.getByRole("button", { name: "Detalhes" }));

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Detalhes do veículo")).toBeInTheDocument();
    expect(within(dialog).getByText("ABC-1234")).toBeInTheDocument();
    expect(within(dialog).getByText("Localiza")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Fechar detalhes" }));
    expect(screen.queryByText("Detalhes do veículo")).not.toBeInTheDocument();
  });
});
