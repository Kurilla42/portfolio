"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Аккордеон: на экране только вопросы, ответ раскрывается по клику. Открытых может быть несколько
// одновременно — читатель сравнивает ответы на соседние вопросы («у нас есть сеошник» и «чем отличается
// от SEO-аудита»), закрывать один ради другого неудобно. Тексты ответов остаются в SSR-разметке
// только в открытом состоянии, поэтому для индекса нейросетями всё равно есть страница отчёта.
const faq = [
  {
    question: "Чем это отличается от SEO-аудита?",
    answer: "Частично пересекается, но меряет другое: не позиции в поиске, а что нейросети отвечают вашему покупателю и на какие источники при этом опираются. Если у вас есть SEO-подрядчик, отчёт ему пригодится — это данные, которых у него нет."
  },
  {
    question: "У вас есть кейсы?",
    answer: "Кейсов с результатом «было / стало» нет ни у кого на этом рынке, и выдумывать их я не буду. Что есть — готовый отчёт, он выше в цифрах; первый контрольный съём по нему через месяц. Отчёт устроен так, чтобы вера на слово не требовалась: методика описана в самом отчёте, сырые данные передаются вам, каждая цифра проверяема."
  },
  {
    question: "А есть же сервисы за 3 тысячи?",
    answer: "Есть, и они полезны как термометр. Но там машина считает совпадения слов: тёзку вашей компании она засчитает вам, а устаревший факт не заметит. Здесь первичную разметку тоже делает машина, но каждый вывод и каждая цитата проверяются по сырым ответам вручную — так и находятся выдуманные нейросетью факты о бренде."
  },
  {
    question: "Какие гарантии?",
    answer: "Ответы нейросетей вероятностны. Гарантировать попадание бренда в ответы или «позиции в нейросетях» не может никто — кто обещает, тот вводит вас в заблуждение. Гарантируется другое: методика, заявленный объём замера и честное измерение до/после."
  },
  {
    question: "Обязательно ли заказывать внедрение после аудита?",
    answer: "Нет. Аудит — самостоятельный продукт: план работ остаётся у вас, а контрольный съём через месяц покажет динамику независимо от того, кто исполнял план."
  },
  {
    question: "Что будет, если через месяц ничего не изменится?",
    answer: "Контрольный съём покажет это честно, теми же цифрами, которыми измерялась исходная точка. Динамику дают работы по плану из аудита; сам аудит — диагностика."
  },
  {
    question: "У нас есть сеошник",
    answer: "Отлично, ему пригодится замер: я не заменяю SEO, я меряю то, что он пока не меряет — что нейросети отвечают покупателю и на какие сайты ссылается ИИ-поиск. Это данные, которых в его отчётах нет."
  },
  {
    question: "Нейро и Google AI Overviews входят?",
    answer: "Нет. Пять нейросетей отвечают по своим знаниям, а «ИИ-поиск с источниками» на этой странице — это Perplexity: измерительный прибор, который показывает, на какие сайты ссылается ИИ. ИИ-ответы Поиска Яндекса и Google AI Overviews в базовый состав не входят и обсуждаются отдельно — обещать канал, который не снят по вашим запросам, я не буду."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

// Одна кривая и для высоты, и для поворота «+», чтобы индикатор и раскрытие двигались в одном ритме.
const openTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

export function GeoFaqSection() {
  // Set индексов открытых пунктов: у каждого вопроса своё состояние, открытых может быть несколько.
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());

  const toggle = (i: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    // Без overflow-hidden на секции и сетке: иначе sticky у заголовка перестаёт работать.
    <section className="relative py-16 md:py-[72px] z-30 w-full bg-black px-6 md:px-[4vw]" id="faq">
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-start">
          {/* На десктопе заголовок липнет к верху и едет вместе с прокруткой до конца списка
              (sticky живёт внутри высоты grid-ячейки, а ячейка вытянута по высоте колонки вопросов). */}
          <div className="lg:col-span-4 flex flex-col lg:sticky lg:top-[12vh] self-start">
            <h2 className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] tracking-tight">
              ЧАСТЫЕ<br />ВОПРОСЫ
            </h2>
          </div>

          <motion.div
            className="lg:col-start-6 lg:col-span-7 flex flex-col w-full border-t border-[#e0ded8]/20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {faq.map((item, i) => {
              const isOpen = openItems.has(i);
              const answerId = `faq-answer-${i}`;

              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="border-b border-[#e0ded8]/20"
                >
                  <h3 className="m-0">
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      className="group flex w-full items-baseline gap-4 md:gap-[1.5vw] py-6 md:py-[3vh] text-left cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c7b684]/60"
                    >
                      <span className="font-mono text-[3.5vw] md:text-[0.9vw] text-[#c7b684] font-bold tabular-nums shrink-0">
                        /{String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 font-mono font-bold uppercase tracking-tight text-[4.5vw] md:text-[1.2vw] transition-colors duration-300 group-hover:text-[#c7b684] ${
                          isOpen ? "text-[#c7b684]" : "text-[#e0ded8]"
                        }`}
                      >
                        {item.question}
                      </span>
                      {/* «+» поворачивается в «×» при открытии — тот же знак, без смены глифа, чтобы не прыгала ширина. */}
                      <motion.span
                        aria-hidden="true"
                        animate={{
                          rotate: isOpen ? 45 : 0,
                          color: isOpen ? "#c7b684" : "rgba(224, 222, 216, 0.4)"
                        }}
                        transition={openTransition}
                        className="shrink-0 self-center font-mono font-bold leading-none text-[6vw] md:text-[1.6vw] origin-center select-none"
                      >
                        +
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="a"
                        id={answerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={openTransition}
                        style={{ overflow: 'hidden' }}
                      >
                        {/* Нижний отступ внутри анимируемого блока, а не на нём: иначе при height:0 padding остаётся видимым. */}
                        <p className="font-mono text-[3.5vw] md:text-[0.95vw] text-[#e0ded8]/70 leading-relaxed normal-case pb-6 md:pb-[3vh] md:pl-[2.4vw]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
