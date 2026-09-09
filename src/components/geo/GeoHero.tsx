"use client";

import { useEffect, useState } from "react";
import { HighlightWipeHeading } from "@/components/HighlightWipeHeading";
import Link from "next/link";

// Простые монохромные глифы без брендовых логотипов: аудит — кружок с точкой,
// внедрение — квадрат, сопровождение — два кольца. Всё через currentColor.
const GLYPHS = {
  audit: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  implement: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="8" y="8" width="8" height="8" />
    </>
  ),
  support: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
};

function ServiceChip({ glyph, label }: { glyph: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-[16px] md:w-[1.3vw] h-[16px] md:h-[1.3vw]"
      >
        {glyph}
      </svg>
      <span className="text-[11px] md:text-[0.91vw] uppercase font-bold tracking-tighter font-sans">
        {label}
      </span>
    </div>
  );
}

interface GeoHeroProps {
  isLifted?: boolean;
}

export default function GeoHero({ isLifted }: GeoHeroProps) {
  const [greeting, setGreeting] = useState("Доброе утро!");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Добрый день!");
    else if (hour >= 17 || hour < 5) setGreeting("Добрый вечер!");
  }, []);

  return (
    <div className="relative h-screen w-full font-sans overflow-hidden bg-transparent">
      <div className="relative z-10 w-full h-full px-6 md:px-[4vw] pt-6 md:pt-[4vh] pb-8 md:pb-[4vh] flex flex-col justify-between text-[#e0ded8]">

        <div className="flex w-full items-start justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] opacity-60 hover:opacity-100 transition-opacity font-sans"
            >
              ← Kolesnikov
            </Link>
            <span className="hidden md:inline text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] opacity-30 font-sans">{greeting}</span>
          </div>
          <div>
            <Link
              href="#contact"
              className="text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] border-b border-[#e0ded8]/40 pb-0.5 cursor-pointer font-sans hover:border-[#e0ded8] transition-colors"
            >
              Написать
            </Link>
          </div>
        </div>

        <div className="w-full mt-auto flex flex-col">
          <div className="grid grid-cols-12 w-full gap-4 md:gap-0 mb-6 md:mb-[2vh]">
            <div className="col-span-12 flex flex-col">
              <p className="text-[3.5vw] md:text-[1vw] opacity-60 mb-1 font-sans">AI-видимость бизнеса · замер и план работ</p>
              <h2 className="text-[8vw] md:text-[3vw] font-sans font-bold leading-tight tracking-tighter">
                <span className="text-[#e0ded8]">Антон</span> <span className="opacity-40 font-medium">Колесников</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-12 w-full items-start gap-4 md:gap-0">
            <div className="col-span-12 md:col-span-8">
              <HighlightWipeHeading
                as="h1"
                lines={["ЧТО НЕЙРОСЕТИ", "ОТВЕЧАЮТ ВАШЕМУ", "ПОКУПАТЕЛЮ"]}
                className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] w-full md:w-[110%] -ml-0 md:-ml-1 tracking-tight leading-[0.9]"
                stagger={0.12}
                trigger={isLifted}
                delay={0.6}
              />
            </div>

            <div className="col-span-12 md:col-span-4 md:pl-[4vw] flex flex-col pt-1.5 md:pt-[0.5vw]">
              <div className="w-full h-[1px] bg-[#e0ded8]/20 mb-4 md:mb-[1.5vw]" />

              <div className="space-y-1 md:space-y-[0.3vw] text-[3.5vw] md:text-[1vw] uppercase tracking-wider font-medium font-mono text-[#e0ded8]/60 mb-8 md:mb-[3vw] text-left">
                {/* Пять имён в одну строку не влезают в колонку на 1440px — делим осознанно, а не браузером */}
                <p>Алиса · GigaChat · ChatGPT</p>
                <p>DeepSeek · Gemini · Perplexity</p>
                <p>Доля голоса, ошибки фактов, источники, план работ</p>
                <p>Аудит — 25 000 ₽, 3 рабочих дня. Контрольный съём через месяц включён</p>
              </div>

              <div className="flex items-center justify-between md:justify-start gap-4 md:gap-[2.5vw] mt-auto">
                <ServiceChip glyph={GLYPHS.audit} label="Аудит" />
                <ServiceChip glyph={GLYPHS.implement} label="Внедрение" />
                <ServiceChip glyph={GLYPHS.support} label="Сопровождение" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
