"use client";

import { motion } from 'framer-motion';

// Цифры — из реального отчёта по интернет-магазину оптических приборов (сентябрь 2026).
// Неразрывные пробелы внутри чисел, чтобы «177 105 ₽» не переносилось внутри плитки.
const stats = [
  {
    value: "7",
    label: "фактических ошибок о компании в ответах на вопросы о ней"
  },
  {
    value: "3 из 5",
    label: "нейросетей описали магазин как продавца совсем другого товара"
  },
  {
    value: "177 105 ₽",
    label: "проходит мимо на каждую тысячу покупателей, задавших нейросети вопрос из ниши"
  },
  {
    value: "256 из 1000",
    label: "покупателей из тысячи, спросивших «где купить», получат ответ без компании"
  }
];

const reportSections = [
  "Главное за минуту",
  "Доля голоса",
  "Сценарии покупки",
  "По нейросетям",
  "Устойчивость: повторный съём",
  "Дословные цитаты и ошибки фактов",
  "Что цитирует ИИ-поиск",
  "Разбор сайта по 13 пунктам",
  "Где вас теряют",
  "Спрос по Вордстату",
  "Сколько стоит пробел",
  "План работ",
  "Что дальше",
  "Методика и ограничения",
  "Сырые данные"
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

// Rolling-эффект при наведении — тот же, что в таблице сравнения на page.tsx: две копии текста
// в контейнере фиксированной высоты, при hover контейнер уезжает на -50% и показывает золотую копию.
// Вариант «hover» приходит от родителя (whileHover на <li>), ключей hidden/visible тут нет намеренно —
// иначе съезд стаггера из itemVariants дёргал бы и внутренний блок.
const rollingTextVariants = {
  initial: { y: 0 },
  hover: { y: '-50%' }
};
const rollingTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] };

export function GeoProofSection() {
  return (
    <section className="relative py-16 md:py-[72px] z-30 overflow-hidden w-full bg-black" id="proof">
      <div className="relative z-10 w-full px-6 md:px-[4vw]">
        {/* Шапка: заголовок слева, подпись справа */}
        <div className="grid grid-cols-12 gap-8 md:gap-0 items-start mb-12 md:mb-[8vh]">
          <div className="col-span-12 lg:col-span-6 flex flex-col">
            <h2 className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] mb-4 md:mb-8 tracking-tight">
              ПРИМЕР ОТЧЁТА<br />В ЦИФРАХ
            </h2>
          </div>
          <div className="col-span-12 lg:col-start-8 lg:col-span-5 flex flex-col justify-end h-full">
            <p className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-tight text-[#e0ded8]/60 leading-relaxed">
              Полный аудит · интернет-магазин оптических приборов · сентябрь 2026 · без названия клиента
            </p>
            {/* Оговорки про объём съёма и «на тысячу спросивших» живут здесь, а не в абзаце у цитаты:
                там они утяжеляли вывод, а здесь читаются как паспорт отчёта. */}
            <p className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-tight text-[#e0ded8]/40 leading-relaxed mt-2">
              Снят в объёме 30 запросов × 5 нейросетей; аудит по прайсу — 60–80 × 5 × 2 прогона. Потери посчитаны на тысячу спросивших: сколько покупателей вообще спрашивает нейросеть, не знает никто.
            </p>
          </div>
        </div>

        {/* Четыре плитки с цифрами */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-[2vw] border-t border-b border-[#e0ded8]/20 py-10 md:py-[5vh]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-start text-left"
              variants={itemVariants}
            >
              <span className="font-headline text-[14vw] md:text-[4.5vw] text-[#e0ded8] leading-none mb-4 md:mb-6 whitespace-nowrap">
                {stat.value}
              </span>
              <div className="w-full h-[1px] bg-[#e0ded8]/20 mb-4 md:mb-6" />
              <p className="font-mono text-[3.5vw] md:text-[0.85vw] uppercase tracking-widest text-[#e0ded8]/60 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Цитата из отчёта и вывод */}
        <motion.div
          className="grid grid-cols-12 gap-8 md:gap-[2vw] py-12 md:py-[8vh] border-b border-[#e0ded8]/20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.blockquote
            variants={itemVariants}
            className="col-span-12 lg:col-span-7 flex gap-6 md:gap-[2vw]"
          >
            <div className="w-[3px] shrink-0 bg-[#c7b684]" aria-hidden="true" />
            <div className="flex flex-col">
              <p className="font-sans text-[4.5vw] md:text-[1.4vw] leading-snug text-[#e0ded8]">
                «Сеть магазинов оптики … широко известна в России и странах СНГ благодаря обширной сети розничных точек, предоставляющих широкий ассортимент товаров для зрения: очки, контактные линзы, аксессуары, средства ухода за глазами…»
              </p>
              <cite className="not-italic font-mono text-[3vw] md:text-[0.8vw] uppercase tracking-[0.2em] text-[#e0ded8]/40 mt-4 md:mt-6">
                — GigaChat, вопрос о самой компании
              </cite>
            </div>
          </motion.blockquote>

          <motion.div
            variants={itemVariants}
            className="col-span-12 lg:col-start-9 lg:col-span-4 flex items-end"
          >
            <p className="font-mono text-[3.5vw] md:text-[0.95vw] text-[#e0ded8]/70 leading-relaxed normal-case md:max-w-[60vw]">
              При этом компания — на первом месте в нише по упоминаниям, доля голоса 11,2 %. Хороший результат не отменяет находок: это единственный тип находки, где нейросеть не забывает о компании, а рассказывает о ней неправду. Исправление таких ошибок стоит первым приоритетом в плане.
            </p>
          </motion.div>
        </motion.div>

        {/* 15 разделов отчёта */}
        <motion.div
          className="pt-12 md:pt-[8vh]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.span
            variants={itemVariants}
            className="block font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-widest text-[#e0ded8] mb-6 md:mb-8"
          >
            15 РАЗДЕЛОВ ОТЧЁТА
          </motion.span>
          {/* Порядок в колонках вертикальный: на md 1–5 / 6–10 / 11–15, на sm 1–8 / 9–15. grid-flow-col
              раскладывает DOM-порядок сверху вниз, поэтому нумерация по индексу не меняется, а на мобильном
              (один столбец, grid-flow-row) список остаётся 1…15 сверху вниз. На sm вторая колонка короче на один
              пункт — недостающая ячейка просто пустая, сетка не ломается. */}
          <ol className="grid grid-cols-1 sm:grid-cols-2 sm:grid-flow-col sm:grid-rows-8 md:grid-cols-3 md:grid-rows-5 gap-x-8 md:gap-x-[2vw] border-t border-[#e0ded8]/10">
            {reportSections.map((title, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                whileHover="hover"
                className="group cursor-default flex items-baseline gap-4 md:gap-[1vw] py-3 border-b border-[#e0ded8]/10 font-mono text-[3.5vw] md:text-[0.85vw] uppercase tracking-widest leading-relaxed"
              >
                {/* Фиксированная высота и вторая копия — только с md: на узких экранах длинные названия
                    («Дословные цитаты и ошибки фактов») переносятся на две строки, и обрезать их в 1.3em нельзя.
                    На тач-устройствах hover от framer не срабатывает, так что ниже md это просто статичный текст. */}
                {/* Номер: золото → крем */}
                <span className="md:h-[1.3em] overflow-hidden shrink-0">
                  <motion.span
                    variants={rollingTextVariants}
                    transition={rollingTransition}
                    className="flex flex-col"
                  >
                    <span className="md:h-[1.3em] flex items-center text-[#c7b684] font-bold tabular-nums">
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="hidden md:flex md:h-[1.3em] items-center text-[#e0ded8] font-bold tabular-nums" aria-hidden="true">
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.span>
                </span>
                {/* Название: крем/60 → золото */}
                <span className="md:h-[1.3em] overflow-hidden min-w-0">
                  <motion.span
                    variants={rollingTextVariants}
                    transition={rollingTransition}
                    className="flex flex-col"
                  >
                    <span className="md:h-[1.3em] flex items-center text-[#e0ded8]/60 md:whitespace-nowrap">
                      {title}
                    </span>
                    <span className="hidden md:flex md:h-[1.3em] items-center text-[#c7b684] md:whitespace-nowrap" aria-hidden="true">
                      {title}
                    </span>
                  </motion.span>
                </span>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
