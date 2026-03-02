import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import LogoIntro from '../assets/Videos/LogoIntro2.mp4';
import ProductSection from '../Sections/Product/ProductSection';
import MenuOverlay from '../Sections/Menu/Menu';
import Logo from '../assets/logo.png';
import './MainPage.css';
import Portrait1 from '../assets/portrait1.jpg';
import Portrait2 from '../assets/portrait2.jpg';
import Portrait3 from '../assets/portrait3.jpg';
import MainImage from '../assets/footer.webp';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const TOTAL_FRAMES = 151;
const FRAME_PATH   = (i: number) =>
  `/frames/video3/frame${String(i + 1).padStart(4, '0')}.jpg`;

const REVEAL_LINES = [
  { word: 'Timeless',  label: 'I'   },
  { word: 'Refined',   label: 'II'  },
  { word: 'Audacious', label: 'III' },
  { word: 'Yours',     label: 'IV'  },
];

const SCROLL_PER_WORD = 200;
const CANVAS_SCROLL   = 10000;

function MainPage() {
  const sectionRef          = useRef<HTMLElement>(null);
  const canvasRef           = useRef<HTMLCanvasElement>(null);
  const canvasWrapRef       = useRef<HTMLDivElement>(null);
  const headerRef           = useRef<HTMLElement>(null);
  const heroOverlayRef      = useRef<HTMLDivElement>(null);
  const bottomText1Ref      = useRef<HTMLDivElement>(null);
  const bottomText2Ref      = useRef<HTMLDivElement>(null);
  const blackSpacerRef      = useRef<HTMLDivElement>(null);
  const framesRef           = useRef<ImageBitmap[]>([]);
  const progressRef         = useRef(0);
  const introRef            = useRef<HTMLDivElement>(null);
  const introVideoRef       = useRef<HTMLVideoElement>(null);
  const gradientBridgeRef   = useRef<HTMLDivElement>(null);

  // Editorial refs
  const editorialRef        = useRef<HTMLElement>(null);
  const portraitImgRef      = useRef<HTMLImageElement>(null);
  const editorialEyebrowRef = useRef<HTMLSpanElement>(null);
  const editorialTitleRef   = useRef<HTMLHeadingElement>(null);
  const bgTextRef           = useRef<HTMLDivElement>(null);
  const card1Ref            = useRef<HTMLDivElement>(null);
  const card2Ref            = useRef<HTMLDivElement>(null);
  const card3Ref            = useRef<HTMLDivElement>(null);
  const pullquoteRef        = useRef<HTMLDivElement>(null);
  const footerColsRef       = useRef<HTMLDivElement>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady]               = useState(false);
  const [introDone, setIntroDone]       = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [menuPending, setMenuPending]   = useState(false);

  /* ── intro video ─────────────────────────────── */
  useEffect(() => {
    const lastShown     = localStorage.getItem('introLastShown');
    const thirtyMinutes = 30 * 60 * 1000;
    const now           = Date.now();

    if (lastShown && now - parseInt(lastShown) < thirtyMinutes) {
      setIntroDone(true);
      return;
    }
    const video     = introVideoRef.current;
    const container = introRef.current;
    if (!video || !container) return;
    video.play();
    video.addEventListener('ended', () => {
      localStorage.setItem('introLastShown', String(Date.now()));
      container.style.transition = 'opacity 2s cubic-bezier(0.4,0,0.2,1)';
      container.style.opacity    = '0';
      setTimeout(() => setIntroDone(true), 2000);
    });
  }, []);

  /* ── preload frames ──────────────────────────── */
  useEffect(() => {
    let loaded = 0;
    const bitmaps: ImageBitmap[] = new Array(TOTAL_FRAMES);
    const loadFrame = async (i: number) => {
      const res  = await fetch(FRAME_PATH(i));
      const blob = await res.blob();
      bitmaps[i] = await createImageBitmap(blob);
      loaded++;
      setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
      if (loaded === TOTAL_FRAMES) { framesRef.current = bitmaps; setReady(true); }
    };
    const loadBatch = async (start: number) => {
      const end = Math.min(start + 10, TOTAL_FRAMES);
      await Promise.all(Array.from({ length: end - start }, (_, i) => loadFrame(start + i)));
      if (end < TOTAL_FRAMES) loadBatch(end);
    };
    loadBatch(0);
  }, []);

  /* ── entrance animation ──────────────────────── */
  useEffect(() => {
    if (!introDone) return;
    const header  = headerRef.current;
    const overlay = heroOverlayRef.current;
    if (!header || !overlay) return;
    gsap.set(header,  { y: -80, opacity: 0, filter: 'blur(10px)' });
    gsap.set(overlay, { y: 60,  opacity: 0, filter: 'blur(8px)'  });
    gsap.to(header,  { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.2 });
    gsap.to(overlay, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out', delay: 0.5 });
  }, [introDone]);

  /* ── header / overlay / bottom-text scroll handler ── */
  useEffect(() => {
    if (!introDone) return;
    const header  = headerRef.current;
    const overlay = heroOverlayRef.current;
    const text1   = bottomText1Ref.current;
    const text2   = bottomText2Ref.current;
    if (!header || !overlay || !text1 || !text2) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const p       = Math.min(scrollY / 200, 1);
      const e       = p * p * (3 - 2 * p);

      header.style.transform  = `translateY(${-e * 100}px)`;
      header.style.opacity    = `${1 - e}`;
      header.style.filter     = `blur(${e * 8}px)`;

      overlay.style.transform = `translateY(${e * 100}%) scale(${1 - e * 0.05})`;
      overlay.style.opacity   = `${1 - e}`;
      overlay.style.filter    = `blur(${e * 6}px)`;

      const endFade  = Math.max(0, Math.min((scrollY - 6500) / 500, 1));
      const endEased = endFade * endFade * (3 - 2 * endFade);

      const t1p = Math.max(0, Math.min((scrollY - 250) / 150, 1));
      const t1e = t1p * t1p * (3 - 2 * t1p);
      text1.style.opacity   = `${t1e * (1 - endEased)}`;
      text1.style.transform = `translateY(${(1 - t1e) * 20}px)`;

      const t2p = Math.max(0, Math.min((scrollY - CANVAS_SCROLL * 0.5) / 300, 1));
      const t2e = t2p * t2p * (3 - 2 * t2p);
      text2.style.opacity   = `${t2e * (1 - endEased)}`;
      text2.style.transform = `translateY(${(1 - t2e) * 20}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [introDone]);

  /* ── canvas frames ───────────────────────────── */
  useEffect(() => {
    if (!ready || !introDone) return;

    const canvas     = canvasRef.current!;
    const ctx        = canvas.getContext('2d')!;
    const section    = sectionRef.current!;
    const canvasWrap = canvasWrapRef.current!;
    const frames     = framesRef.current;

    let rw: number, rh: number, ox: number, oy: number, currentIndex = -1;

    const handleResize = () => {
      const img = frames[0]; if (!img) return;
      const sw  = window.innerWidth, sh = window.innerHeight;
      canvas.width  = sw; canvas.height = sh;
      const scale   = Math.max(sw / img.width, sh / img.height);
      rw = img.width * scale; rh = img.height * scale;
      ox = (sw - rw) / 2;    oy = (sh - rh) / 2;
      currentIndex = -1;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    let rafId: number;
    const render = () => {
      const ti = Math.min(Math.floor(progressRef.current * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
      if (ti !== currentIndex) {
        currentIndex = ti;
        const f = frames[currentIndex];
        if (f) { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(f, ox, oy, rw, rh); }
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${CANVAS_SCROLL}`,
      scrub: true,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      refreshPriority: 1,
      onToggle: (self) => {
        const sec = sectionRef.current;
        if (sec) sec.style.zIndex = self.isActive ? '5' : 'auto';
      },
      onUpdate: (self) => {
        progressRef.current = self.progress;
        canvasWrap.style.borderRadius = '0';
        canvasWrap.style.transform    = 'scale(1)';
      },
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      st.kill();
    };
  }, [ready, introDone]);

  /* ── pinned word reveal ──────────────────────── */
  useEffect(() => {
    if (!introDone || !ready) return;
    const spacer = blackSpacerRef.current;
    if (!spacer) return;

    const timeout = setTimeout(() => {
      const covers = spacer.querySelectorAll<HTMLElement>('.word-cover');
      if (!covers.length) return;

      gsap.set(covers, { scaleX: 1, transformOrigin: 'left center' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: 'top top',
          end: `+=${SCROLL_PER_WORD * covers.length}`,
          scrub: 0.3,
          pin: true,
          pinSpacing: true,
          refreshPriority: 0,
          invalidateOnRefresh: true,
        },
      });

      covers.forEach((cover, i) => {
        tl.to(cover, {
          scaleX: 0,
          transformOrigin: 'left center',
          ease: 'none',
          duration: 1,
        }, i);
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === blackSpacerRef.current) t.kill();
      });
    };
  }, [introDone, ready]);

  /* ── editorial GSAP animations ───────────────── */
  useEffect(() => {
    if (!introDone || !ready) return;

    const editorial  = editorialRef.current;
    const portraitEl = portraitImgRef.current;
    const eyebrow    = editorialEyebrowRef.current;
    const title      = editorialTitleRef.current;
    const bgText     = bgTextRef.current;
    const card1      = card1Ref.current;
    const card2      = card2Ref.current;
    const card3      = card3Ref.current;
    const pullquote  = pullquoteRef.current;
    const footerCols = footerColsRef.current;

    if (!editorial || !portraitEl || !eyebrow || !title || !bgText ||
        !card1 || !card2 || !card3 || !pullquote || !footerCols) return;

    const ctx = gsap.context(() => {

      gsap.to(portraitEl, {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: editorial, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      gsap.fromTo(bgText,
        { yPercent: 15, opacity: 0 },
        { yPercent: -15, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: editorial, start: 'top 80%', end: 'center center', scrub: 0.5 } }
      );

      gsap.fromTo(eyebrow,
        { x: -50, opacity: 0, filter: 'blur(4px)' },
        { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power4.out',
          scrollTrigger: { trigger: editorial, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );

      const titleLines = title.querySelectorAll('.title-line');
      gsap.fromTo(titleLines,
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power4.out', stagger: 0.08,
          scrollTrigger: { trigger: editorial, start: 'top 70%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(card1,
        { x: -140, y: 40, rotation: -12, opacity: 0, filter: 'blur(6px)' },
        { x: 0, y: 0, rotation: -5, opacity: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power4.out',
          scrollTrigger: { trigger: card1, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(card2,
        { y: 100, opacity: 0, scale: 0.9, filter: 'blur(8px)' },
        { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power4.out',
          scrollTrigger: { trigger: card2, start: 'top 88%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(card3,
        { x: 120, y: 30, rotation: 10, opacity: 0, filter: 'blur(6px)' },
        { x: 0, y: 0, rotation: 4.5, opacity: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power4.out',
          scrollTrigger: { trigger: card3, start: 'top 88%', toggleActions: 'play none none reverse' } }
      );

      const quoteLines = pullquote.querySelectorAll('span, p');
      gsap.fromTo(quoteLines,
        { y: 30, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: pullquote, start: 'top 90%', toggleActions: 'play none none reverse' } }
      );

      const cols = footerCols.querySelectorAll('.armani-editorial__col');
      gsap.fromTo(cols,
        { y: 25, opacity: 0, filter: 'blur(3px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: footerCols, start: 'top 90%', toggleActions: 'play none none reverse' } }
      );

      gsap.to([title, eyebrow], {
        y: -50, opacity: 0, filter: 'blur(6px)', ease: 'none',
        scrollTrigger: { trigger: editorial, start: 'bottom 60%', end: 'bottom top', scrub: 0.5 },
      });

    }, editorial);

    return () => ctx.revert();
  }, [introDone, ready]);

  return (
    <>
      {/* ── Menu overlay ── */}
      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        openDelay={550}
        onPendingChange={(p) => setMenuPending(p)}
      />

      {/* ── Header ── */}
      <header ref={headerRef} className="header">
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className={`header__menu-btn${menuPending ? ' is-pending' : ''}`}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none' }} />
        </button>
        <img src={Logo} alt="logo" className="header__logo" />
        <span className="header__brand">Creator</span>
      </header>

      {introDone && (
        <div ref={heroOverlayRef} className="hero-overlay">
          <div className="hero-overlay__inner">
            <p className="hero-overlay__eyebrow">Est. 2024</p>
            <h1 className="hero-overlay__title">Stronger<br /><span>With You</span></h1>
            <div className="hero-overlay__scroll-hint">
              <span className="hero-overlay__scroll-label">Scroll</span>
              <div className="hero-overlay__scroll-line">
                <div className="hero-overlay__scroll-dot" />
              </div>
            </div>
          </div>
        </div>
      )}

      {introDone && (
        <div ref={bottomText1Ref} className="bottom-text bottom-text--1">
          <div className="bottom-text__bar" />
          <div className="bottom-text__content">
            <p className="bottom-text__label">Emporio Armani</p>
            <p className="bottom-text__title">Stronger With You</p>
          </div>
        </div>
      )}

      {introDone && (
        <div ref={bottomText2Ref} className="bottom-text bottom-text--2">
          <div className="bottom-text__bar" />
          <div className="bottom-text__content">
            <p className="bottom-text__label">New Fragrance</p>
            <p className="bottom-text__title">Parfum — 2024</p>
          </div>
        </div>
      )}

      <main className="main-wrapper">
        {!introDone && (
          <div ref={introRef} className="intro-overlay">
            <video ref={introVideoRef} src={LogoIntro} muted playsInline />
            <div className="intro-overlay__loader">
              <p>{loadProgress}%</p>
              <div className="loader-bar">
                <div className="loader-bar__fill" style={{ width: `${loadProgress}%` }} />
              </div>
            </div>
          </div>
        )}

        {introDone && !ready && (
          <div className="loading-screen">
            <p>{loadProgress}%</p>
            <div className="loader-bar">
              <div className="loader-bar__fill" style={{ width: `${loadProgress}%` }} />
            </div>
          </div>
        )}

        {/* ── Canvas section — ID used by menu scroll ── */}
        <section ref={sectionRef} id="canvas-section" className="scroll-section">
          <div ref={canvasWrapRef} className="canvas-wrap">
            <canvas ref={canvasRef} />
          </div>
        </section>

        {/* ── Gradient bridge ── */}
        <div ref={gradientBridgeRef} className="gradient-bridge" />

        {/* ── Pinned word reveal — ID used by menu scroll ── */}
        <div ref={blackSpacerRef} id="reveal-section" className="black-spacer">
          <div className="reveal-rule reveal-rule--top" />
          <div className="reveal-words">
            {REVEAL_LINES.map(({ word, label }, i) => (
              <div key={i} className="reveal-word-row">
                <span className="reveal-word-index">{label}</span>
                <span className="reveal-word-text">{word}</span>
                <span className="word-cover" />
              </div>
            ))}
          </div>
          <div className="reveal-rule reveal-rule--bottom">
            <span className="reveal-tagline">Emporio Armani · Parfum 2024</span>
          </div>
        </div>

        {/* ── Armani Editorial Section — ID used by menu scroll ── */}
        <section ref={editorialRef} id="editorial-section" className="armani-editorial">

          <div className="armani-editorial__portrait">
            <img ref={portraitImgRef} src={MainImage} alt="Emporio Armani" />
            <div className="armani-editorial__portrait-vignette" />
          </div>

          <div ref={bgTextRef} className="armani-editorial__bg-text">ARMANI</div>

          <div className="armani-editorial__header">
            <span ref={editorialEyebrowRef} className="armani-editorial__eyebrow">
              Emporio Armani · 2024
            </span>
            <h2 ref={editorialTitleRef} className="armani-editorial__title">
              <span className="title-line">Stronger</span>
              <span className="title-line">With You</span>
              <span className="title-line"><em>Intensely</em></span>
            </h2>
          </div>

          <div className="armani-editorial__journal">
            <div ref={card1Ref} className="journal-img journal-img--1">
              <div className="journal-img__inner">
                <img src={Portrait1} alt="Campaign" />
                <div className="journal-img__caption">Campaign · Milano 2024</div>
              </div>
            </div>

            <div ref={card2Ref} className="journal-img journal-img--2">
              <div className="journal-img__inner">
                <img src={Portrait2} alt="Fragrance" />
                <div className="journal-img__caption">L'Intensité · Edition</div>
              </div>
            </div>

            <div ref={card3Ref} className="journal-img journal-img--3">
              <div className="journal-img__inner">
                <img src={Portrait3} alt="Portrait" />
                <div className="journal-img__caption">Portrait · Giorgio</div>
              </div>
            </div>

            <div ref={pullquoteRef} className="journal-pullquote">
              <span>"</span>
              <p>A bolder, deeper<br />expression of love.</p>
            </div>
          </div>

          <div className="armani-editorial__footer">
            <div className="armani-editorial__footer-line" />
            <div ref={footerColsRef} className="armani-editorial__footer-cols">
              <div className="armani-editorial__col">
                <p className="armani-editorial__col-label">Fragrance Family</p>
                <p className="armani-editorial__col-value">Oriental Fougère</p>
              </div>
              <div className="armani-editorial__col">
                <p className="armani-editorial__col-label">Top Notes</p>
                <p className="armani-editorial__col-value">Pink Pepper · Chestnut</p>
              </div>
              <div className="armani-editorial__col">
                <p className="armani-editorial__col-label">Year</p>
                <p className="armani-editorial__col-value">2024</p>
              </div>
            </div>
          </div>

          <ProductSection />

        </section>

      </main>

      {/* Fixed bg image */}
      <div className="footer-bg-image">
        <img src={MainImage} alt="Emporio Armani campaign" />
        <div className="footer-bg-image__overlay" />
      </div>

      <div className="footer-scene">
        <footer className="armani-footer">
          <div className="armani-footer__body">

            <div className="armani-footer__brand-col">
              <div className="armani-footer__wordmark">
                Ay <em>Community</em>
              </div>
              <div className="armani-footer__community-label">
                <span>Est. 2024</span>
              </div>
              <p className="armani-footer__desc">
                A space built for those who wear their identity with intention.
                Curated drops, editorial stories, and a community of people
                who understand that style is not a surface — it is a stance.
              </p>
              <div className="armani-footer__socials">
                {['Ig', 'Tw', 'Tk', 'Yt'].map((s) => (
                  <span key={s} className="armani-footer__social-link">{s}</span>
                ))}
              </div>
            </div>

            <div className="armani-footer__divider" />

            <div className="armani-footer__right">
              <span className="armani-footer__index-num">2024</span>
              <div className="armani-footer__tags">
                {['Fragrances', 'Editorial', 'Campaign', 'Members', 'Drops', 'Contact', 'Journal', 'Milano'].map((tag) => (
                  <span key={tag} className="armani-footer__tag">{tag}</span>
                ))}
              </div>
            </div>

          </div>

          <div className="armani-footer__bottom">
            <span className="armani-footer__copy">© {new Date().getFullYear()} Ay Community. All rights reserved.</span>
            <span className="armani-footer__sigil">A·C</span>
            <div className="armani-footer__legal">
              {['Privacy', 'Terms', 'Cookies'].map((l) => (
                <span key={l} className="armani-footer__legal-link">{l}</span>
              ))}
            </div>
          </div>
        </footer>

        <div className="footer-reveal-spacer" />
      </div>
    </>
  );
}

export default MainPage;