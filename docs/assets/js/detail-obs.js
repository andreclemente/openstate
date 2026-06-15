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

    // On EN pages, try to fetch and show the translation comment
    if (lang === 'en' && typeof getComments === 'function') {
      getComments(issueNumber).then(function(comments) {
        var translationBody = findTranslation(comments);
        if (translationBody) {
          // Parse the translation: extract title and body sections
          var titleMatch = translationBody.match(/###\s+([^\n]+)/);
          var transTitle = titleMatch ? titleMatch[1].trim() : obs.title;

          // Extract sections from translation (same structure as original)
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

          // Update title
          document.getElementById('obs-title').textContent = transTitle;

          // Build body from translation sections
          var transBodyHtml = '';
          transBodyHtml += '<div class="os-translation-notice">' +
            '<span class="os-translation-icon">🌐</span>' +
            '<span>Showing English translation.</span> ' +
            '<a href="#" id="os-show-original">Show original (Portuguese)</a>' +
            '</div>';

          var order = ['what_happens', 'affected', 'impact', 'evidence', 'root_cause'];
          for (var oi = 0; oi < order.length; oi++) {
            var oKey = order[oi];
            if (transSections[oKey]) {
              transBodyHtml += '<section class="os-obs-section"><h2>' + sectionTitles[oKey] + '</h2>' + renderMarkdown(transSections[oKey]) + '</section>';
            }
          }

          document.getElementById('obs-body').innerHTML = transBodyHtml;

          // Store original for toggle
          var originalHtml = '';
          for (var oi2 = 0; oi2 < order.length; oi2++) {
            var oKey2 = order[oi2];
            if (sections[oKey2]) {
              originalHtml += '<section class="os-obs-section"><h2>' + sectionTitles[oKey2] + '</h2>' + renderMarkdown(sections[oKey2]) + '</section>';
            }
          }

          var toggleBtn = document.getElementById('os-show-original');
          if (toggleBtn) {
            toggleBtn.addEventListener('click', function(e) {
              e.preventDefault();
              var bodyEl = document.getElementById('obs-body');
              var isShowingOriginal = toggleBtn.textContent.indexOf('translation') !== -1;
              if (isShowingOriginal) {
                bodyEl.innerHTML = transBodyHtml;
                toggleBtn = document.getElementById('os-show-original');
                if (toggleBtn) toggleBtn.addEventListener('click', arguments.callee);
              } else {
                var origHtml = '<div class="os-translation-notice">' +
                  '<span class="os-translation-icon">🌐</span>' +
                  '<span>Showing original (Portuguese).</span> ' +
                  '<a href="#" id="os-show-original">Show English translation</a>' +
                  '</div>' + originalHtml;
                bodyEl.innerHTML = origHtml;
                toggleBtn = document.getElementById('os-show-original');
                if (toggleBtn) toggleBtn.addEventListener('click', arguments.callee);
              }
            });
          }
        }
      }).catch(function() { /* ignore comment fetch errors */ });
    }

    // Build original content (shown on PT pages or as fallback)
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
