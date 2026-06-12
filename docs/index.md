---
title: OpenState
nav_exclude: true
search_exclude: true
---

<style>
  :root {
    --os-bg: #0f172a;
    --os-card: #1e293b;
    --os-border: #334155;
    --os-text: #f1f5f9;
    --os-muted: #94a3b8;
    --os-dim: #64748b;
    --os-accent: #38bdf8;
    --os-accent-dim: #0284c7;
    --os-warn: #fbbf24;
  }

  body, html { background: var(--os-bg) !important; }

  .side-bar, .main-header, #search-input { display: none !important; }

  .main-content {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    background: var(--os-bg) !important;
  }

  .main-content-wrap {
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    background: var(--os-bg) !important;
  }

  /* HIDE just-the-docs nav/footer chrome */
  .site-footer, .footer, nav.breadcrumb-nav, #site-nav, .site-nav, .search {
    display: none !important;
  }

  .main-content a { color: var(--os-accent); text-decoration: none; }
  .main-content a:hover { text-decoration: underline; }
</style>

<div class="os-page">

<div class="os-hero">
  <div class="os-hero-inner">
    <img src="/assets/logo-wordmark.webp" alt="OpenState" class="os-hero-logo">
    <p class="os-hero-sub">A structured observability system for public services. Understand how public systems behave in reality — through structured observations, evidence, and patterns.</p>
    <div class="os-hero-links">
      <a href="#what" class="os-btn os-btn-primary">What it does</a>
      <a href="en/contribute" class="os-btn os-btn-outline">Submit an observation</a>
    </div>
    <div class="os-lang-toggle">
      <a href="/" class="os-lang-active">EN</a>
      <span class="os-lang-sep">/</span>
      <a href="/pt/">PT</a>
    </div>
  </div>
</div>

<div class="os-section" id="why">
  <div class="os-section-inner">
    <h2 class="os-section-label">Why it exists</h2>
    <div class="os-cards">
      <div class="os-card">
        <h3>Fragmented systems</h3>
        <p>Public services operate across dozens of disconnected agencies and platforms. No single view exists.</p>
      </div>
      <div class="os-card">
        <h3>Duplicated problems</h3>
        <p>The same friction repeats across healthcare, education, transport, and digital services — without anyone connecting them.</p>
      </div>
      <div class="os-card">
        <h3>Invisible patterns</h3>
        <p>Without structured documentation, systemic issues remain invisible. Problems stay isolated, solutions stay reactive.</p>
      </div>
    </div>
  </div>
</div>

<div class="os-section" id="what">
  <div class="os-section-inner">
    <h2 class="os-section-label">What it produces</h2>
    <div class="os-cards">
      <div class="os-card os-card-accent">
        <div class="os-card-num">01</div>
        <h3>Structured observations</h3>
        <p>Each entry documents a real public service problem with evidence, impact, and system context. No opinions. No ideology.</p>
      </div>
      <div class="os-card os-card-accent">
        <div class="os-card-num">02</div>
        <h3>Evidence-based documentation</h3>
        <p>Every observation requires verifiable evidence — news, reports, data, legislation, or documented cases. Without evidence, there is no observation.</p>
      </div>
      <div class="os-card os-card-accent">
        <div class="os-card-num">03</div>
        <h3>Pattern discovery</h3>
        <p>Over time, connected observations reveal systemic patterns. Root causes become visible across systems, enabling informed understanding.</p>
      </div>
    </div>
  </div>
</div>

<div class="os-section os-section-not" id="not">
  <div class="os-section-inner">
    <h2 class="os-section-label">What it is not</h2>
    <div class="os-cards os-cards-not">
      <div class="os-card os-card-dim">
        <span class="os-card-x">✕</span>
        <h3>A complaint platform</h3>
        <p>No venting. No grievances. Only structured observations with evidence.</p>
      </div>
      <div class="os-card os-card-dim">
        <span class="os-card-x">✕</span>
        <h3>Political</h3>
        <p>No ideology, no party framing. OpenState is neutral by design.</p>
      </div>
      <div class="os-card os-card-dim">
        <span class="os-card-x">✕</span>
        <h3>A reform initiative</h3>
        <p>This is not about proposing fixes. It is about understanding how systems behave.</p>
      </div>
      <div class="os-card os-card-dim">
        <span class="os-card-x">✕</span>
        <h3>A discussion forum</h3>
        <p>No debates. No comments. Clear structure over open-ended conversation.</p>
      </div>
    </div>
  </div>
</div>

<div class="os-section os-section-cta" id="contribute">
  <div class="os-section-inner">
    <h2 class="os-section-label">Contribute</h2>
    <p class="os-cta-text">OpenState is built on structured observations submitted through GitHub. Each submission follows a defined format and requires verifiable evidence.</p>
    <div class="os-cards">
      <div class="os-card">
        <h3>Submission format</h3>
        <p>Every observation includes: what happens, who is affected, evidence, system context, and impact.</p>
      </div>
      <div class="os-card">
        <h3>Evidence required</h3>
        <p>News articles, official reports, public data, legislation, or documented real cases. No evidence = no observation.</p>
      </div>
      <div class="os-card">
        <h3>Clarity &amp; neutrality</h3>
        <p>Factual language only. No political framing. No personal data. Observations and solutions are strictly separated.</p>
      </div>
    </div>
    <div class="os-cta-row">
      <a href="https://github.com/andreclemente/openstate/issues/new?template=reportar-problema.yml" class="os-btn os-btn-primary" target="_blank">Submit an observation →</a>
      <a href="en/contribute" class="os-text-link">Read the full guide</a>
    </div>
  </div>
</div>

<div class="os-footer">
  <div class="os-section-inner">
    <div class="os-footer-row">
      <span class="os-footer-text">OpenState</span>
      <span class="os-footer-sep">·</span>
      <a href="/en/">EN</a>
      <span class="os-footer-sep">·</span>
      <a href="/pt/">PT</a>
      <span class="os-footer-sep">·</span>
      <a href="https://github.com/andreclemente/openstate">GitHub</a>
    </div>
  </div>
</div>

</div>