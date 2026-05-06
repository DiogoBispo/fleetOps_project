
---

# FleetOps Multicliente Dev MVP

## Quando usar

Use esta skill quando o objetivo for habilitar rapidamente contexto de cliente por request, com perfis admin/operação/cliente, segurança básica e aderência ao monorepo.

## Objetivo

Adicionar suporte multicliente mínimo sem transformar o MVP local em SaaS complexo.

## Escopo do MVP

Permitir que o sistema diferencie dados por cliente.

Perfis:

- ADMIN
- OPERACAO
- CLIENTE

## Fora de escopo

Não implementar agora:

- billing
- tenant isolation avançado
- OAuth
- RBAC complexo
- cloud multi-tenant
- organizações hierárquicas complexas

## Banco

Adicionar tabela:

```sql
CREATE TABLE clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  document TEXT,
  active INTEGER DEFAULT 1,
  created_at TEXT,
  updated_at TEXT
);

Adicionar client_id em:

vehicles
contracts
costs
alerts
daily_logs
workshop
reports
Contexto por request

Toda request deve carregar:

type RequestContext = {
  clientId: string
  userRole: 'ADMIN' | 'OPERACAO' | 'CLIENTE'
}

Regra obrigatória:
Nenhuma query operacional pode rodar sem clientId.

Errado:

db.select().from(vehicles)

Certo:

db.select().from(vehicles).where(eq(vehicles.clientId, ctx.clientId))
Frontend

Criar store:

useClientContextStore

Campos:

selectedClientId
selectedClientName
role
API

Adicionar middleware simples:

x-client-id
x-user-role
Segurança básica
Validar clientId
Bloquear acesso sem contexto
Logar requests sem cliente
Não permitir cliente visualizar outro cliente

Checklist:
 Todas as tabelas operacionais têm client_id
 Todas as queries filtram por clientId
 Frontend envia contexto
 Middleware valida contexto
 Relatórios filtram por cliente
 Auditoria roda por cliente
 Scraper associa dados ao cliente correto

Resultado esperado:
Sistema funcionando em modo multicliente simples, seguro o bastante para MVP local/controlado.