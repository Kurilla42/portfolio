"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ymGoal } from "@/lib/ym";

// Цены и сроки — из Оффер_и_прайс.md, без изменений. Неразрывные пробелы внутри чисел,
// чтобы «25 000 ₽» не разваливалось на две строки в узкой правой колонке.
const PRICING_PLANS = [
  {
    id: "01",
    title: "АУДИТ AI-ВИДИМОСТИ",
    subdescription: "Замер по 60–80 запросам в пяти нейросетях, разбор источников и сайта, план работ. Через месяц — контрольный съём, он в цене.",
    whoIsThisFor: "Компании с собственным сайтом и понятной нишей, где ошибка выбора дорого стоит покупателю: мебель, техника и оптика, B2B-услуги и ПО, оптовые поставки. В других нишах сначала короткая проба: в части из них нейросети отказываются называть компании вовсе, и я скажу об этом до старта. Если продаёте только через маркетплейс — замер покажет мало.",
    resources: [
      "Полная карта запросов и конкурентов по всем сценариям покупки",
      "Доля голоса по каждому сценарию и по каждой нейросети",
      "Дословные цитаты о вашей компании с проверкой фактов",
      "Источники, которые цитирует ИИ-поиск, и место вашего сайта среди них",
      "Разбор сайта по 13 пунктам цитируемости с доказательствами",
      "Спрос по Вордстату и потери в рублях на тысячу покупателей",
      "План работ с приоритетами и часами + контрольный съём через месяц"
    ],
    footerText: "Сырые данные — запрос, нейросеть, дата, полный текст ответа — передаются вместе с отчётом. Любую цифру вы можете перепроверить сами.",
    buttonText: "Заказать аудит",
    investment: "25 000 ₽",
    pricePrefix: "от",
    period: "3 рабочих дня",
    retainer: "50% аванс, 50% по сдаче\nдоговор и чек самозанятого",
    badge: "начните с этого",
  },
  {
    id: "02",
    title: "ВНЕДРЕНИЕ",
    subdescription: "Исполнение плана из аудита: переработка ключевых страниц под цитируемость, FAQ с разметкой, карточки организации, 2–3 внешних источника, исправление ошибок о бренде.",
    whoIsThisFor: "Тем, у кого после аудита нет рук на план: маркетолог занят, подрядчика по нейросетям нет. Объём и цена фиксируются после аудита — по вашему плану, а не по прайсу.",
    resources: [
      "Прямые ответы на вопросы покупателя на страницах сценариев, где вас нет",
      "Блок вопросов и ответов с разметкой FAQPage, которую читают нейросети",
      "Машиночитаемые карточки JSON-LD: компания, товар, цена",
      "Карточки организации и каталоги — одно описание везде",
      "Материалы для 2–3 площадок, которые цитирует ИИ-поиск",
      "Исправление фактических ошибок у источника",
      "Контрольный съём через месяц — из аудита"
    ],
    footerText: "Вы получаете исполненный план, а не список рекомендаций. Что изменилось в ответах, покажет контрольный съём теми же цифрами.",
    buttonText: "Обсудить внедрение",
    investment: "40 000 ₽",
    pricePrefix: "от",
    period: "2–4 недели",
    retainer: "до 80 000 ₽ — по объёму плана",
    badge: null,
  },
  {
    id: "03",
    title: "СОПРОВОЖДЕНИЕ",
    subdescription: "Ежемесячный съём с динамикой, работа с источниками и контентом по плану, отчёт «что изменилось и почему».",
    whoIsThisFor: "Тем, кто хочет вести канал постоянно. Минимальный горизонт — три месяца: отличить устойчивый сдвиг от обычного шума ответов можно только по серии съёмов.",
    resources: [
      "Ежемесячный замер по той же карте запросов",
      "Динамика доли голоса и покрытия по сценариям",
      "Новые фактические ошибки ловятся, их источник правится; что изменилось в ответах — покажет следующий съём",
      "Работа с источниками и контентом по плану",
      "Отчёт «что изменилось и почему» раз в месяц",
      "Пересмотр карты запросов при смене ассортимента"
    ],
    footerText: "Нейросети меняют ответы, и разовый аудит устаревает. Вы получаете канал, за которым слежу я.",
    buttonText: "Обсудить сопровождение",
    investment: "30 000 ₽",
    pricePrefix: "от",
    period: "в месяц",
    retainer: "объём фиксируется после аудита\nот 3 месяцев",
    badge: null,
  },
];

const TEXT_STYLE_MATCH = "font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-widest text-[#e0ded8] leading-relaxed";

export function GeoPricingTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  useInView(containerRef, { once: true, amount: 0.2 });

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 10 : -10,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction > 0 ? -10 : 10,
      opacity: 0,
    }),
  };

  return (
    <section ref={containerRef} className="w-full pb-16 md:pb-32 pt-24 relative z-30 bg-black" id="packages" aria-labelledby="packages-title">
      <div className="relative z-10 w-full px-6 md:px-[4vw] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          {/* Левая колонка: заголовок и навигация по тарифам */}
          <div className="lg:col-span-4 flex flex-col justify-start order-1 lg:order-1 pt-0">
            <div className="space-y-4 mb-8 md:mb-[4vw]">
              <h2 id="packages-title" className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] tracking-tight">
                С ЧЕГО<br />НАЧАТЬ
              </h2>
            </div>

            {/* ARIA-паттерн tabs: без него скринридер видел три кнопки без связи с содержимым справа.
                Кнопки стоят столбиком — aria-orientation="vertical" */}
            <div className="flex flex-col space-y-0" role="tablist" aria-orientation="vertical" aria-label="Тарифы">
              {PRICING_PLANS.map((plan, index) => {
                const isActive = activeIndex === index;
                // На /adw нижней линии нет ни у одного пункта (все четыре индекса исключены) —
                // сохраняем тот же вид для трёх пунктов: разделяет только золотая линия после аудита.
                const hasBottomBorder = index !== 0 && index !== 1 && index !== PRICING_PLANS.length - 1;

                return (
                  <React.Fragment key={plan.id}>
                    {index === 1 && (
                      <div className="py-6 md:py-[2vw] flex items-center px-6 md:px-[2vw]" aria-hidden="true">
                        <div className="w-full h-[1px] bg-[#c7b684]" />
                      </div>
                    )}
                    <button
                      type="button"
                      role="tab"
                      id={`packages-tab-${plan.id}`}
                      aria-selected={isActive}
                      aria-controls="packages-panel"
                      onClick={() => handleTabClick(index)}
                      className={cn(
                        "group relative flex items-center gap-4 md:gap-[1.5vw] py-6 md:py-[2vw] px-6 md:px-[2vw] text-left transition-all duration-500 border-l border-[#e0ded8]/10",
                        hasBottomBorder && "border-b border-[#e0ded8]/10",
                        isActive ? "bg-[#e0ded8]/5" : "hover:bg-[#e0ded8]/5"
                      )}
                    >
                      <div className={cn(
                        "absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-500",
                        isActive ? "bg-[#c7b684]" : "bg-[#e0ded8]/5"
                      )} />

                      <span className={cn(
                        "font-mono text-[3.5vw] md:text-[0.8vw] font-bold tabular-nums transition-colors duration-500",
                        isActive ? "text-[#e0ded8]" : "text-[#e0ded8]/20"
                      )}>
                        /{plan.id}
                      </span>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className={cn(
                          "text-[5vw] md:text-[1.2vw] font-mono font-bold tracking-tight transition-colors duration-500 uppercase",
                          isActive ? "text-[#e0ded8]" : "text-[#e0ded8]/30"
                        )}>
                          {plan.title}
                        </span>
                        {plan.badge && (
                          <span className="px-2 py-0.5 bg-[#c7b684] text-black text-[2vw] md:text-[0.6vw] font-mono font-bold uppercase tracking-wider rounded-sm ml-2">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Правая колонка: содержимое тарифа */}
          <div className="lg:col-span-8 flex flex-col order-2 lg:order-2">
            {/* 720 вместо 850 на /adw: планов три, а не четыре, и при 850 между тарифами и FAQ оставалась пустая полоса */}
            <div className="relative min-h-[500px] md:min-h-[720px]">
              {/* tabpanel — на статичной обёртке, а не на motion.div внутри AnimatePresence: тот перемонтируется при каждом переключении */}
              <div
                className="h-full flex flex-col relative p-0 md:pl-[4vw]"
                role="tabpanel"
                id="packages-panel"
                aria-labelledby={`packages-tab-${PRICING_PLANS[activeIndex].id}`}
              >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6 pt-8 md:pt-0">
                      <div className="w-full">
                        <p className={cn(TEXT_STYLE_MATCH, "mb-8")}>
                          {PRICING_PLANS[activeIndex].subdescription}
                        </p>
                        <div className="mb-10">
                          <span className={cn(TEXT_STYLE_MATCH, "block mb-2")}>ДЛЯ КОГО</span>
                          <p className={TEXT_STYLE_MATCH}>
                            {PRICING_PLANS[activeIndex].whoIsThisFor}
                          </p>
                        </div>
                      </div>

                      <div className="text-left md:text-right w-full md:w-auto shrink-0 pt-2">
                        <div className="flex items-baseline md:justify-end gap-4">
                          {PRICING_PLANS[activeIndex].pricePrefix && (
                            <span className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-widest text-[#e0ded8]">
                              {PRICING_PLANS[activeIndex].pricePrefix}
                            </span>
                          )}
                          <span className="text-[8vw] md:text-[4vw] font-black text-[#e0ded8] font-headline whitespace-nowrap">
                            {PRICING_PLANS[activeIndex].investment}
                          </span>
                        </div>
                        {/* Срок и условия оплаты — на /adw их нет в правом блоке, здесь они часть оффера */}
                        <span className="block mt-2 font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-widest text-[#e0ded8]">
                          {PRICING_PLANS[activeIndex].period}
                        </span>
                        <span className="block mt-1 font-mono text-[3.5vw] md:text-[0.9vw] tracking-widest text-[#e0ded8]/60 md:max-w-[22vw] md:ml-auto whitespace-pre-line">
                          {PRICING_PLANS[activeIndex].retainer}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col mb-8">
                      <div className="mb-10">
                        <span className={cn(TEXT_STYLE_MATCH, "block mb-4")}>ЧТО ВХОДИТ</span>
                        <ul className="space-y-3 mb-10">
                          {PRICING_PLANS[activeIndex].resources.map((resource, i) => (
                            <li key={i} className={cn(TEXT_STYLE_MATCH, "flex items-start gap-4")}>
                              <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#c7b684] shrink-0" />
                              {resource}
                            </li>
                          ))}
                        </ul>

                        <div className="max-w-2xl mb-8">
                          <p className={TEXT_STYLE_MATCH}>
                            {PRICING_PLANS[activeIndex].footerText}
                          </p>
                        </div>

                        <div className="flex justify-start">
                          <Button
                            asChild
                            variant="link"
                            className="text-[#e0ded8] p-0 h-auto font-mono font-bold uppercase tracking-[0.2em] text-[3.5vw] md:text-[1vw] underline underline-offset-8 decoration-[#e0ded8]/30 hover:decoration-[#e0ded8] transition-all"
                          >
                            {/* Цель Метрики geo_cta_01/02/03 — по какому тарифу дошли до формы */}
                            <Link
                              href="#contact"
                              onClick={() => ymGoal('geo_cta_' + PRICING_PLANS[activeIndex].id)}
                            >
                              {PRICING_PLANS[activeIndex].buttonText}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
