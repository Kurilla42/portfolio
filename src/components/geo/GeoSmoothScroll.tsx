'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export function GeoSmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const desktopMotion = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let stop = () => {};

    const update = () => {
      stop();
      stop = () => {};
      if (!desktopMotion.matches) return;

      const lenis = new Lenis({
        duration: 1.4,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        syncTouch: false,
        prevent: node => node.matches('input, textarea, select, [contenteditable="true"]'),
      });
      let frame = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      let clearAnchorTabIndex = () => {};
      let focusingAnchor = false;

      // Native keyboard scrolling and focus must take over from any wheel inertia.
      const interrupt = () => {
        if (!focusingAnchor) lenis.scrollTo(window.scrollY, { immediate: true });
      };
      const keydown = (event: KeyboardEvent) => {
        if (['Tab', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) interrupt();
      };
      const click = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
        if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
        const url = new URL(link.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
        let id: string;
        try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
        const target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        clearAnchorTabIndex();
        if (location.hash !== url.hash) history.pushState(null, '', url.hash);
        const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        lenis.scrollTo(target, {
          offset: -margin,
          onComplete: () => {
            clearAnchorTabIndex();
            if (!target.hasAttribute('tabindex')) {
              target.setAttribute('tabindex', '-1');
              const restore = () => {
                if (clearAnchorTabIndex !== restore) return;
                clearAnchorTabIndex = () => {};
                target.removeEventListener('blur', restore);
                if (target.getAttribute('tabindex') === '-1') target.removeAttribute('tabindex');
              };
              clearAnchorTabIndex = restore;
              target.addEventListener('blur', restore);
            }
            focusingAnchor = true;
            try { target.focus({ preventScroll: true }); }
            finally { focusingAnchor = false; }
            if (document.activeElement !== target) clearAnchorTabIndex();
          },
        });
      };
      const dialogChange = (event: Event) => {
        if ((event as CustomEvent<{ open: boolean }>).detail?.open) lenis.stop();
        else lenis.start();
      };
      if (document.querySelector('dialog[open]')) lenis.stop();
      document.addEventListener('geo-dialog-change', dialogChange);
      document.addEventListener('click', click);
      document.addEventListener('keydown', keydown, true);
      document.addEventListener('focusin', interrupt);
      window.addEventListener('hashchange', interrupt);
      stop = () => {
        cancelAnimationFrame(frame);
        clearAnchorTabIndex();
        document.removeEventListener('geo-dialog-change', dialogChange);
        document.removeEventListener('click', click);
        document.removeEventListener('keydown', keydown, true);
        document.removeEventListener('focusin', interrupt);
        window.removeEventListener('hashchange', interrupt);
        lenis.destroy();
      };
    };

    update();
    desktopMotion.addEventListener('change', update);
    return () => {
      desktopMotion.removeEventListener('change', update);
      stop();
    };
  }, [pathname]);

  return <>{children}</>;
}
