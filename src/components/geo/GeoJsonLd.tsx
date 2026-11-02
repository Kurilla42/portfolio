import { geoTitle, geoDescription, agencyTitle, agencyDescription, commonFaq, agencyFaq, type Segment } from './geo-content';
export { geoTitle, geoDescription } from './geo-content';
export function GeoJsonLd({ segment = 'business' }: { segment?: Segment }) {
  const agency = segment === 'agency';
  const url = `https://www.kolesnikovdesign.pro/geo${agency ? '/agency' : ''}`;
  const name = agency ? agencyTitle : geoTitle;
  const description = agency ? agencyDescription : geoDescription;
  const data = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name, description, inLanguage: 'ru-RU' },
    { '@type': 'Service', '@id': `${url}#service`, name, description, url, serviceType: 'GEO-аудит', provider: { '@type': 'Person', name: 'Антон Колесников' }, offers: { '@type': 'Offer', price: agency ? 20000 : 25000, priceCurrency: 'RUB', url, description: 'Полный аудит: 60 запросов, 8 каналов, план на 780 ответов; проверка сайта по 13 пунктам, исходные данные, план и контроль через месяц.' } },
    { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: (agency ? agencyFaq : commonFaq).map(([q,a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
