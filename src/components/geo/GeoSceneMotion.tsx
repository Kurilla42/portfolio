'use client';

import { useEffect } from 'react';

/** Original scene parallax, with bounded travel inside the restored background. */
export function GeoSceneMotion() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('main.geo-landing');
    if (!main) return;
    const opening = main.querySelector<HTMLElement>('.geo-opening-scene');
    const showcase = main.querySelector<HTMLElement>('.geo-showcase');
    const scenes = [opening, showcase].filter((node): node is HTMLElement => node !== null);
    const decorations = main.querySelectorAll<HTMLElement>('.geo-included-row, .geo-steps > li, .geo-proof-layout, .geo-contact-frame');
    const motion = matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const active = new Set<HTMLElement>();
    const pending = new Set<HTMLElement>();
    const revealed = new Set<HTMLElement>();
    const isPaused = () => main.matches('.geo-motion-paused') || !!main.querySelector('.geo-motion-paused');
    let paused = isPaused();
    let frame = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));

    const render = () => {
      frame = 0;
      if (!motion.matches || paused) return;
      const viewport = window.innerHeight;
      if (opening && active.has(opening)) {
        const rect = opening.getBoundingClientRect();
        // Same start/start → end/end progress as GeoPageClient's combined scene.
        const progress = clamp(-rect.top / Math.max(1, rect.height - viewport));
        // Half of the added scale is available on each edge: travel cannot expose it.
        opening.style.setProperty('--geo-bg-y', `${(rect.height * 0.05 * progress).toFixed(2)}px`);
        opening.style.setProperty('--geo-bg-scale', (1 + 0.1 * progress).toFixed(4));
      }
      if (showcase && active.has(showcase)) {
        const rect = showcase.getBoundingClientRect();
        // InfoShowcaseSection's original start/end → end/start progress.
        const progress = clamp((viewport - rect.top) / Math.max(1, viewport + rect.height));
        showcase.style.setProperty('--geo-showcase-y', `${(-5 + progress * 10).toFixed(3)}%`);
      }
    };
    const schedule = () => {
      if (!frame && motion.matches && !paused && active.size) frame = requestAnimationFrame(render);
    };
    const reveal = (node: HTMLElement) => {
      if (!node.classList.contains('geo-in-view')) {
        node.classList.add('geo-in-view');
        revealed.add(node);
      }
      pending.delete(node);
      observer.unobserve(node);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const node = entry.target as HTMLElement;
        if (scenes.includes(node)) {
          if (entry.isIntersecting) active.add(node);
          else active.delete(node);
        } else if (entry.isIntersecting) {
          if (paused) pending.add(node);
          else reveal(node);
        } else pending.delete(node);
      }
      schedule();
    });
    scenes.forEach(node => observer.observe(node));
    decorations.forEach(node => observer.observe(node));

    const reset = () => {
      opening?.style.removeProperty('--geo-bg-y');
      opening?.style.removeProperty('--geo-bg-scale');
      showcase?.style.removeProperty('--geo-showcase-y');
    };
    const mediaChange = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!motion.matches) reset();
      else schedule();
    };
    const pauseObserver = new MutationObserver(() => {
      const next = isPaused();
      if (next === paused) return;
      paused = next;
      if (paused) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        pending.forEach(reveal);
        schedule();
      }
    });
    pauseObserver.observe(main, { subtree: true, attributes: true, attributeFilter: ['class'] });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', mediaChange);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      pauseObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', mediaChange);
      reset();
      revealed.forEach(node => node.classList.remove('geo-in-view'));
    };
  }, []);

  return null;
}
