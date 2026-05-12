import { validateVehiclePlate } from "../rules";

export interface NormalizedIngestionRow {
  plate: string;
  model: string;
  type: string;
  status: string;
  state: string;
  city: string;
  costCenter?: string;
  accountItem?: string;
  rentalCompany?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  contractKmLimit?: number;
  contractMonthlyValue?: number;
  costDate?: string;
  costType?: string;
  costDescription?: string;
  costAmount?: number;
}

export interface IngestionParseResult {
  row: NormalizedIngestionRow | null;
  errors: string[];
}

const aliases: Record<keyof NormalizedIngestionRow, string[]> = {
  plate: ["placa", "plate", "placa_veiculo", "placa do veiculo"],
  model: ["modelo", "model", "veiculo", "descricao_modelo"],
  type: ["tipo", "type", "categoria", "grupo"],
  status: ["status", "situacao"],
  state: ["estado", "uf"],
  city: ["cidade", "municipio"],
  costCenter: ["centro_custo", "centro de custo", "cc"],
  accountItem: ["item_contabil", "item contabil", "conta_contabil"],
  rentalCompany: ["locadora", "fornecedor", "rental_company"],
  contractStartDate: ["data_inicio", "inicio_contrato", "dt_inicio"],
  contractEndDate: ["data_fim", "fim_contrato", "dt_fim"],
  contractKmLimit: ["km_limite", "franquia_km", "limite_km"],
  contractMonthlyValue: ["valor_mensal", "mensalidade", "valor_aluguel"],
  costDate: ["data_custo", "dt_custo", "data_lancamento"],
  costType: ["tipo_custo", "categoria_custo"],
  costDescription: ["descricao_custo", "descricao", "historico"],
  costAmount: ["valor_custo", "valor", "custo"],
};

function normalizeHeader(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function getValue(raw: Record<string, unknown>, field: keyof NormalizedIngestionRow): unknown {
  for (const alias of aliases[field]) {
    if (alias in raw) return raw[alias];
    const normalized = normalizeHeader(alias);
    if (normalized in raw) return raw[normalized];
  }
  return undefined;
}

function parseNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (typeof value !== "string") return undefined;
  const normalized = value.replace(/\./g, "").replace(",", ".").trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeDate(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "number") {
    const epoch = new Date(Date.UTC(1899, 11, 30));
    epoch.setUTCDate(epoch.getUTCDate() + value);
    return epoch.toISOString().slice(0, 10);
  }
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  const br = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(trimmed);
  if (br) {
    const [, dd, mm, yyyy] = br;
    return `${yyyy}-${mm}-${dd}`;
  }
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  return undefined;
}

function normalizeString(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

export function normalizeRowKeys(raw: Record<string, unknown>): Record<string, unknown> {
  return Object.entries(raw).reduce<Record<string, unknown>>((acc, [key, value]) => {
    acc[normalizeHeader(key)] = value;
    return acc;
  }, {});
}

export function parseIngestionRow(rawInput: Record<string, unknown>): IngestionParseResult {
  const raw = normalizeRowKeys(rawInput);
  const errors: string[] = [];

  const plateValue = normalizeString(getValue(raw, "plate"));
  const plateValidation = validateVehiclePlate(plateValue);
  if (!plateValidation.valid || !plateValidation.formatted) {
    errors.push(plateValidation.error ?? "Placa invalida");
  }

  const contractStartDate = normalizeDate(getValue(raw, "contractStartDate"));
  const contractEndDate = normalizeDate(getValue(raw, "contractEndDate"));
  if (!!contractStartDate !== !!contractEndDate) {
    errors.push("Contrato exige data de inicio e fim");
  }

  const costDate = normalizeDate(getValue(raw, "costDate"));
  const costAmount = parseNumber(getValue(raw, "costAmount"));
  if ((costDate && !costAmount) || (!costDate && costAmount !== undefined)) {
    errors.push("Custo exige data e valor");
  }

  if (errors.length > 0) {
    return { row: null, errors };
  }

  return {
    row: {
      plate: plateValidation.formatted!,
      model: normalizeString(getValue(raw, "model")),
      type: normalizeString(getValue(raw, "type")),
      status: normalizeString(getValue(raw, "status")) || "PENDING",
      state: normalizeString(getValue(raw, "state")),
      city: normalizeString(getValue(raw, "city")),
      costCenter: normalizeString(getValue(raw, "costCenter")) || undefined,
      accountItem: normalizeString(getValue(raw, "accountItem")) || undefined,
      rentalCompany: normalizeString(getValue(raw, "rentalCompany")) || undefined,
      contractStartDate,
      contractEndDate,
      contractKmLimit: parseNumber(getValue(raw, "contractKmLimit")),
      contractMonthlyValue: parseNumber(getValue(raw, "contractMonthlyValue")),
      costDate,
      costType: normalizeString(getValue(raw, "costType")) || undefined,
      costDescription: normalizeString(getValue(raw, "costDescription")) || undefined,
      costAmount,
    },
    errors,
  };
}
