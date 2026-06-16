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

  // Update both desktop and mobile lang toggles
  var toggles = document.querySelectorAll('.os-doc-lang-toggle');
  toggles.forEach(function(toggle) {
    var links = toggle.querySelectorAll('a');
    links.forEach(function(a) {
      var href = a.getAttribute('href');
      // Only modify the "other language" link (the one that's not active)
      var isEN = a.textContent.trim() === 'EN';
      var isPT = a.textContent.trim() === 'PT';
      if ((isEN && currentLang !== 'en') || (isPT && currentLang === 'en')) {
        // This is the link to switch language — append query params
        a.setAttribute('href', otherBase + params);
      } else {
        // This is the current language link — also append query params
        // so going "back" to same language preserves the page
        var currentBase = window.location.pathname;
        a.setAttribute('href', currentBase + params);
      }
    });
  });
})();
