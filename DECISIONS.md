# Noir Landing Page — Design Decisions

## Architecture

- **Single-file approach**: Everything (JSX, CSS, logic) lives in one HTML file (`v2-beta.html`) with React 18 + Babel CDN. No build step, opens directly in any browser.
- **No external assets**: All icons are inline SVG. No images — the app screenshot is a pure CSS/HTML mockup. Fonts loaded via Google Fonts CDN.
- **No localStorage**: Sandbox-safe (works in Claude artifact viewer).

## Design Direction

### V1 (index.html) — Promotional
- Dark luxury aesthetic with teal accent (`#4a9`)
- Instrument Serif + Outfit + IBM Plex Mono
- 9 sections, pricing table, full color
- Purpose: sell the app at €35

### V2 (v2-beta.html) — Beta Recruitment ← Current
- **Pure black & white**, no color accents
- **Geist Mono + Space Mono** — thin monospace tech aesthetic
- Purpose: recruit beta testers, create urgency
- Brutalist minimal, award-site inspiration

## V2 Design System

| Token | Value |
|-------|-------|
| Background | `#000` |
| Elevated surfaces | `#0a0a0a`, `#0d0d0d`, `#111`, `#151515` |
| Text primary | `#fff` |
| Text secondary | `#777` (bumped from `#555` for readability) |
| Text muted | `#555`, `#444` |
| Labels | `#666` |
| Borders | `#111`, `#151515`, `#222`, `#333` |
| Font display | Geist Mono 200, clamp(42px, 9vw, 96px) |
| Font body | Geist Mono 300, 13-14px |
| Font labels | Geist Mono 400, 9-10px, letter-spacing 3px, uppercase |

## Key Design Decisions

### 1. Title: "Hear everything / Alter nothing"
- Two lines, no punctuation — reads like a statement, not a sentence
- Line 1 in white, line 2 in `#555` — creates visual hierarchy
- Font-weight 200 for dramatic thinness at large sizes

### 2. Bits-to-signal canvas animation
- 220 particles in 3 phases: chaotic → funnel convergence → organized sine wave
- Metaphor: digital bits being transformed into clean analog signal
- Mouse-interactive (repulsion in chaotic zone)
- Runs at 60fps via `requestAnimationFrame`

### 3. App mockup (CSS-only)
- Full recreation of Noir Desktop UI: titlebar, sidebar, album grid, player bar
- Monochrome to match B&W aesthetic (no teal accent)
- Placed below urgency banner, above About section
- Responsive: sidebar collapses horizontally on mobile

### 4. Feature icons
- 4 inline SVG icons: waveform (bit-perfect), bolt (Rust/performance), grid (library), globe (compatibility)
- Monochrome white, stroke-only, 26px
- Opacity 0.6 → 1.0 on hover for subtle interaction

### 5. Urgency / Event-driven messaging
- Urgency banner: "BETA SLOTS LIMITED — LAUNCHING Q1 2026" with pulsing dot
- Hero countdown strip: 100 SPOTS / Q1 LAUNCH / €0 FOR TESTERS
- CTA button has subtle pulsing glow animation (`box-shadow` keyframes)
- Typed text effect: "BETA PROGRAM — NOW OPEN"
- Beta CTA section: "ACCEPTING TESTERS NOW" badge with blinking dot
- Language throughout emphasizes scarcity ("100 audiophiles", "shape the final release")

### 6. Readability improvements (from V2 initial)
- Body text color: `#555` → `#777` across all sections
- Feature body font-size: `12px` → `13px`
- About subtitle: `13px` → `14px`
- Hero paragraph: `13px` → `14-16px` (clamp)
- Beta CTA paragraph: `13px` → `14px`
- Labels: `#333` → `#444`/`#555`/`#666` depending on hierarchy

### 7. Comparison table
- 3-column: Noir (highlighted) vs Audirvāna vs Roon
- 8 criteria: price, bit-perfect, DSD, account, internet, memory, open source, subscription
- Noir column has white top border + subtle background tint
- Note: "Beta testers receive the final release for free"

## Typography Rationale

- **Geist Mono** (primary): Created by Vercel, designed for code/tech interfaces. Thin weights (200) create dramatic display type. Monospace alignment creates grid-like visual rhythm.
- **Space Mono** (fallback): Google Font, similar geometric monospace feel.
- All-monospace typography reinforces the "built by engineers, for engineers" positioning.

## Animation Strategy

| Element | Trigger | Effect |
|---------|---------|--------|
| Nav | Scroll > 50px | Transparent → solid black + blur |
| Hero tag | Page load | Typed text character-by-character |
| Hero title | Page load (0.5s/0.7s delay) | Slide up + fade in |
| Hero countdown | Page load (1.1s) | Fade in |
| Hero CTA | Page load (1.3s) | Fade in + pulse glow |
| Canvas particles | Always | 60fps requestAnimationFrame |
| All sections | Scroll (IntersectionObserver) | Translate Y + fade in |
| Feature icons | Hover | Opacity 0.6 → 1.0 |
| Signal path steps | Scroll + stagger | Sequential reveal |
| Stats | Scroll | Fade in with stagger |
| CTA button | Hover | Background lighten + translateY(-1px) |
| Blinking dots | Always | Opacity pulse (CSS keyframes) |

## Responsive Breakpoints

| Breakpoint | Key changes |
|------------|-------------|
| Desktop (>768px) | 2-col features, 4-col specs, horizontal signal path |
| Mobile (≤768px) | 1-col everything, hamburger nav, stacked CTAs, vertical signal path, horizontal scroll sidebar in mockup |

## Files

| File | Purpose | Status |
|------|---------|--------|
| `v2-beta.html` | V2 beta recruitment landing page | **Active** |
| `index.html` | V1 promotional landing page | Archive |
| `NoirLanding.jsx` | V1 React artifact (Claude preview) | Archive |
| `DECISIONS.md` | This file | Current |

## Git History

All pushed to `thomasdugue/noir-landing` on `main` branch.
