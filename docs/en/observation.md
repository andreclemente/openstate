---
layout: default
permalink: /en/observation/
---

<div class="os-page">

<article class="os-obs-detail" id="obs-detail">
  <div class="os-section-inner">
    <div id="obs-loading" class="os-obs-loading">Loading observation…</div>
    <div id="obs-error" class="os-obs-error" style="display:none">Failed to load. <a href="#" onclick="location.reload()">Try again</a>.</div>
    <div id="obs-content" style="display:none">
      <div class="os-obs-detail-meta">
        <span class="os-obs-area" id="obs-area"></span>
        <span class="os-obs-status" id="obs-status"></span>
      </div>
      <h1 id="obs-title"></h1>
      <div class="os-obs-detail-body" id="obs-body"></div>
      <div class="os-obs-detail-footer">
        <a id="obs-github-link" href="#" class="os-btn os-btn-outline" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
        <a href="/en/observations" class="os-btn os-btn-link">← Back</a>
      </div>
    </div>
  </div>
</article>

</div>

<script src="/assets/js/github.v3.js"></script>
<script>
(function() {
  var loading = document.getElementById('obs-loading');
  var errorDiv = document.getElementById('obs-error');
  var content = document.getElementById('obs-content');

  var params = new URLSearchParams(window.location.search);
  var issueNumber = parseInt(params.get('id'));

  if (!issueNumber) {
    loading.style.display = 'none';
    errorDiv.style.display = 'block';
    errorDiv.textContent = 'Observation not found.';
    return;
  }

  getObservation(issueNumber).then(function(obs) {
    document.getElementById('obs-area').textContent = obs.area;
    var statusEl = document.getElementById('obs-status');
    statusEl.textContent = obs.status === 'confirmed' ? 'Confirmed' : 'Draft';
    statusEl.className = 'os-obs-status os-obs-status-' + obs.status;
    document.getElementById('obs-title').textContent = obs.title;

    var sections = obs.sections;
    var bodyHtml = '';
    if (sections.what_happens) bodyHtml += '<h2>What happens</h2>' + renderMarkdown(sections.what_happens);
    if (sections.affected) bodyHtml += '<h2>Who is affected</h2>' + renderMarkdown(sections.affected);
    if (sections.impact) bodyHtml += '<h2>Impact</h2>' + renderMarkdown(sections.impact);
    if (sections.evidence) bodyHtml += '<h2>Evidence</h2>' + renderMarkdown(sections.evidence);
    if (sections.root_cause) bodyHtml += '<h2>Possible root cause</h2>' + renderMarkdown(sections.root_cause);

    document.getElementById('obs-body').innerHTML = bodyHtml;
    document.getElementById('obs-github-link').href = obs.htmlUrl;

    loading.style.display = 'none';
    content.style.display = 'block';
  }).catch(function(err) {
    console.error(err);
    loading.style.display = 'none';
    errorDiv.style.display = 'block';
  });
})();
</script>