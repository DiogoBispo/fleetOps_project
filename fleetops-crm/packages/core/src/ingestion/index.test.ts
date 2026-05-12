import { describe, expect, it } from "bun:test";
import { parseIngestionRow } from "./index";

describe("parseIngestionRow", () => {
  it("mapeia campos com aliases da planilha", () => {
    const result = parseIngestionRow({
      Placa: "abc1d23",
      Modelo: "Onix",
      Tipo: "HATCH",
      Status: "ATIVO",
      Estado: "SP",
      Cidade: "Sao Paulo",
      Locadora: "Localiza",
      "Data Inicio": "01/05/2026",
      "Data Fim": "31/05/2027",
      "Valor Mensal": "2.345,67",
    });

    expect(result.errors).toHaveLength(0);
    expect(result.row).not.toBeNull();
    expect(result.row?.plate).toBe("ABC-1D23");
    expect(result.row?.contractStartDate).toBe("2026-05-01");
    expect(result.row?.contractEndDate).toBe("2027-05-31");
    expect(result.row?.contractMonthlyValue).toBe(2345.67);
  });

  it("retorna erro para placa invalida", () => {
    const result = parseIngestionRow({
      placa: "abc123",
      modelo: "Kwid",
    });

    expect(result.row).toBeNull();
    expect(result.errors[0]).toContain("Placa");
  });

  it("retorna erro quando contrato esta incompleto", () => {
    const result = parseIngestionRow({
      placa: "ABC1234",
      data_inicio: "2026-01-01",
    });

    expect(result.row).toBeNull();
    expect(result.errors).toContain("Contrato exige data de inicio e fim");
  });

  it("retorna erro quando custo esta incompleto", () => {
    const result = parseIngestionRow({
      placa: "ABC1234",
      data_custo: "2026-01-10",
    });

    expect(result.row).toBeNull();
    expect(result.errors).toContain("Custo exige data e valor");
  });
});
