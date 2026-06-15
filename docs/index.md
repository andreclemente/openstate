---
title: OpenState
nav_exclude: true
search_exclude: true
layout: default
description: Building a collective memory about how public services behave
---

{% include landing-styles.html %}

<div class="os-page">

<div class="os-doc-header">
  <a href="/" class="os-doc-header-logo">
    <img src="/assets/logo-dark.webp" alt="OpenState">
  </a>
  <div class="os-doc-header-nav">
    <a href="/pt/how-it-works">Como funciona</a>
    <a href="/pt/observations">Observações</a>
    <a href="/pt/contribute">Contribuir</a>
    <a href="/pt/about">Sobre</a>
    <div class="os-doc-lang-toggle">
      <a href="/" class="active">PT</a>
      <span class="sep">/</span>
      <a href="/en/">EN</a>
    </div>
    <button class="os-theme-toggle" id="theme-toggle" aria-label="Toggle theme">
      <span class="os-theme-icon" data-theme="system">○</span>
      <span class="os-theme-icon" data-theme="light">☀</span>
      <span class="os-theme-icon" data-theme="dark">☾</span>
    </button>
  </div>
  <button class="os-nav-toggle" id="nav-toggle" aria-label="Menu">☰</button>
</div>

<div class="os-nav-mobile" id="nav-mobile">
  <a href="/pt/how-it-works">Como funciona</a>
  <a href="/pt/observations">Observações</a>
  <a href="/pt/contribute">Contribuir</a>
  <a href="/pt/about">Sobre</a>
  <div class="os-nav-mobile-footer">
    <div class="os-doc-lang-toggle">
      <a href="/" class="active">PT</a>
      <span class="sep">/</span>
      <a href="/en/">EN</a>
    </div>
    <button class="os-theme-toggle" id="theme-toggle-mobile" aria-label="Toggle theme">
      <span class="os-theme-icon" data-theme="system">○</span>
      <span class="os-theme-icon" data-theme="light">☀</span>
      <span class="os-theme-icon" data-theme="dark">☾</span>
    </button>
  </div>
</div>

<!-- HERO -->
<div class="os-hero">
  <div class="os-hero-inner">
    <img src="/assets/logo-dark.webp" alt="OpenState" class="os-hero-logo">
    <h1 class="os-hero-title">Uma memória colectiva sobre como os serviços públicos funcionam.</h1>
    <p class="os-hero-sub">Notícias desaparecem. Queixas perdem-se. Experiências repetem-se sem que ninguém as ligue. OpenState existe para que o conhecimento não desapareça.</p>
    <div class="os-hero-links">
      <a href="/pt/observations" class="os-btn os-btn-primary">Explorar observações</a>
      <a href="/pt/how-it-works" class="os-btn os-btn-outline">Como funciona</a>
      <a href="/pt/contribute" class="os-btn os-btn-outline">Contribuir</a>
    </div>
  </div>
</div>

<!-- PROBLEMA + RESPOSTA (2 columns) -->
<div class="os-section os-two-col-section" id="why-what">
  <div class="os-two-col-grid">
    <div class="os-two-col-col">
      <h2 class="os-section-label">O problema</h2>
      <p class="os-section-intro">Todos os dias, milhões de pessoas interagem com serviços públicos. Muitas enfrentam os mesmos problemas — repetidos, previsíveis, invisíveis.</p>
      <p class="os-section-intro">Alguém muda de morada. Actualiza nas Finanças. Actualiza na Segurança Social. Actualiza no SNS. A mesma informação, três vezes, três sistemas que não comunicam.</p>
      <p class="os-section-intro">Isto não é um caso isolado. É um padrão. Mas não existe estrutura que o documente.</p>
      <p class="os-section-intro os-section-intro-strong">Dias depois, tudo desaparece. E a mesma situação repete-se.</p>
    </div>
    <div class="os-two-col-col">
      <h2 class="os-section-label">A resposta</h2>
      <p class="os-section-intro">OpenState constrói uma memória colectiva sobre como os serviços públicos funcionam na realidade.</p>
      <p class="os-section-intro">Cada situação documentada com evidência torna-se parte de um conhecimento permanente — verificável, aberto, acessível.</p>
      <p class="os-section-intro">Não prometemos resolver nada. Prometemos que o conhecimento não se perde.</p>
    </div>
  </div>
</div>

</div>

<div class="os-footer">
  <div class="os-section-inner">
    <div class="os-footer-row">
      <span class="os-footer-text">OpenState</span>
      <span class="os-footer-sep">·</span>
      <span class="os-footer-mission">Uma memória colectiva sobre como os serviços públicos funcionam.</span>
    </div>
    <div class="os-footer-row os-footer-secondary">
      <a href="https://github.com/andreclemente/openstate" target="_blank" rel="noopener noreferrer">GitHub</a>
      <span class="os-footer-sep">·</span>
      <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>
      <span class="os-footer-sep">·</span>
      <a href="mailto:contact@openstate.andreclemente.dev">Contacto</a>
    </div>
  </div>
</div>

<script>
(function() {
  var current = localStorage.getItem('os-theme') || 'system';
  function setTheme(t) {
    current = t;
    localStorage.setItem('os-theme', t);
    document.documentElement.setAttribute('data-theme', t);
    document.querySelectorAll('.os-theme-icon').forEach(function(ic) {
      ic.style.display = ic.getAttribute('data-theme') === t ? 'inline' : 'none';
    });
  }
  setTheme(current);
  document.querySelectorAll('.os-theme-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  });
  var navBtn = document.getElementById('nav-toggle');
  var navMobile = document.getElementById('nav-mobile');
  if (navBtn && navMobile) {
    navBtn.addEventListener('click', function() { navMobile.classList.toggle('open'); });
    navMobile.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { navMobile.classList.remove('open'); });
    });
  }
})();
</script>
