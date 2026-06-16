---
layout: page
permalink: /en/observation/
lang: en
---

<nav class="os-breadcrumb" aria-label="Breadcrumb">
  <a href="/en/observations">← Observations</a>
</nav>

<article class="os-obs-detail" aria-label="Observation detail">
  <div id="obs-loading" class="os-obs-loading" aria-live="polite" aria-busy="true">Loading observation…</div>
  <div id="obs-error" class="os-obs-error" style="display:none">
    Failed to load. <a href="#" onclick="location.reload()">Try again</a>.
  </div>
  <div id="obs-content" style="display:none">
    <header class="os-obs-detail-header">
      <div class="os-obs-detail-meta">
        <span class="os-obs-area" id="obs-area"></span>
        <span class="os-obs-status" id="obs-status"></span>
      </div>
      <h1 id="obs-title"></h1>
    </header>
    <div class="os-obs-detail-body" id="obs-body"></div>
    <footer class="os-obs-detail-footer">
      <a id="obs-github-link" href="#" class="os-btn-link" target="_blank" rel="noopener noreferrer">View full page on GitHub →</a>
    </footer>
  </div>
</article>

<script src="/assets/js/github.v3.js?v=5"></script>
<script src="/assets/js/detail-obs.js?v=4"></script>
