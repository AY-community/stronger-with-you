import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './Menu.css';

// Import menu images
import campaignImage from '../../assets/Menu/campaign.jpg';
import collectionImage from '../../assets/Menu/collection.webp';
import communityImage from '../../assets/Menu/community.jpg';
import experienceImage from '../../assets/Menu/experience.jpg';
import instagramImage from '../../assets/Menu/instagram.jpg';
import sephoraImage from '../../assets/Menu/sephora.jpg';
import defaultImage from '../../assets/Menu/default.webp';

gsap.registerPlugin(ScrollToPlugin);

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  openDelay?: number;
  onPendingChange?: (pending: boolean) => void;
}

type NavItem = {
  index: string;
  label: string;
  sub: string;
  /** '#section-id' for internal smooth scroll, 'https://...' for external */
  href: string;
  external?: boolean;
  tag?: string; // small badge like "New" or "↗"
};

const NAV_ITEMS: NavItem[] = [
  {
    index: '01',
    label: 'Experience',
    sub: 'The Fragrance Journey',
    href: '#canvas-section',
    tag: '↓',
  },
  {
    index: '02',
    label: 'Campaign',
    sub: 'Stronger With You · 2024',
    href: '#editorial-section',
    tag: '↓',
  },
  {
    index: '03',
    label: 'Collection',
    sub: 'Shop Emporio Armani',
    href: 'https://www.armani.com/en-us/experience/emporio-armani/fragrances/',
    external: true,
    tag: '↗',
  },
  {
    index: '04',
    label: 'Sephora',
    sub: 'Find It Near You',
    href: 'https://www.sephora.com/brand/emporio-armani',
    external: true,
    tag: '↗',
  },
  {
    index: '05',
    label: 'Community',
    sub: 'Ay Community — Members',
    href: '#reveal-section',
    tag: '↓',
  },
  {
    index: '06',
    label: 'Instagram',
    sub: '@emporioarmani',
    href: 'https://www.instagram.com/emporioarmani',
    external: true,
    tag: '↗',
  },
];

const MENU_IMAGES = [
  experienceImage,
  campaignImage,
  collectionImage,
  sephoraImage,
  communityImage,
  instagramImage,
];

const HOVER_COLORS = [
  '#d4a052',
  '#c9966b',
  '#d4a052',
  '#e0c080',
  '#b8a28c',
  '#c0a060',
];

/**
 * Smooth-scrolls to a section ID even inside GSAP-pinned containers.
 * Uses ScrollToPlugin so ScrollTrigger positions are respected.
 */
function scrollToSection(id: string) {
  const el = document.querySelector<HTMLElement>(id);
  if (!el) return;

  // ScrollTrigger stores the true scroll position — use that
  const top = el.getBoundingClientRect().top + window.scrollY;

  gsap.to(window, {
    scrollTo: { y: top, autoKill: false },
    duration: 1.4,
    ease: 'power4.inOut',
  });
}

export default function MenuOverlay({
  isOpen,
  onClose,
  openDelay = 550,
  onPendingChange,
}: MenuOverlayProps) {
  const overlayRef    = useRef<HTMLDivElement>(null);
  const curtainRef    = useRef<HTMLDivElement>(null);
  const curtain2Ref   = useRef<HTMLDivElement>(null);
  const navItemsRef   = useRef<HTMLLIElement[]>([]);
  const footerRef     = useRef<HTMLDivElement>(null);
  const imgPanelRef   = useRef<HTMLDivElement>(null);
  const rulerRef      = useRef<HTMLDivElement>(null);
  const tlRef         = useRef<gsap.core.Timeline | null>(null);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const notifyPending = useCallback((v: boolean) => {
    onPendingChange?.(v);
  }, [onPendingChange]);

  /* ── Delay gate ── */
  useEffect(() => {
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);

    if (isOpen) {
      notifyPending(true);
      delayTimerRef.current = setTimeout(() => {
        notifyPending(false);
        setShouldAnimate(true);
      }, openDelay);
    } else {
      notifyPending(false);
      setShouldAnimate(false);
    }

    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    };
  }, [isOpen, openDelay, notifyPending]);

  /* ── GSAP open / close ── */
  useEffect(() => {
    const overlay  = overlayRef.current;
    const curtain  = curtainRef.current;
    const curtain2 = curtain2Ref.current;
    const items    = navItemsRef.current;
    const footer   = footerRef.current;
    const imgPanel = imgPanelRef.current;
    const ruler    = rulerRef.current;
    if (!overlay || !curtain || !curtain2 || !footer || !imgPanel || !ruler) return;

    if (tlRef.current) tlRef.current.kill();

    if (shouldAnimate) {
      overlay.style.pointerEvents = 'all';
      overlay.style.visibility    = 'visible';

      const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
      tlRef.current = tl;

      tl.set(curtain,  { scaleY: 0, transformOrigin: 'top center' })
        .set(curtain2, { scaleY: 0, transformOrigin: 'top center' })
        .set(overlay,  { opacity: 1 })
        .to(curtain,   { scaleY: 1, duration: 0.6 })
        .to(curtain2,  { scaleY: 1, duration: 0.5 }, '-=0.4')
        .fromTo(ruler,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.7, ease: 'power4.inOut' },
          '-=0.3'
        )
        .fromTo(imgPanel,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.7, ease: 'power4.out' },
          '-=0.5'
        )
        .fromTo(items,
          { y: 80, opacity: 0, clipPath: 'inset(0 0 100% 0)', filter: 'blur(4px)' },
          {
            y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', filter: 'blur(0px)',
            duration: 0.55, ease: 'power4.out', stagger: 0.07,
          },
          '-=0.45'
        )
        .fromTo(footer,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.2'
        );

    } else if (!isOpen) {
      const tl = gsap.timeline({ defaults: { ease: 'power4.in' } });
      tlRef.current = tl;

      tl.to(items,   { y: -60, opacity: 0, clipPath: 'inset(0 0 100% 0)', duration: 0.35, stagger: 0.04 })
        .to([footer, imgPanel], { opacity: 0, duration: 0.3 }, '-=0.2')
        .to(curtain2, { scaleY: 0, transformOrigin: 'bottom center', duration: 0.4 }, '-=0.1')
        .to(curtain,  { scaleY: 0, transformOrigin: 'bottom center', duration: 0.45 }, '-=0.3')
        .set(overlay, { opacity: 0, visibility: 'hidden', pointerEvents: 'none' })
        .set(items,   { clearProps: 'all' });
    }
  }, [shouldAnimate, isOpen]);

  /* ── keyboard close ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* ── nav click handler ── */
  const handleNavClick = (item: NavItem) => {
    onClose();

    if (item.external) {
      // slight delay so close animation starts first
      setTimeout(() => window.open(item.href, '_blank', 'noopener,noreferrer'), 350);
    } else {
      // wait for close animation to finish, then scroll
      setTimeout(() => scrollToSection(item.href), 700);
    }
  };

  return (
    <div ref={overlayRef} className="mo-overlay">

      <div ref={curtainRef}  className="mo-curtain mo-curtain--1" />
      <div ref={curtain2Ref} className="mo-curtain mo-curtain--2" />
      <div className="mo-grain" />

      <button className="mo-close" onClick={onClose} aria-label="Close menu">
        <span className="mo-close__line mo-close__line--1" />
        <span className="mo-close__line mo-close__line--2" />
        <span className="mo-close__ring" />
      </button>

      <div className="mo-inner">

        <nav className="mo-nav">
          <div ref={rulerRef} className="mo-nav__ruler" />
          <ul className="mo-nav__list">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={i}
                ref={(el) => { if (el) navItemsRef.current[i] = el; }}
                className={[
                  'mo-nav__item',
                  hoveredItem === i ? 'is-hovered' : '',
                  hoveredItem !== null && hoveredItem !== i ? 'is-dimmed' : '',
                  item.external ? 'is-external' : '',
                ].join(' ').trim()}
                onMouseEnter={() => { setHoveredItem(i); setActiveIndex(i); }}
                onMouseLeave={() => { setHoveredItem(null); setActiveIndex(null); }}
                onClick={() => handleNavClick(item)}
              >
                <span
                  className="mo-nav__item-index"
                  style={{ color: hoveredItem === i ? HOVER_COLORS[i] : undefined }}
                >
                  {item.index}
                </span>

                <span className="mo-nav__item-inner">
                  <span
                    className="mo-nav__item-label"
                    style={{ '--hover-color': HOVER_COLORS[i] } as React.CSSProperties}
                  >
                    {item.label}
                  </span>
                  <span className="mo-nav__item-sub">{item.sub}</span>
                </span>

                {item.tag && (
                  <span
                    className={`mo-nav__item-tag ${item.external ? 'mo-nav__item-tag--ext' : ''}`}
                  >
                    {item.tag}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div ref={imgPanelRef} className="mo-panel">
          <div className="mo-panel__img-wrap">
            <img
              src={activeIndex !== null ? MENU_IMAGES[activeIndex] : defaultImage}
              className="mo-panel__img"
              alt={activeIndex !== null ? NAV_ITEMS[activeIndex].label : 'Default'}
              style={{
                opacity: 1,
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
            <div
              className="mo-panel__img-bg"
              style={{
                background: activeIndex !== null
                  ? 'linear-gradient(135deg, #0a0806 0%, #1a1208 40%, rgba(212,160,82,0.12) 100%)'
                  : 'linear-gradient(135deg, #080808 0%, #111 100%)',
                transition: 'background 0.6s ease',
              }}
            />
            <div className="mo-panel__img-text">
              {activeIndex !== null ? (
                <>
                  <span className="mo-panel__img-eyebrow">
                    {NAV_ITEMS[activeIndex].index} / 06
                    {NAV_ITEMS[activeIndex].external && (
                      <span className="mo-panel__ext-badge">External</span>
                    )}
                  </span>
                  <h3 className="mo-panel__img-title">{NAV_ITEMS[activeIndex].label}</h3>
                  <p className="mo-panel__img-sub">{NAV_ITEMS[activeIndex].sub}</p>
                </>
              ) : (
                <>
                  <span className="mo-panel__img-eyebrow">Ay Community</span>
                  <h3 className="mo-panel__img-title">Est.<br />2024</h3>
                </>
              )}
            </div>
            <div className="mo-panel__ghost-text">
              {activeIndex !== null ? NAV_ITEMS[activeIndex].label : 'AY'}
            </div>
            <div className="mo-panel__deco-lines"><span /><span /><span /></div>
          </div>

          <div className="mo-panel__ticker">
            <span className="mo-panel__ticker-num">
              {activeIndex !== null ? NAV_ITEMS[activeIndex].index : '—'}
            </span>
            <span className="mo-panel__ticker-slash">/</span>
            <span className="mo-panel__ticker-total">06</span>
          </div>
        </div>

      </div>

      <div ref={footerRef} className="mo-footer">
        <span className="mo-footer__copy">© 2024 Ay Community</span>
        <div className="mo-footer__links">
          {['Privacy', 'Terms', 'Contact'].map((l) => (
            <span key={l} className="mo-footer__link">{l}</span>
          ))}
        </div>
        <span className="mo-footer__sigil">A·C</span>
      </div>

    </div>
  );
}