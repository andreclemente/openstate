---
layout: page
permalink: /pt/observation/
---

<nav class="os-breadcrumb">
  <a href="/pt/observations">← Observações</a>
</nav>

<article class="os-obs-detail">
  <div id="obs-loading" class="os-obs-loading">A carregar observação…</div>
  <div id="obs-error" class="os-obs-error" style="display:none">
    Erro ao carregar. <a href="#" onclick="location.reload()">Tentar novamente</a>.
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
      <a id="obs-github-link" href="#" class="os-btn os-btn-outline" target="_blank" rel="noopener noreferrer">Ver no GitHub →</a>
    </footer>
  </div>
</article>

<script src="/assets/js/github.v3.js"></script>
<script src="/assets/js/detail-obs.js"></script>