

# FleetOps Frontend Component

## Quando usar

Use esta skill para criar ou ajustar componentes visuais do frontend do FleetOps CRM.

## Objetivo

Criar componentes reutilizáveis, simples, claros e fáceis de entender pelo cliente final.

## Stack

- React
- TypeScript
- Vite
- ShadCN UI
- TailwindCSS
- TanStack Query quando houver dados externos
- Zustand apenas quando houver estado global real

## Princípios de UX

O cliente final deve entender a tela sem treinamento técnico.

Prioridades:

1. Clareza visual
2. Poucos cliques
3. Filtros visíveis
4. Dados importantes primeiro
5. Alertas destacados
6. Tabelas legíveis
7. Estados vazios bem explicados

## Componentes típicos

- Cards de KPI
- Tabelas de frota
- Filtros
- Badges de status
- Alertas
- Modal de detalhes
- Botões de exportação
- Seletor de período
- Resumo financeiro
- Componente de severidade

## Padrões obrigatórios

### Props tipadas

```tsx
type VehicleStatusBadgeProps = {
  status: 'ATIVO' | 'INATIVO' | 'OFICINA' | 'SINISTRO'
}

Componentes pequenos

Evite componentes gigantes. Separe:

VehicleTable
VehicleTableFilters
VehicleStatusBadge
VehicleCostSummary
VehicleAlertBadge
Sem regra de negócio crítica

Não calcular vencimento, alerta ou auditoria dentro do componente.

Errado:

const isExpired = new Date(contract.endDate) < new Date()

Certo:

<ContractStatusBadge status={contract.status} />
Estados obrigatórios

Todo componente conectado a dados deve prever:

loading
empty
error
success
Acessibilidade mínima
Botões com texto claro
Ícones nunca devem ser a única informação
Cores não podem ser a única forma de comunicar severidade
Tabelas devem ter cabeçalhos claros

Checklist:
 O componente é reutilizável?
 As props estão tipadas?
 Não há regra de negócio crítica?
 O texto é claro para usuário não técnico?
 Existem estados de loading/empty/error?
 O visual segue padrão limpo e profissional?
 Não há dependência desnecessária de página específica?

Resultado esperado:
Entregar componente limpo, tipado e pronto para uso no frontend.