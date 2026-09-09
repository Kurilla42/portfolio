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
    value: "60 ч",
    label: "план работ: 15 задач с приоритетами и оценкой в часах"
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

export function GeoProofSection() {
  return (
    <section className="relative py-16 md:py-[72px] z-30 overflow-hidden w-full bg-black" id="proof">
      <div className="relative z-10 w-full px-6 md:px-[4vw]">
        {/* Шапка: заголовок слева, подпись справа */}
        <div className="grid grid-cols-12 gap-8 md:gap-0 items-start mb-12 md:mb-[8vh]">
          <div className="col-span-12 lg:col-span-6 flex flex-col">
            <h2 className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] mb-4 md:mb-8 tracking-tight">
              ОДИН ОТЧЁТ<br />В ЦИФРАХ
            </h2>
          </div>
          <div className="col-span-12 lg:col-start-8 lg:col-span-5 flex items-end h-full">
            <p className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-tight text-[#e0ded8]/60 leading-relaxed">
              Полный аудит · интернет-магазин оптических приборов · сентябрь 2026 · без названия клиента
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
              При этом компания — на первом месте в нише по упоминаниям, доля голоса 11,2 %. Хороший результат не отменяет находок: это единственный тип находки, где нейросеть не забывает о компании, а рассказывает о ней неправду. Исправление таких ошибок стоит первым приоритетом в плане. Сколько покупателей вообще спрашивает нейросеть, не знает никто, поэтому потери посчитаны на тысячу спросивших, а не в рублях за месяц. Этот отчёт снят в объёме 30 запросов × 5 нейросетей; аудит по прайсу — 60–80 запросов × 5 × 2 прогона.
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
          <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-[2vw] border-t border-[#e0ded8]/10">
            {reportSections.map((title, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-baseline gap-4 md:gap-[1vw] py-3 border-b border-[#e0ded8]/10 font-mono text-[3.5vw] md:text-[0.85vw] uppercase tracking-widest text-[#e0ded8]/60 leading-relaxed"
              >
                <span className="text-[#c7b684] font-bold tabular-nums shrink-0">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                {title}
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
