/**
 * OpenState — Observations listing page
 */
(function() {
  if (typeof getObservations !== 'function') return;

  var grid = document.getElementById('obs-grid');
  var filters = document.getElementById('obs-filters');
  var loading = document.getElementById('obs-loading');
  var errorDiv = document.getElementById('obs-error');
  if (!grid || !filters) return;

  var lang = document.documentElement.lang || 'pt';
  var isEN = lang === 'en';
  var prefix = isEN ? '/en' : '/pt';
  var tDraft = isEN ? 'Draft' : 'Rascunho';
  var tConfirmed = isEN ? 'Confirmed' : 'Confirmado';
  var tSources = isEN ? 'sources' : 'fontes';
  var tAll = isEN ? 'All' : 'Todas';
  var tNoObs = isEN ? 'The memory is being built.' : 'A memória está a ser construída.';

  function slugify(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  function renderCard(obs) {
    var card = document.createElement('a');
    card.href = prefix + '/observation/?id=' + obs.number;
    card.className = 'os-obs-card-link';

    // Use translated title/summary if available
    var displayTitle = obs._transTitle || obs.title;
    var summarySource = (obs._transSections && obs._transSections.what_happens) || obs.sections.what_happens || '';
    var summary = summarySource.replace(/\n/g, ' ').substring(0, 180);

    // Translation status badge for EN pages
    var transBadge = '';
    if (isEN) {
      if (obs._hasTranslation === true) {
        transBadge = '<div class="os-card-lang-row os-card-lang-translated">🇬🇧 Translation available</div>';
      } else if (obs._hasTranslation === false) {
        transBadge = '<div class="os-card-lang-row os-card-lang-no-trans">🇵🇹 No translation yet</div>';
      } else {
        transBadge = '<div class="os-card-lang-row os-card-lang-loading" data-obs-num="' + obs.number + '">…</div>';
      }
    }

    card.innerHTML = '<div class="os-obs-card" data-status="' + obs.status + '">' +
      '<div class="os-obs-header">' +
        '<span class="os-obs-area">' + obs.area + '</span>' +
        '<span class="os-obs-status os-obs-status-' + obs.status + '">' + (obs.status === 'confirmed' ? tConfirmed : tDraft) + '</span>' +
      '</div>' +
      '<h3>' + displayTitle + '</h3>' +
      '<p>' + summary + '…</p>' +
      '<div class="os-obs-footer">' +
        '<span>' + obs.date + '</span>' +
        '<span>' + obs.sources + ' ' + tSources + '</span>' +
      '</div>' +
      transBadge +
    '</div>';
    return card;
  }

  function renderCards(observations, filter) {
    grid.innerHTML = '';
    var filtered = filter === 'all' ? observations : observations.filter(function(o) { return o.status === filter; });
    for (var k = 0; k < filtered.length; k++) {
      grid.appendChild(renderCard(filtered[k]));
    }
  }

  // Fetch translations for all observations on EN pages
  function fetchTranslations(observations) {
    if (!isEN || typeof getComments !== 'function') return Promise.resolve();

    var promises = observations.map(function(obs) {
      return getComments(obs.number).then(function(comments) {
        var translationBody = findTranslation(comments);
        obs._hasTranslation = !!translationBody;
        if (translationBody) {
          // Parse translated title
          var titleMatch = translationBody.match(/###\s+([^\n]+)/);
          obs._transTitle = titleMatch ? titleMatch[1].trim() : obs.title;

          // Parse translated sections
          obs._transSections = {};
          var transLines = translationBody.split('\n');
          var transCurrent = null;
          var transHeaderMap = [
            ['observation', 'skip'],
            ['what happens', 'what_happens'], ["what's happening", 'what_happens'], ['o que acontece', 'what_happens'],
            ['who is affected', 'affected'], ['quem é afetado', 'affected'],
            ['impact', 'impact'], ['impacto', 'impact'],
            ['evidence', 'evidence'], ['evidência', 'evidence'],
            ['possible root cause', 'root_cause'], ['causa raiz', 'root_cause']
          ];
          for (var ti = 0; ti < transLines.length; ti++) {
            var tTrimmed = transLines[ti].trim();
            if (tTrimmed.indexOf('## ') === 0) {
              var tHeading = tTrimmed.replace(/^##\s+/, '').trim().toLowerCase();
              transCurrent = null;
              for (var tk = 0; tk < transHeaderMap.length; tk++) {
                if (tHeading.indexOf(transHeaderMap[tk][0]) !== -1 && transHeaderMap[tk][1] !== 'skip') {
                  transCurrent = transHeaderMap[tk][1];
                  break;
                }
              }
            } else if (transCurrent && tTrimmed) {
              if (!obs._transSections[transCurrent]) obs._transSections[transCurrent] = [];
              obs._transSections[transCurrent].push(transLines[ti]);
            }
          }
          for (var sk in obs._transSections) {
            obs._transSections[sk] = obs._transSections[sk].join('\n').trim();
          }
        }
      }).catch(function() {
        obs._hasTranslation = false;
      });
    });

    return Promise.all(promises);
  }

  getObservations().then(function(observations) {
    if (observations.length === 0) {
      if (loading) loading.textContent = tNoObs;
      return;
    }

    // Build status filter buttons (All / Draft / Confirmed)
    var statuses = [
      { key: 'all', label: tAll },
      { key: 'draft', label: tDraft },
      { key: 'confirmed', label: tConfirmed }
    ];
    for (var s = 0; s < statuses.length; s++) {
      var btn = document.createElement('button');
      btn.className = 'os-filter-btn' + (statuses[s].key === 'all' ? ' active' : '');
      btn.setAttribute('data-filter', statuses[s].key);
      btn.setAttribute('aria-pressed', statuses[s].key === 'all' ? 'true' : 'false');
      btn.textContent = statuses[s].label;
      filters.appendChild(btn);
    }

    // Render all cards initially
    renderCards(observations, 'all');

    if (loading) { loading.style.display = 'none'; loading.setAttribute('aria-busy', 'false'); }
    filters.style.display = 'flex';
    grid.style.display = 'grid';

    // Filter click handler
    filters.addEventListener('click', function(e) {
      if (!e.target.classList.contains('os-filter-btn')) return;
      filters.querySelectorAll('.os-filter-btn').forEach(function(b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      e.target.classList.add('active');
      e.target.setAttribute('aria-pressed', 'true');
      renderCards(observations, e.target.getAttribute('data-filter'));
    });

    // On EN pages, fetch translations then re-render
    fetchTranslations(observations).then(function() {
      renderCards(observations, document.querySelector('.os-filter-btn.active') ? document.querySelector('.os-filter-btn.active').getAttribute('data-filter') : 'all');
    });

  }).catch(function(err) {
    console.error(err);
    if (loading) loading.style.display = 'none';
    if (errorDiv) errorDiv.style.display = 'block';
  });
})();
