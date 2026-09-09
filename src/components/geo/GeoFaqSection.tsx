"use client";

import { motion } from 'framer-motion';

// Все ответы раскрыты сразу, без аккордеона: так текст читается без кликов и целиком попадает в индекс.
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

export function GeoFaqSection() {
  return (
    <section className="relative py-16 md:py-[72px] z-30 w-full bg-black px-6 md:px-[4vw]" id="faq">
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-start">
          <div className="lg:col-span-4 flex flex-col">
            <h2 className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] tracking-tight">
              ЧАСТЫЕ<br />ВОПРОСЫ
            </h2>
          </div>

          <motion.dl
            className="lg:col-start-6 lg:col-span-7 flex flex-col w-full border-t border-[#e0ded8]/20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {faq.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="border-b border-[#e0ded8]/20 py-6 md:py-[3vh]"
              >
                <dt className="flex items-baseline gap-4 md:gap-[1.5vw]">
                  <span className="font-mono text-[3.5vw] md:text-[0.9vw] text-[#c7b684] font-bold tabular-nums shrink-0">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-mono font-bold uppercase tracking-tight text-[4.5vw] md:text-[1.2vw] text-[#e0ded8]">
                    {item.question}
                  </h3>
                </dt>
                <dd className="font-mono text-[3.5vw] md:text-[0.95vw] text-[#e0ded8]/70 leading-relaxed normal-case mt-3 md:mt-4 md:pl-[2.4vw]">
                  {item.answer}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
