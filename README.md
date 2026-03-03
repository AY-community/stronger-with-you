<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Stronger With You — Emporio Armani</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --cream: #f0e8d8;
      --gold: #b89a5e;
      --gold-light: #d4b87a;
      --dark: #0d0b08;
      --charcoal: #1a1714;
      --mid: #2e2a24;
      --text-muted: #8a8070;
      --text-body: #c8bfaf;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--dark);
      color: var(--cream);
      font-family: 'Montserrat', sans-serif;
      font-weight: 300;
      overflow-x: hidden;
    }

    /* GRAIN OVERLAY */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 999;
      opacity: 0.35;
    }

    /* ─── MASTHEAD ─── */
    .masthead {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 4rem 5vw;
      overflow: hidden;
    }

    .masthead-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 70% 40%, rgba(184,154,94,0.08) 0%, transparent 60%),
        radial-gradient(ellipse 50% 80% at 20% 80%, rgba(184,154,94,0.04) 0%, transparent 50%),
        linear-gradient(160deg, #0d0b08 0%, #171410 50%, #0f0d0a 100%);
    }

    .masthead-lines {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .masthead-lines::before {
      content: '';
      position: absolute;
      top: -10%;
      right: 12%;
      width: 1px;
      height: 120%;
      background: linear-gradient(to bottom, transparent, rgba(184,154,94,0.25), transparent);
      transform: rotate(8deg);
    }

    .masthead-lines::after {
      content: '';
      position: absolute;
      top: -10%;
      right: 22%;
      width: 1px;
      height: 120%;
      background: linear-gradient(to bottom, transparent, rgba(184,154,94,0.1), transparent);
      transform: rotate(8deg);
    }

    .badge {
      position: absolute;
      top: 3rem;
      right: 5vw;
      writing-mode: vertical-rl;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.6rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gold);
      opacity: 0.7;
    }

    .eyebrow {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.65rem;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 1.5rem;
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 1rem;
    }

    .eyebrow::before {
      content: '';
      display: inline-block;
      width: 3rem;
      height: 1px;
      background: var(--gold);
    }

    .masthead-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(4rem, 12vw, 11rem);
      font-weight: 300;
      line-height: 0.9;
      letter-spacing: -0.02em;
      position: relative;
    }

    .masthead-title em {
      font-style: italic;
      color: var(--gold-light);
    }

    .masthead-subtitle {
      margin-top: 2rem;
      font-size: 0.7rem;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: var(--text-muted);
      max-width: 28rem;
    }

    .masthead-meta {
      position: absolute;
      bottom: 4rem;
      right: 5vw;
      text-align: right;
    }

    .masthead-meta span {
      display: block;
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      margin-bottom: 0.4rem;
    }

    .masthead-meta strong {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.5rem;
      font-weight: 300;
      color: var(--gold);
      letter-spacing: 0.05em;
    }

    .scroll-hint {
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
      font-size: 0.55rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
    }

    .scroll-hint-line {
      width: 1px;
      height: 3rem;
      background: linear-gradient(to bottom, var(--gold), transparent);
      animation: scrollDrop 2s ease-in-out infinite;
    }

    @keyframes scrollDrop {
      0%, 100% { opacity: 0.4; transform: scaleY(1); }
      50% { opacity: 1; transform: scaleY(1.1); }
    }

    /* ─── DIVIDER ─── */
    .divider {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 0 5vw;
      margin: 3rem 0;
    }

    .divider-line { flex: 1; height: 1px; background: var(--mid); }
    .divider-diamond {
      width: 6px; height: 6px;
      border: 1px solid var(--gold);
      transform: rotate(45deg);
      flex-shrink: 0;
    }
    .divider-label {
      font-size: 0.6rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--text-muted);
      white-space: nowrap;
    }

    /* ─── SECTIONS ─── */
    section { padding: 5rem 5vw; }

    .section-eyebrow {
      font-size: 0.6rem;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .section-eyebrow::after {
      content: '';
      display: inline-block;
      width: 2rem;
      height: 1px;
      background: var(--gold);
    }

    h2 {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      font-weight: 300;
      line-height: 1.05;
      letter-spacing: -0.01em;
      margin-bottom: 2.5rem;
    }

    h2 em { font-style: italic; color: var(--gold-light); }

    h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem;
      font-weight: 400;
      letter-spacing: 0.02em;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 0.82rem;
      line-height: 1.9;
      color: var(--text-body);
      max-width: 60ch;
    }

    /* ─── OVERVIEW GRID ─── */
    .overview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1px;
      background: var(--mid);
      border: 1px solid var(--mid);
      margin-top: 3rem;
    }

    .overview-cell {
      background: var(--dark);
      padding: 2.5rem;
      position: relative;
      overflow: hidden;
      transition: background 0.4s;
    }

    .overview-cell:hover { background: var(--charcoal); }

    .overview-cell::before {
      content: attr(data-n);
      position: absolute;
      top: 1.5rem;
      right: 2rem;
      font-family: 'Cormorant Garamond', serif;
      font-size: 4rem;
      font-weight: 300;
      color: rgba(184,154,94,0.07);
      line-height: 1;
    }

    .overview-cell p { max-width: 100%; margin-top: 0.5rem; }

    /* ─── STACK TABLE ─── */
    .tech-section {
      background: var(--charcoal);
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-top: 3rem;
    }

    .tech-group-label {
      font-size: 0.6rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid var(--mid);
    }

    .tech-item {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
      padding: 0.6rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .tech-item-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--gold);
      flex-shrink: 0;
      margin-bottom: 2px;
    }

    .tech-item-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.78rem;
      font-weight: 400;
      color: var(--cream);
      letter-spacing: 0.05em;
    }

    .tech-item-desc {
      font-size: 0.7rem;
      color: var(--text-muted);
      margin-left: auto;
    }

    /* ─── SECTIONS SHOWCASE ─── */
    .sections-list {
      margin-top: 3rem;
      display: grid;
      gap: 1px;
      background: var(--mid);
      border: 1px solid var(--mid);
    }

    .section-row {
      background: var(--dark);
      display: grid;
      grid-template-columns: 4rem 1fr 1fr;
      align-items: start;
      gap: 2rem;
      padding: 2rem 2.5rem;
      transition: background 0.3s;
    }

    .section-row:hover { background: var(--charcoal); }

    .section-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.5rem;
      font-weight: 300;
      color: rgba(184,154,94,0.3);
      line-height: 1;
    }

    .section-row h3 { margin-bottom: 0.25rem; font-size: 1.1rem; }
    .section-row p { font-size: 0.78rem; max-width: 100%; }

    .section-tag {
      font-size: 0.6rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold);
      background: rgba(184,154,94,0.08);
      border: 1px solid rgba(184,154,94,0.2);
      padding: 0.3rem 0.75rem;
      display: inline-block;
      margin-top: 0.5rem;
    }

    /* ─── ARCHITECTURE ─── */
    .arch-block {
      margin-top: 3rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    .code-block {
      background: var(--charcoal);
      border: 1px solid var(--mid);
      padding: 2rem;
      font-family: 'Courier New', monospace;
      font-size: 0.72rem;
      line-height: 1.8;
      color: var(--text-body);
      position: relative;
      overflow: hidden;
    }

    .code-block::before {
      content: 'STRUCTURE';
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.55rem;
      letter-spacing: 0.3em;
      color: var(--text-muted);
    }

    .code-block .ln { color: rgba(184,154,94,0.4); margin-right: 1.5rem; user-select: none; }
    .code-block .dir { color: var(--gold-light); }
    .code-block .file { color: var(--text-body); }
    .code-block .comment { color: var(--text-muted); font-style: italic; }

    /* ─── PULLQUOTE ─── */
    .pullquote-section {
      position: relative;
      padding: 6rem 5vw;
      overflow: hidden;
      background: var(--charcoal);
    }

    .pullquote-bg {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(184,154,94,0.05) 0%, transparent 70%);
    }

    blockquote {
      position: relative;
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2rem, 4.5vw, 4rem);
      font-weight: 300;
      font-style: italic;
      line-height: 1.2;
      text-align: center;
      max-width: 900px;
      margin: 0 auto;
      color: var(--cream);
    }

    blockquote::before {
      content: '\201C';
      display: block;
      font-size: 6rem;
      line-height: 1;
      color: var(--gold);
      opacity: 0.4;
      margin-bottom: -1rem;
    }

    cite {
      display: block;
      margin-top: 2rem;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.65rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--gold);
      font-style: normal;
      text-align: center;
    }

    /* ─── NOTES STRIP ─── */
    .notes-strip {
      border-top: 1px solid var(--mid);
      border-bottom: 1px solid var(--mid);
      padding: 2rem 5vw;
      display: flex;
      gap: 3rem;
      overflow-x: auto;
      margin: 4rem 0;
    }

    .note-item { flex-shrink: 0; }

    .note-label {
      font-size: 0.55rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }

    .note-value {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.25rem;
      font-weight: 400;
      color: var(--cream);
      letter-spacing: 0.05em;
    }

    .note-sep {
      width: 1px;
      background: var(--mid);
      flex-shrink: 0;
    }

    /* ─── FOOTER ─── */
    footer {
      padding: 4rem 5vw;
      border-top: 1px solid var(--mid);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: end;
    }

    .footer-brand {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.8rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--text-muted);
    }

    .footer-tagline {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem;
      font-weight: 300;
      font-style: italic;
      color: var(--gold);
      margin-top: 0.5rem;
    }

    .footer-links {
      text-align: right;
      font-size: 0.65rem;
      letter-spacing: 0.2em;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      margin-left: 2rem;
      transition: color 0.3s;
    }

    .footer-links a:hover { color: var(--gold); }

    .footer-copy {
      margin-top: 3rem;
      grid-column: 1 / -1;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.05);
      display: flex;
      justify-content: space-between;
      font-size: 0.6rem;
      letter-spacing: 0.15em;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    /* ─── ANIMATIONS ─── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(2rem); }
      to { opacity: 1; transform: translateY(0); }
    }

    .reveal {
      opacity: 0;
      animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    .reveal:nth-child(1) { animation-delay: 0.1s; }
    .reveal:nth-child(2) { animation-delay: 0.25s; }
    .reveal:nth-child(3) { animation-delay: 0.4s; }
    .reveal:nth-child(4) { animation-delay: 0.55s; }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 768px) {
      .overview-grid { grid-template-columns: 1fr; }
      .tech-grid { grid-template-columns: 1fr; }
      .section-row { grid-template-columns: 2.5rem 1fr; }
      .section-row p { display: none; }
      .arch-block { grid-template-columns: 1fr; }
      footer { grid-template-columns: 1fr; }
      .footer-links { text-align: left; }
      .footer-links a { margin-left: 0; margin-right: 1.5rem; }
    }
  </style>
</head>
<body>

  <!-- MASTHEAD -->
  <header class="masthead">
    <div class="masthead-bg"></div>
    <div class="masthead-lines"></div>

    <div class="badge">Documentation / 2024</div>

    <div style="position:relative; z-index:2;">
      <p class="eyebrow reveal">Emporio Armani</p>
      <h1 class="masthead-title reveal">
        Stronger<br><em>With You</em>
      </h1>
      <p class="masthead-subtitle reveal">
        Interactive single-page experience — React, TypeScript, GSAP ScrollTrigger
      </p>
    </div>

    <div class="masthead-meta" style="position:absolute; bottom:4rem; right:5vw; text-align:right; z-index:2;">
      <span>Launch Year</span>
      <strong>2024</strong>
    </div>

    <div class="scroll-hint">
      <div class="scroll-hint-line"></div>
      <span>Scroll</span>
    </div>
  </header>

  <!-- METADATA STRIP -->
  <div class="notes-strip">
    <div class="note-item">
      <div class="note-label">Framework</div>
      <div class="note-value">React + TypeScript</div>
    </div>
    <div class="note-sep"></div>
    <div class="note-item">
      <div class="note-label">Animation</div>
      <div class="note-value">GSAP ScrollTrigger</div>
    </div>
    <div class="note-sep"></div>
    <div class="note-item">
      <div class="note-label">Rendering</div>
      <div class="note-value">HTML5 Canvas</div>
    </div>
    <div class="note-sep"></div>
    <div class="note-item">
      <div class="note-label">Fragrance Family</div>
      <div class="note-value">Oriental Fougère</div>
    </div>
    <div class="note-sep"></div>
    <div class="note-item">
      <div class="note-label">Key Notes</div>
      <div class="note-value">Pink Pepper · Chestnut</div>
    </div>
    <div class="note-sep"></div>
    <div class="note-item">
      <div class="note-label">Type</div>
      <div class="note-value">Single-Page Application</div>
    </div>
  </div>

  <!-- OVERVIEW -->
  <section>
    <p class="section-eyebrow">Overview</p>
    <h2>A cinematic digital<br><em>journey</em></h2>
    <p>This project is a visually rich, interactive single-page application presenting the 2024 relaunch of Emporio Armani's "Stronger With You" fragrance. Scroll-driven cinematics, parallax editorial photography, and pinned tagline reveals combine to create an experience as refined as the product itself.</p>

    <div class="overview-grid">
      <div class="overview-cell" data-n="01">
        <h3>Immersive Storytelling</h3>
        <p>Sequences of canvas-rendered images synchronised with scroll position simulate a high-resolution video — no video codec required, pure browser performance.</p>
      </div>
      <div class="overview-cell" data-n="02">
        <h3>Precision Animation</h3>
        <p>GSAP's ScrollTrigger plugin orchestrates every reveal, pin, parallax, and stagger — giving designers frame-accurate control over the narrative pace.</p>
      </div>
      <div class="overview-cell" data-n="03">
        <h3>Editorial Aesthetic</h3>
        <p>High-resolution photography, pull-quotes, and typographic hierarchy mirror the visual language of luxury fashion editorials.</p>
      </div>
      <div class="overview-cell" data-n="04">
        <h3>Engineered for Quality</h3>
        <p>TypeScript throughout ensures type safety and maintainability. Functional React components with custom hooks keep the codebase clean and composable.</p>
      </div>
    </div>
  </section>

  <!-- DIVIDER -->
  <div class="divider">
    <div class="divider-line"></div>
    <div class="divider-diamond"></div>
    <div class="divider-label">Technology Stack</div>
    <div class="divider-diamond"></div>
    <div class="divider-line"></div>
  </div>

  <!-- TECH STACK -->
  <section class="tech-section">
    <p class="section-eyebrow">Stack</p>
    <h2>Built on a <em>modern</em><br>foundation</h2>

    <div class="tech-grid">
      <div>
        <div class="tech-group-label">Core</div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">React</span><span class="tech-item-desc">UI framework</span></div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">TypeScript</span><span class="tech-item-desc">Type safety</span></div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">Vite</span><span class="tech-item-desc">Build tooling</span></div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">HTML5 Canvas</span><span class="tech-item-desc">Frame sequencing</span></div>
      </div>
      <div>
        <div class="tech-group-label">Animation</div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">GSAP</span><span class="tech-item-desc">Core tweening</span></div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">ScrollTrigger</span><span class="tech-item-desc">Scroll orchestration</span></div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">ScrollTo Plugin</span><span class="tech-item-desc">Smooth navigation</span></div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">CSS Parallax</span><span class="tech-item-desc">Depth layers</span></div>
      </div>
      <div>
        <div class="tech-group-label">Patterns</div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">Custom Hooks</span><span class="tech-item-desc">Reusable logic</span></div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">useRef / useEffect</span><span class="tech-item-desc">DOM control</span></div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">Lazy Loading</span><span class="tech-item-desc">Asset performance</span></div>
        <div class="tech-item"><div class="tech-item-dot"></div><span class="tech-item-name">Progress Preloader</span><span class="tech-item-desc">Asset feedback</span></div>
      </div>
    </div>
  </section>

  <!-- DIVIDER -->
  <div class="divider">
    <div class="divider-line"></div>
    <div class="divider-diamond"></div>
    <div class="divider-label">Experience Architecture</div>
    <div class="divider-diamond"></div>
    <div class="divider-line"></div>
  </div>

  <!-- SECTIONS SHOWCASE -->
  <section>
    <p class="section-eyebrow">Sections</p>
    <h2>Seven acts of a<br><em>single narrative</em></h2>

    <div class="sections-list">
      <div class="section-row">
        <div class="section-num">01</div>
        <div>
          <h3>Video Introduction</h3>
          <span class="section-tag">Auto-play · Session-aware</span>
        </div>
        <p>A brief brand film opens the experience. Shown periodically to returning visitors via session logic — never interruptive, always intentional. A progress bar surfaces during asset preloading.</p>
      </div>
      <div class="section-row">
        <div class="section-num">02</div>
        <div>
          <h3>Hero Section</h3>
          <span class="section-tag">Typography · Scroll Hint</span>
        </div>
        <p>A full-viewport hero image anchors the product name in large-scale type. An animated scroll indicator guides the user into the experience below.</p>
      </div>
      <div class="section-row">
        <div class="section-num">03</div>
        <div>
          <h3>Canvas Scroll Sequence</h3>
          <span class="section-tag">HTML5 Canvas · Frame Sync</span>
        </div>
        <p>Hundreds of pre-loaded frames are painted to a canvas element as the user scrolls, creating a seamless cinematic playback without video files.</p>
      </div>
      <div class="section-row">
        <div class="section-num">04</div>
        <div>
          <h3>Pinned Taglines</h3>
          <span class="section-tag">ScrollTrigger · Pin</span>
        </div>
        <p>"Timeless. Refined. Audacious. Yours." — Four attributes reveal in sequence against a pinned panel, each demanding momentary attention before the scroll continues.</p>
      </div>
      <div class="section-row">
        <div class="section-num">05</div>
        <div>
          <h3>Editorial Content</h3>
          <span class="section-tag">Parallax · Product · Pull-quote</span>
        </div>
        <p>Full-bleed photography with layered parallax. Fragrance notes (Oriental Fougère, Pink Pepper, Chestnut), product imagery, and purchase integration — all framed by editorial typography.</p>
      </div>
      <div class="section-row">
        <div class="section-num">06</div>
        <div>
          <h3>Footer</h3>
          <span class="section-tag">Navigation · Social · Branding</span>
        </div>
        <p>A comprehensive footer closes the experience with social media links, brand identity, and navigational tags that orient the user within the wider Armani ecosystem.</p>
      </div>
      <div class="section-row">
        <div class="section-num">07</div>
        <div>
          <h3>Navigation Menu</h3>
          <span class="section-tag">Hamburger · Animated · Overlay</span>
        </div>
        <p>A sleek hamburger menu provides section access at any scroll depth. Opening and closing are fully animated, maintaining the luxury aesthetic at every interaction point.</p>
      </div>
    </div>
  </section>

  <!-- PULLQUOTE -->
  <div class="pullquote-section">
    <div class="pullquote-bg"></div>
    <blockquote>
      The closer you get, the stronger you become.
    </blockquote>
    <cite>Stronger With You — Emporio Armani, 2024</cite>
  </div>

  <!-- ARCHITECTURE -->
  <section>
    <p class="section-eyebrow">Architecture</p>
    <h2>Structure &amp;<br><em>conventions</em></h2>

    <div class="arch-block">
      <div>
        <div class="code-block">
<span class="ln">01</span><span class="dir">src/</span><br>
<span class="ln">02</span>  <span class="dir">components/</span><br>
<span class="ln">03</span>    <span class="file">Hero.tsx</span>          <span class="comment">// Hero section</span><br>
<span class="ln">04</span>    <span class="file">CanvasSequence.tsx</span> <span class="comment">// Scroll frames</span><br>
<span class="ln">05</span>    <span class="file">Taglines.tsx</span>      <span class="comment">// Pinned reveal</span><br>
<span class="ln">06</span>    <span class="file">Editorial.tsx</span>     <span class="comment">// Parallax content</span><br>
<span class="ln">07</span>    <span class="file">VideoIntro.tsx</span>    <span class="comment">// Intro player</span><br>
<span class="ln">08</span>    <span class="file">NavMenu.tsx</span>       <span class="comment">// Hamburger menu</span><br>
<span class="ln">09</span>    <span class="file">Footer.tsx</span>        <span class="comment">// Site footer</span><br>
<span class="ln">10</span>  <span class="dir">hooks/</span><br>
<span class="ln">11</span>    <span class="file">useScrollTrigger.ts</span><br>
<span class="ln">12</span>    <span class="file">useAssetPreload.ts</span><br>
<span class="ln">13</span>  <span class="dir">assets/</span>            <span class="comment">// Images & video</span><br>
<span class="ln">14</span>  <span class="file">App.tsx</span>            <span class="comment">// Root component</span>
        </div>

        <div style="margin-top: 1.5rem; padding: 1.5rem; border: 1px solid var(--mid);">
          <div class="note-label" style="margin-bottom:1rem;">Getting Started</div>
          <div class="code-block" style="margin:0; border:none; padding:0; background:transparent;">
<span style="color:var(--gold);">$</span> <span style="color:var(--cream);">npm install</span><br>
<span style="color:var(--gold);">$</span> <span style="color:var(--cream);">npm run dev</span><br>
<span style="color:var(--gold);">$</span> <span style="color:var(--cream);">npm run build</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style="font-size:1.1rem; margin-bottom:1.5rem;">Design Principles</h3>

        <div style="display:grid; gap:1.5rem;">
          <div style="border-left: 2px solid var(--gold); padding-left: 1.5rem;">
            <div class="note-label" style="margin-bottom:0.4rem;">Scroll as Cinema</div>
            <p style="font-size:0.78rem; max-width:100%;">Every pixel of scroll progress has a corresponding visual state. GSAP ScrollTrigger acts as a film projector — the user's finger is the timeline scrubber.</p>
          </div>
          <div style="border-left: 2px solid rgba(184,154,94,0.4); padding-left: 1.5rem;">
            <div class="note-label" style="margin-bottom:0.4rem;">Performance First</div>
            <p style="font-size:0.78rem; max-width:100%;">Canvas-based image sequencing avoids the overhead of video decoding. Assets are preloaded progressively, ensuring the experience begins only when it can be flawless.</p>
          </div>
          <div style="border-left: 2px solid rgba(184,154,94,0.2); padding-left: 1.5rem;">
            <div class="note-label" style="margin-bottom:0.4rem;">Returning User Respect</div>
            <p style="font-size:0.78rem; max-width:100%;">Session awareness prevents the intro video from overstaying its welcome. Repeat visitors move directly into the experience.</p>
          </div>
          <div style="border-left: 2px solid rgba(184,154,94,0.1); padding-left: 1.5rem;">
            <div class="note-label" style="margin-bottom:0.4rem;">Type Safety Throughout</div>
            <p style="font-size:0.78rem; max-width:100%;">TypeScript interfaces define every prop and state shape. The compiler enforces contract correctness across all components and hooks.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div>
      <div class="footer-brand">Emporio Armani — Project Documentation</div>
      <div class="footer-tagline">Stronger With You</div>
    </div>
    <div class="footer-links">
      <a href="#overview">Overview</a>
      <a href="#stack">Stack</a>
      <a href="#sections">Sections</a>
      <a href="#architecture">Architecture</a>
    </div>
    <div class="footer-copy">
      <span>React · TypeScript · GSAP ScrollTrigger</span>
      <span>Oriental Fougère · Pink Pepper · Chestnut · 2024</span>
    </div>
  </footer>

</body>
</html>