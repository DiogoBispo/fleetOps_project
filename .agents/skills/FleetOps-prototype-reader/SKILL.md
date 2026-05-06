
---

# FleetOps Prototype Reader

## Quando usar

Use esta skill quando a origem da demanda estiver no protótipo dentro de `temp`.

## Objetivo

Ler, interpretar e documentar o que existe no protótipo antes de implementar no app real.

## Processo obrigatório

1. Localizar arquivos em `temp`.
2. Identificar telas e componentes.
3. Descrever o comportamento visual.
4. Identificar dados mockados.
5. Identificar interações.
6. Mapear o que deve virar código real.
7. Apontar riscos de copiar diretamente.

## O que extrair

Para cada tela:

```md
- Nome da tela
- Objetivo
- Componentes visuais
- Dados exibidos
- Filtros
- Ações
- Estados
- Dependências
- O que é mock
- O que precisa vir da API


Saída esperada
## Protótipo analisado

## Telas encontradas

## Componentes reutilizáveis

## Dados mockados

## Fluxos de usuário

## Mapeamento para o app real

## Próximos passos de implementação

Regras:
Não implementar nessa skill.
Apenas ler, interpretar e mapear.
Não assumir que o protótipo tem arquitetura correta.
Separar referência visual de decisão técnica.