/**
 * OpenState — Fix language toggle on observation detail pages
 * Preserves query params (e.g. ?id=12) when switching languages
 */
(function() {
  var marker = document.getElementById('os-other-url');
  if (!marker) return;

  var otherBase = marker.getAttribute('data-other-url');
  var currentLang = marker.getAttribute('data-lang');
  var params = window.location.search;
  if (!params) return;

  var toggles = document.querySelectorAll('.os-doc-lang-toggle');
  if (!toggles.length) return;

  toggles.forEach(function(toggle) {
    var links = toggle.querySelectorAll('a');
    links.forEach(function(a) {
      var isEN = a.textContent.trim() === 'EN';
      var isPT = a.textContent.trim() === 'PT';
      if ((isEN && currentLang !== 'en') || (isPT && currentLang === 'en')) {
        a.setAttribute('href', otherBase + params);
      } else {
        a.setAttribute('href', window.location.pathname + params);
      }
    });
  });
})();
