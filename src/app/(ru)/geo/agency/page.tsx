import type { Metadata } from 'next';
import Link from 'next/link';
import { GeoAgencyContact } from '@/components/geo/GeoAgencyContact';

// Серверный компонент (без 'use client'): нужен свой export metadata с title/description
// для /geo/agency, а не только тот, что задан в src/app/(ru)/geo/layout.tsx для /geo.
// Интерактивность (ymGoal на клик) вынесена в клиентский GeoAgencyContact.

// www, как в (ru)-layout и sitemap: apex редиректит на www (307), canonical и og:url должны быть
// конечными адресами, иначе поисковик видит canonical на редирект.
const siteUrl = 'https://www.kolesnikovdesign.pro';
const pageUrl = `${siteUrl}/geo/agency`;
const geoUrl = `${siteUrl}/geo`;

// Один title на meta/og/twitter/JSON-LD, чтобы WebPage.name не расходился с <title>.
// absolute — без него родительские layout'ы приклеивают « | Антон Колесников | Kolesnikov Design»,
// и title разрастался до 90 символов; сейчас 51.
const pageTitle = 'Замер AI-видимости под вашим брендом — для агентств';
// 153 символа — укладывается в 160, чтобы сниппет не резался.
const pageDescription =
  'White-label замер того, что нейросети отвечают клиентам вашего агентства: белый срез, полный аудит и контрольный съём под вашим брендом, без моего имени.';
// og:description длиннее meta description: соцсети и мессенджеры не режут его на 160, а здесь
// помещаются «данные полного аудита» и «в документах» — то, что для агентства и есть суть оффера.
const ogDescription =
  'White-label замер того, что нейросети отвечают клиентам вашего агентства: белый срез, данные полного аудита и контрольный съём под вашим брендом, без моего имени в документах.';

// Та же обложка, что у /geo: отдельной картинки под агентскую страницу нет, а без og:image
// ссылка в Telegram/WhatsApp приходит голым текстом.
const ogImage = {
  url: `${siteUrl}/og-geo.png`,
  width: 1200,
  height: 630,
  alt: 'Замер AI-видимости под брендом агентства — обложка страницы',
};

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  keywords: [
    'white-label GEO',
    'аудит AI-видимости для агентств',
    'замер под брендом агентства',
    'GEO для агентств',
    'AEO white-label',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: 'website',
    url: pageUrl,
    siteName: 'Kolesnikov Design',
    title: pageTitle,
    description: ogDescription,
    locale: 'ru_RU',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [ogImage.url],
  },
};

// JSON-LD только WebPage + BreadcrumbList: FAQ и Service на этой странице нет, а тарифы для агентств —
// не публичный прайс для конечного покупателя, в Offer их не выносим. WebSite/Person описаны
// в графе /geo (GeoJsonLd), сюда ссылаемся по @id, не дублируя.
const agencyJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: 'ru-RU',
      isPartOf: { '@id': `${siteUrl}/#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
      },
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Аудит AI-видимости', item: geoUrl },
        { '@type': 'ListItem', position: 3, name: 'Для агентств', item: pageUrl },
      ],
    },
  ],
};

// «<» → <: JSON.stringify теги не экранирует, и «</script>» внутри строки закрыл бы тег
// раньше времени. Для JSON-парсера обе записи — один и тот же символ.
const agencyJsonLdHtml = JSON.stringify(agencyJsonLd).replace(/</g, '\\u003c');

const offers = [
  {
    id: '01',
    title: 'Белый срез',
    price: '6 000 ₽',
    period: 'за клиента',
    description:
      'Тот же объём, что в бесплатном срезе для конечных клиентов (30 запросов × 4 нейросети = 120 ответов), доля голоса против конкурентов, 3 главные дыры — но оформлен под ваш бренд и без единого упоминания меня как исполнителя. Инструмент для первого разговора агентства с его клиентом.',
    footnote: 'Срок — 1 рабочий день с момента согласования карты запросов.',
  },
  {
    id: '02',
    title: 'Данные полного аудита',
    price: '18 000 ₽',
    period: 'за клиента',
    description:
      'Расширенный замер (60 запросов × 5 нейросетей × 2 прогона = 600 ответов, плюс ИИ-поиск Perplexity по тем же запросам — от 660 ответов; Яндекс Нейро и Google AI Overviews — по запросу), разбор источников и сайта по 13 пунктам, спрос по Вордстату, план работ с приоритетами и часами. Передаю данные и черновик отчёта — вы оформляете и подаёте клиенту от своего имени.',
    footnote: 'Срок — 3 рабочих дня с момента согласования карты запросов.',
  },
  {
    id: '03',
    title: 'Разбор сайта и план работ',
    price: '10 000 ₽',
    period: 'за клиента',
    description:
      'Разбор сайта по 13 пунктам цитируемости с доказательствами и план работ по каждому пробелу с приоритетами и нормой часов. Отдельная позиция — заказывается вместе с данными полного аудита, не отдельно.',
    footnote: 'Только вместе с «Данными полного аудита».',
  },
  {
    id: '04',
    title: 'Контрольный съём',
    price: '7 000 ₽',
    period: 'в месяц за клиента',
    description:
      'Повторный замер по той же карте запросов через месяц — показывает клиенту агентства динамику. Как и в прямых аудитах, это не отдельная допродажа, а часть исходного объёма.',
    footnote: 'Периодичность — раз в месяц на клиента агентства.',
  },
];

const terms = [
  {
    title: 'Без моего имени в документах',
    text: 'Ни в тексте отчёта, ни в свойствах файла, ни в переписке с конечным клиентом агентства я не участвую и не упоминаюсь, если вы не попросите иначе.',
  },
  {
    title: 'NDA по запросу',
    text: 'Готов подписать соглашение о неразглашении на срок сотрудничества и отдельно на каждого клиента, если это требование агентства.',
  },
  {
    title: 'Сроки',
    text: 'Белый срез — 1 рабочий день, полный аудит — 3 рабочих дня с момента согласования карты запросов, как и в прямой работе с конечным клиентом. Контрольный съём — через месяц после аудита, дата фиксируется заранее.',
  },
  {
    title: 'Оплата',
    text: 'Первый заказ — постоплата по акту в течение 5 рабочих дней после сдачи: вы ничем не рискуете. Дальше на выбор — 50 % аванс и 50 % по сдаче либо закрытие пакетом раз в месяц. Исполнитель — самозанятый (НПД): договор возмездного оказания услуг или оферта, чек из «Мой налог» в день оплаты, НДС нет. Чек принимается в расходы при УСН «доходы минус расходы».',
  },
  {
    title: 'Объём и повторные заказы',
    text: 'Прайс актуален при разовых и регулярных заказах. При потоке от 3 клиентов в месяц готов обсуждать фиксированные агентские условия отдельно.',
  },
];

export default function GeoAgencyPage() {
  return (
    // <main>, а не <div>: у страницы иначе нет landmark основного содержимого. Стили те же,
    // main по умолчанию display:block — визуально ничего не меняется.
    <main className="min-h-screen bg-black text-[#e0ded8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: agencyJsonLdHtml }} />
      {/* Шапка */}
      <section className="relative w-full px-6 md:px-[4vw] pt-16 md:pt-[10vh] pb-16 md:pb-[10vh]">
        <Link
          href="/geo"
          className="inline-block font-mono text-[3vw] md:text-[0.8vw] uppercase tracking-widest text-[#e0ded8]/50 hover:text-[#c7b684] transition-colors mb-8 md:mb-[4vw]"
        >
          ← Аудит для конечных клиентов
        </Link>

        {/* Кикер над h1 — <p>, а не <h2>: заголовок второго уровня перед первым ломает иерархию
            заголовков для поисковиков и скринридеров. Классы те же, вид не меняется. */}
        <p className="text-[6vw] md:text-[1.6vw] font-sans font-bold text-[#c7b684] mb-4 md:mb-6">
          Для агентств и SEO-подрядчиков
        </p>
        <h1 className="text-[11vw] md:text-[5vw] font-headline uppercase leading-[0.95] tracking-tight text-[#e0ded8] max-w-[90vw] md:max-w-[70vw]">
          Замер AI-видимости под вашим брендом
        </h1>
        <p className="font-mono text-[3.5vw] md:text-[1vw] uppercase tracking-wide text-[#e0ded8]/60 mt-6 md:mt-8 max-w-[90vw] md:max-w-[55vw] leading-relaxed">
          Для агентств и SEO-подрядчиков, у которых уже есть клиент, но нет своего конвейера замера ответов нейросетей
        </p>
      </section>

      {/* Проблема / предложение / методика / техническая часть */}
      <section className="relative w-full px-6 md:px-[4vw] pb-16 md:pb-[10vh] border-t border-[#e0ded8]/10 pt-12 md:pt-[6vh]">
        <div className="flex flex-col gap-10 md:gap-[4vw] max-w-[90vw] md:max-w-[60vw]">
          <p className="font-sans text-[4vw] md:text-[1.3vw] leading-snug text-[#e0ded8]">
            Клиент спрашивает, видно ли его в ChatGPT и Алисе, а мерить нечем. Строить это
            внутри — месяцы на разметку, проверку тёзок и сборку отчёта, который не стыдно
            показать. Нанимать в штат ради одного направления — дорого при нерегулярном
            спросе. По публичному разбору себестоимости GEO-пакета (vc.ru, 04.08.2026) на
            мониторинг и отчёт по одному клиенту у агентства уходит 4 часа в месяц при
            внутренней ставке 2 500 ₽/час плюс инструменты 8–12 тыс. ₽ — это 18–22 тыс. ₽
            в месяц на одного клиента, и закрываю я ровно эту строку.
          </p>

          <p className="font-mono text-[3.5vw] md:text-[1vw] text-[#e0ded8]/70 leading-relaxed">
            Отдаю готовый замер под вашим брендом: без моего имени, контактов и цены в
            документе. Вы получаете исходные данные и оформленный отчёт, показываете клиенту
            как свою работу, ведёте разговор о деньгах сами. Методика та же, что в моих
            собственных аудитах: два прогона, проверка тёзок вручную, дословные цитаты
            нейросетей с проверкой фактов, сырые данные — каждая цифра пересчитывается.
          </p>

          <p className="font-mono text-[3.5vw] md:text-[1vw] text-[#e0ded8]/70 leading-relaxed">
            Разница с сервисами за несколько тысяч та же, что и для конечного клиента: там
            машина считает совпадения слов и запишет вам тёзку клиента как упоминание, а
            устаревший факт не заметит. Здесь первичную разметку тоже делает модель, но
            каждую цитату и каждый вывод проверяю вручную по сырому тексту ответа. В
            white-label срезе это ценнее вдвойне: ошибку в документе с вашим брендом увидит
            клиент агентства, а не безымянный подрядчик.
          </p>

          <p className="font-mono text-[3.5vw] md:text-[1vw] text-[#e0ded8]/70 leading-relaxed">
            Сборка отчёта уже умеет работать в режиме white-label: без имени и контактов
            исполнителя, без цены аудита, без формулировок вроде «это входит в полный аудит» —
            весь текст адаптируется под то, что клиент видит именно ваш продукт. Подпись в
            документе — либо название вашего агентства, либо совсем без подписи, как скажете.
          </p>
        </div>
      </section>

      {/* Что входит — карточки с ценами */}
      <section className="relative w-full px-6 md:px-[4vw] pb-16 md:pb-[10vh] border-t border-[#e0ded8]/10 pt-12 md:pt-[6vh]">
        <h2 className="text-[10vw] md:text-[4vw] font-headline uppercase leading-[0.9] tracking-tight text-[#e0ded8] mb-10 md:mb-[5vh]">
          Что входит
        </h2>

        <div className="flex flex-col w-full border-t border-[#e0ded8]/20">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-[2vw] py-8 md:py-[3vh] border-b border-[#e0ded8]/20"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-[3.5vw] md:text-[0.9vw] font-bold text-[#c7b684] tabular-nums">
                  /{offer.id}
                </span>
              </div>
              <div className="md:col-span-6">
                <h3 className="font-mono font-bold uppercase tracking-tight text-[4.5vw] md:text-[1.2vw] text-[#e0ded8] mb-2">
                  {offer.title}
                </h3>
                <p className="font-mono text-[3.5vw] md:text-[0.9vw] text-[#e0ded8]/60 leading-relaxed">
                  {offer.description}
                </p>
                <p className="font-mono text-[3vw] md:text-[0.8vw] uppercase tracking-widest text-[#e0ded8]/40 mt-3">
                  {offer.footnote}
                </p>
              </div>
              <div className="md:col-span-5 flex md:justify-end items-start">
                <div className="text-left md:text-right">
                  <span className="text-[7vw] md:text-[2.2vw] font-black text-[#e0ded8] font-headline whitespace-nowrap">
                    {offer.price}
                  </span>
                  <span className="block font-mono text-[3vw] md:text-[0.8vw] uppercase tracking-widest text-[#e0ded8]/60 mt-1">
                    {offer.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Условия работы */}
      <section className="relative w-full px-6 md:px-[4vw] pb-16 md:pb-[10vh] border-t border-[#e0ded8]/10 pt-12 md:pt-[6vh]">
        <h2 className="text-[10vw] md:text-[4vw] font-headline uppercase leading-[0.9] tracking-tight text-[#e0ded8] mb-10 md:mb-[5vh]">
          Условия работы
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10 max-w-[90vw] md:max-w-[70vw]">
          {terms.map((term) => (
            <div key={term.title} className="flex flex-col gap-2">
              <span className="font-mono font-bold uppercase tracking-wide text-[3.8vw] md:text-[1vw] text-[#c7b684]">
                {term.title}
              </span>
              <p className="font-mono text-[3.5vw] md:text-[0.9vw] text-[#e0ded8]/70 leading-relaxed">
                {term.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full bg-black py-16 md:py-[12vh] px-6 md:px-[4vw] border-t border-[#e0ded8]/10 flex flex-col items-center text-center" id="contact">
        <h2 className="text-[10vw] md:text-[4.5vw] font-headline uppercase leading-[0.95] tracking-tight text-[#e0ded8] mb-6 md:mb-8 max-w-[90vw] md:max-w-[60vw]">
          Обсудить white-label для вашего агентства
        </h2>
        <p className="font-mono text-[3.5vw] md:text-[0.95vw] text-[#e0ded8]/60 leading-relaxed max-w-[90vw] md:max-w-[45vw] mb-10 md:mb-[5vh]">
          Пришлите нишу и количество клиентов, для которых актуален замер, — отвечу с
          условиями под ваш объём.
        </p>
        <GeoAgencyContact />
      </section>
    </main>
  );
}
