---
title: OpenState
nav_exclude: true
search_exclude: true
layout: default
lang: en
description: Building a collective memory about how public services behave
---

{% include landing-styles.html %}

<div class="os-page">

<div class="os-doc-header">
  <a href="/en/" class="os-doc-header-logo">
    <img src="/assets/logo-dark.webp" alt="OpenState">
  </a>
  <div class="os-doc-header-nav">
    <a href="/en/how-it-works">How it works</a>
    <a href="/en/observations">Observations</a>
    <a href="/en/contribute">Contribute</a>
    <a href="/en/about">About</a>
    <div class="os-doc-lang-toggle">
      <a href="/">PT</a>
      <span class="sep">/</span>
      <a href="/en/" class="active">EN</a>
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
  <a href="/en/how-it-works">How it works</a>
  <a href="/en/observations">Observations</a>
  <a href="/en/contribute">Contribute</a>
  <a href="/en/about">About</a>
  <div class="os-nav-mobile-footer">
    <div class="os-doc-lang-toggle">
      <a href="/">PT</a>
      <span class="sep">/</span>
      <a href="/en/" class="active">EN</a>
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
    <h1 class="os-hero-title">A collective memory about how public services behave.</h1>
    <p class="os-hero-sub">News disappear. Complaints are lost. Situations repeat without anyone connecting them. OpenState exists so knowledge doesn't disappear.</p>
    <div class="os-hero-links">
      <a href="/en/observations" class="os-btn os-btn-primary">Explore observations</a>
      <a href="/en/how-it-works" class="os-btn os-btn-outline">How it works</a>
      <a href="/en/contribute" class="os-btn os-btn-outline">Contribute</a>
    </div>
  </div>
</div>

<!-- PROBLEM + RESPONSE (2 columns) -->
<div class="os-section os-two-col-section" id="why-what">
  <div class="os-two-col-grid">
    <div class="os-two-col-col">
      <h2 class="os-section-label">The problem</h2>
      <p class="os-section-intro">Every day, millions of people interact with public services. Many face the same problems — repeated, predictable, invisible.</p>
      <p class="os-section-intro">Someone changes address. Updates it with the tax authority. Updates it with social security. Updates it with healthcare. The same information, three times, three systems that don't communicate.</p>
      <p class="os-section-intro">This is not an isolated case. It is a pattern. But there's no structure to document it.</p>
      <p class="os-section-intro os-section-intro-strong">Days later, everything disappears. And the same situation repeats.</p>
    </div>
    <div class="os-two-col-col">
      <h2 class="os-section-label">The response</h2>
      <p class="os-section-intro">OpenState builds a collective memory about how public services behave in reality.</p>
      <p class="os-section-intro">Every situation documented with evidence becomes part of permanent knowledge — verifiable, open, accessible.</p>
      <p class="os-section-intro">We don't promise to fix anything. We promise the knowledge won't be lost.</p>
    </div>
  </div>
</div>

</div>

<div class="os-footer">
  <div class="os-section-inner">
    <div class="os-footer-row">
      <span class="os-footer-text">OpenState</span>
      <span class="os-footer-sep">·</span>
      <span class="os-footer-mission">A collective memory about how public services behave.</span>
    </div>
    <div class="os-footer-row os-footer-secondary">
      <a href="https://github.com/andreclemente/openstate" target="_blank" rel="noopener noreferrer">GitHub</a>
      <span class="os-footer-sep">·</span>
      <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>
      <span class="os-footer-sep">·</span>
      <a href="mailto:contact@openstate.andreclemente.dev">Contact</a>
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
