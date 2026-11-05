import { GeoLeadForm, GeoInteraction } from './GeoLeadForm';
import { GeoLeadDialog } from './GeoLeadDialog';
import { GeoHeroBackground } from './GeoHeroBackground';
import { GeoSceneMotion } from './GeoSceneMotion';
import { GeoServiceMarks } from './GeoServiceMarks';
import { agencyFaq, commonFaq, scope, steps, type Segment } from './geo-content';

const reportUrl = 'https://docs.google.com/document/d/1xedBEBXOxsy1v39bU428e8uFIgNi0kBe/preview';
const agencyScope = [
  ['Отчёт под вашим брендом', 'Оформление и подпись согласуем до передачи. Проверю имя, контакты и цены исполнителя в отчёте, свойствах файлов и приложениях.'],
  ['Исходные данные и доказательства', '60 запросов, 8 каналов и 780 ответов. Упоминания, конкуренты, цитаты, проверка фактов и источники ИИ-поиска. Запрос, канал, способ получения и дата каждого ответа.'],
  ['План для дальнейшей работы', 'Проверка сайта по 13 пунктам с адресами и доказательствами. Задачи с приоритетами для вашей команды и контрольный замер через месяц.'],
];

export function GeoLanding({ segment }: { segment: Segment }) {
  const agency = segment === 'agency';
  const enabled = Boolean(process.env.RESEND_API_KEY && process.env.GEO_MAIL_FROM && process.env.GEO_FORM_ENABLED === 'true');
  return <main className={`geo-landing ${agency ? 'geo-agency' : 'geo-business'}`} data-segment={segment} data-product="full">
    <GeoInteraction segment={segment} />
    <GeoSceneMotion />
    <GeoLeadDialog segment={segment} enabled={enabled} privacyUrl="/geo/privacy" />
    <a className="geo-skip" href="#contact">Перейти к обращению</a>
    <div className="geo-opening-scene">
      <GeoHeroBackground />
      <div className="geo-opening">
      <header className="geo-header geo-wrap"><a className="geo-brand" href="/">Антон Колесников<span>Исследования AI-видимости</span></a><a className="geo-header-contact" href="#contact" data-select-product="full">Обсудить аудит <span aria-hidden="true">↗</span></a></header>
      <section className="geo-hero geo-wrap" aria-labelledby="geo-heading">
        <div className="geo-hero-heading"><p className="geo-eyebrow">{agency ? 'Для SEO- и digital-агентств' : 'GEO-аудит для бизнеса'}</p><h1 id="geo-heading">{agency ? <>GEO-аудит под<br className="geo-desktop-break" /> вашим брендом</> : <>Что нейросети<br className="geo-desktop-break" /> говорят о вашей<br className="geo-desktop-break" /> компании</>}</h1></div>
        <div className="geo-hero-offer"><p className="geo-intro">{agency ? 'Проверю AI-видимость компании вашего клиента. Вы получите отчёт, исходные ответы и план работ; оформление под ваше агентство согласуем до передачи.' : 'Проверю упоминания, факты и источники в 8 каналах. Вы получите отчёт с исходными ответами, проверку сайта и план работ.'}</p><div className="geo-hero-actions"><p className="geo-hero-price"><strong>{agency ? '20 000' : '25 000'} ₽</strong>{agency && <span>за проект клиента</span>}<span>3 рабочих дня</span></p><CTA agency={agency} hero /><p className="geo-condition">{agency ? 'После согласования карты запросов и условий заказа.' : 'После аванса и согласования карты запросов.'} Контрольный замер через месяц включён.</p><a className="geo-secondary" href={agency ? '#sample' : '#proof'}>{agency ? 'Посмотреть пример' : 'Посмотреть пример отчёта'} <span aria-hidden="true">↓</span></a></div></div>
        <GeoServiceMarks />
      </section>
      </div>
      {agency ? <Included agency /> : <Sample agency={false} />}
    </div>
    {!agency && <Included agency={false} />}
    {agency && <Sample agency />}
    <Process agency={agency} />
    <Pricing agency={agency} />
    <section id="mini" className="geo-section geo-wrap geo-mini"><div className="geo-mini-heading"><p className="geo-eyebrow">Необязательный первый шаг</p><h2>Нужен первый пример по {agency ? 'компании клиента' : 'вашей компании'}?</h2></div><img className="geo-mini-art" src="/geo/mini-ornament.png" alt="" width="212" height="333" loading="lazy" /><div className="geo-mini-copy"><p>Бесплатный мини-срез: 5 разных вопросов покупателей без названия компании и один повтор первого вопроса. Один согласованный интерфейс Яндекса, до 6 ответов с датой, упоминаниями и ссылками.</p><p>Срок — один рабочий день после получения данных и согласования задачи. Сначала уточним задачу и доступность слота.</p><p className="geo-note">Мини не обязателен перед полным аудитом и не заменяет его. Один повтор не даёт статистической оценки устойчивости. Отсутствие генеративного ответа — отсутствие данных.</p><a className="geo-button geo-button-outline" href="#contact" data-select-product="mini">Запросить бесплатный мини-срез<span aria-hidden="true">↗</span></a></div></section>
    <section id="faq" className="geo-section geo-wrap geo-faq-section"><div className="geo-faq-heading"><p className="geo-eyebrow">До начала работы</p><h2>Частые{' '}<br />вопросы</h2></div><div className="geo-faq">{(agency ? agencyFaq : commonFaq).map(([q, a], i) => <details key={q}><summary><span className="geo-faq-number">/{String(i + 1).padStart(2, '0')}</span><span>{q}</span><span className="geo-faq-sign" aria-hidden="true">+</span></summary><p className="geo-details">{a}</p></details>)}</div></section>
    <section id="contact" className="geo-section geo-wrap geo-contact">
      <div className="geo-contact-frame">
        <img className="geo-contact-background" src="/geo/contact-background.webp" alt="" width="1920" height="1280" loading="lazy" />
        <div className="geo-contact-copy">
          <div className="geo-contact-heading"><p className="geo-eyebrow">Следующий шаг</p><h2>Обсудим{' '}<br />ваш замер</h2></div>
          <p className="geo-contact-intro">Для полного аудита мини не нужен. Уточню задачу по указанному контакту. Отвечаю в будни.</p>
          <div className="geo-contact-person"><p className="geo-contact-name">Антон Колесников</p><p className="geo-note">Исследования AI-видимости</p><address><a href="https://t.me/telegam_kolesnikov" data-geo-action="telegram" target="_blank" rel="noopener noreferrer">Telegram @telegam_kolesnikov ↗</a><a href="mailto:sterlet.prod@gmail.com" data-geo-action="email">sterlet.prod@gmail.com</a><a href="tel:+79127582210" data-geo-action="phone">+7 912 758 22 10</a></address></div>
        </div>
        <GeoLeadForm segment={segment} enabled={enabled} privacyUrl="/geo/privacy" />
      </div>
    </section>
    <footer className="geo-footer geo-wrap"><span>Антон Колесников · GEO-аудит</span><a href="/geo/privacy">Политика обработки данных</a><a href="#geo-heading">Наверх ↑</a></footer>
  </main>;
}

function CTA({ agency, hero = false }: { agency: boolean; hero?: boolean }) { return <a className="geo-button" href="#contact" data-geo-action={hero ? 'hero-cta' : undefined} data-product="full" data-select-product="full">{agency ? 'Обсудить аудит клиента' : 'Обсудить полный аудит'}<span aria-hidden="true">↗</span></a>; }

function Method() { return <details><summary>Как устроен замер</summary><div className="geo-details"><p className="geo-formula">60 × 5 × 2 + 60 × 3 = 780</p><p>60 согласованных запросов, а не 780 уникальных вопросов. Без веб-поиска: Алиса, GigaChat, DeepSeek, ChatGPT, Gemini. Два прогона по 60 запросов — 600 ответов.</p><p>С веб-поиском: Алиса с поиском, Яндекс Нейро, ChatGPT с поиском. По 60 запросов — 180 ответов.</p><p>Упор — пользовательские интерфейсы. Канал, режим веб-поиска, способ получения (UI или API) и дата отмечаются отдельно. API служит дополнительной базой; эквивалентность экрану покупателя не предполагается. Сбой, отказ и отсутствие ответа фиксируются отдельно.</p><p>В анализ входят упоминания, конкуренты, сценарии, цитаты, факты, источники ИИ-поиска и спрос Wordstat. Wordstat не измеряет обращения к нейросетям. Формат отчёта и исходных файлов согласуем при заказе.</p></div></details>; }

function Sample({ agency }: { agency: boolean }) { return <section id={agency ? 'sample' : 'proof'} className="geo-section geo-wrap geo-sample"><p className="geo-eyebrow">Реальный отчёт · 04–06.09.2026</p>
  <div className="geo-proof-layout"><div className="geo-proof-main"><h2>{agency ? <>Пример исследования.{' '}<br />Основа для вашего отчёта.</> : <>От ответа нейросети{' '}<br />к конкретной задаче</>}</h2><div className="geo-proof-fragment"><p className="geo-proof-label">Из отчёта · «Четыре глаза»</p><blockquote>«…предоставляющих широкий ассортимент товаров для зрения: очки, контактные линзы, аксессуары, средства ухода за глазами и многое другое».</blockquote><p className="geo-proof-source">GigaChat · без веб-поиска · API{' '}<br />Замер 4–6 сентября 2026</p></div></div><div className="geo-proof-comment"><div><span className="geo-eyebrow">Вопрос</span><p>«Сеть магазинов оптических приборов „Четыре глаза“ — чем известна и где её магазины».</p></div><div><span className="geo-eyebrow">Находка</span><p>Модель описывает продавца очков и контактных линз. Компания продаёт телескопы, микроскопы и бинокли.</p></div><div><span className="geo-eyebrow">Задача</span><p>Согласовать описание деятельности на сайте и в карточках организации.</p></div></div></div>
  <div className="geo-sample-bottom"><div><a className="geo-button" href={reportUrl} data-geo-action="sample-open" target="_blank" rel="noopener noreferrer">Открыть пример отчёта<span aria-hidden="true">↗</span></a><div className="geo-sample-links"><a href="https://docs.google.com/document/d/1euO65CVTrjJ5o5jRDH0iHELskWgjtCO-/preview" data-geo-action="sample-open" target="_blank" rel="noopener noreferrer">Срез · 15.09.2026 ↗</a><a href="https://docs.google.com/document/d/1ScYt_qvpMN-hVr-6dy7hNo3cy05OLvmt/preview" data-geo-action="sample-open" target="_blank" rel="noopener noreferrer">Срез · 24–25.09.2026 ↗</a></div></div><div className="geo-note"><p>Исторический пример: пять моделей без веб-поиска по API, источники Perplexity Sonar, проверка сайта по 13 пунктам. Состав отличается от нынешнего полного аудита и мини 5 + 1. Документы содержат названия компаний.</p>{agency && <p>Это пример исследования с именем исполнителя. Подпись и оформление под агентство согласуем до передачи; проверю содержимое, свойства файлов и приложения.</p>}</div></div></section>; }

function Process({ agency }: { agency: boolean }) {
  const process = agency ? [['Проект клиента', 'Сайт компании клиента, контакт и конкретная задача.'], ['Карта и оформление', 'Согласуем компанию, регион, 60 запросов, подпись, оформление и условия заказа.'], ['Замер и выдача', 'Три рабочих дня после согласования карты и условий заказа. Отчёт, исходные ответы и план работ.'], ['Контроль', 'Через месяц повторяем согласованный замер и показываем наблюдаемые различия.']] : steps;
  return <section id="steps" className="geo-section geo-wrap geo-process">
    <div className="geo-process-visual"><p className="geo-eyebrow">От обращения до контроля</p><h2>Как проходит{' '}<br />аудит</h2><p className="geo-note">{agency ? 'Три рабочих дня после согласования карты запросов и условий заказа.' : 'Три рабочих дня после аванса и согласования карты запросов.'}</p></div>
    <img className="geo-process-ornament" src="/geo/process-silhouette.webp" alt="" width="408" height="612" loading="lazy" />
    <ol className="geo-steps">{process.map(([title, body], i) => <li key={title}><span className="geo-step-number">/{String(i + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
  </section>;
}

function Pricing({ agency }: { agency: boolean }) { return <section id={agency ? 'price' : 'packages'} className="geo-section geo-wrap geo-pricing"><div className="geo-pricing-heading"><p className="geo-eyebrow">Один проект · Полное исследование</p><h2>Полный{' '}<br />GEO-аудит</h2></div><div className="geo-price-layout"><div className="geo-price-summary"><div className="geo-price-marker" data-geo-section="pricing"><p className="geo-price">{agency ? '20 000' : '25 000'}<span> ₽</span></p><p className="geo-price-time">{agency ? 'За проект клиента · ' : ''}3 рабочих дня</p></div><p className="geo-condition">{agency ? 'После согласования карты запросов и условий заказа.' : 'После аванса и согласования карты запросов.'}</p><p className="geo-note">Оплату, документы и формат файлов согласуем при заказе. Внедрение оплачивается отдельно.</p></div><div className="geo-price-included"><p className="geo-eyebrow">Что включено</p><ul><li>60 запросов, 8 каналов — 780 ответов</li><li>Упоминания, конкуренты, факты, источники и спрос</li><li>Проверка сайта по 13 пунктам</li><li>Отчёт, исходные ответы и план с приоритетами</li><li>Контрольный замер через месяц</li></ul>{agency && <p className="geo-note">До передачи согласуем подпись и оформление под ваше агентство. Отношения с клиентом остаются у вас.</p>}<CTA agency={agency} /></div></div></section>; }

function Included({ agency }: { agency: boolean }) {
  return <section id={agency ? 'scope' : 'channels'} className="geo-section geo-wrap geo-included">
      <div className="geo-section-heading"><p className="geo-eyebrow">/01 · Состав исследования</p><h2>{agency ? <>Ваш клиент.{' '}<br />Ваш бренд. Мои данные.</> : 'Что входит в аудит'}</h2><p>{agency ? 'Для конкретного клиентского проекта. Вы ведёте отношения с клиентом, я готовлю исследование.' : 'Четыре слоя одного исследования. От исходного ответа — до задачи с адресом страницы и доказательством.'}</p></div>
      <div className="geo-included-rows">{(agency ? agencyScope : scope).map(([title, body], i) => <article className="geo-included-row" key={title}><div className="geo-row-copy"><div className="geo-row-heading"><span className="geo-row-number">/{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3></div>{!agency && <p>{body}</p>}</div>{agency ? <p>{body}</p> : <ul className="geo-deliverables">{scopeDeliverables[i].map(item=><li key={item}>{item}</li>)}</ul>}</article>)}</div>
      <div className="geo-method"><p className="geo-method-summary">60 запросов <span>·</span> 8 каналов <span>·</span> 780 ответов</p><Method /></div>
    </section>;
}

const scopeDeliverables = [
["Согласованная карта 60 запросов","Пять каналов без веб-поиска и три с поиском","Два прогона без веб-поиска","Упоминания компании и конкурентов"],
["Дословные цитаты и проверка ошибок","Сайты, на которые ссылается ИИ-поиск","Способ получения и дата каждого ответа","Спрос Wordstat — отдельно от запросов к ИИ"],
["13 пунктов проверки","Адреса проверенных страниц","Доказательства по замечаниям","Связь замечаний с задачами"],
["Приоритеты для вашей команды","Связь задач с результатами замера","Контроль через месяц включён","Условия сравнения зафиксированы"]
];
