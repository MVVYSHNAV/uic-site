import { useEffect, type RefObject } from 'react';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Keeps animation updates off React's render path and cleans up on navigation/unmount. */
export function useCinematicScroll(
  storyRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const story = storyRef.current;
    const stage = stageRef.current;
    if (!story || !stage) return;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    function paint() {
      if (!story || !stage) return;
      frame = 0;
      const distance = Math.max(1, story.offsetHeight - innerHeight);
      const progress = reducedMotion.matches
        ? 0
        : clamp(-story.getBoundingClientRect().top / distance);
      const rise = clamp((progress - 0.08) / 0.22);
      const world = clamp((progress - 0.28) / 0.28);
      const chapter = clamp((progress - 0.43) / 0.18);
      const walk = clamp((progress - 0.3) / 0.4);
      const variables: Record<string, string | number> = {
        '--p': progress,
        '--hero-opacity': 1 - clamp((progress - 0.2) / 0.18),
        '--hero-y': `${-progress * 65}px`,
        '--rise': `${-rise * 65}px`,
        '--chair-opacity': 1 - rise,
        '--human-x': `${walk * (innerWidth < 700 ? 65 : 150)}px`,
        '--human-scale': 1 - walk * 0.18,
        '--human-opacity': 1 - clamp((progress - 0.55) / 0.2),
        '--leg-left': `${rise * -22 + Math.sin(walk * 14) * walk * 12}deg`,
        '--leg-right': `${rise * 24 - Math.sin(walk * 14) * walk * 12}deg`,
        '--world-opacity': world,
        '--portal-scale': 0.8 + world * 0.2,
        '--card-y': `${(1 - world) * 80}px`,
        '--spot-opacity': 1 - world * 0.7,
        '--chapter-opacity': chapter,
        '--chapter-y': `${(1 - chapter) * 30}px`,
        '--chapter-events': chapter > 0.8 ? 'auto' : 'none',
      };
      Object.entries(variables).forEach(([key, value]) =>
        stage.style.setProperty(key, String(value)),
      );
      const number = stage.querySelector('.chapter-number');
      if (number)
        number.textContent = progress > 0.45 ? '02 — THE TRANSFORMATION' : '01 — THE POSSIBILITY';
      const copy = stage.querySelector<HTMLElement>('.chapter-copy');
      if (copy) copy.inert = chapter < 0.8;
      stage.querySelector('.hero-copy')?.setAttribute('aria-hidden', String(progress > 0.4));
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    paint();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
      cancelAnimationFrame(frame);
    };
  }, [storyRef, stageRef]);
}
