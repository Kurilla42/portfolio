import type { Metadata } from 'next';
import Link from 'next/link';
import { GeoAgencyContact } from '@/components/geo/GeoAgencyContact';

// Серверный компонент (без 'use client'): нужен свой export metadata с title/description
// для /geo/agency, а не только тот, что задан в src/app/geo/layout.tsx для /geo.
// Интерактивность (ymGoal на клик) вынесена в клиентский GeoAgencyContact.

const siteUrl = 'https://kolesnikovdesign.pro';

export const metadata: Metadata = {
  title: 'Замер AI-видимости под вашим брендом — для агентств | Антон Колесников',
  description:
    'White-label замер того, что нейросети отвечают клиентам вашего агентства: белый срез, данные полного аудита и контрольный съём под вашим брендом, без моего имени в документах. Без гарантий позиций — честная методика и сырые данные.',
  keywords: [
    'white-label GEO',
    'аудит AI-видимости для агентств',
    'замер под брендом агентства',
    'GEO для агентств',
    'AEO white-label',
  ],
  alternates: {
    canonical: `${siteUrl}/geo/agency`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/geo/agency`,
    siteName: 'Kolesnikov Design',
    title: 'Замер AI-видимости под вашим брендом — для агентств',
    description:
      'White-label замер того, что нейросети отвечают клиентам вашего агентства: белый срез, данные полного аудита и контрольный съём под вашим брендом, без моего имени в документах.',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary',
    title: 'Замер AI-видимости под вашим брендом — для агентств',
    description:
      'White-label замер того, что нейросети отвечают клиентам вашего агентства. Без моего имени в документах, без гарантий позиций.',
  },
};

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
      'Расширенный замер (60–80 запросов × 5 нейросетей × 2 прогона), разбор источников и сайта по 13 пунктам, спрос по Вордстату, план работ с приоритетами и часами. Передаю данные и черновик отчёта — вы оформляете и подаёте клиенту от своего имени.',
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
    text: '[условия оплаты — аванс или постоплата, в чём считать для агентского канала — уточняются отдельно].',
  },
  {
    title: 'Объём и повторные заказы',
    text: 'Прайс актуален при разовых и регулярных заказах. При потоке от 3 клиентов в месяц готов обсуждать фиксированные агентские условия отдельно.',
  },
];

export default function GeoAgencyPage() {
  return (
    <div className="min-h-screen bg-black text-[#e0ded8]">
      {/* Шапка */}
      <section className="relative w-full px-6 md:px-[4vw] pt-16 md:pt-[10vh] pb-16 md:pb-[10vh]">
        <Link
          href="/geo"
          className="inline-block font-mono text-[3vw] md:text-[0.8vw] uppercase tracking-widest text-[#e0ded8]/50 hover:text-[#c7b684] transition-colors mb-8 md:mb-[4vw]"
        >
          ← Аудит для конечных клиентов
        </Link>

        <h2 className="text-[6vw] md:text-[1.6vw] font-sans font-bold text-[#c7b684] mb-4 md:mb-6">
          Для агентств и SEO-подрядчиков
        </h2>
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
            спросе. Ручной замер силами агентства стоит от 53 000 ₽ в месяц по рыночным
            ставкам (vc.ru, 04.08.2026) — и это без самого отчёта, только время аналитика.
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
    </div>
  );
}
