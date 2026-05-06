


# FleetOps Monorepo Compliance Review

## Quando usar

Use esta skill para revisar código do monorepo e verificar aderência real ao `ai_coding_directives.md` e ao `AGENTS.md`.

## Objetivo

Garantir que o projeto FleetOps CRM respeita a arquitetura definida:

- frontend limpo
- backend organizado
- regras em `packages/core`
- banco em `packages/db`
- tipos compartilhados em `packages/types`
- scraping isolado em Python
- sem acoplamento indevido

## Estrutura esperada

```txt
apps/
  web/
  api/
  scraper/

packages/
  db/
  core/
  types/
  utils/
  ui/

  Pontos de verificação:
 Monorepo
 Apps não duplicam lógica compartilhável
 Packages têm responsabilidade clara
 Imports seguem boundaries
 Não há dependência circular
 Não há regra de negócio no frontend

Backend:
 Controllers são finos
 Services concentram orquestração
 Repositories acessam banco
 Validação usa Zod ou schema compartilhado
 Não há SQL espalhado fora do pacote de DB

Frontend:
 Páginas não fazem regra pesada
 Componentes são reutilizáveis
 Stores são pequenas
 TanStack Query é usado para dados remotos

Banco:
 Schema centralizado
 Migrações controladas
 SQLite não contém dados sensíveis commitados
 Seeds separados de dados reais

Scraper:
 Credenciais fora do código
 Saída padronizada em JSON
 Logs existem
 Scraper não escreve direto em tabelas críticas sem validação

Classificação dos achados
Use:

CRÍTICO
ALTO
MÉDIO
BAIXO
Saída esperada:

## Resumo da revisão

## Achados críticos

## Achados altos

## Achados médios

## Achados baixos

## Correções recomendadas

## Plano de refatoração em ordem

Regra final
Toda crítica precisa indicar:

arquivo afetado
problema
impacto
correção sugerida


