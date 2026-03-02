import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProdcutSection.css';
import Swy_intensely from '../../assets/Products/swy-intensely.png';
import Swy_only from '../../assets/Products/swy-only.png';
import Swy_oud from '../../assets/Products/swy-oud.png';
import Swy_sandalwood from '../../assets/Products/swy-sandalwood.png';
import Swy_tobacco from '../../assets/Products/swy-tobacco.png';

gsap.registerPlugin(ScrollTrigger);

const PERFUMES = [
  {
    id: 1,
    name: 'Stronger With You',
    subtitle: 'Intensely',
    year: '2019',
    concentration: 'Eau de Parfum',
    notes: ['Pink Pepper', 'Chestnut', 'Vanilla'],
    price: '$145',
    size: '100ml',
    color: '#C8860A',
    accent: '#FFD166',
    bg: 'linear-gradient(135deg, #1a0e00 0%, #3d2200 50%, #1a0e00 100%)',
    tag: 'BESTSELLER',
    image: Swy_intensely,
  },
  {
    id: 2,
    name: 'Stronger With You',
    subtitle: 'Only',
    year: '2020',
    concentration: 'Eau de Toilette',
    notes: ['Cardamom', 'Sage', 'Cashmeran'],
    price: '$118',
    size: '100ml',
    color: '#2A6DB5',
    accent: '#89C4FF',
    bg: 'linear-gradient(135deg, #00091a 0%, #001f3d 50%, #00091a 100%)',
    tag: 'FRESH',
    image: Swy_only,
  },
  {
    id: 3,
    name: 'Stronger With You',
    subtitle: 'Oud',
    year: '2022',
    concentration: 'Eau de Parfum',
    notes: ['Oud', 'Lavender', 'Vanilla'],
    price: '$155',
    size: '100ml',
    color: '#7B3F00',
    accent: '#D4A574',
    bg: 'linear-gradient(135deg, #120800 0%, #2e1500 50%, #120800 100%)',
    tag: 'EXCLUSIVE',
    image: Swy_oud,
  },
  {
    id: 4,
    name: 'Stronger With You',
    subtitle: 'Sandalwood',
    year: '2025',
    concentration: 'Eau de Parfum',
    notes: ['Saffron', 'Chestnut', 'Sandalwood'],
    price: '$160',
    size: '100ml',
    color: '#2D5A27',
    accent: '#8FD47A',
    bg: 'linear-gradient(135deg, #010d04 0%, #0a2408 50%, #010d04 100%)',
    tag: 'NEW',
    image: Swy_sandalwood,
  },
  {
    id: 5,
    name: 'Stronger With You',
    subtitle: 'Tobacco',
    year: '2024',
    concentration: 'Eau de Parfum',
    notes: ['Pink Pepper', 'Tobacco', 'Bourbon Vanilla'],
    price: '$150',
    size: '100ml',
    color: '#6B3A2A',
    accent: '#D4956A',
    bg: 'linear-gradient(135deg, #120600 0%, #2e1200 50%, #120600 100%)',
    tag: 'BOLD',
    image: Swy_tobacco,
  },
];

// Top 3 featured full-width
const FEATURED = [
  {
    id: 'f1',
    name: 'Stronger With You Intensely',
    desc: 'The most intense, most addictive version of a love story. A bold new chapter written in pink pepper and vanilla.',
    color: '#C8860A',
    accent: '#FFD166',
    bg: 'linear-gradient(120deg, #0d0700 0%, #2b1800 40%, #0d0700 100%)',
    number: '01',
    image: Swy_intensely,
    year: '2019',
  },
  {
    id: 'f2',
    name: 'Stronger With You Oud',
    desc: 'Dark, magnetic, unforgettable. The SWY DNA meets the opulence of Arabian oud.',
    color: '#D4A574',
    accent: '#fff',
    bg: 'linear-gradient(120deg, #120800 0%, #2e1500 40%, #120800 100%)',
    number: '02',
    image: Swy_oud,
    year: '2022',
  },
  {
    id: 'f3',
    name: 'Stronger With You Tobacco',
    desc: 'Spice, smoke, and sweet warmth. Oriental complexity distilled into one irresistible exclusive.',
    color: '#D4956A',
    accent: '#FFD5B5',
    bg: 'linear-gradient(120deg, #120600 0%, #2e1200 40%, #120600 100%)',
    number: '03',
    image: Swy_tobacco,
    year: '2024',
  },
];

export default function ProductSection() {
  const sectionRef      = useRef<HTMLElement>(null);
  const sliderRef       = useRef<HTMLDivElement>(null);
  const trackRef        = useRef<HTMLDivElement>(null);
  const headingRef      = useRef<HTMLDivElement>(null);
  const featuredRef     = useRef<HTMLDivElement>(null);
  const progressRef     = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx]       = useState(0);
  const [isDragging, setIsDragging]     = useState(false);
  const [hoveredCard, setHoveredCard]   = useState<number | null>(null);
  const [mousePos, setMousePos]         = useState({ x: 0, y: 0 });

  const dragStart   = useRef(0);
  const dragScrollX = useRef(0);
  const cardWidth   = useRef(0);

  /* ── scroll-in animations ── */
  useEffect(() => {
    const section  = sectionRef.current;
    const heading  = headingRef.current;
    const featured = featuredRef.current;
    if (!section || !heading || !featured) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading.querySelectorAll('.ps-heading-line'),
        { y: 80, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 0.8, ease: 'power4.out', stagger: 0.1,
          scrollTrigger: { trigger: heading, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(sliderRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sliderRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(featured.querySelectorAll('.featured-card'),
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.75, ease: 'power4.out', stagger: 0.15,
          scrollTrigger: { trigger: featured, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── card width calc ── */
  useEffect(() => {
    const calc = () => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector('.product-card') as HTMLElement;
      if (card) cardWidth.current = card.offsetWidth + 24;
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  /* ── progress bar ── */
  useEffect(() => {
    const fill = progressFillRef.current;
    if (!fill) return;
    fill.style.width = `${((activeIdx + 1) / PERFUMES.length) * 100}%`;
  }, [activeIdx]);

  /* ── navigate ── */
  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(PERFUMES.length - 1, idx));
    setActiveIdx(clamped);
    const track = trackRef.current;
    if (!track) return;
    gsap.to(track, {
      x: -clamped * cardWidth.current,
      duration: 0.7, ease: 'power3.inOut',
    });
  }, []);

  /* ── drag handlers ── */
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    dragStart.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragScrollX.current = -activeIdx * cardWidth.current;
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = x - dragStart.current;
    gsap.set(trackRef.current, { x: dragScrollX.current + delta });
  };

  const onDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const x = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const delta = x - dragStart.current;
    if (delta < -50) goTo(activeIdx + 1);
    else if (delta > 50) goTo(activeIdx - 1);
    else goTo(activeIdx);
  };

  /* ── mouse tracking for hover glow ── */
  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, _idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    const cx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const cy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    gsap.to(e.currentTarget, {
      rotateY: cx * 12,
      rotateX: -cy * 12,
      scale: 1.03,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
    });
  };

  const onCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCard(null);
    gsap.to(e.currentTarget, {
      rotateY: 0, rotateX: 0, scale: 1,
      duration: 0.6, ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <section ref={sectionRef} className="product-section">

      {/* ── Section heading ── */}
      <div ref={headingRef} className="ps-heading">
        <span className="ps-heading-line ps-eyebrow">La Collection · 2024</span>
        <h2 className="ps-heading-line ps-title">The Finest<br /><em>Fragrances</em></h2>
        <p className="ps-heading-line ps-sub">Five signatures. One obsession.</p>
      </div>

      {/* ── Card Slider ── */}
      <div
        ref={sliderRef}
        className="ps-slider"
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div ref={trackRef} className="ps-track">
          {PERFUMES.map((p, i) => (
            <div
              key={p.id}
              className={`product-card ${i === activeIdx ? 'product-card--active' : ''}`}
              style={{ '--card-color': p.color, '--card-accent': p.accent, '--card-bg': p.bg } as React.CSSProperties}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseMove={(e) => onCardMouseMove(e, i)}
              onMouseLeave={onCardMouseLeave}
            >
              {/* Tag */}
              <div className="card-tag">{p.tag}</div>

              {/* Hover spotlight glow */}
              {hoveredCard === i && (
                <div
                  className="card-spotlight"
                  style={{ '--mx': `${mousePos.x}%`, '--my': `${mousePos.y}%` } as React.CSSProperties}
                />
              )}

              {/* Animated rings on hover */}
              <div className="card-rings">
                <div className="card-ring card-ring--1" />
                <div className="card-ring card-ring--2" />
                <div className="card-ring card-ring--3" />
              </div>

              {/* ── REAL BOTTLE IMAGE (replaces 3D CSS element) ── */}
              <div className="card-bottle">
                <div className="card-bottle__glow" />
                <img
                  src={p.image}
                  alt={`${p.name} ${p.subtitle}`}
                  className="card-bottle__img"
                  draggable={false}
                />
                {/* Reflection */}
                <div className="card-bottle__reflection" />
              </div>

              {/* Floating particles on hover */}
              <div className="card-particles">
                {[...Array(8)].map((_, pi) => (
                  <div key={pi} className="card-particle" style={{ '--pi': pi } as React.CSSProperties} />
                ))}
              </div>

              {/* Info */}
              <div className="card-info">
                <div className="card-info__top">
                  <span className="card-concentration">{p.concentration}</span>
                  <span className="card-year">{p.year}</span>
                </div>
                <h3 className="card-name">{p.name}</h3>
                <p className="card-subtitle">{p.subtitle}</p>

                {/* Notes — slide up on hover */}
                <div className="card-notes">
                  {p.notes.map((n, ni) => (
                    <span key={ni} className="card-note" style={{ '--ni': ni } as React.CSSProperties}>
                      {n}
                    </span>
                  ))}
                </div>

                <div className="card-footer">
                  <div className="card-price-block">
                    <span className="card-size">{p.size}</span>
                    <span className="card-price">{p.price}</span>
                  </div>
                  <button className="card-cta">
                    <span className="card-cta__text">Discover</span>
                    <span className="card-cta__arrow">→</span>
                    <div className="card-cta__bg" />
                  </button>
                </div>
              </div>

              {/* Diagonal shine sweep */}
              <div className="card-shine" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="ps-controls">
        <div className="ps-progress">
          <div ref={progressRef} className="ps-progress__track">
            <div ref={progressFillRef} className="ps-progress__fill" />
          </div>
          <span className="ps-counter">
            <em>{String(activeIdx + 1).padStart(2, '0')}</em> / {String(PERFUMES.length).padStart(2, '0')}
          </span>
        </div>
        <div className="ps-arrows">
          <button
            className="ps-arrow ps-arrow--prev"
            onClick={() => goTo(activeIdx - 1)}
            disabled={activeIdx === 0}
          >
            ←
          </button>
          <button
            className="ps-arrow ps-arrow--next"
            onClick={() => goTo(activeIdx + 1)}
            disabled={activeIdx === PERFUMES.length - 1}
          >
            →
          </button>
        </div>
      </div>

      {/* ── Dot nav ── */}
      <div className="ps-dots">
        {PERFUMES.map((_, i) => (
          <button
            key={i}
            className={`ps-dot ${i === activeIdx ? 'ps-dot--active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* ── Divider ── */}
      <div className="ps-divider">
        <div className="ps-divider__line" />
        <span className="ps-divider__text">Top Selection</span>
        <div className="ps-divider__line" />
      </div>

      {/* ── Featured 3 full-width ── */}
      <div ref={featuredRef} className="ps-featured">
        {FEATURED.map((f, _i) => (
          <div
            key={f.id}
            className="featured-card"
            style={{ '--fc': f.color, '--fa': f.accent, '--fb': f.bg } as React.CSSProperties}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const cx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
              const cy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
              gsap.to(e.currentTarget, {
                rotateY: cx * 6, rotateX: -cy * 4, scale: 1.015,
                duration: 0.4, ease: 'power2.out', transformPerspective: 1200,
              });
              const inner = e.currentTarget.querySelector('.featured-card__content') as HTMLElement;
              if (inner) gsap.to(inner, { x: cx * -12, y: cy * -8, duration: 0.4, ease: 'power2.out' });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                rotateY: 0, rotateX: 0, scale: 1,
                duration: 0.8, ease: 'elastic.out(1, 0.5)',
              });
              const inner = e.currentTarget.querySelector('.featured-card__content') as HTMLElement;
              if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
            }}
          >
            {/* Giant number */}
            <div className="featured-card__number">{f.number}</div>

            {/* Animated gradient orb */}
            <div className="featured-card__orb" />

            {/* Shine sweep */}
            <div className="featured-card__shine" />

            {/* Grid lines */}
            <div className="featured-card__grid" />

            <div className="featured-card__content">
              <div className="featured-card__left">
                <span className="featured-card__eyebrow">Emporio Armani · {f.year}</span>
                <h3 className="featured-card__name">{f.name}</h3>
                <p className="featured-card__desc">{f.desc}</p>
                <button className="featured-card__btn">
                  <span>Explore</span>
                  <div className="featured-card__btn-line" />
                </button>
              </div>

              {/* ── REAL BOTTLE IMAGE in featured card ── */}
              <div className="featured-card__bottle-wrap">
                <div className="featured-card__bottle">
                  <div className="featured-card__bottle-glow" />
                  <img
                    src={f.image}
                    alt={f.name}
                    className="featured-card__bottle-img"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="featured-card__corner featured-card__corner--tl" />
            <div className="featured-card__corner featured-card__corner--br" />
          </div>
        ))}
      </div>

    </section>
  );
}