

# FleetOps Frontend Page

## Quando usar

Use esta skill para criar ou alterar páginas, telas e features verticais do frontend.

## Objetivo

Criar telas completas do FleetOps CRM com foco em clareza operacional, navegação simples e fácil entendimento pelo cliente final.

## Telas principais

- `/dashboard`
- `/vehicles`
- `/vehicles/:id`
- `/contracts`
- `/financial`
- `/workshop`
- `/alerts`
- `/reports`
- `/settings`

## Estrutura esperada de uma página

Cada página deve seguir o padrão:

```txt
PageHeader
PrimaryActions
Filters
MainContent
SecondaryContent
Empty/Error states

Exemplo
VehiclesPage
├── Header: "Frota"
├── Actions: Exportar, Importar, Atualizar
├── Filters: Placa, Status, Locadora, UF
├── Content: VehicleTable
└── Summary: total, ativos, alertas

Regras:
Página coordena componentes, não concentra lógica de negócio.
Página pode chamar hooks.
Página não deve acessar API diretamente.
Página não deve manipular regra de auditoria.
Página não deve conter SQL ou transformação pesada.
Data fetching

Use hooks dedicados:

const { data, isLoading, error } = useVehicles(filters)

Não fazer:

fetch('/api/vehicles')

direto na página.

Filtros:

Toda listagem operacional deve ter filtros claros:

busca textual
período quando aplicável
status
locadora
UF/cidade
severidade quando for alerta
Relatórios

A página de relatórios deve permitir:

seleção de período
escolha de campos
agrupamento
filtros
pré-visualização
exportação Excel
exportação PDF

Checklist:
 A página tem título claro?
 Existem ações primárias visíveis?
 Os filtros são simples?
 A tela tem loading/empty/error?
 Os componentes estão separados?
 A página não concentra regra de negócio?
 O cliente final entende o que fazer?

Resultado esperado:
Entregar uma tela funcional, clara, composta por componentes reutilizáveis e conectada aos hooks corretos.