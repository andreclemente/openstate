# OpenState — UX & Content Review

**Date:** 2026-06-12
**Reviewer:** OWL (automated review)
**Scope:** All source files in `/root/openstate/docs/`, GitHub issues, live site (source-level analysis — live fetch blocked by `.dev` TLD security policy)

---

## Summary

OpenState has a strong foundation: clear purpose, good bilingual support, clean dark-first design, and a compelling institutional tone. The landing page is well-structured with a clear narrative arc. However, several issues undermine the goal of feeling like a "long-term public institution" rather than a software project. The most critical problems are: (1) GitHub-centric contribution flow that excludes non-technical users, (2) all observations are fake/examples with no real data, (3) several navigation and content issues that create confusion, and (4) the theme toggle has no light theme defined.

---

## HIGH PRIORITY

### 1. Contribution flow requires GitHub — excludes 90% of target users
**Files:** `en/contribute.md:60-63`, `pt/contribute.md:60-63`, `_layouts/page.html:222`
- The "Submit an observation" button links directly to `github.com/andreclemente/openstate/issues/new?template=...`
- Target audience includes students, journalists, civil servants, ordinary citizens — most don't have GitHub accounts
- This makes OpenState feel like an open-source project, not a public institution
- **Fix:** Add a web-based submission form (even a simple one) that doesn't require GitHub. GitHub can be the backend, but the public face should be a form on the site itself. At minimum, add a prominent note: "No GitHub account? Email your observation to contact@openstate.andreclemente.dev"

### 2. All observations are fake examples — site has no real content
**Files:** `en/observations.md:14-86`, `pt/observations.md:14-86`, `en/index.md:138-165`
- All 5 observation cards on the Observations page are marked with `⚠️ Este é um issue de exemplo` in GitHub issues
- The 3 example cards on the landing page are the same fake data
- A visitor who explores beyond the landing page will realize there's nothing real here yet
- **Fix:** Either remove the Observations page entirely until real data exists, or clearly label everything as "Example Format / Formato de Exemplo" at the top of the page. The landing page examples should be clearly marked as illustrative, not real entries.

### 3. No light theme exists — theme toggle is broken
**Files:** `_sass/custom/custom.scss:6-19` (CSS variables), `_layouts/page.html:82-108` (JS toggle)
- The CSS defines only dark theme variables (`--os-bg: #0f172a`, etc.)
- The theme toggle cycles through system → light → dark, but there is no light theme defined
- Clicking "light" changes `body.style.background` to `#ffffff` but all text, cards, and borders remain dark-theme values
- **Fix:** Either implement a proper light theme (define light variants for all CSS variables) or remove the theme toggle entirely until one exists. A broken toggle is worse than no toggle.

### 4. PT navigation links use English paths that don't match actual file names
**Files:** `_layouts/page.html:23-26` (PT nav assignments)
- The page layout assigns PT nav URLs as `/pt/how-it-works`, `/pt/observations`, `/pt/contribute`, `/pt/about`
- But the actual PT files are named `como-funciona.md`, `observacoes.md`, `contribuir.md`, `sobre.md`
- The EN index uses `/pt/como-funciona` (correct), but the page layout nav uses `/pt/how-it-works` (incorrect)
- This means the navigation bar on PT pages links to 404s
- **Fix:** Update `_layouts/page.html` lines 23-26 to use the correct PT URL paths: `/pt/como-funciona`, `/pt/observacoes`, `/pt/contribuir`, `/pt/sobre`

### 5. OG image is broken — social previews show no image
**Files:** `_includes/head-custom.html:6`, GitHub issue #7
- `og:image` points to `/assets/og-image.png` but the actual file is `og-image.svg`
- This means Twitter/Facebook/Slack link previews show no image
- **Fix:** Either convert the SVG to a 1200×630 PNG or update the meta tag to reference the SVG (note: some platforms don't support SVG OG images, so PNG is safer)

---

## MEDIUM PRIORITY

### 6. "How It Works" page reads like documentation, not public communication
**Files:** `en/how-it-works.md:1-100`, `pt/how-it-works.md:1-100`
- Uses technical terms: "observation lifecycle", "verification statuses", "root cause", "relations"
- The table of statuses (Draft → Confirmed → Analyzed → Proposed) is developer-centric
- A journalist or civil servant would struggle to understand what to do with this
- **Fix:** Rewrite in plain language. Replace "observation lifecycle" with "How an observation becomes knowledge". Replace the status table with simple descriptions. Add a concrete, step-by-step walkthrough with a real-world scenario.

### 7. About page is too long and repetitive
**Files:** `en/about.md:1-64`, `pt/about.md:1-64`
- Covers "Why it exists", "What it solves", "Why neutrality", "Why evidence", "Why long-term", "Who can use it", "License"
- Much of this repeats content already on the landing page
- The "License" section (MIT) makes it feel like a software project
- **Fix:** Trim to 2-3 short paragraphs max. Move detailed rationale to a separate "Methodology" or "FAQ" page. Remove or de-emphasize the MIT license from the public-facing page (keep it in the footer).

### 8. No clear way to browse observations by category/area
**Files:** `en/observations.md:14-86`
- All observations are in a flat grid with no filtering
- As the dataset grows, this will become unusable
- **Fix:** Even without a database, add a simple tag-based filter or at minimum group observations by area (Healthcare, Education, Digital Services, etc.)

### 9. Missing "Methodology" or "How we verify" page
- The site claims "evidence-based" and "neutral" but doesn't explain the verification process
- A journalist or researcher would want to know: Who verifies? What counts as evidence? How are disputes resolved?
- **Fix:** Add a short methodology page explaining the verification process, what counts as acceptable evidence, and how neutrality is maintained.

### 10. 404 page has no language awareness
**Files:** `404.md:1-19`
- The 404 page always shows the same content regardless of language
- It links only to `/` (PT homepage), with no link to `/en/`
- **Fix:** Either detect the user's language preference or provide both PT and EN homepage links.

### 11. No last-modified date shown on content pages
**Files:** `_includes/last-modified.html:1-3`
- The include exists but is never called from `_layouts/page.html`
- For a site that wants to be trusted as an institution, showing "last updated" dates builds credibility
- **Fix:** Add `{% include last-modified.html %}` to the page layout, near the title or at the bottom of the content.

### 12. Mobile hamburger menu has no JavaScript
**Files:** `_sass/custom/custom.scss:622-670` (mobile nav styles exist), `_layouts/page.html` (no hamburger JS)
- The SCSS defines `.os-nav-toggle` and `.os-nav-mobile` styles
- The page layout includes no JavaScript to toggle the mobile menu
- On mobile, the nav is hidden (`display: none` at line 816) with no way to open it
- **Fix:** Add a small JS snippet to toggle the `.open` class on `.os-nav-mobile` when the hamburger button is clicked.

---

## LOW PRIORITY

### 13. Inconsistent terminology between PT and EN
**Files:** Various
- PT uses "utente" (healthcare-specific) in some places and "cidadão" in others
- EN uses "patient" in healthcare context but "citizen" elsewhere — this is fine but could be more consistent
- **Fix:** Standardize: use "citizen" / "cidadão" as the default, reserve "patient" / "utente" only for healthcare-specific contexts.

### 14. No FAQ section
- Common questions are answered across different pages but not collected
- Expected questions: "Who runs this?", "Is this affiliated with the government?", "Can I use this data?", "How is this different from a complaint?"
- **Fix:** Add a concise FAQ page or accordion section on the About page.

### 15. Footer is minimal
**Files:** `_layouts/page.html:61-80`
- Only has: OpenState name, mission statement, GitHub link, MIT license, email
- Missing: link to methodology, link to GitHub discussions (if enabled), accessibility statement
- **Fix:** Add a few more useful links. Consider adding a "Status" indicator (e.g., "All systems operational" or "X observations documented").

### 16. No search functionality
- The site uses Just the Docs theme which has search built in, but `search_exclude: true` is set on key pages
- The landing page and language redirect pages exclude themselves from search
- **Fix:** Enable search on content pages. At minimum, the Observations page should be searchable.

### 17. Hardcoded GitHub URL in multiple places
**Files:** `en/contribute.md:62`, `pt/contribute.md:62`, `en/index.md:222`, `pt/index.md:222`, `_layouts/page.html:69`
- The GitHub repo URL appears in 5+ places
- If the repo moves or the project structure changes, these all need updating
- **Fix:** Use a Jekyll variable for the GitHub URL (e.g., `site.github.repository_url` or a custom `_config.yml` variable)

### 18. No accessibility landmarks
**Files:** `_layouts/default.html:1-13`, `_layouts/page.html`
- No `<main>`, `<nav>`, `<header>`, `<footer>` semantic elements
- Screen readers will have difficulty navigating
- **Fix:** Add ARIA roles and semantic HTML elements. At minimum: `<nav>` for the header nav, `<main>` for content, `<footer>` for footer.

### 19. `last-modified.html` date format is EN-only
**Files:** `_includes/last-modified.html:2`
- Uses `"%B %d, %Y"` which produces English month names
- PT pages will show English dates
- **Fix:** Use a localized date format or a numeric format (e.g., `"%d/%m/%Y"`) that works for both languages.

---

## POSITIVE OBSERVATIONS

- **Strong institutional tone** — the writing is calm, factual, and avoids hype
- **Good narrative arc** on landing page: problem → why it matters → how it works → principles → examples → contribute
- **Bilingual support** is well-implemented with proper language toggle
- **Dark theme design** is clean, professional, and appropriate for the subject matter
- **Principles section** (Neutrality, Evidence, Transparency, Structure, Open Knowledge, Long-term) is excellent
- **No tracking, no cookies, no analytics** — appropriate for a neutral public institution
- **MIT license** is the right choice for public knowledge
- **Responsive design** is well-implemented in the CSS (when the mobile menu JS is added)

---

## RECOMMENDED NEXT STEPS (in order)

1. Fix PT navigation links (issue #4) — this is a broken link, highest urgency
2. Implement light theme or remove toggle (issue #3) — broken functionality
3. Fix OG image (issue #5) — affects all social sharing
4. Add web-based contribution form (issue #1) — core to the mission
5. Label or remove fake observations (issue #2) — credibility
6. Add mobile menu JS (issue #12) — mobile UX
7. Rewrite How It Works in plain language (issue #6)
8. Add methodology page (issue #9)
9. Trim About page (issue #7)
10. Add FAQ (issue #14)
