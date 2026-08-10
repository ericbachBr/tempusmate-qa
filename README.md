# TempusMate QA & E2E Dashboard

Dashboard estático e sem dependências para acompanhar QA manual, E2E, bugs, decisões de domínio e dívida técnica.

## Estrutura

- `index.html` — interface do dashboard
- `styles.css` — estilos responsivos
- `qa-data.js` — única fonte de dados do painel

## Como usar no repositório

Sugestão:

```text
docs/
  qa/
    index.html
    styles.css
    qa-data.js
```

Depois configure GitHub Pages para publicar a pasta `/docs` da branch desejada.

## Fluxo sugerido para o futuro

1. Achou um bug durante teste → adicionar em `bugs`.
2. Corrigiu → mudar `status`, preencher `resolution` e `verification`.
3. Executou cenário → adicionar em `executedTests`.
4. Nova hipótese/teste → adicionar em `pendingScenarios`.
5. Regra de negócio confirmada → adicionar em `rules`.
6. Dívida descoberta mas fora de escopo → adicionar em `knownDebt`.

A ideia é manter o dashboard como documentação viva e versionada junto com o código.

## Observação

O painel não possui backend. Toda informação vem de `qa-data.js`, então funciona em GitHub Pages e também ao abrir `index.html` localmente.
