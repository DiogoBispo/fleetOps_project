


# FleetOps Frontend Store

## Quando usar

Use esta skill para criar ou alterar stores do frontend.

## Objetivo

Criar stores simples e previsíveis usando Zustand, apenas para estado global real.

## Stack

- Zustand
- TypeScript

## Quando usar store

Use store para:

- filtros persistentes de tela
- preferências de visualização
- estado de sidebar/layout
- seleção de cliente ativo no modo multicliente
- seleção temporária de campos em relatório customizado

## Quando NÃO usar store

Não use store para:

- cache de API
- dados de veículos vindos do backend
- contratos carregados da API
- alertas vindos da API
- relatórios já persistidos

Para dados remotos, use TanStack Query.

## Padrão

```ts
type VehicleFiltersState = {
  search: string
  status?: string
  rentalCompany?: string
  state?: string
  setSearch: (value: string) => void
  setStatus: (value?: string) => void
  reset: () => void
}

Regras
Store pequena
Sem lógica de negócio crítica
Sem chamada HTTP dentro da store
Sem cálculo de auditoria
Sem dependência direta de componentes visuais
Nome claro

Organização:
apps/web/src/stores/
├── useVehicleFiltersStore.ts
├── useReportsBuilderStore.ts
├── useLayoutStore.ts
└── useClientContextStore.ts

Checklist:
 A store é realmente necessária?
 Não seria melhor TanStack Query?
 A store não chama API?
 A store não calcula regra de negócio?
 As actions estão tipadas?
 Existe método de reset quando necessário?
 O nome comunica o propósito?

Resultado esperado:
Store limpa, pequena, tipada e usada apenas para estado global legítimo.