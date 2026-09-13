// Серверный компонент (без 'use client'): JSON-LD нужен в HTML-ответе, а не после гидрации —
// краулеры нейросетей и часть поисковых ботов JS не исполняют.
//
// Все тексты — дословно из компонентов страницы: GeoFaqSection (вопросы/ответы), GeoPricingTabs
// (тарифы, цены, сроки), page.tsx (шаги, контакты). Здесь ничего не сочиняется: если формулировка
// меняется на странице, её нужно поменять и тут. Импортировать массивы напрямую нельзя — те файлы
// помечены 'use client', а этот компонент должен оставаться серверным.

const siteUrl = 'https://www.kolesnikovdesign.pro';
const pageUrl = `${siteUrl}/geo`;

// Синхронизировано с title/description в src/app/geo/layout.tsx.
export const geoTitle = 'Аудит AI-видимости бизнеса в нейросетях — от 25 000 ₽ за 3 дня';
export const geoDescription =
  'Что Алиса, GigaChat, ChatGPT, DeepSeek и Gemini отвечают вашему покупателю: где вас нет, какие ошибки он слышит, сколько рублей уходит мимо. От 25 000 ₽, 3 дня.';

const ids = {
  website: `${siteUrl}/#website`,
  person: `${siteUrl}/#person`,
  business: `${siteUrl}/#business`,
  webpage: `${pageUrl}#webpage`,
  service: `${pageUrl}#service`,
  faq: `${pageUrl}#faq`,
  howto: `${pageUrl}#howto`,
  breadcrumb: `${pageUrl}#breadcrumb`,
};

// GeoFaqSection.tsx, массив faq — 1-в-1.
const faq = [
  {
    question: 'Чем это отличается от SEO-аудита?',
    answer:
      'Частично пересекается, но меряет другое: не позиции в поиске, а что нейросети отвечают вашему покупателю и на какие источники при этом опираются. Если у вас есть SEO-подрядчик, отчёт ему пригодится — это данные, которых у него нет.',
  },
  {
    question: 'У вас есть кейсы?',
    answer:
      'Кейсов с результатом «было / стало» нет ни у кого на этом рынке, и выдумывать их я не буду. Что есть — готовый отчёт, он выше в цифрах; первый контрольный съём по нему через месяц. Отчёт устроен так, чтобы вера на слово не требовалась: методика описана в самом отчёте, сырые данные передаются вам, каждая цифра проверяема.',
  },
  {
    question: 'А есть же сервисы за 3 тысячи?',
    answer:
      'Есть, и они полезны как термометр. Но там машина считает совпадения слов: тёзку вашей компании она засчитает вам, а устаревший факт не заметит. Здесь первичную разметку тоже делает машина, но каждый вывод и каждая цитата проверяются по сырым ответам вручную — так и находятся выдуманные нейросетью факты о бренде.',
  },
  {
    question: 'Какие гарантии?',
    answer:
      'Ответы нейросетей вероятностны. Гарантировать попадание бренда в ответы или «позиции в нейросетях» не может никто — кто обещает, тот вводит вас в заблуждение. Гарантируется другое: методика, заявленный объём замера и честное измерение до/после.',
  },
  {
    question: 'Обязательно ли заказывать внедрение после аудита?',
    answer:
      'Нет. Аудит — самостоятельный продукт: план работ остаётся у вас, а контрольный съём через месяц покажет динамику независимо от того, кто исполнял план.',
  },
  {
    question: 'Что будет, если через месяц ничего не изменится?',
    answer:
      'Контрольный съём покажет это честно, теми же цифрами, которыми измерялась исходная точка. Динамику дают работы по плану из аудита; сам аудит — диагностика.',
  },
  {
    question: 'У нас есть сеошник',
    answer:
      'Отлично, ему пригодится замер: я не заменяю SEO, я меряю то, что он пока не меряет — что нейросети отвечают покупателю и на какие сайты ссылается ИИ-поиск. Это данные, которых в его отчётах нет.',
  },
  {
    question: 'Нейро и Google AI Overviews входят?',
    answer:
      'Да. ИИ-ответы Поиска Яндекса (Нейро) снимаются отдельным каналом через официальный API Яндекса — это ответ прямо в выдаче, его видят и те, кто ни в какие нейросети не заходит. Нейроответы Google (AI Overviews) проверяются по русскоязычной выдаче с геолокацией Россия: Google показывает блок не на каждый запрос, поэтому в отчёте фиксируются и сами ответы, и доля запросов, где блок появился. Пять нейросетей при этом отвечают по своим знаниям, а Perplexity показывает, на какие сайты ссылается ИИ.',
  },
];

// page.tsx, массив steps — у шагов на странице только названия, описаний нет, поэтому в HowToStep
// только name (ничего не додумываем).
const steps = [
  'Карта запросов',
  'Два прогона и разметка',
  'Источники и сайт',
  'Отчет и план работ',
  'Съем через месяц',
];

// GeoPricingTabs.tsx, PRICING_PLANS. «от 25 000 ₽» — это minPrice, а не price: фиксированной цены
// на странице нет. maxPrice только у «Внедрения», где в коде есть «до 80 000 ₽».
const offers = [
  {
    '@type': 'Offer',
    name: 'Аудит AI-видимости',
    description:
      'Замер по 60–80 запросам в пяти нейросетях, разбор источников и сайта, план работ. Через месяц — контрольный съём, он в цене.',
    url: `${pageUrl}#packages`,
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: 25000,
      priceCurrency: 'RUB',
      description: 'от 25 000 ₽, 3 рабочих дня, 50% аванс, 50% по сдаче, договор и чек самозанятого',
    },
  },
  {
    '@type': 'Offer',
    name: 'Внедрение',
    description:
      'Исполнение плана из аудита: переработка ключевых страниц под цитируемость, FAQ с разметкой, карточки организации, 2–3 внешних источника, исправление ошибок о бренде.',
    url: `${pageUrl}#packages`,
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: 40000,
      maxPrice: 80000,
      priceCurrency: 'RUB',
      description: 'от 40 000 ₽ до 80 000 ₽ — по объёму плана, 2–4 недели',
    },
  },
  {
    '@type': 'Offer',
    name: 'Сопровождение',
    description:
      'Ежемесячный съём с динамикой, работа с источниками и контентом по плану, отчёт «что изменилось и почему».',
    url: `${pageUrl}#packages`,
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: 30000,
      priceCurrency: 'RUB',
      description: 'от 30 000 ₽ в месяц, объём фиксируется после аудита, от 3 месяцев',
    },
  },
];

export const geoJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': ids.website,
      url: siteUrl,
      name: 'Kolesnikov Design',
      publisher: { '@id': ids.person },
    },
    {
      '@type': 'WebPage',
      '@id': ids.webpage,
      url: pageUrl,
      name: geoTitle,
      description: geoDescription,
      inLanguage: 'ru-RU',
      isPartOf: { '@id': ids.website },
      about: { '@id': ids.service },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${siteUrl}/og-geo.png`,
        width: 1200,
        height: 630,
      },
      breadcrumb: { '@id': ids.breadcrumb },
    },
    {
      // Контакты — из блока #contact в page.tsx. Должности в коде нет, jobTitle не ставим.
      '@type': 'Person',
      '@id': ids.person,
      name: 'Антон Колесников',
      url: siteUrl,
      email: 'anton@kolesnikovdesign.pro',
      telephone: '+79127582210',
      sameAs: ['https://t.me/telegam_kolesnikov'],
    },
    {
      // Адреса на странице нет — не выдумываем. priceRange — от минимальной цены аудита до
      // верхней планки внедрения («до 80 000 ₽»), обе цифры из GeoPricingTabs.
      '@type': 'ProfessionalService',
      '@id': ids.business,
      name: 'Антон Колесников — аудит AI-видимости',
      url: pageUrl,
      telephone: '+79127582210',
      email: 'anton@kolesnikovdesign.pro',
      founder: { '@id': ids.person },
      areaServed: 'RU',
      priceRange: '25000-80000 RUB',
      sameAs: ['https://t.me/telegam_kolesnikov'],
    },
    {
      '@type': 'Service',
      '@id': ids.service,
      name: 'Аудит AI-видимости',
      serviceType: 'Аудит видимости бизнеса в нейросетях',
      description: geoDescription,
      url: pageUrl,
      provider: { '@id': ids.business },
      areaServed: 'RU',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'С чего начать',
        itemListElement: offers,
      },
    },
    {
      '@type': 'FAQPage',
      '@id': ids.faq,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      // totalTime P3D — «3 рабочих дня» есть в GeoPricingTabs (period) и GeoHero.
      // description — подзаголовок секции «Как проходит аудит» (десктопная версия) из page.tsx.
      '@type': 'HowTo',
      '@id': ids.howto,
      name: 'Как проходит аудит AI-видимости',
      description:
        'Три рабочих дня от аванса и согласованной карты запросов до отчёта. Запросы уходят в нейросети программно, руками делается разбор',
      totalTime: 'P3D',
      step: steps.map((name, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name,
        url: `${pageUrl}#steps`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': ids.breadcrumb,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Аудит AI-видимости', item: pageUrl },
      ],
    },
  ],
};

export function GeoJsonLd() {
  // Символ «<» заменяем на escape-последовательность \u003c: JSON.stringify теги не экранирует, и строка
  // «</script>» внутри текста закрыла бы тег раньше времени. Для JSON-парсера обе записи — один символ.
  const json = JSON.stringify(geoJsonLd).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
