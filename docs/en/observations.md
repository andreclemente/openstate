---
title: Observations
nav_order: 3
parent: English
layout: page
---

# Observations

Real situations documented with evidence. Each one is a piece of collective memory.

---

<div id="obs-loading" class="os-obs-loading">Loading observations…</div>
<div id="obs-error" class="os-obs-error" style="display:none">Error loading. <a href="#" onclick="location.reload()">Try again</a>.</div>

<div class="os-obs-filters" id="obs-filters" style="display:none">
  <button class="os-filter-btn active" data-filter="all">All</button>
</div>

<div class="os-obs-grid" id="obs-grid" style="display:none"></div>

<script src="/assets/js/github.v3.js"></script>
<script>
(function() {
  var grid = document.getElementById('obs-grid');
  var filters = document.getElementById('obs-filters');
  var loading = document.getElementById('obs-loading');
  var errorDiv = document.getElementById('obs-error');

  function slugify(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  getObservations().then(function(observations) {
    if (observations.length === 0) {
      loading.textContent = 'No observations published yet.';
      return;
    }

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

    // Render cards
    function renderCards(filter) {
      grid.innerHTML = '';
      var filtered = filter === 'all' ? observations : observations.filter(function(o) { return slugify(o.area) === filter; });

      for (var k = 0; k < filtered.length; k++) {
        var obs = filtered[k];
        var card = document.createElement('a');
        card.href = '/en/observation/?id=' + obs.number;
        card.className = 'os-obs-card-link';

        var sections = obs.sections;
        var summary = sections.what_happens || obs.body.substring(0, 200);

        card.innerHTML = '<div class="os-obs-card" data-area="' + slugify(obs.area) + '">' +
          '<div class="os-obs-header">' +
            '<span class="os-obs-area">' + obs.area + '</span>' +
            '<span class="os-obs-status os-obs-status-' + obs.status + '">' + (obs.status === 'confirmed' ? 'Confirmed' : 'Draft') + '</span>' +
          '</div>' +
          '<h3>' + obs.title + '</h3>' +
          '<p>' + summary.replace(/\n/g, ' ').substring(0, 180) + '…</p>' +
          '<div class="os-obs-footer">' +
            '<span>' + obs.date + '</span>' +
            '<span>' + obs.sources + ' sources</span>' +
          '</div>' +
        '</div>';
        grid.appendChild(card);
      }
    }

    renderCards('all');

    // Filter handlers
    filters.addEventListener('click', function(e) {
      if (!e.target.classList.contains('os-filter-btn')) return;
      var btns = filters.querySelectorAll('.os-filter-btn');
      for (var b = 0; b < btns.length; b++) btns[b].classList.remove('active');
      e.target.classList.add('active');
      renderCards(e.target.getAttribute('data-filter'));
    });

    loading.style.display = 'none';
    filters.style.display = 'flex';
    grid.style.display = 'grid';
  }).catch(function(err) {
    console.error(err);
    loading.style.display = 'none';
    errorDiv.style.display = 'block';
  });
})();
</script>