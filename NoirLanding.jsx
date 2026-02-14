import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────
// NOIR DESKTOP — Landing Page
// Single-file React artifact
// ─────────────────────────────────────────────

// ═══════════════════════════════════════════════
// FONT LOADER
// ═══════════════════════════════════════════════
function useFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
}

// ═══════════════════════════════════════════════
// INTERSECTION OBSERVER HOOK
// ═══════════════════════════════════════════════
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

// ═══════════════════════════════════════════════
// COUNT-UP HOOK
// ═══════════════════════════════════════════════
function useCountUp(end, visible, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [visible, end, duration]);
  return val;
}

// ═══════════════════════════════════════════════
// SVG LOGO COMPONENT
// ═══════════════════════════════════════════════
function Logo({ size = 32, color = "#fff" }) {
  const h = size * 0.8;
  return (
    <svg width={size} height={h} viewBox="0 0 100 80" fill={color}>
      <ellipse cx="12" cy="40" rx="8" ry="8" />
      <rect x="24" y="18" width="14" height="44" rx="7" />
      <rect x="43" y="4" width="14" height="72" rx="7" />
      <rect x="62" y="18" width="14" height="44" rx="7" />
      <ellipse cx="88" cy="40" rx="8" ry="8" />
      <ellipse cx="31" cy="40" rx="4" ry="5.5" fill="#000" />
      <ellipse cx="50" cy="40" rx="4" ry="5.5" fill="#000" />
      <ellipse cx="69" cy="40" rx="4" ry="5.5" fill="#000" />
    </svg>
  );
}

// ═══════════════════════════════════════════════
// FEATURE ICONS (inline SVGs)
// ═══════════════════════════════════════════════
function IconBitPerfect() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a9" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 12h2l3-8 4 16 4-12 3 6h4" />
    </svg>
  );
}
function IconLightweight() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a9" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2l.642 2.997A3.042 3.042 0 0014.997 7.36L18 8l-2.997.642a3.042 3.042 0 00-2.355 2.355L12 14l-.642-2.997A3.042 3.042 0 009.003 8.64L6 8l2.997-.642A3.042 3.042 0 0011.358 5L12 2z" />
      <path d="M5 18l.32 1.5a1.52 1.52 0 001.18 1.18L8 21l-1.5.32a1.52 1.52 0 00-1.18 1.18L5 24l-.32-1.5a1.52 1.52 0 00-1.18-1.18L2 21l1.5-.32a1.52 1.52 0 001.18-1.18L5 18z" />
    </svg>
  );
}
function IconLibrary() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a9" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconUniversal() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a9" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  return (
    <nav className={`noir-nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Logo size={28} color="#4a9" />
          <span className="nav-brand-text">NOIR</span>
        </div>
        <div className={`nav-links${mobileOpen ? " open" : ""}`}>
          <a onClick={() => scrollTo("features")}>Features</a>
          <a onClick={() => scrollTo("signal")}>How It Works</a>
          <a onClick={() => scrollTo("pricing")}>Pricing</a>
          <a className="nav-cta" onClick={() => scrollTo("download")}>
            Download
          </a>
        </div>
        <button
          className={`hamburger${mobileOpen ? " active" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════
function Hero() {
  const formats = ["FLAC", "ALAC", "DSD", "WAV", "AIFF", "PCM 24-BIT", "UP TO 192KHZ"];

  return (
    <section className="hero" id="hero">
      {/* Sine wave background */}
      <svg className="hero-waves" viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path
          className="wave w1"
          d="M0,100 Q150,40 300,100 T600,100 T900,100 T1200,100"
        />
        <path
          className="wave w2"
          d="M0,100 Q150,160 300,100 T600,100 T900,100 T1200,100"
        />
        <path
          className="wave w3"
          d="M0,100 Q100,60 200,140 T400,60 T600,140 T800,60 T1000,140 T1200,100"
        />
      </svg>

      <div className="hero-grain" />

      <div className="hero-content">
        <h1 className="hero-title">
          Hear everything.<br />
          <em>Alter nothing.</em>
        </h1>
        <p className="hero-sub">
          Bit-perfect audio playback for macOS. Your local files, delivered to
          your DAC without a single bit altered.
        </p>
        <div className="hero-ctas" id="download">
          <a className="btn btn-primary" href="#pricing">Buy Now — €35</a>
          <a className="btn btn-outline" href="#pricing">Try 30 Days Free</a>
        </div>
        <div className="hero-formats">
          {formats.map((f, i) => (
            <span key={f} className="format-badge" style={{ animationDelay: `${0.6 + i * 0.08}s` }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-scroll-hint">
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="#666" strokeWidth="1.5">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <line x1="8" y1="6" x2="8" y2="10" className="scroll-dot" />
        </svg>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// FEATURES
// ═══════════════════════════════════════════════
const featureData = [
  {
    icon: <IconBitPerfect />,
    title: "Bit-Perfect Playback",
    desc: "CoreAudio Integer Mode bypasses the OS mixer entirely. Your audio reaches your DAC exactly as the artist intended — zero resampling, zero alteration.",
  },
  {
    icon: <IconLightweight />,
    title: "Lightweight & Fast",
    desc: "Under 80 MB of RAM. Instant cold start. No Electron, no bloat. Built with Rust and native macOS APIs for performance that disappears.",
  },
  {
    icon: <IconLibrary />,
    title: "Your Library, Organized",
    desc: "Smart browsing by artist, album, genre, or folder. Auto-completed metadata. Playlist creation. Everything searchable, nothing hidden.",
  },
  {
    icon: <IconUniversal />,
    title: "Universal Compatibility",
    desc: "Native on Intel and Apple Silicon. Supports every major lossless format. Works with any USB DAC, AirPlay receiver, or built-in output.",
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="section-label">Features</div>
      <div className="features-grid">
        {featureData.map((f, i) => (
          <FeatureCard key={i} {...f} delay={i * 0.12} />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`feature-card${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════
// QUOTE
// ═══════════════════════════════════════════════
function Quote() {
  const [ref, visible] = useReveal();
  return (
    <section className="quote-section" ref={ref}>
      <div className="quote-grain" />
      <div className="quote-line" />
      <blockquote className={`quote${visible ? " visible" : ""}`}>
        Your files. Your DAC. <em>Your rules.</em>
      </blockquote>
      <div className="quote-line" />
    </section>
  );
}

// ═══════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════
function Stats() {
  const [ref, visible] = useReveal();
  const ram = useCountUp(80, visible, 1000);
  const bits = useCountUp(0, visible, 800);
  const res = visible;

  return (
    <section className="stats" ref={ref}>
      <div className="stats-grid">
        <div className={`stat${visible ? " visible" : ""}`} style={{ transitionDelay: "0s" }}>
          <span className="stat-num">&lt;{ram}<span className="stat-unit">MB</span></span>
          <span className="stat-label">Memory Footprint</span>
        </div>
        <div className="stat-sep" />
        <div className={`stat${visible ? " visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
          <span className="stat-num">{bits}</span>
          <span className="stat-label">Bits Altered</span>
        </div>
        <div className="stat-sep" />
        <div className={`stat${visible ? " visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
          <span className="stat-num">{res ? "24" : "0"}<span className="stat-unit">/</span>{res ? "192" : "0"}</span>
          <span className="stat-label">Max Resolution</span>
        </div>
        <div className="stat-sep" />
        <div className={`stat${visible ? " visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
          <span className="stat-num">∞</span>
          <span className="stat-label">DACs Supported</span>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// SIGNAL PATH
// ═══════════════════════════════════════════════
const signalSteps = [
  { label: "Source", sub: "FLAC / DSD / ALAC", icon: "📁" },
  { label: "Decode", sub: "Symphonia engine", icon: "⚙" },
  { label: "Route", sub: "CoreAudio Integer", icon: "🔀" },
  { label: "Output", sub: "Bit-perfect DAC", icon: "🎧" },
];

function SignalPath() {
  const [ref, visible] = useReveal();
  return (
    <section className="signal" id="signal" ref={ref}>
      <div className="section-label">Signal Path</div>
      <div className="signal-pipeline">
        {signalSteps.map((s, i) => (
          <div key={i} className="signal-step-wrap">
            <div
              className={`signal-step${visible ? " visible" : ""}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <span className="signal-icon">{s.icon}</span>
              <span className="signal-label">{s.label}</span>
              <span className="signal-sub">{s.sub}</span>
            </div>
            {i < signalSteps.length - 1 && (
              <div className={`signal-connector${visible ? " visible" : ""}`} style={{ transitionDelay: `${i * 0.15 + 0.1}s` }}>
                <svg width="40" height="2" viewBox="0 0 40 2" className="connector-line">
                  <line x1="0" y1="1" x2="40" y2="1" stroke="#4a9" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                <div className="connector-dot" style={{ animationDelay: `${i * 0.3}s` }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={`signal-integrity${visible ? " visible" : ""}`}>
        <span className="integrity-dot" />
        Signal integrity: <strong>100%</strong>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// PRICING TABLE
// ═══════════════════════════════════════════════
const pricingRows = [
  { label: "Pricing model", noir: "One-time €35", aud: "€109/year", roon: "€155/year" },
  { label: "Bit-perfect playback", noir: true, aud: true, roon: true },
  { label: "DSD support", noir: true, aud: true, roon: true },
  { label: "Account required", noir: false, aud: true, roon: true },
  { label: "Internet required", noir: false, aud: "Activation", roon: "Always" },
  { label: "Lightweight (<100 MB)", noir: true, aud: false, roon: false },
  { label: "Open formats only", noir: true, aud: "Partial", roon: "Partial" },
];

function CellValue({ v }) {
  if (v === true) return <span className="check yes">✓</span>;
  if (v === false) return <span className="check no">✕</span>;
  return <span className="check text">{v}</span>;
}

function Pricing() {
  const [ref, visible] = useReveal();
  return (
    <section className="pricing" id="pricing" ref={ref}>
      <div className="section-label">Compare</div>
      <div className={`pricing-table-wrap${visible ? " visible" : ""}`}>
        <div className="pricing-table-scroll">
          <table className="pricing-table">
            <thead>
              <tr>
                <th className="pt-corner" />
                <th className="pt-head pt-noir">
                  <Logo size={20} color="#4a9" />
                  <span>Noir</span>
                  <span className="pt-badge">Recommended</span>
                </th>
                <th className="pt-head">Audirvāna</th>
                <th className="pt-head">Roon</th>
              </tr>
            </thead>
            <tbody>
              {pricingRows.map((r, i) => (
                <tr key={i}>
                  <td className="pt-label">{r.label}</td>
                  <td className="pt-val pt-noir-col"><CellValue v={r.noir} /></td>
                  <td className="pt-val"><CellValue v={r.aud} /></td>
                  <td className="pt-val"><CellValue v={r.roon} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="pricing-note">
        30-day trial includes all features. No account or credit card required.
      </p>
    </section>
  );
}

// ═══════════════════════════════════════════════
// EMAIL CTA
// ═══════════════════════════════════════════════
function EmailCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ref, visible] = useReveal();

  const handle = (e) => {
    e.preventDefault();
    if (email.includes("@")) setSubmitted(true);
  };

  return (
    <section className="email-cta" ref={ref}>
      <div className={`email-inner${visible ? " visible" : ""}`}>
        <h2>Join the beta.</h2>
        <p>Be first to hear your music the way it was meant to sound.</p>
        {submitted ? (
          <div className="email-thanks">
            <span className="thanks-check">✓</span> Thanks! We'll be in touch.
          </div>
        ) : (
          <form className="email-form" onSubmit={handle}>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <Logo size={24} color="#4a9" />
            <span>NOIR</span>
          </div>
          <p>Bit-perfect audio playback for macOS. Built with Rust, designed for audiophiles.</p>
        </div>
        <div className="footer-col">
          <h4>Product</h4>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#download">Download</a>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <a href="#">Docs</a>
          <a href="#">Support</a>
          <a href="#">FAQ</a>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Noir Audio</span>
        <span className="footer-craft">Crafted for those who listen.</span>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════
const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E`;

const styles = `
/* ─── RESET & BASE ─── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #0a0a0a;
  color: #fff;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; cursor: pointer; }

.section-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #4a9;
  margin-bottom: 48px;
  text-align: center;
}

/* ─── NAV ─── */
.noir-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.4s, backdrop-filter 0.4s, border-color 0.4s;
  border-bottom: 1px solid transparent;
}
.noir-nav.scrolled {
  background: rgba(10,10,10,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: #1a1a1a;
}
.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.nav-brand-text {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 4px;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav-links a {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #888;
  transition: color 0.2s;
}
.nav-links a:hover { color: #fff; }
.nav-cta {
  background: #4a9 !important;
  color: #000 !important;
  padding: 8px 20px !important;
  border-radius: 4px;
  font-weight: 500 !important;
  font-size: 12px !important;
  letter-spacing: 1px;
  transition: background 0.2s, transform 0.2s !important;
}
.nav-cta:hover {
  background: #5cb !important;
  transform: translateY(-1px);
}

/* Hamburger */
.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 20px;
  position: relative;
  z-index: 101;
}
.hamburger span {
  display: block;
  width: 100%;
  height: 1.5px;
  background: #fff;
  position: absolute;
  left: 0;
  transition: all 0.3s;
}
.hamburger span:nth-child(1) { top: 0; }
.hamburger span:nth-child(2) { top: 50%; transform: translateY(-50%); }
.hamburger span:nth-child(3) { bottom: 0; }
.hamburger.active span:nth-child(1) { top: 50%; transform: translateY(-50%) rotate(45deg); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { bottom: 50%; transform: translateY(50%) rotate(-45deg); }

@media (max-width: 768px) {
  .hamburger { display: block; }
  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10,10,10,0.98);
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }
  .nav-links.open {
    opacity: 1;
    pointer-events: all;
  }
  .nav-links a {
    font-size: 20px;
    letter-spacing: 3px;
  }
  .nav-cta {
    font-size: 16px !important;
    padding: 14px 32px !important;
  }
  .nav-inner { height: 56px; }
}

/* ─── HERO ─── */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 100px 24px 60px;
  position: relative;
  overflow: hidden;
}
.hero-waves {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 180px;
  transform: translateY(-50%);
  opacity: 0.06;
  pointer-events: none;
}
.wave {
  fill: none;
  stroke-linecap: round;
  stroke-width: 2.5;
}
.w1 { stroke: #4a9; stroke-width: 3; animation: waveMove1 4s ease-in-out infinite; }
.w2 { stroke: #5cb; stroke-width: 2; animation: waveMove2 5s ease-in-out infinite; }
.w3 { stroke: #3a8; stroke-width: 1.5; animation: waveMove3 6s ease-in-out infinite; }

@keyframes waveMove1 {
  0%, 100% { d: path("M0,100 Q150,40 300,100 T600,100 T900,100 T1200,100"); }
  50% { d: path("M0,100 Q150,160 300,100 T600,100 T900,100 T1200,100"); }
}
@keyframes waveMove2 {
  0%, 100% { d: path("M0,100 Q200,150 400,100 T800,100 T1200,100"); }
  50% { d: path("M0,100 Q200,50 400,100 T800,100 T1200,100"); }
}
@keyframes waveMove3 {
  0%, 100% { d: path("M0,100 Q100,60 200,140 T400,60 T600,140 T800,60 T1000,140 T1200,100"); }
  50% { d: path("M0,100 Q100,140 200,60 T400,140 T600,60 T800,140 T1000,60 T1200,100"); }
}

.hero-grain {
  position: absolute;
  inset: 0;
  background-image: url("${NOISE_SVG}");
  background-repeat: repeat;
  background-size: 256px;
  pointer-events: none;
  opacity: 0.5;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 720px;
  animation: heroIn 1s ease-out forwards;
  opacity: 0;
}
@keyframes heroIn {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400;
  font-size: clamp(38px, 7vw, 76px);
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -1px;
}
.hero-title em {
  font-style: italic;
  color: #4a9;
}

.hero-sub {
  font-weight: 300;
  font-size: clamp(15px, 2vw, 18px);
  color: #888;
  max-width: 540px;
  margin: 0 auto 40px;
  line-height: 1.7;
}

.hero-ctas {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.btn {
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.5px;
  padding: 14px 32px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s;
  display: inline-block;
}
.btn-primary {
  background: #4a9;
  color: #000;
}
.btn-primary:hover {
  background: #5cb;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(68,170,153,0.2);
}
.btn-outline {
  background: transparent;
  color: #4a9;
  border: 1px solid #4a9;
}
.btn-outline:hover {
  background: rgba(68,170,153,0.08);
  transform: translateY(-2px);
}

.hero-formats {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
.format-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 1px;
  color: #666;
  border: 1px solid #222;
  padding: 6px 14px;
  border-radius: 100px;
  opacity: 0;
  animation: badgeIn 0.4s ease-out forwards;
}
@keyframes badgeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.4;
  animation: scrollBounce 2s ease-in-out infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}
.scroll-dot {
  animation: scrollDot 2s ease-in-out infinite;
}
@keyframes scrollDot {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(4px); }
}

@media (max-width: 768px) {
  .hero { padding: 80px 20px 40px; }
  .hero-ctas { flex-direction: column; align-items: center; }
  .btn { width: 100%; max-width: 280px; text-align: center; }
  .hero-formats { overflow-x: auto; flex-wrap: nowrap; justify-content: flex-start; padding: 0 20px; -webkit-overflow-scrolling: touch; }
  .hero-formats::-webkit-scrollbar { display: none; }
  .format-badge { flex-shrink: 0; }
}

/* ─── FEATURES ─── */
.features {
  padding: 120px 24px;
  max-width: 1100px;
  margin: 0 auto;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.feature-card {
  background: #111;
  border-left: 3px solid #4a9;
  padding: 36px 32px;
  border-radius: 0 8px 8px 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}
.feature-icon {
  margin-bottom: 16px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(68,170,153,0.08);
  border-radius: 8px;
}
.feature-card h3 {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
  letter-spacing: 0.3px;
}
.feature-card p {
  font-weight: 300;
  font-size: 14px;
  color: #888;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .features { padding: 80px 20px; }
  .features-grid { grid-template-columns: 1fr; }
}

/* ─── QUOTE ─── */
.quote-section {
  padding: 100px 24px;
  text-align: center;
  position: relative;
  background: #0e0e0e;
}
.quote-grain {
  position: absolute;
  inset: 0;
  background-image: url("${NOISE_SVG}");
  background-repeat: repeat;
  background-size: 256px;
  pointer-events: none;
  opacity: 0.6;
}
.quote-line {
  width: 60px;
  height: 1px;
  background: #333;
  margin: 0 auto;
}
.quote {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400;
  font-style: italic;
  font-size: clamp(28px, 5vw, 48px);
  padding: 48px 24px;
  color: #fff;
  position: relative;
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 0.8s, transform 0.8s;
}
.quote.visible {
  opacity: 1;
  transform: scale(1);
}
.quote em { color: #4a9; font-style: italic; }

/* ─── STATS ─── */
.stats {
  padding: 100px 24px;
  max-width: 1000px;
  margin: 0 auto;
}
.stats-grid {
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat {
  flex: 1;
  text-align: center;
  padding: 20px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.stat.visible {
  opacity: 1;
  transform: translateY(0);
}
.stat-num {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 400;
  display: block;
  line-height: 1;
  letter-spacing: -2px;
}
.stat-unit {
  font-size: 0.45em;
  color: #888;
  letter-spacing: 0;
}
.stat-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #555;
  margin-top: 12px;
  display: block;
}
.stat-sep {
  width: 1px;
  height: 60px;
  background: #222;
}

@media (max-width: 768px) {
  .stats { padding: 60px 20px; }
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .stat-sep { display: none; }
}

/* ─── SIGNAL PATH ─── */
.signal {
  padding: 120px 24px;
  max-width: 1000px;
  margin: 0 auto;
}
.signal-pipeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}
.signal-step-wrap {
  display: flex;
  align-items: center;
}
.signal-step {
  background: #151515;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 24px 28px;
  text-align: center;
  min-width: 140px;
  position: relative;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.signal-step.visible {
  opacity: 1;
  transform: translateY(0);
}
.signal-icon {
  font-size: 24px;
  display: block;
  margin-bottom: 10px;
}
.signal-label {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 15px;
  display: block;
  margin-bottom: 4px;
}
.signal-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #555;
  letter-spacing: 0.5px;
}
.signal-connector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  position: relative;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.signal-connector.visible { opacity: 1; }
.connector-line { display: block; }
.connector-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #4a9;
  border-radius: 50%;
  animation: flowDot 1.5s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(68,170,153,0.6);
}
@keyframes flowDot {
  0% { left: 0; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { left: calc(100% - 6px); opacity: 0; }
}

.signal-integrity {
  text-align: center;
  margin-top: 40px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: #666;
  letter-spacing: 1px;
  opacity: 0;
  transition: opacity 0.6s ease 0.6s;
}
.signal-integrity.visible { opacity: 1; }
.integrity-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #4a9;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
  animation: pulse 2s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(68,170,153,0.5);
}
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(68,170,153,0.5); }
  50% { opacity: 0.5; box-shadow: 0 0 16px rgba(68,170,153,0.8); }
}

@media (max-width: 768px) {
  .signal { padding: 80px 20px; }
  .signal-pipeline {
    flex-direction: column;
    gap: 0;
  }
  .signal-step-wrap { flex-direction: column; }
  .signal-connector {
    width: auto;
    height: 40px;
    transform: rotate(90deg);
  }
  .signal-step { min-width: 200px; }
}

/* ─── PRICING ─── */
.pricing {
  padding: 120px 24px;
  max-width: 900px;
  margin: 0 auto;
}
.pricing-table-wrap {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.pricing-table-wrap.visible {
  opacity: 1;
  transform: translateY(0);
}
.pricing-table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.pricing-table-scroll::-webkit-scrollbar { height: 4px; }
.pricing-table-scroll::-webkit-scrollbar-track { background: #111; }
.pricing-table-scroll::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

.pricing-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 560px;
}
.pt-corner {
  background: transparent;
}
.pt-head {
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #888;
  padding: 20px 16px;
  text-align: center;
  border-bottom: 1px solid #222;
}
.pt-head.pt-noir {
  color: #fff;
  background: #151515;
  border-top: 3px solid #4a9;
  border-radius: 8px 8px 0 0;
  display: table-cell;
}
.pt-head.pt-noir span {
  display: block;
}
.pt-head.pt-noir svg {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 4px;
}
.pt-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #4a9;
  margin-top: 4px;
}
.pt-label {
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 13px;
  color: #888;
  padding: 14px 16px;
  border-bottom: 1px solid #151515;
  white-space: nowrap;
}
.pt-val {
  text-align: center;
  padding: 14px 16px;
  border-bottom: 1px solid #151515;
  font-size: 14px;
}
.pt-noir-col {
  background: #111;
}
.check.yes { color: #4a9; font-weight: 600; }
.check.no { color: #444; }
.check.text { color: #888; font-family: 'IBM Plex Mono', monospace; font-size: 12px; }

.pricing-note {
  text-align: center;
  font-size: 13px;
  color: #555;
  margin-top: 32px;
  font-weight: 300;
}

@media (max-width: 768px) {
  .pricing { padding: 80px 16px; }
}

/* ─── EMAIL CTA ─── */
.email-cta {
  padding: 100px 24px;
  background: #0e0e0e;
}
.email-inner {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.email-inner.visible {
  opacity: 1;
  transform: translateY(0);
}
.email-inner h2 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400;
  font-style: italic;
  font-size: clamp(28px, 4vw, 40px);
  margin-bottom: 12px;
}
.email-inner p {
  font-weight: 300;
  font-size: 15px;
  color: #888;
  margin-bottom: 32px;
}
.email-form {
  display: flex;
  gap: 0;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #222;
}
.email-form input {
  flex: 1;
  padding: 14px 16px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  outline: none;
}
.email-form input::placeholder { color: #555; }
.email-form input:focus { background: #1e1e1e; }
.email-form button {
  padding: 14px 24px;
  background: #4a9;
  color: #000;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
  letter-spacing: 0.5px;
}
.email-form button:hover { background: #5cb; }

.email-thanks {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  color: #4a9;
  padding: 20px;
  animation: fadeUp 0.4s ease-out;
}
.thanks-check { font-size: 18px; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .email-cta { padding: 60px 20px; }
  .email-form { flex-direction: column; }
  .email-form input { border-bottom: 1px solid #222; }
}

/* ─── FOOTER ─── */
.footer {
  padding: 80px 24px 40px;
  border-top: 1px solid #151515;
}
.footer-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
}
.footer-brand p {
  font-weight: 300;
  font-size: 13px;
  color: #555;
  line-height: 1.7;
  margin-top: 12px;
  max-width: 240px;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 3px;
}
.footer-col h4 {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 16px;
}
.footer-col a {
  display: block;
  font-weight: 300;
  font-size: 13px;
  color: #555;
  padding: 4px 0;
  transition: color 0.2s;
}
.footer-col a:hover { color: #fff; }

.footer-bottom {
  max-width: 1100px;
  margin: 48px auto 0;
  padding-top: 24px;
  border-top: 1px solid #151515;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #444;
  font-weight: 300;
}
.footer-craft {
  font-style: italic;
  color: #555;
}

@media (max-width: 768px) {
  .footer { padding: 60px 20px 32px; }
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .footer-brand { grid-column: 1 / -1; }
  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
}
`;

// ═══════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════
export default function NoirLanding() {
  useFonts();

  return (
    <>
      <style>{styles}</style>
      <Nav />
      <Hero />
      <Features />
      <Quote />
      <Stats />
      <SignalPath />
      <Pricing />
      <EmailCTA />
      <Footer />
    </>
  );
}
