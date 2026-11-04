'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export function CinematicHero() {
  const [isOpened, setIsOpened] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const cardRef = useRef<HTMLDivElement>(null);

  // Synthesized luxury haptic chime (zero external audio files, zero lag)
  const playChime = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
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
    } catch {}
  }, []);

  // 3D Parallax tilt tracking for the Pre-Open Business Card
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

    setCardTilt({ rx, ry, gx, gy });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  // Tap business card to open portal & reveal the hero page
  const handleCardTap = () => {
    if (isOpened) return;
    setIsTapped(true);
    playChime();

    setTimeout(() => {
      setIsOpened(true);
      setIsTapped(false);
    }, 220);
  };

  // Natural scroll listener: scrolling down opens the pre-open portal
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30 && !isOpened) {
        setIsOpened(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpened]);



  return (
    <section
      className={`hero-ref-viewport ${isOpened ? 'portal-is-open' : 'portal-is-closed'}`}
      id="top"
      aria-label="UIC Studio — Craft Your Identity"
    >
      {/* =====================================================================
          PHASE 1: PRE-OPEN BUSINESS CARD GATEWAY (The Entrance Stage)
          ===================================================================== */}
      <div
        className={`portal-card-gateway ${isOpened ? 'is-opened' : ''} ${isTapped ? 'is-tapped' : ''}`}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
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
          <div className="signal-track track-h1">
            <span className="signal-pulse pulse-lime" />
          </div>
          <div className="signal-track track-h2">
            <span className="signal-pulse pulse-bone" />
          </div>
          <div className="signal-track track-v1">
            <span className="signal-pulse pulse-lime-v" />
          </div>
          <div className="signal-track track-v2">
            <span className="signal-pulse pulse-bone-v" />
          </div>

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
          aria-label="Welcome to UIC Business Card. Tap to enter studio."
          className="hero-business-card"
          style={
            {
              '--rx': `${cardTilt.rx}deg`,
              '--ry': `${cardTilt.ry}deg`,
              '--gx': `${cardTilt.gx}%`,
              '--gy': `${cardTilt.gy}%`,
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

          {/* Minimalist Art Details: Corner crosses */}
          <div className="card-art-cross cross-tl" aria-hidden="true">+</div>
          <div className="card-art-cross cross-tr" aria-hidden="true">+</div>
          <div className="card-art-cross cross-bl" aria-hidden="true">+</div>
          <div className="card-art-cross cross-br" aria-hidden="true">+</div>

          {/* Card Header: Brand Monogram + NFC */}
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

          {/* Card Center: "Welcome to Uic" in Syne Contact Greeting Font */}
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

      {/* =====================================================================
          PHASE 2: THE REDESIGNED HERO STAGE (Revealed upon Card Tap / Scroll)
          ===================================================================== */}
      {/* Dynamic Background with Motion Blur & Directional Light Streaks */}
      <div className="hero-ref-backdrop" aria-hidden="true">
        <div className="backdrop-motion-figure">
          <img
            src="/images/hero-tech-motion.jpg"
            alt=""
            className="backdrop-img-core"
            loading="eager"
            decoding="async"
          />
          <div className="backdrop-speed-streaks" />
          <div className="backdrop-light-flare" />
        </div>
        <div className="backdrop-obsidian-veil" />
        <div className="backdrop-vignette" />
      </div>

      <div className="hero-ref-container">
        {/* Top Headline: CRAFT */}
        <div className="hero-ref-top-row">
          <div className="hero-ref-headline-wrap">

            <h1 className="hero-ref-title">
              <span className="title-word-craft">CRAFT</span>
            </h1>
          </div>
        </div>

        {/* Middle Display Headline: // YOUR IDENTITY */}
        <div className="hero-ref-mid-row">
          <div className="hero-ref-title-subgroup">
            <span className="title-slash">//</span>
            <span className="title-word-your">YOUR</span>
          </div>
          <div className="title-word-presence">IDENTITY</div>
        </div>

        </div>
    </section>
  );
}
