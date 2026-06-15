/**
 * OpenState — GitHub Issues fetcher (v3, non-module)
 * Fetches observations directly from GitHub API at runtime.
 * Exposes getObservations, getObservation, renderMarkdown as globals.
 */

var OS_REPO = 'andreclemente/openstate';
var OS_API_BASE = 'https://api.github.com';
var OS_CACHE_TTL = 5 * 60 * 1000;

function osGetCache(key) {
  try {
    var raw = localStorage.getItem('os_cache_' + key);
    if (!raw) return null;
    var parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts > OS_CACHE_TTL) return null;
    return parsed.data;
  } catch(e) { return null; }
}

function osSetCache(key, data) {
  try {
    localStorage.setItem('os_cache_' + key, JSON.stringify({ ts: Date.now(), data: data }));
  } catch(e) {}
}

function osFetchJSON(url) {
  return fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } }).then(function(r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  });
}

function osNormalizeIssue(issue) {
  var body = issue.body || '';
  var labels = issue.labels.map(function(l) { return l.name; });

  return {
    number: issue.number,
    title: issue.title.replace(/^\[(?:Observação|Observation)\]\s*/i, '').trim(),
    body: body,
    area: osExtractArea(body),
    status: labels.includes('confirmed') ? 'confirmed' : 'draft',
    date: issue.created_at.substring(0, 10),
    sources: osCountSources(body),
    htmlUrl: issue.html_url,
    sections: osExtractSections(body)
  };
}

function osExtractArea(body) {
  var match = body.match(/##\s*Sistema envolvido[^\n]*\n+\s*([^\n]+)/i);
  if (match) return match[1].replace(/\*/g, '').split('/')[0].trim();
  return 'Outro';
}

function osCountSources(body) {
  var sections = osExtractSections(body);
  var evidence = sections.evidence || '';
  return (evidence.match(/^-|\d+\./g) || []).length;
}

function osExtractSections(body) {
  var lines = body.split('\n');
  var sections = {};
  var current = null;
  var headerMap = {
    'o que acontece': 'what_happens', 'what happens': 'what_happens',
    'quem é afetado': 'affected', 'who is affected': 'affected',
    'impacto': 'impact', 'impact': 'impact',
    'evidência': 'evidence', 'evidence': 'evidence',
    'causa raiz': 'root_cause', 'root cause': 'root_cause'
  };

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var trimmed = line.trim();
    if (trimmed.indexOf('## ') === 0) {
      var heading = trimmed.replace('## ', '').trim().toLowerCase();
      current = null;
      for (var key in headerMap) {
        if (heading.indexOf(key) !== -1) { current = headerMap[key]; break; }
      }
    } else if (current && trimmed) {
      if (!sections[current]) sections[current] = [];
      sections[current].push(line);
    }
  }

  for (var k in sections) {
    sections[k] = sections[k].join('\n').trim();
  }

  return sections;
}

function getObservations() {
  var cached = osGetCache('observations');
  if (cached) return Promise.resolve(cached);

  var labels = ['draft', 'confirmed'];
  var allIssues = {};

  var promises = labels.map(function(label) {
    return osFetchJSON(OS_API_BASE + '/repos/' + OS_REPO + '/issues?state=open&per_page=100&labels=' + label)
      .then(function(issues) {
        for (var i = 0; i < issues.length; i++) {
          if (!allIssues[issues[i].number]) {
            allIssues[issues[i].number] = osNormalizeIssue(issues[i]);
          }
        }
      })
      .catch(function(e) { console.warn('Failed to fetch label ' + label + ':', e.message); });
  });

  return Promise.all(promises).then(function() {
    var result = Object.keys(allIssues).map(function(k) { return allIssues[k]; });
    result.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
    if (result.length > 0) osSetCache('observations', result);
    return result;
  });
}

function getObservation(number) {
  var cached = osGetCache('issue_' + number);
  if (cached) return Promise.resolve(cached);

  return osFetchJSON(OS_API_BASE + '/repos/' + OS_REPO + '/issues/' + number)
    .then(function(issue) {
      var result = osNormalizeIssue(issue);
      osSetCache('issue_' + number, result);
      return result;
    });
}

function renderMarkdown(text) {
  if (!text) return '';
  var html = text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  return '<p>' + html + '</p>';
}