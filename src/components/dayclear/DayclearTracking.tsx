'use client';
import { useEffect } from 'react';
import { captureDayclearAttribution, dayclearGoal } from '@/lib/dayclear-analytics.mjs';

export function DayclearTracking() {
  useEffect(() => {
    captureDayclearAttribution();
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('main.dayclear-landing a') : null;
      if (link?.getAttribute('href') === 'https://t.me/telegam_kolesnikov') dayclearGoal('dayclear_telegram_click');
      if (link?.getAttribute('href') === '#screens') dayclearGoal('dayclear_sample_open');
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
  return null;
}
