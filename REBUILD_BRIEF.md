# OPENSTATE — FULL WEBSITE REBUILD BRIEF

## What is OpenState

"A structured observability system for public services."

This is the ONLY allowed high-level definition. No variations.

OpenState documents how public services behave in reality — through structured observations, evidence, and pattern discovery. NOT a complaint platform. NOT political. NOT a reform initiative. NOT a discussion forum. NOT a bug tracker.

## Current State

The site is at `/tmp/openstate/` (GitHub repo: `andreclemente/openstate`). GitHub Pages deploys from `docs/` folder. Site: https://openstate.andreclemente.dev

### What exists now

**Landing pages:**
- `docs/index.md` — PT landing (default, at root `/`)
- `docs/en/index.md` — EN landing (at `/en/`)

**Secondary doc pages (all have `layout: page`):**
- `docs/en/how-it-works.md` / `docs/pt/how-it-works.md`
- `docs/en/examples.md` / `docs/pt/examples.md`
- `docs/en/contribute.md` / `docs/pt/contribute.md`

**Shared layout:**
- `docs/_layouts/page.html` — sticky header with logo, nav links, PT/EN toggle, content area

**Assets:**
- `docs/assets/logo-wordmark.webp` — logo with "OpenState" text (140KB)
- `docs/assets/logo-dark.webp` — logo for dark backgrounds (40KB)
- `docs/assets/logo.webp` — icon only (34KB)
- `docs/assets/favicon.webp` — favicon (34KB)
- `docs/assets/og-image.png` — social preview image

**Config:**
- `docs/_config.yml` — just-the-docs theme, dark scheme, PT default
- `docs/_includes/head-custom.html` — favicon, og tags
- `docs/_sass/custom/custom.scss` — landing page card/hero/section styles

### What's wrong

The website looks amateur. Specific problems:
1. Landing page hero is just a logo image + text — no visual impact
2. Card layout is basic — looks like a template
3. Secondary pages have inline `<style>` blocks mixed with content (in the landing pages)
4. The `_layouts/page.html` has a massive inline `<style>` block (200+ lines of CSS)
5. No visual hierarchy, no whitespace rhythm, no typographic refinement
6. The overall feel is "developer docs" not "institutional knowledge platform"
7. Code blocks on secondary pages show raw markdown, not styled properly
8. No smooth transitions, no polish

## What Needs to Be Built

### Design Direction

Reference sites (look at these for inspiration):
- Stripe documentation (clean, spacious, trustworthy)
- Notion public pages (minimal, content-first)
- EU institutional portals (modern version — serious, neutral)
- Wikipedia (information-dense but readable)

NOT:
- GitHub README pages
- Developer dashboards
- Old documentation sites
- Markdown-heavy pages

### Visual Requirements

**Typography-first:**
- Large, confident headings (48-64px hero, 32px section)
- Strong whitespace between sections (80-120px)
- Body text: 16-17px, 1.7 line height
- No dense paragraphs — break everything into scannable chunks

**Color palette (keep existing):**
- Background: #0f172a (dark slate)
- Card: #1e293b
- Border: #334155
- Text: #f1f5f9
- Muted: #94a3b8
- Accent: #38bdf8 (sky blue)

**Card-based layout:**
- Each concept = one visual block
- Generous padding (32-40px inside cards)
- Subtle borders, no shadows
- Hover states with border color change

**No developer aesthetic:**
- No monospace-heavy styling
- No code block dominance
- No technical UI framing
- Clean, institutional, calm

### Page Structure

#### Landing Page (PT at `/`, EN at `/en/`)

Sections in order:
1. **Hero** — Logo + one-line definition + subtitle + CTA buttons + language toggle
2. **Why it exists** — 3 cards: fragmented systems, duplicated problems, invisible patterns
3. **What it produces** — 3 numbered cards: structured observations, evidence-based docs, pattern discovery
4. **What it is NOT** — 4 cards with ✕ marks: complaint platform, political, reform initiative, discussion forum
5. **Contribute** — 3 cards: submission format, evidence required, clarity & neutrality + GitHub CTA
6. **Footer** — OpenState · PT · EN · GitHub

#### Secondary Pages (How it Works, Examples, Contribute)

- Sticky header: logo (left) + nav links + PT/EN toggle (right)
- Content area: max-width 800px, centered
- Clean typography for headings, paragraphs, lists, tables, blockquotes
- Code blocks styled properly (dark background, rounded corners)
- No sidebar, no chrome

### Technical Constraints

- GitHub Pages (Jekyll) — no build step, just static files
- just-the-docs theme as base
- All CSS goes in `docs/_sass/custom/custom.scss` (for landing) and `docs/_layouts/page.html` (for secondary pages — but move CSS to a separate file if possible)
- All content in Markdown
- Language toggle works by swapping `/en/` ↔ `/pt/` in the URL path
- PT is default (root `/`), EN at `/en/`

### File Structure (final)

```
docs/
  index.md              # PT landing
  en/index.md           # EN landing
  en/how-it-works.md    # EN concept page
  en/examples.md        # EN examples
  en/contribute.md      # EN contribute
  pt/how-it-works.md    # PT concept page
  pt/examples.md        # PT examples
  pt/contribute.md      # PT contribute
  en.md                 # redirect to /en/
  pt.md                 # redirect to /
  404.md                # 404 page
  _config.yml           # Jekyll config
  _layouts/
    page.html           # Secondary page layout (clean, minimal)
  _includes/
    head-custom.html    # Favicons, og tags
    landing-styles.html # All landing page CSS (included by index.md and en/index.md)
  _sass/custom/
    custom.scss         # Global styles + landing page styles
  assets/
    logo-wordmark.webp
    logo-dark.webp
    logo.webp
    favicon.webp
    og-image.png
    og-image.svg
  CNAME
```

### Key Rules

1. **Caveman mode always active** — terse, no fluff, fragments OK
2. **PT default** — root is PT, EN at /en/
3. **Language toggle on every page** — swap /en/ ↔ /pt/ in path
4. **No GitHub references in public layer** — only in contribute section
5. **Forbidden terms in public layer:** bug tracker, issues, repo, GitHub-first framing, reform language, political framing, engineering metaphors
6. **Required terminology:** observation, public system, evidence, pattern, structure, documentation, traceability
7. **Evidence requirement** — every observation needs verifiable evidence (news, data, reports, legislation, real cases)
8. **Observations and solutions are strictly separated**

### Git

- Repo: `andreclemente/openstate` on GitHub
- Branch: `main`
- GitHub Pages deploys from `docs/` folder
- PAT available in memory for pushes
- After rebuilding: `cd /tmp/openstate && git add -A && git commit -m "..." && git push origin main`

### Verification

After rebuilding, verify:
1. https://openstate.andreclemente.dev/ — PT landing loads
2. https://openstate.andreclemente.dev/en/ — EN landing loads
3. All secondary pages load with proper header + nav + language toggle
4. Language toggle switches correctly between PT and EN versions
5. No broken links
6. Mobile responsive (cards stack, header compresses)
7. Overall look: professional, institutional, trustworthy, calm

## Context from Previous Sessions

- User is André, communicates in English (not Portuguese despite PT default)
- Caveman mode is always on
- User wants bold, medium+ effort
- User HATES unrequested verbose content
- The site has been through multiple iterations — keep it clean, don't accumulate cruft
- Previous versions had duplicate files, inline styles everywhere, inconsistent structure — clean all that up
