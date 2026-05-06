# FleetOps Commit Flow

## Quando usar

Use esta skill quando o pedido for criar commit(s) local(is), preparar mensagens de commit ou organizar mudanças em batches coerentes no projeto FleetOps CRM.

## Objetivo

Organizar alterações do monorepo em commits pequenos, rastreáveis e semanticamente corretos, evitando commits genéricos, mistos ou difíceis de revisar.

## Contexto do projeto

O FleetOps CRM usa:

- Monorepo
- Node.js + TypeScript no backend
- React + TypeScript no frontend
- SQLite local
- Drizzle ORM
- Python para scraping
- Pacotes compartilhados em `packages/`

## Processo obrigatório

1. Inspecionar mudanças locais.
2. Separar alterações por domínio:
   - frontend
   - backend
   - database
   - core rules
   - scraper
   - docs
   - config
3. Evitar misturar refactor, feature e fix no mesmo commit.
4. Criar commits pequenos e coerentes.
5. Usar mensagens no padrão Conventional Commits.

## Tipos de commit

Use obrigatoriamente um dos tipos:

- `feat`
- `fix`
- `refactor`
- `docs`
- `test`
- `chore`
- `build`
- `ci`

## Escopos recomendados

- `web`
- `api`
- `db`
- `core`
- `types`
- `scraper`
- `reports`
- `alerts`
- `vehicles`
- `contracts`
- `imports`

## Exemplo de mensagens

```bash
feat(web): add vehicle dashboard summary cards
feat(api): add contract expiration audit endpoint
fix(db): normalize vehicle plate uniqueness
refactor(core): isolate rental cost validation rule
docs(project): update FleetOps implementation roadmap 

Regras rígidas:
Não criar commit sem revisar o diff.
Não incluir arquivos temporários.
Não incluir .env.
Não incluir banco SQLite real com dados sensíveis.
Não commitar credenciais de locadoras, UNIC ou Ticket Log.
Não commitar downloads de relatórios reais.
Não commitar arquivos grandes sem necessidade.

Checklist antes do commit:
 O commit representa uma mudança lógica única?
 A mensagem explica o que mudou?
 Não há segredo exposto?
 Não há arquivo temporário?
 O código ainda respeita o monorepo?
 O frontend não contém regra de negócio crítica?
 O backend não duplica validações compartilháveis?
 O scraper não salva credenciais em código?

Resultado esperado:
Entregar uma lista clara de commits criados ou uma sugestão de batches para o usuário executar.