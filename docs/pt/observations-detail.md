---
layout: default
---

<div class="os-page">

<article class="os-obs-detail" id="obs-detail">
  <div class="os-section-inner">
    <div id="obs-loading" class="os-obs-loading">A carregar observação…</div>
    <div id="obs-error" class="os-obs-error" style="display:none">Erro ao carregar. <a href="#" onclick="location.reload()">Tentar novamente</a>.</div>
    <div id="obs-content" style="display:none">
      <div class="os-obs-detail-meta">
        <span class="os-obs-area" id="obs-area"></span>
        <span class="os-obs-status" id="obs-status"></span>
      </div>
      <h1 id="obs-title"></h1>
      <div class="os-obs-detail-body" id="obs-body"></div>
      <div class="os-obs-detail-footer">
        <a id="obs-github-link" href="#" class="os-btn os-btn-outline" target="_blank" rel="noopener noreferrer">Ver no GitHub →</a>
      </div>
    </div>
  </div>
</article>

</div>

<script type="module">
import { getObservation, renderMarkdown } from '/assets/js/github.js?v=2';

const loading = document.getElementById('obs-loading');
const errorDiv = document.getElementById('obs-error');
const content = document.getElementById('obs-content');

// Get issue number from URL: /pt/observations/10 or /en/observations/10
const match = window.location.pathname.match(/observations\/(\d+)/);
const issueNumber = match ? parseInt(match[1]) : null;

if (!issueNumber) {
  loading.style.display = 'none';
  errorDiv.style.display = 'block';
  errorDiv.textContent = 'Observação não encontrada.';
} else {
  try {
    const obs = await getObservation(issueNumber);

    document.getElementById('obs-area').textContent = obs.area;
    const statusEl = document.getElementById('obs-status');
    statusEl.textContent = obs.status === 'confirmed' ? 'Confirmado' : 'Rascunho';
    statusEl.className = 'os-obs-status os-obs-status-' + obs.status;
    document.getElementById('obs-title').textContent = obs.title;

    // Build body from sections
    const sections = obs.sections;
    let bodyHtml = '';
    if (sections.what_happens) bodyHtml += '<h2>O que acontece</h2>' + renderMarkdown(sections.what_happens);
    if (sections.affected) bodyHtml += '<h2>Quem é afetado</h2>' + renderMarkdown(sections.affected);
    if (sections.impact) bodyHtml += '<h2>Impacto</h2>' + renderMarkdown(sections.impact);
    if (sections.evidence) bodyHtml += '<h2>Evidência</h2>' + renderMarkdown(sections.evidence);
    if (sections.root_cause) bodyHtml += '<h2>Causa raiz possível</h2>' + renderMarkdown(sections.root_cause);

    document.getElementById('obs-body').innerHTML = bodyHtml;
    document.getElementById('obs-github-link').href = obs.htmlUrl;

    loading.style.display = 'none';
    content.style.display = 'block';
  } catch (err) {
    console.error(err);
    loading.style.display = 'none';
    errorDiv.style.display = 'block';
  }
}
</script>