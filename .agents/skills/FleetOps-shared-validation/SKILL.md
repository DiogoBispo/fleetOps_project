
---


# FleetOps Shared Validation

## Quando usar

Use esta skill para validações compartilháveis entre frontend e backend.

## Objetivo

Criar schemas e regras de validação reutilizáveis para evitar divergência entre frontend e backend.

## Local obrigatório

```txt
packages/types/
packages/core/

ou, se houver pacote dedicado:

packages/validation/
Stack recomendada
Zod
TypeScript

O que deve ser compartilhado
validação de placa
filtros de relatórios
payload de veículos
payload de contratos
payload de custos
payload de alertas
regras simples de formato
enums de status

O que NÃO deve ser compartilhado
regra pesada de banco
query SQL
transformação específica de UI
lógica específica de scraping
segredo ou credencial

Exemplo
import { z } from 'zod'

export const vehicleSchema = z.object({
  plate: z.string().min(7).max(8),
  model: z.string().optional(),
  status: z.enum(['ATIVO', 'INATIVO', 'OFICINA', 'SINISTRO']),
  rentalCompany: z.enum(['LOCALIZA', 'MOVIDA', 'PARTICULAR']).optional(),
})

Uso no backend
const payload = vehicleSchema.parse(request.body)
Uso no frontend
const formSchema = vehicleSchema

Regras de placa

Aceitar:

ABC1234
ABC1D23

Normalizar:

remover espaço
remover hífen
uppercase

Checklist:
 Schema está em pacote compartilhado
 Frontend e backend usam o mesmo schema
 Não existe schema duplicado
 Enums estão centralizados
 Mensagens de erro são compreensíveis
 Validação não depende de banco
 Validação não contém regra visual

Resultado esperado:
Validações consistentes, reutilizáveis e sem duplicação entre frontend e backend.