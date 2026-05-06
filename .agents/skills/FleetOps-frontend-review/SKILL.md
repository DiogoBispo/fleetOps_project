


# FleetOps Frontend Review

## Quando usar

Use esta skill para revisar o frontend existente e verificar aderência ao `ai_coding_directives.md`.

## Objetivo

Auditar o frontend do FleetOps CRM para garantir legibilidade, consistência visual, separação de responsabilidades e facilidade de uso pelo cliente final.

## Áreas de revisão

1. Estrutura de páginas
2. Componentização
3. Tipagem TypeScript
4. Uso de hooks
5. Stores Zustand
6. TanStack Query
7. UX e clareza
8. Estados de erro/loading/empty
9. Separação de regra de negócio
10. Aderência ao monorepo

## O que procurar

### Problemas críticos

- Regra de negócio crítica no frontend
- Componentes gigantes
- Props sem tipo
- Fetch direto espalhado
- Estado global desnecessário
- Duplicação de lógica
- Tabelas difíceis de entender
- Alertas sem severidade clara
- Relatórios sem filtros suficientes

### Problemas de UX

- Texto técnico demais
- Botões ambíguos
- Falta de feedback
- Filtros escondidos
- Excesso de informação
- Falta de hierarquia visual

## Checklist de revisão

- [ ] Componentes pequenos e nomeados corretamente
- [ ] Páginas organizadas
- [ ] Hooks isolam acesso a dados
- [ ] Stores não substituem cache de API
- [ ] Sem regra de auditoria no frontend
- [ ] Estados de loading/empty/error existem
- [ ] Tabelas têm colunas claras
- [ ] Badges e alertas são compreensíveis
- [ ] Relatórios são personalizáveis
- [ ] Código está aderente ao monorepo

## Saída esperada

Responder em formato:

```md
## Diagnóstico geral

## Problemas críticos

## Problemas médios

## Melhorias recomendadas

## Ações priorizadas

## Arquivos que precisam de alteração

Regra final:
Não apenas apontar problema. Sempre sugerir uma correção concreta.