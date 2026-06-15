/**
 * OpenState — Landing page observations
 */
(function() {
  if (typeof getObservations !== 'function') return;

  var loading = document.getElementById('obs-landing-loading');
  var grid = document.getElementById('obs-landing-grid');
  if (!grid) return;

  getObservations().then(function(all) {
    var latest = all.slice(0, 3);
    if (latest.length > 0) {
      var lang = document.documentElement.lang || 'pt';
      var prefix = lang === 'en' ? '/en' : '/pt';
      for (var i = 0; i < latest.length; i++) {
        var obs = latest[i];
        var summary = obs.sections.what_happens || obs.body.substring(0, 200);
        grid.innerHTML += '<a href="' + prefix + '/observation/?id=' + obs.number + '" class="os-example-card-link">' +
          '<div class="os-example-card">' +
            '<div class="os-example-tag">' + obs.area + '</div>' +
            '<h3>' + obs.title + '</h3>' +
            '<p>' + summary.replace(/\n/g, ' ').substring(0, 150) + '…</p>' +
          '</div></a>';
      }
      grid.style.display = 'grid';
      if (loading) loading.style.display = 'none';
    }
  }).catch(function(e) { console.warn('Observations unavailable:', e); });
})();
