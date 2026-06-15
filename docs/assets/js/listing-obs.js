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

  function slugify(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  getObservations().then(function(observations) {
    if (observations.length === 0) {
      if (loading) loading.textContent = 'Ainda não existem observações publicadas.';
      return;
    }

    var lang = document.documentElement.lang || 'pt';
    var prefix = lang === 'en' ? '/en' : '/pt';
    var tDraft = lang === 'en' ? 'Draft' : 'Rascunho';
    var tConfirmed = lang === 'en' ? 'Confirmed' : 'Confirmado';
    var tSources = lang === 'en' ? 'sources' : 'fontes';

    // Build area filters
    var areas = [];
    var seen = {};
    for (var i = 0; i < observations.length; i++) {
      if (!seen[observations[i].area]) { areas.push(observations[i].area); seen[observations[i].area] = true; }
    }
    areas.sort();
    for (var j = 0; j < areas.length; j++) {
      var btn = document.createElement('button');
      btn.className = 'os-filter-btn';
      btn.setAttribute('data-filter', slugify(areas[j]));
      btn.textContent = areas[j];
      filters.appendChild(btn);
    }

    // Render cards function
    function renderCards(filter) {
      grid.innerHTML = '';
      var filtered = filter === 'all' ? observations : observations.filter(function(o) { return slugify(o.area) === filter; });

      for (var k = 0; k < filtered.length; k++) {
        var obs = filtered[k];
        var card = document.createElement('a');
        card.href = prefix + '/observation/?id=' + obs.number;
        card.className = 'os-obs-card-link';

        var sections = obs.sections;
        var summary = sections.what_happens || obs.body.substring(0, 200);

        // Title: show translated if available on EN pages
        var displayTitle = obs._transTitle || obs.title;

        // Translation status badge for EN pages
        var transBadge = '';
        if (lang === 'en') {
          if (obs._hasTranslation === true) {
            transBadge = '<div class="os-card-lang-row os-card-lang-translated">🇬🇧 Translation available</div>';
          } else if (obs._hasTranslation === false) {
            transBadge = '<div class="os-card-lang-row os-card-lang-no-trans">🇵🇹 No translation yet</div>';
          } else {
            // Still loading — show placeholder that will be updated
            transBadge = '<div class="os-card-lang-row os-card-lang-loading" data-obs-num="' + obs.number + '">…</div>';
          }
        }

        card.innerHTML = '<div class="os-obs-card" data-area="' + slugify(obs.area) + '">' +
          '<div class="os-obs-header">' +
            '<span class="os-obs-area">' + obs.area + '</span>' +
            '<span class="os-obs-status os-obs-status-' + obs.status + '">' + (obs.status === 'confirmed' ? tConfirmed : tDraft) + '</span>' +
          '</div>' +
          '<h3>' + displayTitle + '</h3>' +
          '<p>' + summary.replace(/\n/g, ' ').substring(0, 180) + '…</p>' +
          '<div class="os-obs-footer">' +
            '<span>' + obs.date + '</span>' +
            '<span>' + obs.sources + ' ' + tSources + '</span>' +
          '</div>' +
          transBadge +
        '</div>';
        grid.appendChild(card);
      }
    }

    renderCards('all');

    filters.addEventListener('click', function(e) {
      if (!e.target.classList.contains('os-filter-btn')) return;
      var btns = filters.querySelectorAll('.os-filter-btn');
      for (var b = 0; b < btns.length; b++) btns[b].classList.remove('active');
      e.target.classList.add('active');
      renderCards(e.target.getAttribute('data-filter'));
    });

    if (loading) loading.style.display = 'none';
    filters.style.display = 'flex';
    grid.style.display = 'grid';

    // On EN pages, fetch comments to check translations and get translated titles
    if (lang === 'en' && typeof getComments === 'function') {
      observations.forEach(function(obs) {
        getComments(obs.number).then(function(comments) {
          var translationBody = findTranslation(comments);
          obs._hasTranslation = !!translationBody;
          if (translationBody) {
            var titleMatch = translationBody.match(/###\s+([^\n]+)/);
            obs._transTitle = titleMatch ? titleMatch[1].trim() : obs.title;
          }
          // Update the card
          var cardEl = grid.querySelector('a[href*="?id=' + obs.number + '"]');
          if (cardEl) {
            var titleEl = cardEl.querySelector('h3');
            if (titleEl && obs._transTitle) titleEl.textContent = obs._transTitle;
            var badgeEl = cardEl.querySelector('.os-card-lang-row');
            if (badgeEl) {
              if (obs._hasTranslation) {
                badgeEl.className = 'os-card-lang-row os-card-lang-translated';
                badgeEl.textContent = '🇬🇧 Translation available';
              } else {
                badgeEl.className = 'os-card-lang-row os-card-lang-no-trans';
                badgeEl.textContent = '🇵🇹 No translation yet';
              }
            }
          }
        }).catch(function() {
          obs._hasTranslation = false;
          var cardEl = grid.querySelector('a[href*="?id=' + obs.number + '"]');
          if (cardEl) {
            var badgeEl = cardEl.querySelector('.os-card-lang-row');
            if (badgeEl) {
              badgeEl.className = 'os-card-lang-row os-card-lang-no-trans';
              badgeEl.textContent = '🇵🇹 No translation yet';
            }
          }
        });
      });
    }
  }).catch(function(err) {
    console.error(err);
    if (loading) loading.style.display = 'none';
    if (errorDiv) errorDiv.style.display = 'block';
  });
})();
