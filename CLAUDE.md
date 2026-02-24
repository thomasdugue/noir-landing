# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for **HEAN** — a lossless audio player for macOS built in Rust. Currently in beta recruitment mode (50 founding member spots).

## Tech Stack

- **Single-file React app** — all JSX, CSS, and logic live in `index.html`
- React 18 + Babel standalone loaded via CDN (no build step)
- Supabase JS SDK for email signup backend
- Deployed via GitHub Actions to GitHub Pages

## Running Locally

```bash
# No build step needed. Serve statically:
python3 -m http.server 8000
# or
npx live-server .
```

## Architecture

- `index.html` — the active landing page (single-file React app with inline styles)
- `NoirLanding.jsx` — React component archive (for Claude artifact previews)
- `v1-archive.html` — archived V1 promotional page
- `faq.html` — FAQ page
- `DECISIONS.md` — design decisions and rationale

### Design System (V2 Beta)

- Pure black (#000) and white, no color accents
- All-monospace: Geist Mono (primary), Space Mono (fallback)
- Font-weight 200 for display, 300 for body, 400 for labels
- Labels: 9-10px, letter-spacing 3px, uppercase
- Animations: 60fps canvas particles, IntersectionObserver scroll reveals, CSS keyframe pulses

### Code Structure in index.html

All code is in a single `<script type="text/babel">` block:
1. Supabase config (email signup backend)
2. Custom hooks: `useFonts()`, `useReveal()`, `useSpotsCount()`
3. Canvas animation: `BitFieldCanvas` (220 particles, bits-to-signal metaphor)
4. React components in render order: Nav → Hero → UrgencyBanner → AppMockup → About → Features → Specs → Signal → Compare → Roadmap → Quote → BetaCTA → Footer
5. CSS string constant injected via `<style>{css}</style>`

### Supabase Integration

- Table `subscribers` with email + timestamp
- Public anon key (safe to expose) — RLS allows anonymous inserts only
- `useSpotsCount()` hook queries subscriber count for the progress bar
