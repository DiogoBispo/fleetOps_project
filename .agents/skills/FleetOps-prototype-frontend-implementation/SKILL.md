
---

# FleetOps Prototype Frontend Implementation

## Quando usar

Use esta skill para implementar na aplicação uma tela, fluxo ou feature que foi observada no protótipo em `temp`.

## Objetivo

Transformar uma referência visual do protótipo em código real dentro do frontend FleetOps.

## Processo

1. Ler o protótipo em `temp`.
2. Identificar:
   - tela
   - componentes
   - interações
   - estados
   - dados mockados
3. Mapear para estrutura real do app.
4. Criar componentes reutilizáveis.
5. Substituir mocks por hooks reais ou interfaces preparadas.
6. Garantir aderência visual e arquitetural.

## Regra principal

Não copiar cegamente o protótipo.

Adaptar para:

- estrutura do monorepo
- componentes reais
- tipos compartilhados
- hooks de API
- UX do FleetOps

## Estrutura recomendada

```txt
apps/web/src/pages/
apps/web/src/components/
apps/web/src/hooks/
apps/web/src/services/

Exemplo

Protótipo:

temp/DashboardMock.tsx

Implementação real:

apps/web/src/pages/DashboardPage.tsx
apps/web/src/components/dashboard/FleetSummaryCards.tsx
apps/web/src/components/dashboard/AlertsOverview.tsx
apps/web/src/hooks/useDashboardSummary.ts

Checklist:
 A tela foi quebrada em componentes
 Mocks foram removidos ou isolados
 Props foram tipadas
 Dados remotos usam hook
 Layout é responsivo
 Texto está claro para cliente final
 Estados loading/empty/error existem
 Nenhuma regra crítica ficou no frontend

Resultado esperado:
Feature visual implementada no app real, preservando a intenção do protótipo, mas com código limpo e pronto para produção.