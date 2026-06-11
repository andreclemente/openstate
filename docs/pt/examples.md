# Exemplos

[PT](/openstate/pt/examples.md) | [EN](/openstate/en/examples.md)

---

## Navegação

| | |
|:---|:---|
| [Home](/openstate/pt/index.md) | Visão geral do projeto |
| [Como Funciona](/openstate/pt/how-it-works.md) | Modelo, ciclo de vida, evidência |
| [Exemplos](/openstate/pt/examples.md) | Issues reais como referência |
| [Contribuir](/openstate/pt/contribute.md) | Guia de submissão |

---

Exemplos de issues reais, escritas no formato estruturado do OpenState.

---

## Saúde

**Labels:** `saúde` · `eficiência` · `alto` · `confirmado`

**Problema:** Tempo excessivo de espera para consultas de especialidade no SNS

**Resumo:** Utentes esperam em média 8 meses para primeira consulta de especialidade. 15% desistem antes da consulta.

    ## Problema
    Tempo excessivo de espera para consultas de especialidade no SNS

    ## Passos para reproduzir
    1. Utente é encaminhado pelo médico de família para consulta de especialidade
    2. Aguarda na lista de espera sem previsão de data
    3. Após 8+ meses, consulta ainda não foi agendada
    4. Utente agrava condição ou recorre ao privado

    ## Quem é afetado
    Utentes do Serviço Nacional de Saúde

    ## Impacto
    - Tempo médio de espera: 240 dias
    - 15% dos utentes desistem antes da consulta
    - Custo estimado do recurso ao privado: €200-500 por consulta

    ## Sistema envolvido
    Saúde — cuidados hospitalares especializados

    ## Evidência
    - Relatório ERS 2024: tempos de espera por especialidade
    - Notícia: "Listas de espera no SNS atingem máximo", Público, 2024
    - Dados: SIGIC (Sistema de Informação de Gestão de Inscritos para Cirurgia)

    ## Causa raiz possível
    Capacidade insuficiente de resposta hospitalar vs. procura;
    ausência de critérios de prioridade clínicos uniformes

    ## Issues relacionadas
    #12 (falta de médicos de família), #34 (SNS24 triagem)

---

## Educação

**Labels:** `educação` · `eficiência` · `médio` · `confirmado`

**Problema:** Falta de professores substitutos interrompe aulas no ensino básico

**Resumo:** Quando um professor falta, a turma fica sem aula. Média de 12 dias/ano por turma sem aula.

    ## Problema
    Falta de professores substitutos interrompe aulas no ensino básico

    ## Passos para reproduzir
    1. Professor falta por doença ou outra razão
    2. Escola não tem substituto disponível
    3. Turma fica sem aula ou é distribuída por outras turmas
    4. Conteúdo programático não é lecionado

    ## Quem é afetado
    Alunos do ensino básico público (1.º, 2.º, 3.º ciclos)

    ## Impacto
    - Média de 12 dias/ano por turma sem aula
    - 60% das escolas reportam falta de professores em dado momento
    - Desigualdade entre escolas com e sem recursos

    ## Sistema envolvido
    Educação — ensino básico público

    ## Evidência
    - Relatório do Conselho Nacional de Educação 2023
    - Notícia: "Falta de professores obriga a fechar escolas", Diário de Notícias, 2024
    - Dados: taxa de absentismo docente por distrito (DGEEC)

    ## Causa raiz possível
    Bolsa de substituição com número insuficiente de professores;
    processo de contratação demasiado lento (>48h)

    ## Issues relacionadas
    #45 (condições de trabalho docente)

---

## Serviços Digitais

**Labels:** `serviços-digitais` · `fiabilidade` · `médio` · `analisado`

**Problema:** Portal do cidadão apresenta inconsistência de dados entre serviços

**Resumo:** Cidadão tem de atualizar morada em 3 portais separados porque os sistemas não comunicam entre si.

    ## Problema
    Portal do cidadão apresenta inconsistência de dados entre serviços

    ## Passos para reproduzir
    1. Cidadão atualiza morada no portal da Segurança Social
    2. Acede ao portal das Finanças — morada antiga ainda aparece
    3. Acede ao portal do SNS — morada diferente novamente
    4. Cidadão tem de atualizar morada em 3 portais separados

    ## Quem é afetado
    Todos os cidadãos que utilizam serviços públicos digitais

    ## Impacto
    - Redundância: mesma informação introduzida 3+ vezes
    - Erros de comunicação (correio enviado para morada errada)
    - Tempo perdido: ~15 minutos por atualização × 3 portais

    ## Sistema envolvido
    Serviços digitais — interoperabilidade entre plataformas públicas

    ## Evidência
    - Relatório da AMA (Agência para a Modernização Administrativa) 2023
    - Notícia: "Portais do Estado não falam entre si", Expresso, 2024
    - Dados: inquérito de satisfação aos serviços públicos digitais (eGov)

    ## Causa raiz possível
    Ausência de base de dados centralizada de cidadão;
    sistemas desenvolvidos por diferentes entidades sem integração

    ## Issues relacionadas
    #67 (autenticação única), #89 (interoperabilidade)
