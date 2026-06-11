# OpenState

[PT](/pt/index.md) | [EN](/en/index.md)

---

- [Home](/en/index.md)
- [How It Works](/en/how-it-works.md)
- [Examples](/en/examples.md)
- [Contribute](/en/contribute.md)

---

## What it is

OpenState is a **public systems bug tracker**.

It is not a discussion forum. It is not a political manifesto. It is a structured knowledge system for documenting public service failures the same way we document software bugs:

- **Each problem is an issue** — like a bug report
- **Evidence is mandatory** — no data, no issue
- **Problems and solutions are separated** — describe first, propose later
- **Focus is analysis, not debate** — structure over opinion

## How it works

**GitHub is the source of truth.** All issues, structured data, labels, and proposals live in the repository.

This site (GitHub Pages) is the **reading layer** — a human interface over the structured data.

## Example issue

**Problem:** A patient waited 4 hours at a public hospital because the triage system didn't distinguish between urgent and non-urgent cases.

```
## Problem
Hospital triage without effective prioritization criteria

## Steps to reproduce
1. Patient arrives at emergency department
2. Registers at reception
3. Waits for call with no visible priority criteria
4. Less urgent cases seen before critical ones

## Who is affected
Public health service users

## Impact
- Average wait time: 4+ hours
- Worsening of urgent conditions
- Waste of hospital resources

## System involved
Healthcare — hospital emergency services

## Evidence
- Health Regulatory Authority report 2024
- News: Público, 15/03/2024
- Data: average wait times per hospital (transparency.gov.pt)

## Possible root cause
Absence of mandatory triage protocol with priority levels
```

## Report a problem

Got a problem to report? Use the structured form on GitHub:

<div align="center">

### [🐛 Report Problem](https://github.com/andreclemente/openstate/issues/new?template=reportar-problema.yml)

</div>

Write in **Portuguese or English**. If not in English, an automatic translation will be added.

Or see the [Contribute](/en/contribute.md) guide for more details.

## Repository

[github.com/andreclemente/openstate](https://github.com/andreclemente/openstate)
