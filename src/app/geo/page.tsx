import { GeoJsonLd } from '@/components/geo/GeoJsonLd';
import GeoPageClient from '@/components/geo/GeoPageClient';

// Серверная обёртка: сама страница — клиентский компонент (framer-motion, useScroll), а JSON-LD
// должен попасть в HTML-ответ. Держим разметку здесь, а не в geo/layout.tsx, чтобы FAQPage/Service
// не расползались на дочерние маршруты /geo/* — там другой контент, и Google считает такую
// разметку несоответствующей странице.
export default function GeoPage() {
  return (
    <>
      <GeoJsonLd />
      <GeoPageClient />
    </>
  );
}
