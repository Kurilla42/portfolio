import { GeoLeadForm, GeoInteraction } from './GeoLeadForm';
import { agencyFaq, commonFaq, scope, steps, type Segment } from './geo-content';
import './geo-landing.css';

export function GeoLanding({ segment }: { segment: Segment }) {
  const agency = segment === 'agency';
  const price = agency ? '20 000' : '25 000';
  const cta = agency ? 'Обсудить аудит клиента' : 'Обсудить полный аудит';
  const condition = agency ? 'После согласования карты запросов и условий заказа.' : 'Срок после аванса и согласования карты запросов.';
  const privacyUrl = '/geo/privacy';
  const enabled = Boolean(process.env.RESEND_API_KEY && process.env.GEO_MAIL_FROM && process.env.GEO_FORM_ENABLED === 'true');
  const cards = agency ? [
    ['Ответы и доказательства', 'Упоминания, конкуренты, цитаты, проверка фактов и источники ИИ-поиска. Спрос Wordstat — отдельно от обращений к нейросетям.'],
    ['Сайт и план', 'Проверка сайта по 13 пунктам с адресами и доказательствами. Задачи с приоритетами для команды клиента.'],
    ['Отчёт, исходники и контроль', 'Запрос, канал, режим, способ получения и дата каждого ответа. Формат файлов согласуем. Повторный замер через месяц включён.'],
  ] : scope;
  return <main className="geo-landing" data-segment={segment} data-product="full">
    <GeoInteraction segment={segment} />
    <a className="geo-skip" href="#contact">Перейти к обращению</a>
    <header className="geo-header geo-wrap">
      <a className="geo-brand" href="/">Антон Колесников<span>Исследования AI-видимости</span></a>
      <nav aria-label="Разделы страницы"><a href={agency ? '#scope' : '#channels'}>Состав</a><a href={agency ? '#price' : '#packages'}>Стоимость</a><a href="#contact">Контакт</a></nav>
    </header>
    <section className="geo-hero geo-wrap" aria-labelledby="geo-heading">
      <div className="geo-hero-copy">
        <p className="geo-eyebrow">{agency ? 'Для SEO- и digital-агентств' : 'Аудит AI-видимости бизнеса'}</p>
        <h1 id="geo-heading">{agency ? <>GEO-аудит для клиента вашего агентства</> : <>GEO-аудит: что нейросети отвечают о вашей компании</>}</h1>
        <p className="geo-intro">{agency ? 'Получите замер ответов ИИ, исходные данные, проверку сайта и план работ для конкретного клиентского проекта. Вы ведёте отношения с клиентом, я готовлю исследование.' : 'Проверю упоминания, факты и источники в 8 каналах. Вы получите отчёт с исходными ответами, проверку сайта и план работ.'}</p>
        <p className="geo-hero-price"><strong>{price} ₽{agency ? ' за проект' : ''}</strong><span>3 рабочих дня</span></p>
        <p className="geo-condition">{condition} Контрольный замер через месяц включён.</p>
        <a className="geo-button" href="#contact" data-geo-action="hero-cta" data-product="full" data-select-product="full">{cta}<span aria-hidden="true">↗</span></a>
        <a className="geo-secondary" href={agency ? '#sample' : '#proof'}>{agency ? 'Посмотреть пример' : 'Посмотреть пример отчёта'} <span aria-hidden="true">↓</span></a>
        <a className="geo-secondary" href="#mini">{agency ? 'Запросить мини по клиенту' : 'Начать с бесплатного мини'} <span aria-hidden="true">↓</span></a>
        <p className="geo-note">Аудит показывает результаты замера и задачи для работы. Внедрение оплачивается отдельно.</p>
      </div>
      <aside className="geo-map" aria-label="Фрагмент отчёта">
        <p className="geo-eyebrow">Фрагмент реального отчёта / 04–06.09.2026</p>
        <h2>Когда ИИ описывает другой бизнес</h2>
        <div className="geo-map-line"><span>Запрос</span><strong>Сеть магазинов оптических приборов [компания] — чем известна и где её магазины</strong></div>
        <blockquote>«…предоставляющих широкий ассортимент товаров для зрения: очки, контактные линзы, аксессуары, средства ухода за глазами и многое другое».</blockquote>
        <p className="geo-note">GigaChat без веб-поиска. Фрагмент ответа; название компании скрыто.</p>
        <div className="geo-map-line"><span>Находка</span><strong>Компания продаёт телескопы, микроскопы и бинокли.</strong></div>
        <div className="geo-map-line"><span>Задача</span><strong>Согласовать описание деятельности на сайте и в карточках организации.</strong></div>
        <a className="geo-secondary" href={agency ? '#sample' : '#proof'}>Подробнее в примере ↓</a>
      </aside>
    </section>
    {agency && <section className="geo-section geo-wrap geo-fit"><p className="geo-eyebrow">Кому подходит</p><h2>Есть клиент. Нужны данные для следующего шага.</h2><p>Для агентства с конкретным клиентским проектом и задачей: проверить факты о компании, разобраться в источниках рекомендаций или подготовить план работ. Отношения с клиентом остаются у вас.</p></section>}
    <section id={agency ? 'scope' : 'channels'} className="geo-section geo-wrap">
      <p className="geo-eyebrow">01 / Результат</p><h2>{agency ? 'Что передам' : 'Что будет на руках'}</h2>
      <div className={`geo-cards ${agency ? 'geo-three' : ''}`}>{cards.map(([title, body], i) => <article key={title}><span className="geo-card-index">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      <div className="geo-method"><p className="geo-formula">60 × 5 × 2 + 60 × 3 = <strong>780</strong></p><p>60 запросов, 8 каналов, план на 780 ответов — не 780 уникальных вопросов. Карту согласуем до замера.</p>
        <details><summary>Каналы и методика сбора</summary><div className="geo-details"><p><strong>Без веб-поиска:</strong> Алиса, GigaChat, DeepSeek, ChatGPT, Gemini. По 60 запросов, два прогона — 600 ответов.</p><p><strong>С веб-поиском:</strong> Алиса с поиском, Яндекс Нейро, ChatGPT с поиском. По 60 запросов — 180 ответов.</p><p>Упор — пользовательские интерфейсы. В исходниках отдельно отмечаю канал, веб-поиск, способ получения (UI или API) и дату. API — дополнительная база, эквивалентность экрану покупателя не предполагается. Сбой, отказ и отсутствие ответа отмечаются отдельно.</p><p>В анализ входят упоминания, конкуренты, сценарии, цитаты, факты, источники ИИ-поиска и спрос Wordstat. Wordstat не измеряет обращения к нейросетям. Формат отчёта и исходных файлов согласуем при заказе.</p></div></details>
      </div>
    </section>
    <section id={agency ? 'sample' : 'proof'} className="geo-section geo-wrap geo-sample">
      <p className="geo-eyebrow">02 / Пример отчёта</p><h2>{agency ? 'Пример для агентства' : 'Посмотрите, как выглядит результат'}</h2>
      <p>Обезличенный фрагмент аудита магазина оптических приборов, 4–6 сентября 2026. В примере — ответы пяти моделей без веб-поиска, источники Perplexity Sonar, проверка сайта по 13 пунктам и план работ.</p>
      <div className="geo-cards geo-three"><article><span className="geo-card-index">01 / Ответ</span><h3>Что сказала нейросеть</h3><p>Вопрос: «Сеть магазинов оптических приборов [компания] — чем известна и где её магазины». GigaChat описывает продавца очков и контактных линз. Дата замера: 4–6 сентября 2026.</p></article><article><span className="geo-card-index">02 / Доказательство</span><h3>Где ошибка</h3><p>В ассортименте — телескопы, микроскопы и бинокли. В отчёте приведены вопрос, цитата ответа и проверка деятельности компании.</p></article><article><span className="geo-card-index">03 / Задача</span><h3>Что изменить</h3><p>Привести описание деятельности и перечень продуктов на сайте и в карточках организации к одной формулировке.</p></article></div>
      <a className="geo-button" href="https://docs.google.com/document/d/1xedBEBXOxsy1v39bU428e8uFIgNi0kBe/preview" data-geo-action="sample-open" target="_blank" rel="noopener noreferrer">Открыть пример отчёта<span aria-hidden="true">↗</span></a>
      <div className="geo-sample-links"><a href="https://docs.google.com/document/d/1euO65CVTrjJ5o5jRDH0iHELskWgjtCO-/preview" data-geo-action="sample-open" target="_blank" rel="noopener noreferrer">Срез · 15 сентября 2026 ↗</a><a href="https://docs.google.com/document/d/1ScYt_qvpMN-hVr-6dy7hNo3cy05OLvmt/preview" data-geo-action="sample-open" target="_blank" rel="noopener noreferrer">Срез · 24–25 сентября 2026 ↗</a></div>
      <p className="geo-note">Полные документы открываются с названиями исследованных компаний. Исторические срезы отличаются от нынешнего мини 5 + 1 и состава полного аудита, указанного выше.</p>
      {agency && <p>До передачи согласуем подпись и оформление под агентство. Проверю имя, контакты и цены исполнителя в содержимом, свойствах файлов и приложениях.</p>}
    </section>
    {!agency && <Process />}
    <section id={agency ? 'price' : 'packages'} className="geo-section geo-wrap">
      <p className="geo-eyebrow">{agency ? '03' : '04'} / Стоимость</p>
      <div className="geo-price-card" data-geo-section="pricing"><div><h2>Полный GEO-аудит</h2><p className="geo-price">{price} ₽</p><p>3 рабочих дня. {condition}</p><p className="geo-note">Оплату, документы и формат файлов согласуем при заказе.</p></div><div><ul><li>60 запросов и 8 каналов — план на 780 ответов</li><li>Упоминания, конкуренты, факты, источники и спрос</li><li>Проверка сайта по 13 пунктам</li><li>Отчёт, исходные ответы и план с приоритетами</li><li>Контрольный замер через месяц</li></ul><a className="geo-button" href="#contact" data-select-product="full">{cta}<span aria-hidden="true">↗</span></a></div></div>
    </section>
    <section id="mini" className="geo-section geo-wrap geo-mini"><p className="geo-eyebrow">Отдельный первый шаг</p><h2>Нужен первый пример по {agency ? 'компании клиента' : 'вашей компании'}?</h2><p>Бесплатный мини-срез: 5 вопросов покупателей без названия компании и один повтор в интерфейсе Яндекса. Покажу конкретные ответы и ограничения замера. Срок — один рабочий день после получения данных и согласования задачи.</p><p>Сначала уточним задачу и возможность выполнить срез. Мини не заменяет полный аудит и не даёт картину всех нейросетей.</p><details><summary>Что покажет мини</summary><div className="geo-details"><p>Один согласованный интерфейс Яндекса, до 6 ответов с датой, каналом, наблюдавшимися упоминаниями и ссылками. Один повтор не позволяет оценить статистическую устойчивость. Отсутствие генеративного ответа — отсутствие данных.</p></div></details><div className="geo-mini-action"><a className="geo-button geo-button-outline" href="#contact" data-select-product="mini">Запросить мини-срез<span aria-hidden="true">↗</span></a><span>Полный аудит — {price} ₽</span></div></section>
    {agency && <Process />}
    <section className="geo-section geo-wrap"><p className="geo-eyebrow">Вопросы и границы</p><h2>Перед началом</h2><div className="geo-faq">{(agency ? agencyFaq : commonFaq).map(([q, a]) => <details key={q}><summary>{q}</summary><p className="geo-details">{a}</p></details>)}</div></section>
    <section id="contact" className="geo-section geo-wrap geo-contact"><div><p className="geo-eyebrow">Обсудим задачу</p><h2>{agency ? 'Начнём с проекта клиента' : 'Начнём с вашей компании'}</h2><p>Для полного аудита мини не нужен. Уточню задачу по указанному контакту. Отвечаю в будни.</p><address><a href="https://t.me/telegam_kolesnikov" data-geo-action="telegram" target="_blank" rel="noopener noreferrer">Telegram @telegam_kolesnikov ↗</a><a href="mailto:sterlet.prod@gmail.com" data-geo-action="email">sterlet.prod@gmail.com</a><a href="tel:+79127582210" data-geo-action="phone">+7 912 758 22 10</a></address></div><GeoLeadForm segment={segment} enabled={enabled} privacyUrl={privacyUrl} /></section>
    <footer className="geo-footer geo-wrap"><span>Антон Колесников · GEO-аудит</span><a href="/geo/privacy">Политика обработки данных</a><a href="#geo-heading">Наверх ↑</a></footer>
  </main>;
}
function Process() { return <section id="steps" className="geo-section geo-wrap"><p className="geo-eyebrow">Как работаем</p><h2>От задачи до контрольного замера</h2><ol className="geo-steps">{steps.map(([title, body], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>; }
