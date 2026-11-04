'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export function CinematicHero() {
  const [isOpened, setIsOpened] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Synthesized luxury haptic chime (zero external audio files, zero lag)
  const playChime = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(1080, now + 0.14);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Graceful fallback if audio is not permitted
    }
  }, []);

  // 3D Parallax tilt tracking mouse position over card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpened) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rx = -((y - cy) / cy) * 12;
    const ry = ((x - cx) / cx) * 15;
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;

    setTilt({ rx, ry, gx, gy });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  // Tap card to open portal & reveal the inside fixed page
  const handleCardTap = () => {
    if (isOpened) return;
    setIsTapped(true);
    playChime();

    setTimeout(() => {
      setIsOpened(true);
      setIsTapped(false);
    }, 220);
  };

  // Smooth scroll to intro studio section
  const scrollToIntro = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('intro')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  // Natural scroll listener: if user scrolls down while card is closed, open the page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40 && !isOpened) {
        setIsOpened(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpened]);

  return (
    <section
      className={`hero-portal ${isOpened ? 'portal-is-open' : 'portal-is-closed'}`}
      id="top"
      aria-label="UIC Studio — Unique Identity Creation"
    >
      <div ref={stageRef} className="portal-stage">
        {/* =================================================================
            1. INSIDE FIXED PAGE (Background Layer Revealed Upon Card Tap)
            ================================================================= */}
        <div className="portal-photo-layer" aria-hidden="true">
          <img
            src="/images/hero-fashion-split.jpg"
            alt="UIC Studio Space"
            className="portal-photo"
            loading="eager"
            decoding="async"
          />
          {/* Subtle Electric Lime and Warm Bone wash */}
          <div className="portal-wash" />
          {/* Deep dark vignette ensuring typography clarity */}
          <div className="portal-vignette" />
          {/* Subtle editorial film grain */}
          <div className="portal-grain" />
        </div>

        {/* =================================================================
            2. FINE HAIRLINE EDITORIAL FRAME
            ================================================================= */}
        <div className="portal-frame" aria-hidden="true">
          <div className="portal-frame-top">
            <span className="portal-meta">UIC STUDIO // PARIS — NYC — TOKYO</span>

            <span className="portal-meta">EST. 2026 · EDITION 01</span>
          </div>
          <div className="portal-frame-hairline" />
        </div>

        {/* =================================================================
            3. INSIDE FIXED PAGE: CENTER WORDMARK & EDITORIAL CONTENT
            ================================================================= */}
        <div className="portal-center">
          {/* Huge "UIC STUDIO." display wordmark */}
          <div className="portal-wordmark" aria-label="UIC STUDIO.">
            <span className="wordmark-part wordmark-uic">UIC</span>
            <span className="wordmark-divider" aria-hidden="true">
              &nbsp;
            </span>
            <span className="wordmark-part wordmark-studio">STUDIO.</span>
          </div>

          {/* Supporting Editorial Content */}
          <div className="portal-editorial">
            <p className="portal-label">UNIQUE IDENTITY CREATION</p>
            <h1 className="portal-headline">Make your presence felt.</h1>
            <p className="portal-desc">
              Distinctive websites. Remarkable identities. Connections that start with a tap.
            </p>
            <div className="portal-actions">
              <a href="#contact" className="portal-cta">
                Let’s create your identity{' '}
                <svg
                  className="cta-arrow"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="6" y1="18" x2="18" y2="6" />
                  <polyline points="9 6 18 6 18 15" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* =================================================================
            4. BUSINESS CARD GATEWAY (Centered in the middle, replaces split panels)
            ================================================================= */}
        <div
          className={`portal-card-gateway ${isOpened ? 'is-opened' : ''} ${isTapped ? 'is-tapped' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Faded Cinematic Skyline Artwork for Pre-Open Hero Section */}
          <div className="portal-gateway-art" aria-hidden="true">
            <img
              src="/images/hero-card-art.jpg"
              alt=""
              className="portal-gateway-art-img"
              loading="eager"
              decoding="async"
            />
            <div className="portal-gateway-art-wash" />
            <div className="portal-gateway-art-vignette" />
          </div>

          {/* Minimal Atmospheric Passing Signals */}
          <div className="portal-signal-field" aria-hidden="true">
            {/* Horizontal Signal Lines */}
            <div className="signal-track track-h1">
              <span className="signal-pulse pulse-lime" />
            </div>
            <div className="signal-track track-h2">
              <span className="signal-pulse pulse-bone" />
            </div>
            {/* Vertical Signal Lines */}
            <div className="signal-track track-v1">
              <span className="signal-pulse pulse-lime-v" />
            </div>
            <div className="signal-track track-v2">
              <span className="signal-pulse pulse-bone-v" />
            </div>

            {/* Micro Coordinates / Signal Pings */}
            <div className="signal-node node-tr">
              <span className="node-dot" />
              <span className="node-ring" />
              <span className="node-label">SIG // 04.92 GHZ</span>
            </div>
            <div className="signal-node node-bl">
              <span className="node-dot dot-lime" />
              <span className="node-ring ring-lime" />
              <span className="node-label">NFC // TX ACTIVE</span>
            </div>
          </div>

          {/* Two small glowing accent dots at the centre */}
          <div className="hero-accent-dots" aria-hidden="true">
            <span className="accent-dot dot-lime" />
            <span className="accent-dot dot-bone" />
          </div>

          {/* Concentric NFC ripple waves on tap */}
          <div className={`portal-card-ripple ${isTapped ? 'active' : ''}`} aria-hidden="true">
            <div className="ripple-ring ring-1" />
            <div className="ripple-ring ring-2" />
            <div className="ripple-ring ring-3" />
          </div>

          {/* The Tilted Minimalist Luxury Business Card */}
          <div
            ref={cardRef}
            role="button"
            tabIndex={0}
            aria-label="Welcome to UIC Business Card. Tap to open studio page."
            className="hero-business-card"
            style={
              {
                '--rx': `${tilt.rx}deg`,
                '--ry': `${tilt.ry}deg`,
                '--gx': `${tilt.gx}%`,
                '--gy': `${tilt.gy}%`,
              } as React.CSSProperties
            }
            onClick={handleCardTap}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardTap();
              }
            }}
          >
            {/* Faded Cinematic Art Artwork on Card */}
            <div className="card-art-texture" aria-hidden="true">
              <img
                src="/images/hero-card-art.jpg"
                alt=""
                className="card-art-texture-img"
                loading="eager"
              />
              <div className="card-art-texture-veil" />
            </div>

            {/* Dynamic specular light reflection sheen */}
            <div className="card-glare-layer" aria-hidden="true" />

            {/* Fine tactile micro-grain overlay */}
            <div className="card-grain-layer" aria-hidden="true" />

            {/* Minimalist Art Details: Corner crosses & perimeter frame */}
            <div className="card-art-cross cross-tl" aria-hidden="true">+</div>
            <div className="card-art-cross cross-tr" aria-hidden="true">+</div>
            <div className="card-art-cross cross-bl" aria-hidden="true">+</div>
            <div className="card-art-cross cross-br" aria-hidden="true">+</div>

            {/* Card Header: Brand Monogram + Contactless NFC Icon */}
            <div className="card-top-row">
              <div className="card-brand-lockup">
                <span className="card-brand-text">uic</span>
                <span className="card-brand-reg">®</span>
              </div>

              <div className="card-nfc-mark" title="NFC Enabled">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8.5 5A12 12 0 0 1 8.5 19" />
                  <path d="M12.5 8A7.5 7.5 0 0 1 12.5 16" />
                  <path d="M16.5 10.5A3.5 3.5 0 0 1 16.5 13.5" />
                </svg>
              </div>
            </div>

            {/* Card Center: "Welcome to UIC" typography (as requested by user) */}
            <div className="card-welcome-center">
              <span className="card-welcome-lead">Welcome to</span>
              <strong className="card-welcome-title">Uic</strong>
            </div>

            {/* Card Footer: Minimalist Metadata & Pass Info */}
            <div className="card-bottom-row">
              <span className="card-meta-tag">UNIQUE IDENTITY CREATION</span>
              <span className="card-pass-code">№ 0089 // TAP PASS</span>
            </div>
          </div>
        </div>

        {/* =================================================================
            5. BOTTOM NAVIGATION BAR
            ================================================================= */}
        <div className="portal-bottom">
          <a
            href="#intro"
            className="portal-bottom-link"
            onClick={scrollToIntro}
            aria-label="Explore the studio"
          >
            Explore the studio{' '}
            <svg
              className="arrow"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>

          <div className="portal-scroll-hint" aria-hidden="true">
            <span className="scroll-hint-bar" />
            <span className="scroll-hint-text">
              {isOpened ? 'Scroll to explore' : 'Tap card or scroll'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
