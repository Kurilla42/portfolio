import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

// Общая «обвязка» <body> для обоих root layout — (en) и (ru). Вынесена из бывшего
// src/app/layout.tsx, чтобы у английских и русских страниц был разный <html lang>,
// а Метрика, курсор, плавный скролл и шум оставались одинаковыми и не расходились
// при правках. Порядок узлов сохранён 1-в-1 с прежним layout.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Yandex.Metrika counter */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109643428', 'ym');
        ym(109643428, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`}
      </Script>
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/109643428" style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
      {/* /Yandex.Metrika counter */}

      {/* Grain Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <CustomCursor />

      <SmoothScroll>
        {children}
      </SmoothScroll>
      <Toaster />
      <Analytics />
    </>
  );
}
