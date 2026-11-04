'use client';

import { useEffect, useState } from 'react';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroClosed, setIsHeroClosed] = useState(true);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      if (scrollY > 30) {
        setIsHeroClosed(false);
      }
    };

    const handleHeroOpen = () => {
      setIsHeroClosed(false);
    };

    // Check initial state
    if (typeof window !== 'undefined') {
      if (window.scrollY > 30 || document.documentElement.getAttribute('data-hero-opened') === 'true') {
        setIsHeroClosed(false);
      }
      if (window.scrollY > 20) {
        setIsScrolled(true);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('uic:hero-open', handleHeroOpen);

    const observer = new MutationObserver(() => {
      const state = document.documentElement.getAttribute('data-hero-opened');
      if (state === 'true') {
        setIsHeroClosed(false);
      } else if (state === 'false' && window.scrollY <= 30) {
        setIsHeroClosed(true);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-hero-opened'],
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('uic:hero-open', handleHeroOpen);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = () => {
    setOpen(false);
    setIsHeroClosed(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('uic:hero-open'));
    }
  };

  return (
    <header
      className={`header ${isScrolled ? 'is-scrolled' : ''} ${
        isHeroClosed ? 'is-hero-closed' : 'is-hero-opened'
      }`}
    >
      <a className="logo" href="#top" aria-label="UIC home" onClick={handleNavClick}>
        uic<span>®</span>
      </a>
      <span className="wordmark">
        UNIQUE IDENTITY
        <br />
        CRAFTING
      </span>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        Menu{' '}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </>
          )}
        </svg>
      </button>
      <nav
        id="navigation"
        className={open ? 'open' : ''}
        aria-label="Main navigation"
      >
        <a href="#work" onClick={handleNavClick}>Work</a>
        <a href="#services" onClick={handleNavClick}>Expertise</a>
        <a href="#nfc" onClick={handleNavClick}>Beyond digital</a>
        <a className="nav-cta" href="#contact" onClick={handleNavClick}>
          Let’s talk{' '}
          <svg
            width="12"
            height="12"
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
      </nav>
    </header>
  );
}
