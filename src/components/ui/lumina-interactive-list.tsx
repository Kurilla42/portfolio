'use client';

import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const showcaseItems = [
  {
    title: 'Mobile - first',
    description:
      'Every element is engineered to move the visitor toward a single goal: booking a call or requesting a quote.',
    image:
      'https://i.ibb.co/4ZGtc09G/Whisk-89cb8686ddb9da498354cec156be16b4dr.png',
    number: '01',
  },
  {
    title: 'Loading Speed',
    description:
      'Stop wasting money on Google Ads that send traffic to your homepage. Increase your Quality Score and lower CPL.',
    image:
      'https://i.ibb.co/1t2yTNhv/Whisk-26ffea690ffcaab8e1f4de3f2a4f3d7bdr.png',
    number: '02',
  },
  {
    title: 'Strong Offers',
    description:
      "Deeply understand your customer's pain points. Clean design that reflects the professionalism of your crew.",
    image:
      'https://i.ibb.co/Pz3d7g2S/Whisk-wedn4atn3etz5gtntqgz5gtl2kzy00cm1ujztem.jpg',
    number: '03',
  },
  {
    title: 'Trust Elements',
    description:
      'Transform your website into a 24/7 sales engine that works while you are out on service calls.',
    image:
      'https://i.ibb.co/mV4xt97Z/Whisk-1ugn5kjmzm2nkzgotezmwktl3itm00sm0mgotaj.png',
    number: '04',
  },
  {
    title: 'Calls To Action',
    description:
      'Proven triggers that turn casual browsers into booked appointments, optimized for high conversion rates.',
    image: 'https://i.ibb.co/93bwJt4W/orange-portrait-004.jpg',
    number: '05',
  },
];

export function LuminaInteractiveList() {
  const sections = useMemo(() => showcaseItems.map(item => ({
    background: item.image,
    leftLabel: <span className="font-kurale font-bold text-[3vw] text-[#c7b684] tracking-tight">{item.title}</span>,
    title: <div className="max-w-[35vw] mx-auto normal-case font-sans font-medium text-[2vw] leading-[1.2] opacity-90 tracking-tight">{item.description}</div>,
    rightLabel: <span className="font-kurale font-bold text-[3vw] text-[#c7b684] tracking-tight">{item.title}</span>,
  })), []);

  return (
    <FullScreenScrollFX
      sections={sections}
      fontFamily="Inter, sans-serif"
      colors={{
        text: "#e0ded8",
        overlay: "rgba(0,0,0,0.15)", // Установлено затемнение 15%
        pageBg: "#eaeaf2",
        stageBg: "#000",
      }}
      showProgress={false}
    />
  );
}

type Section = {
  id?: string;
  background: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  rightLabel?: ReactNode;
  renderBackground?: (active: boolean, previous: boolean) => ReactNode;
};

type Colors = Partial<{
  text: string;
  overlay: string;
  pageBg: string;
  stageBg: string;
}>;

type Durations = Partial<{
  change: number; 
  snap: number;   
}>;

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
  refresh: () => void;
};

export type FullScreenFXProps = {
  sections: Section[];
  className?: string;
  style?: CSSProperties;
  fontFamily?: string;
  header?: ReactNode;
  footer?: ReactNode;
  gap?: number;           
  gridPaddingX?: number;  
  showProgress?: boolean;
  debug?: boolean;
  durations?: Durations;
  reduceMotion?: boolean;
  bgTransition?: "fade" | "wipe"; 
  parallaxAmount?: number;        
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;
  colors?: Colors;
  apiRef?: React.Ref<FullScreenFXAPI>;
  ariaLabel?: string;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  (
    {
      sections,
      className,
      style,
      fontFamily = 'Inter, sans-serif',
      header,
      footer,
      gap = 1,
      gridPaddingX = 4,
      showProgress = true,
      debug = false,
      durations = { change: 0.7, snap: 800 },
      reduceMotion,
      bgTransition = "fade",
      parallaxAmount = 4,
      currentIndex,
      onIndexChange,
      initialIndex = 0,
      colors = {
        text: "#e0ded8",
        overlay: "rgba(0,0,0,0.15)",
        pageBg: "#eaeaf2",
        stageBg: "#000000",
      },
      apiRef,
      ariaLabel = "Full screen scroll slideshow",
    },
    ref
  ) => {
    const total = sections.length;
    const [localIndex, setLocalIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)));
    const isControlled = typeof currentIndex === "number";
    const index = isControlled ? clamp(currentIndex!, 0, Math.max(0, total - 1)) : localIndex;

    const rootRef = useRef<HTMLDivElement | null>(null);
    const fixedRef = useRef<HTMLDivElement | null>(null);
    const fixedSectionRef = useRef<HTMLDivElement | null>(null);

    const bgRefs = useRef<HTMLImageElement[]>([]);
    const wordRefs = useRef<HTMLSpanElement[][]>([]);

    const leftTrackRef = useRef<HTMLDivElement | null>(null);
    const rightTrackRef = useRef<HTMLDivElement | null>(null);
    const leftItemRefs = useRef<HTMLDivElement[]>([]);
    const rightItemRefs = useRef<HTMLDivElement[]>([]);

    const progressFillRef = useRef<HTMLDivElement | null>(null);
    const currentNumberRef = useRef<HTMLSpanElement | null>(null);

    const stRef = useRef<ScrollTrigger | null>(null);
    const lastIndexRef = useRef(index);
    const isAnimatingRef = useRef(false);
    const isSnappingRef = useRef(false);
    const sectionTopRef = useRef<number[]>([]);

    const prefersReduced = useMemo(() => {
      if (typeof window === "undefined") return false;
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);
    const motionOff = reduceMotion ?? prefersReduced;

    const tempWordBucket = useRef<HTMLSpanElement[]>([]);
    const splitWords = (text: string) => {
      const words = text.split(/\s+/).filter(Boolean);
      return words.map((w, i) => (
        <span className="fx-word-mask" key={i}>
          <span className="fx-word" ref={(el) => el && tempWordBucket.current.push(el)}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ));
    };

    const WordsCollector = ({ onReady }: { onReady: () => void }) => {
      useEffect(() => onReady(), []); 
      return null;
    };

    const computePositions = () => {
      const el = fixedSectionRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      const arr: number[] = [];
      for (let i = 0; i < total; i++) arr.push(top + (h * i * 0.7) / total);
      sectionTopRef.current = arr;
    };

    const measureAndCenterLists = (toIndex = index, animate = true) => {
      const centerTrack = (
        container: HTMLDivElement | null,
        items: HTMLDivElement[],
        isRight: boolean
      ) => {
        if (!container || items.length === 0) return;
        const first = items[0];
        const second = items[1];
        const contRect = container.getBoundingClientRect();
        let rowH = first.getBoundingClientRect().height;
        if (second) {
          rowH = second.getBoundingClientRect().top - first.getBoundingClientRect().top;
        }
        const targetY = contRect.height / 2 - rowH / 2 - toIndex * rowH;
        const prop = isRight ? rightTrackRef : leftTrackRef;
        if (!prop.current) return;
        if (animate) {
          gsap.to(prop.current, {
            y: targetY,
            duration: (durations.change ?? 0.7) * 0.9,
            ease: "power3.out",
          });
        } else {
          gsap.set(prop.current, { y: targetY });
        }
      };

      measureRAF(() => {
        measureRAF(() => {
          centerTrack(leftTrackRef.current, leftItemRefs.current, false);
          centerTrack(rightTrackRef.current, rightItemRefs.current, true);
        });
      });
    };

    const measureRAF = (fn: () => void) => {
      if (typeof window === "undefined") return;
      requestAnimationFrame(() => requestAnimationFrame(fn));
    };

    useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      const fixed = fixedRef.current;
      const fs = fixedSectionRef.current;
      if (!fixed || !fs || total === 0) return;

      gsap.set(bgRefs.current, { opacity: 0, scale: 1.04, yPercent: 0 });
      if (bgRefs.current[0]) gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });

      wordRefs.current.forEach((words, sIdx) => {
        words.forEach((w) => {
          gsap.set(w, {
            yPercent: sIdx === index ? 0 : 100,
            opacity: sIdx === index ? 1 : 0,
          });
        });
      });

      computePositions();
      measureAndCenterLists(index, false);

      const st = ScrollTrigger.create({
        trigger: fs,
        start: "top top",
        end: "bottom bottom",
        pin: fixed,
        pinSpacing: true,
        onUpdate: (self) => {
          if (motionOff || isSnappingRef.current) return;
          const prog = self.progress;
          const target = Math.min(total - 1, Math.floor(prog * total));
          if (target !== lastIndexRef.current && !isAnimatingRef.current) {
            const next = lastIndexRef.current + (target > lastIndexRef.current ? 1 : -1);
            goTo(next, false);
          }
        },
      });

      stRef.current = st;

      if (initialIndex && initialIndex > 0 && initialIndex < total) {
        requestAnimationFrame(() => goTo(initialIndex, false));
      }

      const ro = new ResizeObserver(() => {
        computePositions();
        measureAndCenterLists(lastIndexRef.current, false);
        ScrollTrigger.refresh();
      });
      ro.observe(fs);

      return () => {
        ro.disconnect();
        st.kill();
        stRef.current = null;
      };
    }, [total, initialIndex, motionOff, bgTransition, parallaxAmount]);

    const changeSection = (to: number) => {
      if (to === lastIndexRef.current || isAnimatingRef.current) return;
      const from = lastIndexRef.current;
      const down = to > from;
      isAnimatingRef.current = true;

      if (!isControlled) setLocalIndex(to);
      onIndexChange?.(to);

      if (currentNumberRef.current) {
        currentNumberRef.current.textContent = String(to + 1).padStart(2, "0");
      }
      if (progressFillRef.current) {
        const p = (to / (total - 1 || 1)) * 100;
        progressFillRef.current.style.width = `${p}%`;
      }

      const D = durations.change ?? 0.7;

      const outWords = wordRefs.current[from] || [];
      const inWords = wordRefs.current[to] || [];
      if (outWords.length) {
        gsap.to(outWords, {
          yPercent: down ? -100 : 100,
          opacity: 0,
          duration: D * 0.6,
          stagger: down ? 0.03 : -0.03,
          ease: "power3.out",
        });
      }
      if (inWords.length) {
        gsap.set(inWords, { yPercent: down ? 100 : -100, opacity: 0 });
        gsap.to(inWords, {
          yPercent: 0,
          opacity: 1,
          duration: D,
          stagger: down ? 0.05 : -0.05,
          ease: "power3.out",
        });
      }

      const prevBg = bgRefs.current[from];
      const newBg = bgRefs.current[to];
      if (bgTransition === "fade") {
        if (newBg) {
          gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 1 : -1 });
          gsap.to(newBg, { opacity: 1, scale: 1, yPercent: 0, duration: D, ease: "power2.out" });
        }
        if (prevBg) {
          gsap.to(prevBg, {
            opacity: 0,
            yPercent: down ? -parallaxAmount : parallaxAmount,
            duration: D,
            ease: "power2.out",
          });
        }
      }

      measureAndCenterLists(to, true);

      leftItemRefs.current.forEach((el, i) => {
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : 0.15,
          duration: D * 0.6,
          ease: "power3.out",
        });
      });
      rightItemRefs.current.forEach((el, i) => {
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : 0.15,
          duration: D * 0.6,
          ease: "power3.out",
        });
      });

      gsap.delayedCall(D, () => {
        lastIndexRef.current = to;
        isAnimatingRef.current = false;
      });
    };

    const goTo = (to: number, withScroll = true) => {
      const clamped = clamp(to, 0, total - 1);
      isSnappingRef.current = true;
      changeSection(clamped);

      const pos = sectionTopRef.current[clamped];
      const snapMs = durations.snap ?? 800;

      if (withScroll && typeof window !== "undefined") {
        window.scrollTo({ top: pos, behavior: "smooth" });
        setTimeout(() => (isSnappingRef.current = false), snapMs);
      } else {
        setTimeout(() => (isSnappingRef.current = false), 10);
      }
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    useImperativeHandle(apiRef, () => ({
      next,
      prev,
      goTo,
      getIndex: () => index,
      refresh: () => ScrollTrigger.refresh(),
    }));

    useEffect(() => {
      measureAndCenterLists(index, false);
    }, []);

    const cssVars: CSSProperties = {
      ["--fx-font" as any]: fontFamily,
      ["--fx-text" as any]: colors.text ?? "#e0ded8",
      ["--fx-overlay" as any]: colors.overlay ?? "rgba(0,0,0,0.15)",
      ["--fx-page-bg" as any]: colors.pageBg ?? "#eaeaf2",
      ["--fx-stage-bg" as any]: colors.stageBg ?? "#000",
      ["--fx-gap" as any]: `${gap}rem`,
      ["--fx-grid-px" as any]: `${gridPaddingX}rem`,
      ["--fx-row-gap" as any]: "3vh",
    };

    return (
      <div
        ref={(node) => {
          (rootRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={["fx", className].filter(Boolean).join(" ")}
        style={{ ...cssVars, ...style }}
        aria-label={ariaLabel}
      >
        <div className="fx-scroll">
          <div className="fx-fixed-section" ref={fixedSectionRef}>
            <div className="fx-fixed" ref={fixedRef}>
              <div className="fx-bgs" aria-hidden="true">
                {sections.map((s, i) => (
                  <div className="fx-bg" key={s.id ?? i}>
                    {s.renderBackground ? (
                      s.renderBackground(index === i, lastIndexRef.current === i)
                    ) : (
                      <>
                        <img
                          ref={(el) => el && (bgRefs.current[i] = el)}
                          src={s.background}
                          alt=""
                          className="fx-bg-img"
                        />
                        <div className="fx-bg-overlay" />
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="fx-grid">
                {header && <div className="fx-header">{header}</div>}

                <div className="fx-content">
                  <div className="fx-left" role="list">
                    <div className="fx-track" ref={leftTrackRef}>
                      {sections.map((s, i) => (
                        <div
                          key={`L-${s.id ?? i}`}
                          className={`fx-item fx-left-item ${i === index ? "active" : ""}`}
                          ref={(el) => el && (leftItemRefs.current[i] = el)}
                          onClick={() => goTo(i)}
                          role="button"
                          tabIndex={0}
                        >
                          {s.leftLabel}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="fx-center">
                    {sections.map((s, sIdx) => {
                      tempWordBucket.current = [];
                      const isString = typeof s.title === "string";
                      return (
                        <div key={`C-${s.id ?? sIdx}`} className={`fx-featured ${sIdx === index ? "active" : ""}`}>
                          <div className="fx-featured-title">
                            {isString ? splitWords(s.title as string) : s.title}
                          </div>
                          <WordsCollector
                            onReady={() => {
                              if (tempWordBucket.current.length) {
                                wordRefs.current[sIdx] = [...tempWordBucket.current];
                              }
                              tempWordBucket.current = [];
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="fx-right" role="list">
                    <div className="fx-track" ref={rightTrackRef}>
                      {sections.map((s, i) => (
                        <div
                          key={`R-${s.id ?? i}`}
                          className={`fx-item fx-right-item ${i === index ? "active" : ""}`}
                          ref={(el) => el && (rightItemRefs.current[i] = el)}
                          onClick={() => goTo(i)}
                          role="button"
                          tabIndex={0}
                        >
                          {s.rightLabel}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="fx-footer">
                  {footer && <div className="fx-footer-title">{footer}</div>}
                  {showProgress && (
                    <div className="fx-progress">
                      <div className="fx-progress-numbers">
                        <span ref={currentNumberRef}>{String(index + 1).padStart(2, "0")}</span>
                        <span>{String(total).padStart(2, "0")}</span>
                      </div>
                      <div className="fx-progress-bar">
                        <div className="fx-progress-fill" ref={progressFillRef} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .fx {
            width: 100%;
            overflow: hidden;
            background: var(--fx-page-bg);
            color: #000;
            font-family: var(--fx-font);
            text-transform: uppercase;
            letter-spacing: -0.02em;
          }

          .fx-fixed-section { height: ${total * 50}vh; position: relative; }
          .fx-fixed { position: sticky; top: 0; height: 100vh; width: 100%; overflow: hidden; background: var(--fx-page-bg); }

          .fx-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: var(--fx-gap);
            padding: 0 var(--fx-grid-px);
            position: relative;
            height: 100%;
            z-index: 2;
          }

          .fx-bgs { position: absolute; inset: 0; background: var(--fx-stage-bg); z-index: 1; }
          .fx-bg { position: absolute; inset: 0; }
          .fx-bg-img {
            position: absolute; inset: -10% 0 -10% 0;
            width: 100%; height: 120%; object-fit: cover;
            filter: brightness(1);
            opacity: 0;
            will-change: transform, opacity;
          }
          .fx-bg-overlay { position: absolute; inset: 0; background: var(--fx-overlay); }

          .fx-header {
            grid-column: 1 / 13; align-self: start; padding-top: 6vh;
            font-size: clamp(2rem, 9vw, 9rem); line-height: 0.86; text-align: center; color: var(--fx-text);
          }

          .fx-content {
            grid-column: 1 / 13;
            position: absolute; inset: 0;
            display: grid; grid-template-columns: 1fr 1.5fr 1fr;
            align-items: center;
            height: 100%;
            padding: 0 var(--fx-grid-px);
          }

          .fx-left, .fx-right {
            height: 70vh;
            overflow: hidden;
            display: grid; align-content: center;
          }
          .fx-left { justify-items: start; }
          .fx-right { justify-items: end; }
          .fx-track { will-change: transform; }

          .fx-item {
            color: var(--fx-text);
            font-weight: 800;
            letter-spacing: 0.1em;
            line-height: 1;
            margin: calc(var(--fx-row-gap) / 2) 0;
            opacity: 0.15;
            transition: opacity 0.4s ease, transform 0.4s ease;
            position: relative;
            user-select: none;
            cursor: pointer;
            white-space: nowrap;
          }
          .fx-left-item.active, .fx-right-item.active { opacity: 1; }
          
          .fx-left-item::before {
            content: "•";
            position: absolute; left: -1.5vw; opacity: 0;
            transition: opacity 0.3s ease;
          }
          .fx-right-item::after {
            content: "•";
            position: absolute; right: -1.5vw; opacity: 0;
            transition: opacity 0.3s ease;
          }
          .fx-left-item.active::before, .fx-right-item.active::after { opacity: 1; }

          .fx-center {
            display: grid; place-items: center; text-align: center; height: 70vh; overflow: hidden;
          }
          .fx-featured { 
            position: absolute; 
            opacity: 0; 
            visibility: hidden; 
            width: 100%; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            backdrop-filter: blur(12px);
            background: rgba(0,0,0,0.05);
            padding: 4vh 2vw;
            border-radius: 3rem;
          }
          .fx-featured.active { opacity: 1; visibility: visible; }
          .fx-featured-title {
            margin: 0; color: var(--fx-text);
          }
          .fx-word-mask { display: inline-block; overflow: hidden; vertical-align: middle; }
          .fx-word { display: inline-block; vertical-align: middle; }

          .fx-footer {
            grid-column: 1 / 13; align-self: end; padding-bottom: 5vh; text-align: center;
          }
          .fx-footer-title { color: var(--fx-text); font-size: 5vw; font-weight: 900; letter-spacing: -0.01em; line-height: 0.9; }
          .fx-progress { width: 200px; height: 2px; margin: 1rem auto 0; background: rgba(245,245,245,0.28); position: relative; }
          .fx-progress-fill { position: absolute; inset: 0 auto 0 0; width: 0%; background: var(--fx-text); height: 100%; transition: width 0.3s ease; }
          .fx-progress-numbers { position: absolute; inset: auto 0 100% 0; display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--fx-text); }

          @media (max-width: 900px) {
            .fx-content {
              grid-template-columns: 1fr; row-gap: 3vh;
              place-items: center;
            }
            .fx-left, .fx-right { display: none; }
            .fx-center { grid-column: 1 / 2; }
          }
        ` }} />
      </div>
    );
  }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";
