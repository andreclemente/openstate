---
title: Observações
nav_order: 3
parent: Português
layout: page
---

# Observações

Situações reais documentadas com evidência. Cada uma é um pedaço de memória colectiva.

---

<div class="os-obs-filters" id="obs-filters">
  <button class="os-filter-btn active" data-filter="all">Todas</button>
  {% assign areas = site.observations | map: 'area' | uniq | sort %}
  {% for area in areas %}
  <button class="os-filter-btn" data-filter="{{ area | slugify }}">{{ area }}</button>
  {% endfor %}
</div>

<div class="os-obs-grid" id="obs-grid">
  {% for obs in site.observations reversed %}
  <div class="os-obs-card" data-area="{{ obs.area | slugify }}">
    <div class="os-obs-header">
      <span class="os-obs-area">{{ obs.area }}</span>
      <span class="os-obs-status os-obs-status-{{ obs.status }}">{{ obs.status | capitalize }}</span>
    </div>
    <h3>{{ obs.title }}</h3>
    <p>{{ obs.content | strip_html | truncatewords: 30 }}</p>
    <div class="os-obs-footer">
      <span>{{ obs.date | date: "%d/%m/%Y" }}</span>
      <span>{{ obs.sources }} fontes</span>
    </div>
  </div>
  {% endfor %}
</div>

<script>
(function() {
  var filterBtns = document.querySelectorAll('.os-filter-btn');
  var cards = document.querySelectorAll('.os-obs-card');
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      cards.forEach(function(card) {
        if (filter === 'all' || card.getAttribute('data-area') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();
</script>
