"use client";

import Link from "next/link";
import { ymGoal } from "@/lib/ym";

// Отдельный клиентский компонент только ради ymGoal в onClick: сама страница /geo/agency —
// серверный компонент (нужен экспорт metadata с title/description для этого урла).
export function GeoAgencyContact() {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4 font-mono text-[3.5vw] md:text-[1vw] uppercase tracking-widest text-white">
      <Link
        href="tel:+79127582210"
        onClick={() => ymGoal("agency_phone")}
        className="hover:text-[#c7b684] transition-colors"
      >
        +7 912 758 22 10
      </Link>
      <Link
        href="https://t.me/telegam_kolesnikov"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => ymGoal("agency_telegram")}
        className="hover:text-[#c7b684] transition-colors"
      >
        Telegram @telegam_kolesnikov
      </Link>
      <Link
        href="mailto:sterlet.prod@gmail.com"
        onClick={() => ymGoal("agency_email")}
        className="hover:text-[#c7b684] transition-colors"
      >
        sterlet.prod@gmail.com
      </Link>
    </div>
  );
}
