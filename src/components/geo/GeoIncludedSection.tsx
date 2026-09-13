"use client";

import { motion } from 'framer-motion';

const layers = [
  {
    id: "01",
    name: "Замер",
    tag: "60–80 запросов × 5 нейросетей × 2 прогона",
    pitch: "От 600 ответов на вопросы, с которыми покупатель приходит к выбору: где купить, сколько стоит, что выбрать, кто лучше. Карту запросов согласуем с вами до старта. Два прогона нужны, потому что ответы меняются от раза к разу — повторный съём отсекает случайные всплески.",
    deliverables: [
      "Карта запросов по сценариям покупки, согласованная с вами",
      "Доля голоса: сколько раз называют вас против конкурентов",
      "Покрытие по сценариям — где вас называют, а где нет",
      "Разрез по нейросетям: кто вас знает, а кто не знает вовсе",
      "Дословные цитаты о вашей компании с проверкой фактов",
      "Компании-тёзки отсекаются вручную, а не засчитываются вам"
    ]
  },
  {
    id: "02",
    name: "Источники и сайт",
    tag: "Perplexity — ИИ-поиск с реальными ссылками + 13 пунктов проверки сайта",
    pitch: "Отдельная модель с веб-поиском (Perplexity) показывает, на какие сайты опирается ИИ, отвечая о вашей нише, и есть ли среди них ваш. Сайт проверяю глазами по 13 пунктам «что мешает нейросети процитировать страницу»: сайты, собранные скриптами, в исходном коде показывают пустоту, и парсеру верить нельзя.",
    deliverables: [
      "Площадки, которые ИИ-поиск цитирует по вашей нише",
      "Место вашего сайта в этом списке",
      "Есть ли на странице прямой ответ на вопрос покупателя",
      "Цены, условия, ассортимент — видны ли без скриптов",
      "Разметка Schema.org / JSON-LD, FAQ, карточка организации",
      "У каждого «нет» — адрес страницы и доказательство"
    ]
  },
  {
    id: "03",
    name: "Спрос и деньги",
    tag: "Вордстат + ваш средний чек и конверсия",
    pitch: "Прямой статистики запросов к нейросетям нет ни у кого. Вордстат — ближайший измеримый ориентир. Сведённый с покрытием, он показывает, сколько из каждой тысячи покупателей получат ответ без вашего имени и сколько это стоит.",
    deliverables: [
      "Частотность по каждому сценарию покупки",
      "Сколько из тысячи спросивших не увидят вас",
      "Потери в рублях при вашем чеке и конверсии",
      "Сколько ваших покупателей спрашивает нейросеть, не знает никто — поэтому считаю на тысячу спросивших, а не за месяц",
      "Приоритеты плана работ — из спроса, а не из догадок",
      "Если чек не раскрываете — беру средний по витрине сайта и так и пишу"
    ]
  },
  {
    id: "04",
    name: "План работ и контрольный съём",
    tag: "Задачи с приоритетами и часами · повтор через месяц включён",
    pitch: "По каждому пробелу — что сделать, на какой странице или площадке, из какой цифры замера это следует и сколько часов заложено. Исполнить можно своими силами или с любым подрядчиком. Через месяц — тот же замер по той же карте: что изменилось, а что нет.",
    deliverables: [
      "Три приоритета: срочно, важно, потом",
      "Оценка в часах по каждой задаче",
      "Задача №1 — исправить фактические ошибки о компании",
      "Задачи: страницы под сценарии, где вас нет",
      "Задачи: войти на площадки, которые цитирует ИИ-поиск, если такие есть",
      "Контрольный съём через месяц — в цене аудита"
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export function GeoIncludedSection() {
  return (
    <section className="relative py-16 md:py-[72px] z-30 overflow-hidden w-full bg-black" id="channels" aria-labelledby="channels-title">
      <div className="relative z-10 w-full px-6 md:px-[4vw]">
        <div className="grid grid-cols-12 gap-8 md:gap-0 items-start mb-12 md:mb-[8vh]">
          {/* В одну строку на десктопе: восемь колонок под заголовок, иначе «ЧТО ВХОДИТ В АУДИТ» переносится */}
          <div className="col-span-12 lg:col-span-8 flex flex-col">
            <h2 id="channels-title" className="text-[12vw] md:text-[6vw] md:whitespace-nowrap font-headline text-[#e0ded8] uppercase leading-[0.9] mb-4 md:mb-8 tracking-tight">
              ЧТО ВХОДИТ В АУДИТ
            </h2>
          </div>
          <div className="col-span-12 lg:col-start-9 lg:col-span-4 flex items-end h-full">
            <p className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-tight text-[#e0ded8]/60 leading-relaxed">
              Один отчёт, четыре слоя. Каждую цифру можно пересчитать по приложенной
              таблице сырых ответов: запрос, нейросеть, дата, полный текст.
            </p>
          </div>
        </div>

        <motion.div
          className="flex flex-col w-full border-t border-[#e0ded8]/20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {layers.map((layer) => (
            <motion.div
              key={layer.id}
              variants={itemVariants}
              className="grid grid-cols-12 gap-6 md:gap-[2vw] py-10 md:py-[5vh] border-b border-[#e0ded8]/20 group"
            >
              {/* Слева: номер + название */}
              <div className="col-span-12 lg:col-span-5 flex flex-col">
                <div className="flex items-baseline gap-4 md:gap-[1.5vw]">
                  {/* Номер того же кегля, что заголовок, и фиксированной ширины на md+:
                      «/04» в Oswald 700 при 3.2vw ≈ 4.4vw, берём 4.8vw с запасом —
                      тогда tag и pitch ниже отступают ровно на ширину номера + gap */}
                  <span className="font-headline text-[9vw] md:text-[3.2vw] leading-[0.95] text-[#c7b684] tabular-nums md:w-[4.8vw] shrink-0">
                    /{layer.id}
                  </span>
                  <h3 className="text-[9vw] md:text-[3.2vw] font-headline text-[#e0ded8] uppercase leading-[0.95] tracking-tight transition-colors duration-300 group-hover:text-[#c7b684]">
                    {layer.name}
                  </h3>
                </div>
                <span className="font-mono text-[3vw] md:text-[0.8vw] uppercase tracking-[0.2em] text-[#e0ded8]/40 mt-3 md:mt-4 md:pl-[6.3vw]">
                  {layer.tag}
                </span>
                <p className="font-mono text-[3.5vw] md:text-[0.95vw] text-[#e0ded8]/70 leading-relaxed mt-5 md:mt-6 md:pl-[6.3vw] md:max-w-[90%] normal-case">
                  {layer.pitch}
                </p>
              </div>

              {/* Справа: что получаете */}
              <div className="col-span-12 lg:col-start-7 lg:col-span-6 flex flex-col justify-center">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 md:gap-y-4">
                  {layer.deliverables.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-mono text-[3.5vw] sm:text-[1.6vw] md:text-[0.85vw] uppercase tracking-widest text-[#e0ded8]/60 leading-relaxed"
                    >
                      <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-[#c7b684] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
