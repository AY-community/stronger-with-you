<div align="center">

<br />

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║          E M P O R I O   A R M A N I                     ║
║                                                           ║
║              STRONGER WITH YOU                           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

<br />

*An immersive single-page fragrance experience — where scroll becomes cinema.*

<br />

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88ce02?style=flat-square&logo=greensock&logoColor=black)
![Canvas](https://img.shields.io/badge/HTML5-Canvas-e34f26?style=flat-square&logo=html5&logoColor=white)
![Status](https://img.shields.io/badge/Status-2024%20Launch-b89a5e?style=flat-square)

<br />

---

</div>

<br />

## &nbsp;&nbsp;Overview

<div align="center">

> **"Stronger With You"** is not a website — it is a directed experience.  
> Scroll is the remote control. Canvas is the screen. GSAP is the director.

</div>

<br />

A visually rich, interactive SPA crafted for the 2024 relaunch of Emporio Armani's *Stronger With You* fragrance. The application guides the user through a precisely choreographed sequence of animated sections — from a brand film intro to scroll-driven image sequences, pinned tagline reveals, and editorial parallax — mirroring the luxury aesthetic of the product itself.

<br />

---

<br />

## &nbsp;&nbsp;Experience — Seven Acts

<br />

<div align="center">

| # | Section | Technique | Description |
|:---:|---|---|---|
| `01` | **Video Introduction** | Session-aware autoplay | Brand film on first visit. Progress bar during asset load. |
| `02` | **Hero** | Full-viewport layout | Product name in large-scale type. Animated scroll hint. |
| `03` | **Canvas Sequence** | HTML5 Canvas + frame sync | Hundreds of images painted per scroll position — cinema without video. |
| `04` | **Pinned Taglines** | GSAP `pin` + stagger | *Timeless · Refined · Audacious · Yours* — revealed one by one. |
| `05` | **Editorial** | Parallax + pull-quote | High-res photography, fragrance notes, product section, signature quote. |
| `06` | **Footer** | Navigation + branding | Social links, brand identity, section tags. |
| `07` | **Navigation Menu** | Animated hamburger overlay | Accessible at any scroll depth. Fully animated open/close. |

</div>

<br />

---

<br />

## &nbsp;&nbsp;Technology Stack

<br />

**Core**

```
React 18          →  Component architecture & hooks
TypeScript 5      →  Type safety across all components, props & state
Vite              →  Fast bundling & dev server
HTML5 Canvas      →  Frame-by-frame image sequencing
```

**Animation**

```
GSAP              →  Core tweening engine
ScrollTrigger     →  Scroll-to-animation binding (pin, scrub, snap)
ScrollTo Plugin   →  Programmatic smooth-scroll navigation
CSS Parallax      →  Depth layering on editorial imagery
```

**Patterns**

```
Custom Hooks      →  useScrollTrigger, useAssetPreload
useRef/useEffect  →  Direct DOM access for GSAP targets
Lazy Loading      →  Progressive image delivery
Session Storage   →  Returning user intro suppression
```

<br />

---

<br />

## &nbsp;&nbsp;Fragrance Profile

<br />

<div align="center">

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   Family    →   Oriental Fougère                        │
│   Top        →   Pink Pepper                            │
│   Heart      →   Chestnut                               │
│   Launch     →   2024                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

</div>

<br />

---

<br />

## &nbsp;&nbsp;Architecture

<br />

```
src/
├── components/
│   ├── VideoIntro.tsx        # Intro film + session logic
│   ├── Hero.tsx              # Full-viewport hero + scroll hint
│   ├── CanvasSequence.tsx    # Scroll-driven frame playback
│   ├── Taglines.tsx          # Pinned reveal animation
│   ├── Editorial.tsx         # Parallax content + product section
│   ├── NavMenu.tsx           # Animated hamburger overlay
│   └── Footer.tsx            # Links, branding, navigation
│
├── hooks/
│   ├── useScrollTrigger.ts   # GSAP ScrollTrigger lifecycle
│   └── useAssetPreload.ts    # Image preloading with progress
│
├── assets/
│   ├── frames/               # Canvas image sequence (jpg)
│   └── video/                # Intro brand film
│
└── App.tsx                   # Root — section composition
```

<br />

---

<br />

## &nbsp;&nbsp;Getting Started

<br />

**1. Install dependencies**

```bash
npm install
```

**2. Start development server**

```bash
npm run dev
```

**3. Build for production**

```bash
npm run build
```

**4. Preview production build**

```bash
npm run preview
```

<br />

---

<br />

## &nbsp;&nbsp;Design Principles

<br />

**Scroll as Cinema**  
Every pixel of scroll progress maps to a visual state. GSAP ScrollTrigger acts as the projector — the user's gesture is the timeline scrubber. The canvas sequence is the most direct expression of this: no video codec, no buffering, just images painted at 60fps.

**Performance First**  
Assets are preloaded with a visible progress indicator before the experience begins. The canvas approach replaces video entirely, eliminating decode overhead and format compatibility concerns across devices.

**Returning User Respect**  
Session awareness ensures the intro video surfaces only periodically. Returning visitors skip directly into the hero — the experience respects their time.

**Type Safety Throughout**  
TypeScript interfaces define every prop, state shape, and GSAP target. The compiler enforces correctness before the browser ever runs a line.

<br />

---

<br />

<div align="center">

```
  ·  Timeless  ·  Refined  ·  Audacious  ·  Yours  ·
```

<br />

*The closer you get, the stronger you become.*

<br />

![Emporio Armani](https://img.shields.io/badge/Emporio%20Armani-Stronger%20With%20You-b89a5e?style=for-the-badge)

<br />

</div>