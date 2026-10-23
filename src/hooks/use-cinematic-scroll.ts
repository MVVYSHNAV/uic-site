import { useEffect, type RefObject } from 'react';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

/**
 * Binds the UIC Studio portal opening sequence directly to scroll position.
 * Every transformation reverses smoothly when scrolling upward.
 * No timed animations. Respects prefers-reduced-motion.
 */
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

      const rect = story.getBoundingClientRect();
      const distance = Math.max(1, story.offsetHeight - window.innerHeight);
      const isReduced = reducedMotion.matches;

      // Scroll progress from 0 (top of hero) to 1 (end of hero scroll)
      const p = isReduced ? 1 : clamp(-rect.top / distance);

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 768;
      const isTablet = vw >= 768 && vw < 1200;

      // Portal opens smoothly as user scrolls, clearing fully by p = 0.85
      const openProgress = isReduced ? 1 : clamp(p / 0.85);

      // Slide both panels outward until they completely clear the viewport
      const panelSlide = openProgress * 102; // percent

      // Settle photograph's scale from 1.14 down to 1.00
      const photoScale = isReduced ? 1.0 : 1.14 - 0.14 * clamp(p / 0.9);

      // Gradually introduce subtle amber-and-teal photographic wash
      const washOpacity = isReduced ? 0.75 : clamp(p / 0.75) * 0.75;

      // Modestly enlarge the wordmark (1.00 -> 1.09) and tighten letter spacing (0.02em -> -0.04em)
      const wmScale = isReduced ? 1.06 : 1.0 + 0.09 * openProgress;
      const wmSpacing = isReduced ? -0.03 : 0.02 - 0.06 * openProgress;

      // Move "UIC" left and "STUDIO." right, creating the feeling of a title opening
      const splitMax = isMobile ? 36 : isTablet ? 85 : 140;
      const splitX = isReduced ? (isMobile ? 18 : 60) : openProgress * splitMax;

      // Move two tiny accent dots from the centre toward opposite corners
      // Amber dot (#E8913C): moves toward top-left corner
      // Teal dot (#2E6B72): moves toward bottom-right corner
      const spreadX = vw * (isMobile ? 0.36 : 0.42);
      const spreadY = vh * (isMobile ? 0.32 : 0.38);
      const dotAmberX = isReduced ? -spreadX : -openProgress * spreadX;
      const dotAmberY = isReduced ? -spreadY : -openProgress * spreadY;
      const dotTealX = isReduced ? spreadX : openProgress * spreadX;
      const dotTealY = isReduced ? spreadY : openProgress * spreadY;

      // Supporting editorial content
      const contentOpacity = isReduced ? 1 : clamp(0.2 + openProgress * 0.8);
      const contentY = isReduced ? 0 : (1 - openProgress) * 16;

      // Bottom scroll hint fades out as portal opens
      const hintOpacity = isReduced ? 0 : Math.max(0, 1 - p * 3.0);

      // Write variables to stage for zero-cost hardware accelerated compositing
      stage.style.setProperty('--p', String(p));
      stage.style.setProperty('--open-p', String(openProgress));
      stage.style.setProperty('--panel-left', `${panelSlide}%`);
      stage.style.setProperty('--panel-right', `${panelSlide}%`);
      stage.style.setProperty('--photo-scale', String(photoScale));
      stage.style.setProperty('--wash-opacity', String(washOpacity));
      stage.style.setProperty('--wm-scale', String(wmScale));
      stage.style.setProperty('--wm-spacing', `${wmSpacing.toFixed(4)}em`);
      stage.style.setProperty('--split-x', `${splitX.toFixed(1)}px`);
      stage.style.setProperty('--dot-amber-x', `${dotAmberX.toFixed(1)}px`);
      stage.style.setProperty('--dot-amber-y', `${dotAmberY.toFixed(1)}px`);
      stage.style.setProperty('--dot-teal-x', `${dotTealX.toFixed(1)}px`);
      stage.style.setProperty('--dot-teal-y', `${dotTealY.toFixed(1)}px`);
      stage.style.setProperty('--content-opacity', String(contentOpacity));
      stage.style.setProperty('--content-y', `${contentY.toFixed(1)}px`);
      stage.style.setProperty('--hint-opacity', String(hintOpacity));
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);

    // Initial paint
    paint();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [storyRef, stageRef]);
}
