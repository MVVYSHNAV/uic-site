'use client';

import { useRef } from 'react';
import { useCinematicScroll } from '@/hooks/use-cinematic-scroll';

export function CinematicHero() {
  const storyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useCinematicScroll(storyRef, stageRef);

  function scrollToStudio(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document.getElementById('intro')?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  return (
    <section
      ref={storyRef}
      className="hero-portal"
      id="top"
      aria-label="UIC Studio — Unique Identity Creation"
    >
      <div ref={stageRef} className="portal-stage">
        {/* 1. Cinematic Hero Photograph Layer (Deep Ambient Continuum) */}
        <div className="portal-photo-layer" aria-hidden="true">
          <img
            src="/images/hero-fashion-split.jpg"
            alt="UIC Studio Space"
            className="portal-photo"
            loading="eager"
            decoding="async"
          />
          {/* Subtle Amber and Teal photographic wash */}
          <div className="portal-wash" />
          {/* Dark vignette ensuring bone typography stands out crisply */}
          <div className="portal-vignette" />
          {/* Subtle editorial film grain */}
          <div className="portal-grain" />
        </div>

        {/* 2. Split Screen Image Panels with Blended Fashion Image that splits on scroll */}
        <div className="portal-panel portal-panel-left" aria-hidden="true">
          <div className="portal-panel-inner">
            <img
              src="/images/hero-fashion-split.jpg"
              alt="UIC Studio Space - Left Half"
              className="portal-split-photo portal-split-photo-left"
              loading="eager"
              decoding="async"
            />
            {/* Blended Scrim & Studio Tone Overlays */}
            <div className="portal-split-scrim portal-split-scrim-left" />
            <div className="portal-split-wash portal-split-wash-amber" />
          </div>
        </div>

        <div className="portal-panel portal-panel-right" aria-hidden="true">
          <div className="portal-panel-inner">
            <img
              src="/images/hero-fashion-split.jpg"
              alt="UIC Studio Space - Right Half"
              className="portal-split-photo portal-split-photo-right"
              loading="eager"
              decoding="async"
            />
            {/* Blended Scrim & Studio Tone Overlays */}
            <div className="portal-split-scrim portal-split-scrim-right" />
            <div className="portal-split-wash portal-split-wash-teal" />
          </div>
        </div>

        {/* 4. Fine Hairline Editorial Frame */}
        <div className="portal-frame" aria-hidden="true">
          <div className="portal-frame-hairline" />
        </div>

        {/* 5. Center Composition: Wordmark & Supporting Editorial Content */}
        <div className="portal-center">
          {/* Huge "UIC STUDIO." wordmark split into "UIC" and "STUDIO." */}
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

        {/* 6. Bottom Navigation Bar */}
        <div className="portal-bottom">
          <a
            href="#intro"
            className="portal-bottom-link"
            onClick={scrollToStudio}
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
            <span className="scroll-hint-text">Scroll to open</span>
          </div>
        </div>

        {/* Noscript fallback for when JavaScript is disabled */}
        <noscript>
          <style>{`
            .portal-panel { display: none !important; }
            .portal-photo { transform: scale(1) !important; }
            .portal-wash { opacity: 0.75 !important; }
            .portal-editorial { opacity: 1 !important; transform: none !important; }
            .portal-scroll-hint { display: none !important; }
            .wordmark-uic { transform: translateX(-30px) !important; }
            .wordmark-studio { transform: translateX(30px) !important; }
          `}</style>
        </noscript>
      </div>
    </section>
  );
}
