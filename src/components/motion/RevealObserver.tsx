'use client';

import { useEffect } from 'react';

export function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      '.intro-grid, .section-heading, .project, .services-grid, .nfc-grid, .process-grid article',
    );
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      element.classList.add('reveal');
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove('reveal', 'visible'));
    };
  }, []);
  return null;
}
