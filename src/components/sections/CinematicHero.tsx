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
        {/* 1. Cinematic Hero Photograph Layer */}
        <div className="portal-photo-layer" aria-hidden="true">
          <img
            src="/images/projects/ds_gal.jpg"
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

        {/* 2. Two Opaque Dark Panels meeting precisely at the centre */}
        <div className="portal-panel portal-panel-left" aria-hidden="true" />
        <div className="portal-panel portal-panel-right" aria-hidden="true" />

        {/* 3. Tiny Accent Dots moving from centre toward opposite corners */}
        <div className="portal-dots-layer" aria-hidden="true">
          <div className="portal-dot portal-dot-amber" />
          <div className="portal-dot portal-dot-teal" />
        </div>

        {/* 4. Fine Hairline Editorial Frame & Corner Metadata */}
        <div className="portal-frame" aria-hidden="true">
          <div className="portal-frame-top">
            <span className="portal-meta">INDEPENDENT DESIGN STUDIO</span>
            <span className="portal-meta">01 / UIC</span>
          </div>
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
                Let’s create your identity <span className="cta-arrow" aria-hidden="true">↗</span>
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
            Explore the studio <span className="arrow" aria-hidden="true">↓</span>
          </a>

          <div className="portal-scroll-hint" aria-hidden="true">
            <span className="scroll-hint-bar" />
            <span className="scroll-hint-text">Scroll to open</span>
          </div>

          <div className="portal-bottom-code" aria-hidden="true">
            <span>UNIQUE IDENTITY CRAFTING</span>
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
