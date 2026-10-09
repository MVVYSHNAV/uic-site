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
        Menu <span>+</span>
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
          Let’s talk <span>↗</span>
        </a>
      </nav>
    </header>
  );
}
