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
  var enTitles = { what_happens: 'What happens', affected: 'Who is affected', impact: 'Impact', evidence: 'Evidence', root_cause: 'Possible root cause' };
  var ptTitles = { what_happens: 'O que acontece', affected: 'Quem é afetado', impact: 'Impacto', evidence: 'Evidência', root_cause: 'Causa raiz possível' };

  var order = ['what_happens', 'affected', 'impact', 'evidence', 'root_cause'];

  function buildSectionsHtml(sections, titles) {
    var html = '';
    for (var i = 0; i < order.length; i++) {
      var key = order[i];
      if (sections[key]) {
        html += '<section class="os-obs-section"><h2>' + titles[key] + '</h2>' + renderMarkdown(sections[key]) + '</section>';
      }
    }
    return html;
  }

  getObservation(issueNumber).then(function(obs) {
    document.getElementById('obs-area').textContent = obs.area;
    var statusEl = document.getElementById('obs-status');
    statusEl.textContent = obs.status === 'confirmed' ? tConfirmed : tDraft;
    statusEl.className = 'os-obs-status os-obs-status-' + obs.status;
    document.getElementById('obs-github-link').href = obs.htmlUrl;

    // Build original PT body with PT section titles
    var originalBodyHtml = buildSectionsHtml(obs.sections, ptTitles);

    // On EN pages, try to fetch and show the translation comment
    if (lang === 'en' && typeof getComments === 'function') {
      getComments(issueNumber).then(function(comments) {
        var translationBody = findTranslation(comments);
        if (translationBody) {
          // Parse translation title
          var titleMatch = translationBody.match(/###\s+([^\n]+)/);
          var transTitle = titleMatch ? titleMatch[1].trim() : obs.title;

          // Parse translation sections
          var transSections = {};
          var transLines = translationBody.split('\n');
          var transCurrent = null;
          var transHeaderMap = {
            'observation': 'skip',
            'what happens': 'what_happens', 'o que acontece': 'what_happens',
            'who is affected': 'affected', 'quem é afetado': 'affected',
            'impact': 'impact', 'impacto': 'impact',
            'evidence': 'evidence', 'evidência': 'evidence',
            'possible root cause': 'root_cause', 'causa raiz': 'root_cause'
          };
          for (var ti = 0; ti < transLines.length; ti++) {
            var tLine = transLines[ti];
            var tTrimmed = tLine.trim();
            if (tTrimmed.indexOf('## ') === 0) {
              var tHeading = tTrimmed.replace('## ', '').trim().toLowerCase();
              transCurrent = null;
              for (var tKey in transHeaderMap) {
                if (tHeading.indexOf(tKey) !== -1 && transHeaderMap[tKey] !== 'skip') {
                  transCurrent = transHeaderMap[tKey];
                  break;
                }
              }
            } else if (transCurrent && tTrimmed) {
              if (!transSections[transCurrent]) transSections[transCurrent] = [];
              transSections[transCurrent].push(tLine);
            }
          }
          for (var tk in transSections) {
            transSections[tk] = transSections[tk].join('\n').trim();
          }

          // Build translation body with EN section titles
          var transBodyHtml = buildSectionsHtml(transSections, enTitles);

          // Build both views
          var transView = '<div class="os-translation-notice">' +
            '<span class="os-translation-icon">🌐</span>' +
            '<span>Showing English translation.</span> ' +
            '<a href="#" class="os-toggle-lang" data-mode="original">Show original (Portuguese)</a>' +
            '</div>' + transBodyHtml;

          var origView = '<div class="os-translation-notice">' +
            '<span class="os-translation-icon">🇵🇹</span>' +
            '<span>Showing original (Portuguese).</span> ' +
            '<a href="#" class="os-toggle-lang" data-mode="translation">Show English translation</a>' +
            '</div>' + originalBodyHtml;

          // Set translated title and body
          document.getElementById('obs-title').textContent = transTitle;
          document.getElementById('obs-body').innerHTML = transView;

          // Toggle handler — use event delegation on the body container
          var bodyEl = document.getElementById('obs-body');
          bodyEl.onclick = function(e) {
            if (!e.target.classList.contains('os-toggle-lang')) return;
            e.preventDefault();
            var mode = e.target.getAttribute('data-mode');
            var titleEl = document.getElementById('obs-title');
            if (mode === 'original') {
              bodyEl.innerHTML = origView;
              titleEl.textContent = obs.title;
            } else {
              bodyEl.innerHTML = transView;
              titleEl.textContent = transTitle;
            }
          };
        }
      }).catch(function() { /* ignore */ });
    }

    // Set original content (PT pages or EN fallback)
    document.getElementById('obs-title').textContent = obs.title;
    document.getElementById('obs-body').innerHTML = originalBodyHtml;

    if (loading) loading.style.display = 'none';
    content.style.display = 'block';
  }).catch(function(err) {
    console.error(err);
    if (loading) loading.style.display = 'none';
    if (errorDiv) errorDiv.style.display = 'block';
  });
})();
