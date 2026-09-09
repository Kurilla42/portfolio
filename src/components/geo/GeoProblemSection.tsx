"use client";

import { motion } from 'framer-motion';
import { HighlightWipeHeading } from '@/components/HighlightWipeHeading';

const part1 = [
  "Часть покупателей уже спрашивает <span class='text-[#c7b684]'>нейросеть</span>, а не поисковик:",
  "какой диван взять, где купить телескоп,",
  "кому отдать разработку на 1С"
];

const part2 = [
  "Нейросеть отвечает <span class='text-[#c7b684]'>именами компаний</span>.",
  "Если вашего среди них нет, покупка уходит",
  "по <span class='text-[#c7b684]'>чужому адресу</span> — и вы об этом не узнаете"
];

const leakPoints = [
  {
    number: "01",
    title: "Вас нет\nв ответе",
    description: "На вопрос «кто даст разработчика на 1С» нейросети назвали компании в 40 ответах. Клиента — ни в одном. Так выглядит замер у большинства, кого я мерил: ноль или единичные упоминания."
  },
  {
    number: "02",
    title: "Чужой бизнес\nпод вашим\nименем",
    description: "Алиса описала мебельную фабрику как сервис аренды складов, а фабрику сумок — как перекупщика без производства. Модель, которая вас не знает, достраивает смысл по названию."
  },
  {
    number: "03",
    title: "Не ваша\nцена",
    description: "Две модели независимо назвали цену продукта в 4–6 раз ниже реальной, третья — в полтора-два с половиной раза выше. Первый разговор о деньгах начинается не с вашей цифры."
  },
  {
    number: "04",
    title: "Ложный\nфакт",
    description: "Чужой адрес магазина, выдуманный производитель продукта, неверный год основания. Покупатель, который поверит нейросети, приедет не туда."
  },
  {
    number: "05",
    title: "В сети есть,\nв памяти нет",
    description: "Модель с веб-поиском находит компанию в 8 ответах из 26. Четыре модели, отвечающие по памяти, — ни в одном ответе на вопросы, где имени компании не было. Быть в интернете и попасть в то, что нейросеть уже знает, — разные задачи."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function GeoProblemSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 md:px-[4vw]">
      <div className="w-full md:max-w-full flex flex-col gap-12 md:gap-24">
        <div className="w-full flex justify-start">
          <HighlightWipeHeading
            as="p"
            lines={part1}
            className="text-[8vw] md:text-[3vw] font-headline uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] items-start text-left tracking-normal"
            stagger={0.08}
            triggerOnce={true}
          />
        </div>

        <div className="w-full flex justify-start md:justify-end">
          <HighlightWipeHeading
            as="p"
            lines={part2}
            className="text-[8vw] md:text-[3vw] font-headline uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] items-start text-left tracking-normal"
            stagger={0.08}
            triggerOnce={true}
            delay={0.4}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-[2vw] mt-12 md:mt-8 md:px-[4vw]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {leakPoints.map((point, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-start text-left"
              variants={itemVariants}
            >
              <span className="font-mono text-[10px] md:text-[0.7vw] text-[#e0ded8]/40 mb-3 tracking-widest">
                [{point.number}]
              </span>
              {/* 2.4vw вместо 3vw на /adw: кириллические заголовки длиннее и при 3vw «ВЫДУМАННЫЙ» вылезал в соседнюю колонку */}
              <h3 className="font-headline text-[8vw] md:text-[2.4vw] text-[#e0ded8] leading-none mb-4 uppercase whitespace-pre-line">
                {point.title}
              </h3>
              <div className="w-full h-[1px] bg-[#e0ded8]/20 mb-6" />
              <p className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-widest text-[#e0ded8]/60 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
