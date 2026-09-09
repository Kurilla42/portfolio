'use client';

import { useEffect } from 'react';

// Корневой layout ставит <html lang="en">; для русской страницы переключаем
// на 'ru' на клиенте и возвращаем обратно при уходе со страницы.
export function GeoLang() {
  useEffect(() => {
    document.documentElement.lang = 'ru';
    return () => {
      document.documentElement.lang = 'en';
    };
  }, []);

  return null;
}
