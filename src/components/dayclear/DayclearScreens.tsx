'use client';

import { useState } from 'react';

const screens = [
  { title: 'Обзор', description: 'Показатели за выбранный период рядом с задачами', file: 'overview', alt: 'Обзор проекта Dayclear: показатели за период и задачи' },
  { title: 'Отчет', description: 'Готовые пояснения для следующих отчетов', file: 'report', alt: 'Отчет Dayclear: показатели и сохраненные пояснения' },
  { title: 'Выпуск', description: 'Цифры и пояснения остаются в версии отчета', file: 'issue', alt: 'Сохраненный выпуск отчета Dayclear с показателями и пояснениями' },
  { title: 'Решения', description: 'Решение клиента остается в проекте', file: 'approval', alt: 'Согласование в проекте Dayclear и решение клиента' },
];

export function DayclearScreens() {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected];
  const src = `/dayclear/screens/${screen.file}.jpg`;

  return <section id="screens" className="geo-section geo-wrap dayclear-screens" aria-labelledby="dayclear-screens-heading">
    <div className="dayclear-screens-heading">
      <div><p className="geo-eyebrow">Dayclear изнутри</p><h2 id="dayclear-screens-heading">От показателей<br />до решения</h2></div>
      <p>Посмотрите, как устроена работа с отчетом и согласованиями в проекте.</p>
    </div>
    <div className="dayclear-screen-choices" aria-label="Выберите экран Dayclear">
      {screens.map((item, index) => <button key={item.file} type="button" aria-controls="dayclear-screen-preview" aria-pressed={selected === index} onClick={() => setSelected(index)}>
        <span className="dayclear-screen-number">/{String(index + 1).padStart(2, '0')}</span><span><strong>{item.title}</strong><span>{item.description}</span></span>
      </button>)}
    </div>
    <figure id="dayclear-screen-preview" className="dayclear-screen-figure">
      <span className="dayclear-screen-announcement" aria-live="polite">{screen.title}: {screen.description}</span>
      <img src={src} alt={screen.alt} width={1280} height={1000} loading="lazy" decoding="async" />
      {(screen.file === 'report' || screen.file === 'issue') && <div className="dayclear-screen-detail"><span>На этом экране</span><strong>Почему цифры в рекламе и CRM отличаются?</strong><p>В рекламе считаем заявки на просмотр, в CRM — подтвержденные встречи и оплаты. Это разные этапы воронки. Показываем их отдельно, чтобы не складывать одно обращение несколько раз.</p></div>}
      {screen.file === 'approval' && <div className="dayclear-screen-detail"><span>На этом экране</span><strong>Согласовано · Елена</strong><p>Убрали планировку, которой уже нет в продаже. Остальные варианты согласованы.</p></div>}
      <figcaption><span>Пример работы Dayclear. Данные проектов вымышлены.</span><a href={src} target="_blank" rel="noopener noreferrer">Открыть экран крупнее ↗</a></figcaption>
    </figure>
  </section>;
}
