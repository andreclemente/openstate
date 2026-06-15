/**
 * OpenState — GitHub Issues fetcher
 * Fetches observations directly from GitHub API at runtime.
 * No build-time sync, no hardcoded data.
 */

const REPO = 'andreclemente/openstate';
const API_BASE = 'https://api.github.com';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Simple in-memory + localStorage cache
function getCache(key) {
  try {
    const raw = localStorage.getItem('os_cache_' + key);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch (e) { return null; }
}

function setCache(key, data) {
  try {
    localStorage.setItem('os_cache_' + key, JSON.stringify({ ts: Date.now(), data }));
  } catch (e) {}
}

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: { 'Accept': 'application/vnd.github+json' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/**
 * Fetch all open issues with 'draft' and 'confirmed' labels.
 * GitHub API ANDs labels in the query param, so we fetch each
 * label separately and merge/dedupe.
 */
export async function getObservations() {
  const cached = getCache('observations');
  if (cached) return cached;

  const labels = ['draft', 'confirmed'];
  const allIssues = new Map();

  for (const label of labels) {
    try {
      const issues = await fetchJSON(
        `${API_BASE}/repos/${REPO}/issues?state=open&per_page=100&labels=${label}`
      );
      for (const issue of issues) {
        if (!allIssues.has(issue.number)) {
          allIssues.set(issue.number, normalizeIssue(issue));
        }
      }
    } catch (e) {
      console.warn(`Failed to fetch label ${label}:`, e.message);
    }
  }

  const result = [...allIssues.values()].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  setCache('observations', result);
  return result;
}

/**
 * Fetch a single issue by number.
 */
export async function getObservation(number) {
  const cached = getCache('issue_' + number);
  if (cached) return cached;

  const issue = await fetchJSON(`${API_BASE}/repos/${REPO}/issues/${number}`);
  const result = normalizeIssue(issue);
  setCache('issue_' + number, result);
  return result;
}

/**
 * Normalize a GitHub API issue into our observation format.
 */
function normalizeIssue(issue) {
  const body = issue.body || '';
  const labels = issue.labels.map(l => l.name);

  return {
    number: issue.number,
    title: issue.title.replace(/^\[(?:Observação|Observation)\]\s*/i, '').trim(),
    body: body,
    area: extractArea(body),
    status: labels.includes('confirmed') ? 'confirmed' : 'draft',
    date: issue.created_at.substring(0, 10),
    sources: countSources(body),
    htmlUrl: issue.html_url,
    sections: extractSections(body)
  };
}

function extractArea(body) {
  const match = body.match(/##\s*Sistema envolvido[^\n]*\n+\s*([^\n]+)/i);
  if (match) return match[1].replace(/\*/g, '').split('/')[0].trim();
  return 'Outro';
}

function countSources(body) {
  const evidence = extractSections(body).evidence || '';
  return (evidence.match(/^-|\d+\./g) || []).length;
}

function extractSections(body) {
  const lines = body.split('\n');
  const sections = {};
  let current = null;

  const headerMap = {
    'o que acontece': 'what_happens', 'what happens': 'what_happens',
    'quem é afetado': 'affected', 'who is affected': 'affected',
    'impacto': 'impact', 'impact': 'impact',
    'evidência': 'evidence', 'evidence': 'evidence',
    'causa raiz': 'root_cause', 'root cause': 'root_cause'
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const heading = trimmed.replace('## ', '').trim().toLowerCase();
      current = null;
      for (const [key, val] of Object.entries(headerMap)) {
        if (heading.includes(key)) { current = val; break; }
      }
    } else if (current && trimmed) {
      if (!sections[current]) sections[current] = [];
      sections[current].push(line);
    }
  }

  // Join arrays to strings
  for (const key of Object.keys(sections)) {
    sections[key] = sections[key].join('\n').trim();
  }

  return sections;
}

/**
 * Simple markdown → HTML converter for observation body.
 */
export function renderMarkdown(text) {
  if (!text) return '';
  let html = text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  return '<p>' + html + '</p>';
}
