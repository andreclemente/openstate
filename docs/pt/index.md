---
title: Início
nav_order: 1
parent: Português
last_modified_at: 2026-06-11
---

# OpenState

**Bug Tracker de Sistemas Públicos**

---

## O que é

OpenState é um **bug tracker de sistemas públicos**.

Não é um fórum de discussão. Não é um manifesto político. É um sistema de conhecimento estruturado para documentar falhas em serviços públicos da mesma forma que documentamos bugs em software.

### Princípios

- **Cada problema é uma issue** — como um bug report
- **Evidência é obrigatória** — sem dados, não há issue
- **Problemas e soluções são separados** — primeiro descreve-se, depois propõe-se
- **O foco é análise, não debate** — estrutura acima de opinião

### Como funciona

O **repositório do GitHub** é a fonte de verdade. Todas as issues, dados estruturados, labels e propostas vivem lá.

Este site é a **camada de leitura** — uma interface humana por cima dos dados.

---

## Exemplo de issue

> **Problema:** Utente esperou 4 horas num hospital público porque o sistema de triagem não distinguia entre casos urgentes e não-urgentes.

    ## Problema
    Triagem hospitalar sem critérios de priorização eficazes

    ## Passos para reproduzir
    1. Utente chega ao serviço de urgência
    2. Regista-se na receção
    3. Aguarda chamada sem critério de prioridade visível
    4. Utentes com condições menos graves são atendidos primeiro

    ## Quem é afetado
    Utentes do serviço nacional de saúde

    ## Impacto
    - Tempo médio de espera: 4+ horas
    - Agravamento de condições em casos urgentes
    - Desperdício de recursos hospitalares

    ## Sistema envolvido
    Saúde — serviço de urgência hospitalar

    ## Evidência
    - Relatório da Entidade Reguladora da Saúde 2024
    - Notícia: Público, 15/03/2024
    - Dados: tempo médio de espera por hospital (transparência.gov.pt)

    ## Causa raiz possível
    Ausência de protocolo de triagem com níveis de prioridade obrigatórios

---

## Reportar um problema

Tens um problema para reportar? Usa o formulário estruturado:

### [🐛 Reportar um Problema](https://github.com/andreclemente/openstate/issues/new?template=reportar-problema.yml)

Escreve em **Português ou Inglês**. Tradução automática incluída.

---

## Repositório

[github.com/andreclemente/openstate](https://github.com/andreclemente/openstate)
