---
layout: page
permalink: /en/observation/
---

<nav class="os-breadcrumb">
  <a href="/en/observations">← Observations</a>
</nav>

<article class="os-obs-detail">
  <div id="obs-loading" class="os-obs-loading">Loading observation…</div>
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
      <a id="obs-github-link" href="#" class="os-btn os-btn-outline" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
    </footer>
  </div>
</article>

<script src="/assets/js/github.v3.js"></script>
<script src="/assets/js/detail-obs.js"></script>