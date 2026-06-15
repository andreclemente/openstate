/**
 * OpenState — Observation detail page
 */
(function() {
  if (typeof getObservation !== 'function') return;

  var loading = document.getElementById('obs-loading');
  var errorDiv = document.getElementById('obs-error');
  var content = document.getElementById('obs-content');
  if (!content) return;

  var params = new URLSearchParams(window.location.search);
  var issueNumber = parseInt(params.get('id'));

  if (!issueNumber) {
    if (loading) loading.style.display = 'none';
    if (errorDiv) { errorDiv.style.display = 'block'; errorDiv.textContent = 'Observação não encontrada.'; }
    return;
  }

  var lang = document.documentElement.lang || 'pt';
  var tDraft = lang === 'en' ? 'Draft' : 'Rascunho';
  var tConfirmed = lang === 'en' ? 'Confirmed' : 'Confirmado';
  var sectionTitles = lang === 'en'
    ? { what_happens: 'What happens', affected: 'Who is affected', impact: 'Impact', evidence: 'Evidence', root_cause: 'Possible root cause' }
    : { what_happens: 'O que acontece', affected: 'Quem é afetado', impact: 'Impacto', evidence: 'Evidência', root_cause: 'Causa raiz possível' };

  getObservation(issueNumber).then(function(obs) {
    document.getElementById('obs-area').textContent = obs.area;
    var statusEl = document.getElementById('obs-status');
    statusEl.textContent = obs.status === 'confirmed' ? tConfirmed : tDraft;
    statusEl.className = 'os-obs-status os-obs-status-' + obs.status;
    document.getElementById('obs-title').textContent = obs.title;

    var sections = obs.sections;
    var bodyHtml = '';
    var order = ['what_happens', 'affected', 'impact', 'evidence', 'root_cause'];
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (sections[key]) {
        bodyHtml += '<section class="os-obs-section"><h2>' + sectionTitles[key] + '</h2>' + renderMarkdown(sections[key]) + '</section>';
      }
    }

    document.getElementById('obs-body').innerHTML = bodyHtml;
    document.getElementById('obs-github-link').href = obs.htmlUrl;

    if (loading) loading.style.display = 'none';
    content.style.display = 'block';
  }).catch(function(err) {
    console.error(err);
    if (loading) loading.style.display = 'none';
    if (errorDiv) errorDiv.style.display = 'block';
  });
})();
