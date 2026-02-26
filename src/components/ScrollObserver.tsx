"use client";

import { useEffect } from 'react';

export function ScrollObserver() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once animated, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const elements = document.querySelectorAll('.reveal-text');
    elements.forEach((el) => observer.observe(el));

    // For dynamically added content or navigation, we re-scan occasionally
    const interval = setInterval(() => {
      const newElements = document.querySelectorAll('.reveal-text:not(.is-visible)');
      newElements.forEach((el) => observer.observe(el));
    }, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
}
