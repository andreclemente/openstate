---
title: Contribuir
nav_order: 4
parent: Português
---

# Contribuir

## Quem pode contribuir

Qualquer pessoa. Não precisas de conhecimentos técnicos. Se observaste um problema num serviço público ou tens uma ideia para uma solução, podes contribuir.

---

## Como submeter uma observação

### Opção 1: Formulário estruturado (recomendado)

A forma mais rápida de documentar um problema:

### [🐛 Submeter uma Observação](https://github.com/andreclemente/openstate/issues/new?template=reportar-problema.yml)

1. Clica no botão acima
2. Preenche os campos (podes escrever em **PT ou EN**)
3. Submete

A observação é criada automaticamente com a estrutura correta. Se escreveres em português, uma **tradução para inglês** será adicionada automaticamente como comentário.

### Opção 2: Manual

1. Vai ao [projeto no GitHub](https://github.com/andreclemente/openstate/issues)
2. Clica em **"New Issue"**
3. Seleciona o template **"Reportar Problema / Report Problem"**
4. Preenche e submete

---

## Formato de observação

Copia e preenche:

    ## Observação
    [Descrição curta e clara do que acontece]

    ## O que acontece
    1.
    2.
    3.

    ## Quem é afetado
    [Cidadãos / empresas / instituições]

    ## Impacto
    - [Tempo perdido / custo / complexidade / fiabilidade]

    ## Sistema envolvido
    [Ex: saúde, educação, transportes, justiça, finanças públicas, serviços digitais]

    ## Evidência
    - [Notícias, relatórios, dados, legislação]

    ## Causa raiz possível (opcional)

    ## Observações relacionadas
    #123, #456

---

## Regras

### O que é aceite

- Problemas **observáveis e reprodutíveis** em serviços públicos
- Evidência **concreta** (notícias, dados, relatórios)
- Descrições **factuais** e neutras
- Propostas **estruturadas** (separadas da observação)

### O que é rejeitado

- **Opiniões** sem evidência
- **Dados pessoais** de terceiros
- **Linguagem política** ou ideológica
- **Duplicações** — procura se o problema já existe primeiro
- **Soluções sem observação** — descreve o problema primeiro

---

## Formato de propostas de solução

Quando uma observação está no estado `Analisado`, pode ser criada uma **proposta de solução** como comentário ou entrada separada com a label `proposal`:

    ## Proposta
    [Descrição da solução]

    ## Impacto estimado
    [Quem beneficia, custo estimado, prazo]

    ## Evidência de viabilidade
    [Exemplos de onde foi implementado, estudos, dados]

---

## Categorias

Usa estas categorias para organizar observações:

**Setor:** `healthcare` · `education` · `transport` · `justice` · `public-finance` · `digital-services`

**Tipo:** `efficiency` · `accessibility` · `transparency` · `reliability` · `redundancy`

**Urgência:** `high` · `medium` · `low`

**Estado:** `draft` · `confirmed` · `analyzed` · `proposed`

---

## Processo

```
1. Rascunho      → Descreves o que observaste
2. Confirmado    → Anexas evidência verificável
3. Analisado      → Comunidade identifica causa raiz
4. Proposto       → Solução estruturada é submetida
```

---

## Tradução automática

Observações escritas em português são automaticamente traduzidas para inglês por um bot. A tradução aparece como **comentário** na entrada. O texto original em português mantém-se como versão de referência.

---

## Contacto

Para questões sobre o projeto em si, abre uma discussão com a label `meta`.
