'use client';

import { useEffect, useState } from 'react';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, []);
  return (
    <header className="header">
      <a className="logo" href="#top" aria-label="UIC home">
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
        onClick={() => setOpen(false)}
      >
        <a href="#work">Work</a>
        <a href="#services">Expertise</a>
        <a href="#nfc">Beyond digital</a>
        <a className="nav-cta" href="#contact">
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
