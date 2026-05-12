# FleetOps CRM

Sistema web para gestão, auditoria e automação de frotas.

## Arquitetura (Monorepo)

```
fleetops-crm/
├── apps/
│   ├── web/           # Frontend React (Vite)
│   ├── api/           # Backend Node.js (Fastify + Bun)
│   └── scraper/       # Python scraping (Playwright)
├── packages/
│   ├── db/            # Schema SQLite (Drizzle)
│   ├── core/          # Regras de negócio (Audit, Validações)
│   ├── types/         # Tipos TypeScript compartilhados
│   ├── utils/         # Helpers e Utilitários
│   └── ui/            # Design System / Componentes React
├── docker/            # Dockerfiles por serviço
├── scripts/           # Scripts de manutenção e auditoria
├── data/              # Banco de dados SQLite local
└── docker-compose.yml # Orquestração do ambiente
```

## Quick Start (Local)

```bash
# Instalar dependências
cd fleetops-crm
bun install

# Instalar dependências do pacote de banco
cd packages/db && bun install && cd ../..

# Rodar migrações do banco
bun run db:push

# Iniciar desenvolvimento
bun run dev
```

## Docker (Recomendado)

O projeto está configurado para rodar totalmente via Docker, garantindo isolamento entre os serviços.

```bash
# Subir todos os serviços (API e Web)
docker-compose up -d

# Subir com o Scraper (Profile específico)
docker-compose --profile scraper up -d

# Ver logs
docker-compose logs -f
```

### Portas:

- **Frontend**: http://localhost:3000
- **Backend (API)**: http://localhost:3001

## Scripts Úteis

- `pnpm audit:run`: Executa o motor de auditoria no banco.
- `pnpm excel:import`: Importa dados da frota a partir de arquivos XLSX.
