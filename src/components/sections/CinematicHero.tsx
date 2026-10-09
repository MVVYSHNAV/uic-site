'use client';

import { useRef } from 'react';
import { useCinematicScroll } from '@/hooks/use-cinematic-scroll';

export function CinematicHero() {
  const storyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  useCinematicScroll(storyRef, stageRef);
  function skipIntro() {
    document.getElementById('intro')?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }
  return (
    <section ref={storyRef} className="story" id="top" aria-label="From invisible to unforgettable">
      <div ref={stageRef} className="story-stage">
        <div className="grain"></div>
        <div className="hero-copy">
          <p className="eyebrow">YOU WERE NEVER MEANT TO BLEND IN.</p>
          <h1>
            Make your
            <br />
            presence <em>felt.</em>
          </h1>
          <p>
            We turn what makes you different into
            <br />
            something the world can’t ignore.
          </p>
        </div>
        <div className="scene" aria-hidden="true">
          <div className="spotlight"></div>
          <div className="portal">
            <div className="portal-core"></div>
            <span>YOUR NEXT CHAPTER</span>
          </div>
          <div className="floor"></div>
          <svg className="human" viewBox="0 0 300 400">
            <defs>
              <linearGradient id="body" x1="0" x2="1">
                <stop stopColor="#52565c" />
                <stop offset=".5" stopColor="#c1c4c7" />
                <stop offset="1" stopColor="#31343a" />
              </linearGradient>
            </defs>
            <ellipse
              className="shadow"
              cx="150"
              cy="370"
              rx="90"
              ry="11"
              fill="#000"
              opacity=".65"
            />
            <g className="chair" stroke="#606269" strokeWidth="5" fill="none">
              <path d="M100 235V330M100 290H205V350M110 295L100 370M190 300L205 370" />
            </g>
            <g className="person">
              <ellipse cx="150" cy="108" rx="24" ry="30" fill="url(#body)" />
              <path
                className="torso"
                d="M132 141 Q150 131 168 142 L184 230 Q153 251 117 231Z"
                fill="url(#body)"
              />
              <path className="arm left" d="M131 153 Q111 181 111 217 L138 239" />
              <path className="arm right" d="M170 153 Q185 186 187 216 L163 238" />
              <path className="leg left" d="M133 231 L158 286 L124 347 L102 351" />
              <path className="leg right" d="M162 235 L200 285 L196 353 L218 357" />
            </g>
          </svg>
          <div className="world-card web-card">
            <div className="card-top">
              <span>◉</span> WEB EXPERIENCES <span>↗</span>
            </div>
            <strong>
              Ideas.
              <br />
              Made tangible.
            </strong>
            <div className="mini-orbit"></div>
            <small>DIGITAL FLAGSHIP / 01</small>
          </div>
          <div className="world-card erp-card">
            <div className="card-top">
              CONNECTED BUSINESS <span>↗</span>
            </div>
            <div className="chart">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
            <strong>
              Less friction.
              <br />
              More flow.
            </strong>
            <small>ERP & AUTOMATION / 02</small>
          </div>
          <div className="world-card brand-card">
            <small>IDENTITY SYSTEMS / 03</small>
            <strong>
              Different
              <br />
              by design.
            </strong>
            <span className="brand-symbol">✳</span>
          </div>
        </div>
        <div className="chapter-copy">
          <span className="eyebrow">A NEW WORLD OF POSSIBILITY</span>
          <h2>
            Your identity.
            <br />
            <em>In full color.</em>
          </h2>
          <p>
            Brand. Digital. Systems. Real-world connections.
            <br />
            One distinctive presence, everywhere it matters.
          </p>
          <a className="text-link" href="#work">
            Explore what we craft ↘
          </a>
        </div>
        <div className="story-bottom">
          <a href="#intro">
            SCROLL TO DISCOVER <span>↓</span>
          </a>
          <span className="chapter-number">01 — THE POSSIBILITY</span>
          <button className="skip-story" type="button" onClick={skipIntro}>
            Skip intro ↘
          </button>
        </div>
        <div className="story-progress"></div>
      </div>
    </section>
  );
}
