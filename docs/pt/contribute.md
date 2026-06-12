---
title: Contribuir
nav_order: 4
parent: Português

layout: page
---

# Contribuir

Esta secção cobre o processo técnico para submeter observações.

---

## Quem pode contribuir

Qualquer pessoa. Não precisas de conhecimentos técnicos. Se observaste um problema num serviço público, podes submetê-lo.

---

## Formato de submissão

Todas as observações são submetidas através de um formulário estruturado:

### [👁️ Submeter uma Observação](https://github.com/andreclemente/openstate/issues/new?template=reportar-problema.yml)

O formulário cria uma entrada estruturada automaticamente. Escreve em **Português ou Inglês**. Submissões em português são traduzidas automaticamente para inglês.

---

## Estrutura de observação

    ## Observação
    [Descrição curta e clara do que acontece]

    ## O que acontece
    1.
    2.
    3.

    ## Quem é afetado
    [cidadãos / empresas / instituições]

    ## Impacto
    - [Tempo perdido / custo / complexidade / fiabilidade]

    ## Sistema envolvido
    [ex: saúde, educação, transportes, justiça, finanças públicas, serviços digitais]

    ## Evidência
    [Notícias, relatórios, dados, legislação, casos reais]

    ## Causa raiz possível (opcional)

    ## Observações relacionadas
    #123, #456

---

## Regras

### Aceite

- Problemas observáveis e reprodutíveis em serviços públicos
- Evidência concreta (notícias, dados, relatórios, legislação, casos reais)
- Descrições factuais e neutras
- Propostas estruturadas submetidas separadamente da observação

### Rejeitado

- Opiniões sem evidência
- Dados pessoais de terceiros
- Linguagem política ou ideológica
- Duplicações — procura primeiro se a observação já existe
- Soluções sem observação — descreve o problema primeiro

---

## Categorias

**Setor:** `healthcare` · `education` · `transport` · `justice` · `public-finance` · `digital-services`

**Tipo:** `efficiency` · `accessibility` · `transparency` · `reliability` · `redundancy`

**Urgência:** `high` · `medium` · `low`

**Estado:** `draft` · `confirmed` · `analyzed` · `proposed`

---

## Formato de proposta de solução

Quando uma observação atinge o estado `Analisado`, pode ser submetida uma **proposta de solução** com a label `proposal`:

    ## Proposta
    [Descrição da solução]

    ## Impacto estimado
    [Quem beneficia, custo estimado, prazo]

    ## Evidência de viabilidade
    [Exemplos de onde foi implementado, estudos, dados]

---

## Processo

```
1. Rascunho      → Descreves o que observaste
2. Confirmado    → Anexas evidência verificável
3. Analisado     → Identificas causa raiz
4. Proposto      → Submetes solução estruturada
```

---

## Tradução automática

Observações em português são traduzidas automaticamente para inglês. A tradução aparece como comentário. O texto original em português mantém-se como versão de referência.

---

## Contacto

Para questões sobre o projeto, abre uma discussão com a label `meta`.
