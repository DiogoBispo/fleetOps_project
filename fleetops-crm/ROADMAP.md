#  FleetOps Roadmap

Este roadmap detalha as etapas de implementação do sistema, respeitando as dependências entre cada módulo e funcionalidade.

---

##  Fase 0: Fundação & Infraestrutura
*Base necessária para qualquer desenvolvimento.*

- [x] **Setup Monorepo**: Configuração de `pnpm workspaces` e `Turborepo`.
- [x] **Arquitetura de Docker**: Configuração do `docker-compose.yml` e Dockerfiles isolados.
- [x] **Shared Packages**:
    - [x] `@fleetops/types`: Definição central de interfaces.
    - [x] `@fleetops/utils`: Helpers globais.
    - [x] `@fleetops/db`: Setup do Drizzle ORM e conexão SQLite.
- [x] **Schema Inicial**: Implementação das tabelas `vehicles`, `contracts`, `costs` e `alerts`.

---

##  Fase 1: Ingestão de Dados (O "Input")
*Garantir que o sistema tenha dados reais para processar.*

- [x] **Script de Importação Excel**: Criar parser robusto para arquivos `.xlsx`.
- [ ] **Mapeamento de Planilhas**: Configurar campos de Locadoras (Localiza, Movida) para o schema FleetOps.
- [ ] **Validadores de Ingestão**: Garantir que placas e datas sejam normalizadas antes de entrar no DB.

---

##  Fase 2: Motor de Negócio (O "Brain")
*As regras que diferenciam o FleetOps de um CRUD simples.*

- [x] **Central de Regras (`@fleetops/core`)**: Localização única para lógica de negócio.
- [x] **Algoritmo de Auditoria**: Implementar `runAudit` para detectar inconsistências:
    - [x] Sem contrato ativo.
    - [x] Contrato vencido.
    - [x] Custo de aluguel zerado.
- [x] **Script de Auditoria CLI**: Rodar auditoria manualmente via terminal.

---

##  Fase 3: Backend & API (Os "Serviços")
*Exposição dos dados para o frontend.*

- [ ] **Refatoração para Repositórios**: Mover lógica de DB de todos os serviços para `repositories`.
- [ ] **Endpoints de Veículos**: Listagem, detalhes e histórico.
- [ ] **Endpoints de Alertas**: Listar e marcar como lido.
- [ ] **Endpoint de Execução de Auditoria**: Trigger manual via API.
- [ ] **Documentação Swagger**: (Opcional para MVP).

---

##  Fase 4: Frontend (A "Interface")
*Visualização e operação do sistema.*

- [ ] **Layout Base**: Sidebar, Header e Design System (Radix + Tailwind).
- [ ] **Dashboard Principal**:
    - [ ] Cards de KPI (Total veículos, Ativos, Alertas Críticos).
    - [ ] Gráfico de custos mensais.
- [ ] **Gestão de Frota**:
    - [ ] Tabela dinâmica de veículos com filtros.
    - [ ] Drawer/Modal de detalhes do veículo.
- [ ] **Central de Alertas**: Visualização priorizada por severidade.

---

##  Fase 5: Automação & Scraping (As "Mãos")
*Busca automática de dados externos.*

- [ ] **Módulo Locadoras**: Implementar scraping Playwright para Localiza e Movida.
- [ ] **Módulo UNIC**: Implementar scraping para o portal UNIC.
- [ ] **Pipeline de Integração**:
    - [ ] Scraper → JSON → API → SQLite.
- [ ] **Scheduler**: Configurar `node-cron` para rodar scraping 4x ao dia no Docker.

---

##  Fase 6: Relatórios Avançados & Entrega
*O valor final para o cliente.*

- [ ] **Builder de Relatórios**: Interface para o usuário escolher colunas e filtros.
- [ ] **Exportação**:
    - [ ] Gerar Excel (xlsx) a partir da visão atual.
    - [ ] Gerar PDF resumido.
- [ ] **Audit Logs**: Registro de quem alterou o quê no sistema.

---

##  Legenda de Dependências
- **Fase 3** depende da **Fase 2**.
- **Fase 4** depende da **Fase 3**.
- **Fase 5** pode ser feita em paralelo com a **Fase 4**, mas depende da **Fase 3** para salvar os dados.
