
---


# FleetOps Prototype Compliance Review

## Quando usar

Use esta skill para revisar implementações originadas do protótipo em `temp`.

## Objetivo

Garantir que telas, componentes ou fluxos copiados/adaptados do protótipo foram integrados corretamente ao app real, sem lixo de prototipagem.

## O que revisar

- Imports quebrados
- Componentes não utilizados
- CSS inline excessivo
- Dados mockados
- Estado fake
- Texto placeholder
- Lógica duplicada
- Estrutura incompatível com monorepo
- Componentes grandes demais
- Falta de integração com API real

## Regras

Protótipo serve como referência visual, não como arquitetura final.

Não aceitar:

- `mockVehicles` fixo em tela final
- `any` desnecessário
- dados hardcoded
- layout sem responsividade
- regra de negócio no componente
- chamadas fake sem substituição por hooks

## Saída esperada

```md
## Status da adaptação

## Problemas encontrados

## Itens ainda mockados

## Ajustes necessários

## Arquivos afetados

## Critério para considerar pronto

Checklist:
 Dados mockados foram removidos ou isolados
 Hooks reais foram usados
 Componentes estão no local correto
 Tipos foram aplicados
 UX foi mantida
 Código respeita padrões do FleetOps