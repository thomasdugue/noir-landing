# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for **HEAN** — a lossless audio player for macOS built in Rust. Currently in beta recruitment mode (50 beta tester spots). Pricing strategy: €39 early adopter price, increasing to €49 after ~500 licenses. Beta testers get the app for free in exchange for feedback.

## Tech Stack

- **Single-file React app** — all JSX, CSS, and logic live in `index.html`
- React 18 + Babel standalone loaded via CDN (no build step, no bundler)
- Supabase JS SDK for email signup backend
- Deployed via GitHub Actions to GitHub Pages

## Running Locally

```bash
# No build step, no tests, no linter. Serve statically:
python3 -m http.server 8000
# or
npx live-server .
```

There is no build, lint, or test command. Verify changes by opening in a browser.

## Architecture

### Files

- `index.html` — the active landing page (single-file React app with inline styles)
- `faq.html` — FAQ page (standalone HTML)
- `updates.html` — Updates page (standalone HTML)
- `app-screenshot.png` — screenshot used by 3D scroll mockup
- `NoirLanding.jsx` — React component archive (for Claude artifact previews)
- `v1-archive.html` — archived V1 promotional page
- `DECISIONS.md` — design decisions and rationale (note: some file references are stale, `index.html` is the active page)
- `robots.txt` / `sitemap.xml` — SEO files
- `.github/workflows/deploy.yml` — GitHub Pages deploy on push to main/master

### Code Structure in index.html

All code is in a single `<script type="text/babel">` block. Order matters:

1. **Supabase config** — client init, UTM tracking
2. **Custom hooks** — `useFonts()`, `useReveal()` (IntersectionObserver), `useScrollProgress()` (scroll-driven transforms), `lerp()` (value interpolation)
3. **Canvas animation** — `BitFieldCanvas` (220 particles desktop / 90 mobile, bits-to-signal metaphor)
4. **UI utilities** — `Logo`, `TextScramble`, `TypedText`, feature icon SVGs
5. **Section components** in render order: Nav → Hero → UrgencyBanner → AppMockup → About → Features → Specs → Signal → Compare → Roadmap → FeatureRequestPopover → Quote → BetaCTA → Footer
6. **CSS string constant** (`const css`) injected via `<style>{css}</style>` — all styles are here, not in a separate file

### Animation Architecture

Three distinct animation systems coexist:

| System | Used by | Mechanism |
|--------|---------|-----------|
| CSS keyframes | Hero fade-ins, blinking dots, button pulse, shine effects | `animation` property with delays |
| IntersectionObserver | About, Features, Specs, Signal, Compare, Roadmap, Quote, BetaCTA | `useReveal()` hook — one-shot reveal on scroll into view |
| Scroll-driven transforms | AppMockup (3D perspective card) | `useScrollProgress()` + `lerp()` — continuous transform updates via scroll position and `requestAnimationFrame` |

### Design System

- Pure black (#000) and white, no color accents
- All-monospace: Geist Mono (primary), Space Mono (fallback)
- Font-weight 200 for display, 300 for body, 400 for labels
- Labels: 9-10px, letter-spacing 3px, uppercase

### Supabase Integration

- Table `subscribers` with email + timestamp + UTM columns (source, medium, campaign)
- Public anon key (safe to expose) — RLS allows anonymous inserts only
- `useSpotsCount()` hook queries subscriber count for the progress bar

### Mobile Considerations

- All `@media(max-width:768px)` breakpoints are co-located with their desktop rules in the CSS string
- iOS zoom prevention: email input uses `font-size:16px` on mobile
- Safe area insets via `env(safe-area-inset-*)` on body and footer
- Canvas particles reduced from 220 → 90 on mobile for performance
- Touch targets: minimum 44px height on interactive elements
- Scroll mockup container height: 80rem desktop / 36rem mobile
