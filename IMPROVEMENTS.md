# OpenState — UX & Content Review

**Date:** 2026-06-13
**Reviewer:** OWL (automated)
**Scope:** All public pages (PT and EN), source files in `/root/openstate/docs/`, GitHub issues
**Previous review:** Earlier today — this update confirms all prior issues remain unresolved and adds new findings

---

## Summary

OpenState has a strong foundation: clear purpose, clean visual design, and good bilingual support. The site looks institutional and calm. However, it still reads like a software project rather than a public institution. All issues from the earlier review today remain open. Below is a consolidated, deduplicated list with updated findings.

---

## HIGH Priority

### 1. Broken OG image — social previews are broken
- **File:** `_includes/head-custom.html`, lines 8 and 15
- **Issue:** References `/assets/og-image.png` but the actual file is `/assets/og-image.svg`. When someone shares the site on Twitter, LinkedIn, or Slack, no image preview appears.
- **GitHub issue:** #7 (open, good first fix)
- **Fix:** Convert the SVG to a 1200×630 PNG and save as `docs/assets/og-image.png`, or update both meta tags to point to `.svg`.

### 2. No Code of Conduct or PR template
- **GitHub issues:** #9 and #8 (both open, good first fix)
- **Issue:** The repo lacks `CODE_OF_CONDUCT.md` and `.github/PULL_REQUEST_TEMPLATE.md`. For a project that wants to be a "public institution," this signals immaturity.
- **Fix:** Add Contributor Covenant v2.1 CoC and a simple PR template. These are 15-minute tasks with outsized credibility impact.

### 3. Landing page hero doesn't communicate purpose in <10 seconds
- **File:** `index.md` line 59, `en/index.md` line 59
- **Issue:** The hero title "Understand how public services behave in reality" is abstract. A student, journalist, or civil servant landing here for the first time doesn't immediately grasp *what this is* or *what to do*.
- **Fix:** Add a concrete one-liner above the title:
  - EN: "A public record of how government services actually work — documented with evidence."
  - PT: "Um registo público de como os serviços públicos funcionam na realidade — documentado com evidência."
  - Shorten the subtitle to one sentence.

### 4. Observation cards lack evidence links
- **File:** `en/observations.md` lines 16–59, `pt/observations.md` lines 16–59
- **Issue:** Cards describe problems with statistics ("8 months", "15% give up") but never link to the actual sources. The CSS for `.os-example-evidence` already exists in `custom.scss` lines 446–457 but is never used on the observations page.
- **Fix:** Add an evidence footer to each card. Even a simple "Sources: ERS Report 2024, Público, SIGIC" would transform credibility.

### 5. "Real observations" section on landing page uses illustrative data presented as real
- **File:** `en/index.md` lines 127–152, `pt/index.md` lines 127–152
- **Issue:** The three example cards are presented as "Real observations" but are illustrative examples with no links to full observation pages. This is misleading.
- **Fix:** Either link each card to a full observation page with evidence, or relabel the section "Examples of what OpenState documents."

### 6. Language toggle breaks between landing and secondary pages
- **File:** `_layouts/page.html` lines 45–47
- **Issue:** The language toggle uses `replace: '/en/', '/pt/'` which works for secondary pages but creates a broken experience between landing pages (at `/` and `/en/`) and secondary pages (at `/pt/` and `/en/`). A user on the EN landing page (`/en/`) clicking PT goes to `/` (correct), but a user on the PT "How it works" page (`/pt/how-it-works`) clicking EN goes to `/en/how-it-works` (correct). The inconsistency is that PT content lives at both `/` (landing) and `/pt/` (secondary), creating two separate navigation flows.
- **Fix:** Consider making the PT landing also available at `/pt/` with a redirect from `/` to `/pt/`, so the language toggle works uniformly across all pages.

---

## MEDIUM Priority

### 7. `lang` attribute hardcoded to `pt` on all pages
- **File:** `_layouts/default.html` line 2
- **Issue:** `<html lang="pt">` is hardcoded. English pages still declare `lang="pt"`, which is an accessibility and SEO problem — screen readers will mispronounce English content.
- **Fix:** Use `<html lang="{% if page.url contains '/en/' %}en{% else %}pt{% endif %}">` or add a `lang` field to frontmatter.

### 8. No observation detail pages — cards are dead ends
- **File:** `en/observations.md`, `pt/observations.md`
- **Issue:** Each observation card has no "Read more" link or detail page. The full example at the bottom of `how-it-works` shows what a complete observation looks like (steps, evidence, root cause, relations) but this format doesn't exist as a standalone page.
- **Fix:** Create individual observation pages so cards can link to the full documented observation.

### 9. Contribute page sends users to GitHub — high friction for non-technical users
- **File:** `en/contribute.md` line 62, `pt/contribute.md` line 62
- **Issue:** The primary CTA sends users to GitHub to submit an issue. This excludes the stated audience of "citizens, journalists, civil servants" who may not have GitHub accounts.
- **Fix:** Add a simple web form as an alternative submission path. At minimum, explain *why* GitHub is used and what happens after submission.

### 10. Theme toggle icon invisible on first visit
- **File:** `_sass/custom/custom.scss` line 548, `index.md` lines 27–31
- **Issue:** `.os-theme-icon { display: none; }` hides all icons. The `setTheme()` function runs on page load and sets the correct icon via JS, but if JS fails or is slow, the button appears empty. There's no CSS-only fallback.
- **Fix:** Add a default visible icon in the HTML (e.g., always show the system icon by default with `style="display: inline"` on the system icon span), or add a `<noscript>` fallback.

### 11. No "skip to content" link for accessibility
- **File:** `_layouts/page.html`, `_layouts/default.html`
- **Issue:** Keyboard and screen reader users must navigate through the sticky header on every page. No skip link exists.
- **Fix:** Add a visually-hidden `<a href="#main-content" class="skip-link">Skip to main content</a>` as the first focusable element.

### 12. 404 page homepage link always goes to PT
- **File:** `404.md` line 17
- **Issue:** The "Go to homepage" button links to `/` (PT). An EN user hitting a broken link gets sent to PT.
- **Fix:** Either detect language for the homepage link, or show both `/` and `/en/` with bilingual labels.

### 13. About page language is too abstract
- **File:** `en/about.md` lines 10–18, `pt/about.md` lines 10–18
- **Issue:** Opens with generic statements. The "Why neutrality" and "Why evidence" sections read like a manifesto. A 16-year-old or busy civil servant will skim and retain nothing.
- **Fix:** Lead with concrete examples, then explain principles. Use shorter sentences. Replace "OpenState does not take sides. It does not propose solutions." with "OpenState documents what happens. It does not advocate for parties, policies, or solutions."

---

## LOW Priority

### 14. Footer mission text is italic — hard to read
- **File:** `_sass/custom/custom.scss` lines 256–259
- **Issue:** `.os-footer-mission` uses `font-style: italic` at 13px with `--os-dim` color (low contrast).
- **Fix:** Remove italic, increase to `--os-muted` color, or increase font-size to 14px.

### 15. `last-modified.html` include exists but is never used
- **File:** `_includes/last-modified.html` — never included by any layout
- **Issue:** For a "decades-long project," showing when content was last updated builds trust.
- **Fix:** Add `{% include last-modified.html %}` to `page.html` layout and add `last_modified_at` to page frontmatter.

### 16. Principles section — 6 cards can look unbalanced on medium screens
- **File:** `en/index.md` lines 112–124, `custom.scss` line 178
- **Issue:** `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` with 6 cards can produce uneven layouts on medium screens.
- **Fix:** Use a 2-column grid for principles or explicitly set `repeat(3, 1fr)` for desktop.

### 17. No search functionality
- **File:** `_config.yml` — uses `jekyll-theme-primer` with no built-in search
- **Issue:** All Just the Docs chrome is hidden on landing pages. As observations grow, users will need to find specific topics.
- **Fix:** Add a simple client-side search (e.g., lunr.js) or integrate Just the Docs' built-in search.

### 18. GitHub link in footer opens in new tab without `rel="noopener"`
- **File:** `_layouts/page.html` line 89
- **Issue:** `target="_blank"` without `rel="noopener noreferrer"` is a minor security concern.
- **Fix:** Add `rel="noopener noreferrer"` to all external links.

### 19. No `sitemap.xml` or `robots.txt`
- **Issue:** No sitemap for search engines. For a long-term public institution, basic SEO matters.
- **Fix:** Add `jekyll-sitemap` gem to `_config.yml` and create a `robots.txt`.

### 20. No `data-theme="system"` CSS block
- **File:** `_sass/custom/custom.scss` — only `[data-theme="dark"]` and `[data-theme="light"]` are defined
- **Issue:** When JS sets `data-theme="system"`, no explicit CSS block matches. The `:root` block (dark) applies by default, which works, but the `system` concept isn't properly handled — users on light-mode OS will still see dark theme.
- **Fix:** Add a `[data-theme="system"]` block with `prefers-color-scheme` media queries, or default to `dark` explicitly in JS.

---

## What's Working Well

- **Visual design is excellent.** Dark theme, typography, and spacing feel institutional and calm. No shadows, subtle borders — the right aesthetic.
- **Bilingual PT/EN is well-implemented.** Language toggle works, content is fully translated, URL structure (`/en/`, `/pt/`) is clean.
- **The 5-step chain visualization** (isolated → documented → connected → patterns → knowledge) is the strongest explanatory element.
- **"We do not promise to fix anything. We promise to document what happens."** — this line is perfect. More of this direct, honest tone would help.
- **Status system** (Draft → Confirmed → Analyzed → Proposed) is clear and well-explained.
- **GitHub issue templates** are well-structured with bilingual instructions and clear validation rules.
- **Auto-translation workflow** is a clever solution for bilingual content.

---

## GitHub Issues Summary

| # | Title | State | Labels |
|---|-------|-------|--------|
| 9 | Add a Code of Conduct | open | documentation, low, good-first-issue |
| 8 | Add a Pull Request template | open | documentation, low, good-first-issue |
| 7 | Fix broken OG image reference | open | documentation, low, good-first-issue |
| 6 | [Teste Final] Verificação tradução | closed | draft |
| 5 | [Teste] Tradução automática | closed | draft |
| 4 | [Teste 2] Tradução PT issue | closed | draft |
| 3 | [Teste] Workflow tradução | closed | draft |
| 2 | [Exemplo] Inconsistência dados | open | (no labels) |
| 1 | [Exemplo] Tempo espera SNS | open | (no labels) |

Issues #1 and #2 are example observations (test data). Issues #3–6 are closed translation workflow tests. Issues #7–9 are the actionable improvements.

---

## Recommended Next Steps (Priority Order)

1. Fix OG image path — create PNG or update meta tags (5 min)
2. Add Code of Conduct (15 min)
3. Add PR template (15 min)
4. Fix `lang` attribute on `default.html` (10 min)
5. Add evidence links to observation cards (1 hour)
6. Add concrete tagline to hero section (30 min)
7. Fix theme toggle default icon visibility (15 min)
8. Add skip-to-content link (15 min)
9. Create observation detail pages (2–4 hours)
10. Reduce abstraction in About page copy (1 hour)
