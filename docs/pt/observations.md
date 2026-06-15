---
title: Observações
nav_order: 3
parent: Português
layout: page
---

# Observações

Situações reais documentadas com evidência. Cada uma é um pedaço de memória colectiva.

---

<div id="obs-loading" class="os-obs-loading">A carregar observações…</div>
<div id="obs-error" class="os-obs-error" style="display:none">Erro ao carregar. <a href="#" onclick="location.reload()">Tentar novamente</a>.</div>

<div class="os-obs-filters" id="obs-filters" style="display:none">
  <button class="os-filter-btn active" data-filter="all">Todas</button>
</div>

<div class="os-obs-grid" id="obs-grid" style="display:none"></div>

<script type="module">
import { getObservations, renderMarkdown } from '/assets/js/github.js?v=2';

const grid = document.getElementById('obs-grid');
const filters = document.getElementById('obs-filters');
const loading = document.getElementById('obs-loading');
const errorDiv = document.getElementById('obs-error');

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

try {
  const observations = await getObservations();

  if (observations.length === 0) {
    loading.textContent = 'Ainda não existem observações publicadas.';
  } else {
    // Build area filters
    const areas = [...new Set(observations.map(o => o.area))].sort();
    for (const area of areas) {
      const btn = document.createElement('button');
      btn.className = 'os-filter-btn';
      btn.setAttribute('data-filter', slugify(area));
      btn.textContent = area;
      filters.appendChild(btn);
    }

    // Render cards
    function renderCards(filter) {
      grid.innerHTML = '';
      const filtered = filter === 'all' ? observations : observations.filter(o => slugify(o.area) === filter);

      for (const obs of filtered) {
        const card = document.createElement('a');
        card.href = '/pt/observations/' + obs.number;
        card.className = 'os-obs-card-link';

        const sections = obs.sections;
        const summary = sections.what_happens || obs.body.substring(0, 200);

        card.innerHTML = `
        <div class="os-obs-card" data-area="${slugify(obs.area)}">
          <div class="os-obs-header">
            <span class="os-obs-area">${obs.area}</span>
            <span class="os-obs-status os-obs-status-${obs.status}">${obs.status === 'confirmed' ? 'Confirmado' : 'Rascunho'}</span>
          </div>
          <h3>${obs.title}</h3>
          <p>${summary.replace(/\n/g, ' ').substring(0, 180)}…</p>
          <div class="os-obs-footer">
            <span>${obs.date}</span>
            <span>${obs.sources} fontes</span>
          </div>
        </div>
      `;
        grid.appendChild(card);
      }
    }

    renderCards('all');

    // Filter handlers
    filters.addEventListener('click', e => {
      if (!e.target.classList.contains('os-filter-btn')) return;
      filters.querySelectorAll('.os-filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderCards(e.target.getAttribute('data-filter'));
    });

    loading.style.display = 'none';
    filters.style.display = 'flex';
    grid.style.display = 'grid';
  }
} catch (err) {
  console.error(err);
  loading.style.display = 'none';
  errorDiv.style.display = 'block';
}
</script>