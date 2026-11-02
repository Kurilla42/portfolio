import { GeoJsonLd } from '@/components/geo/GeoJsonLd';
import { GeoLanding } from '@/components/geo/GeoLanding';
export const dynamic = 'force-dynamic';
export default function GeoPage() { return <><GeoJsonLd /><GeoLanding segment="business" /></>; }
