---
title: Examples
nav_order: 3
parent: English
---

# Examples

Real-world issues written in the OpenState structured format.

---

## Healthcare

**Labels:** `healthcare` `efficiency` `high` `confirmed`

**Problem:** Excessive waiting time for specialist appointments in the public health system

**Summary:** Patients wait an average of 8 months for a first specialist consultation. 15% give up before the appointment.

    ## Problem
    Excessive waiting time for specialist appointments in the public health system

    ## Steps to reproduce
    1. Patient is referred by GP to specialist consultation
    2. Waits on waiting list with no date estimate
    3. After 8+ months, appointment still not scheduled
    4. Patient's condition worsens or they resort to private care

    ## Who is affected
    Public health service users

    ## Impact
    - Average wait time: 240 days
    - 15% of patients give up before appointment
    - Estimated private care cost: €200-500 per consultation

    ## System involved
    Healthcare — specialized hospital care

    ## Evidence
    - Health Regulatory Authority report 2024: wait times by specialty
    - News: "Waiting lists at all-time high", Público, 2024
    - Data: SIGIC (Surgical Waiting List Management System)

    ## Possible root cause
    Insufficient hospital capacity vs. demand;
    absence of uniform clinical priority criteria

    ## Related issues
    #12 (GP shortage), #34 (triage system)

---

## Education

**Labels:** `education` `efficiency` `medium` `confirmed`

**Problem:** Lack of substitute teachers interrupts classes in public primary schools

**Summary:** When a teacher is absent, the class has no lesson. Average of 12 days/year per class without lessons.

    ## Problem
    Lack of substitute teachers interrupts classes in public primary schools

    ## Steps to reproduce
    1. Teacher is absent due to illness or other reason
    2. School has no substitute available
    3. Class is left without a lesson or distributed across other classes
    4. Curriculum content is not taught

    ## Who is affected
    Public primary school students (all cycles)

    ## Impact
    - Average 12 days/year per class without lessons
    - 60% of schools report teacher shortages at any given time
    - Inequality between schools with and without resources

    ## System involved
    Education — public primary education

    ## Evidence
    - National Education Council report 2023
    - News: "Teacher shortages force school closures", Diário de Notícias, 2024
    - Data: teacher absenteeism rate by district (DGEEC)

    ## Possible root cause
    Insufficient pool of substitute teachers;
    hiring process too slow (>48h)

    ## Related issues
    #45 (teacher working conditions)

---

## Digital Services

**Labels:** `digital-services` `reliability` `medium` `analyzed`

**Problem:** Citizen portal shows data inconsistency across services

**Summary:** Citizens must update their address on 3 separate portals because the systems don't communicate.

    ## Problem
    Citizen portal shows data inconsistency across services

    ## Steps to reproduce
    1. Citizen updates address on Social Security portal
    2. Accesses Tax Authority portal — old address still shows
    3. Accesses Health Service portal — different address again
    4. Citizen must update address on 3 separate portals

    ## Who is affected
    All citizens using public digital services

    ## Impact
    - Redundancy: same information entered 3+ times
    - Communication errors (mail sent to wrong address)
    - Time wasted: ~15 minutes per update × 3 portals

    ## System involved
    Digital services — interoperability between public platforms

    ## Evidence
    - AMA (Agency for Administrative Modernization) report 2023
    - News: "Government portals don't talk to each other", Expresso, 2024
    - Data: digital public services satisfaction survey (eGov)

    ## Possible root cause
    No centralized citizen database;
    systems developed by different entities without integration

    ## Related issues
    #67 (single sign-on), #89 (interoperability)

---

## Submit a proposal

Have a solution for one of these problems? Submit a structured proposal:

### [💡 Submit a Solution Proposal](https://github.com/andreclemente/openstate/issues/new?template=proposal.yml)

