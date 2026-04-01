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
      'More than 70% of visitors come from mobile, so your page must convert on a phone first',
    image:
      'https://i.ibb.co/4ZGtc09G/Whisk-89cb8686ddb9da498354cec156be16b4dr.png',
    number: '01',
  },
  {
    title: 'Loading Speed',
    description:
      'In plumbing, every second matters - a 3-second delay can cost the call.',
    image:
      'https://i.ibb.co/1t2yTNhv/Whisk-26ffea690ffcaab8e1f4de3f2a4f3d7bdr.png',
    number: '02',
  },
  {
    title: 'Trust Elements',
    description:
      '3 trust signals can be enough: reviews, license, real photos',
    image:
      'https://i.ibb.co/mV4xt97Z/Whisk-1ugn5kjmzm2nkzgotezmwktl3itm00sm0mgotaj.png',
    number: '03',
  },
  {
    title: 'Calls To Action',
    description:
      '1 page, 1 goal, 1 clear CTA - turns visits into calls',
    image: 'https://i.ibb.co/93bwJt4W/orange-portrait-004.jpg',
    number: '04',
  },
  {
    title: 'Strong Offers',
    description:
      "1 strong offer gives people a reason to act now",
    image:
      'https://i.ibb.co/Pz3d7g2S/Whisk-wedn4atn3etz5gtntqgz5gtl2kzy00cm1ujztem.jpg',
    number: '05',
  },
];

export function LuminaInteractiveList() {
  const sections = useMemo(() => showcaseItems.map(item => ({
    background: item.image,
    leftLabel: (
      <span className="font-headline text-[6vw] leading-[0.9] text-[#e0ded8] tracking-tight uppercase">
        {item.title}
      </span>
    ),
    title: "", 
    rightLabel: (
      <div className="max-w-[25vw] uppercase font-mono font-medium text-[1vw] leading-[1.4] text-[#e0ded8] opacity-90 tracking-widest text-right">
        {item.description}
      </div>
    ),
  })), []);

  return (
    <FullScreenScrollFX
      sections={sections}
      fontFamily="Inter, sans-serif"
      colors={{
        text: "#e0ded8",
        overlay: "rgba(0,0,0,0.20)", 
        pageBg: "#eaeaf2",
        stageBg: "black",
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
        overlay: "rgba(0,0,0,0.20)",
        pageBg: "#eaeaf2",
        stageBg: "black",
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
    const leftItemRefs = useRef<HTMLDivElement[]>([]);
    const rightItemRefs = useRef<HTMLDivElement[]>([]);

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

    const computePositions = () => {
      const el = fixedSectionRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      const arr: number[] = [];
      const scrollHeightMultiplier = 0.5; // Reduced by 30% from original 0.7
      for (let i = 0; i < total; i++) arr.push(top + (h * i * scrollHeightMultiplier) / total);
      sectionTopRef.current = arr;
    };

    const updateStaticLists = (toIndex = index) => {
      leftItemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: i === toIndex ? 1 : 0,
          pointerEvents: i === toIndex ? "auto" : "none",
          duration: durations.change ?? 0.7,
          ease: "power2.out",
        });
      });
      rightItemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: i === toIndex ? 1 : 0,
          pointerEvents: i === toIndex ? "auto" : "none",
          duration: durations.change ?? 0.7,
          ease: "power2.out",
        });
      });
    };

    useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      const fixed = fixedRef.current;
      const fs = fixedSectionRef.current;
      if (!fixed || !fs || total === 0) return;

      gsap.set(bgRefs.current, { opacity: 0, scale: 1.04 });
      if (bgRefs.current[index]) gsap.set(bgRefs.current[index], { opacity: 1, scale: 1 });

      computePositions();
      updateStaticLists(index);

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
            goTo(target, false);
          }
        },
      });

      stRef.current = st;

      const ro = new ResizeObserver(() => {
        computePositions();
        ScrollTrigger.refresh();
      });
      ro.observe(fs);

      return () => {
        ro.disconnect();
        st.kill();
        stRef.current = null;
      };
    }, [total, initialIndex, motionOff]);

    const changeSection = (to: number) => {
      if (to === lastIndexRef.current || isAnimatingRef.current) return;
      const from = lastIndexRef.current;
      const down = to > from;
      isAnimatingRef.current = true;

      if (!isControlled) setLocalIndex(to);
      onIndexChange?.(to);

      const D = durations.change ?? 0.7;

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

      updateStaticLists(to);

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

    const cssVars: CSSProperties = {
      ["--fx-font" as any]: fontFamily,
      ["--fx-text" as any]: colors.text ?? "#e0ded8",
      ["--fx-overlay" as any]: colors.overlay ?? "rgba(0,0,0,0.20)",
      ["--fx-page-bg" as any]: colors.pageBg ?? "#eaeaf2",
      ["--fx-stage-bg" as any]: colors.stageBg ?? "black",
      ["--fx-gap" as any]: `${gap}rem`,
      ["--fx-grid-px" as any]: `${gridPaddingX}rem`,
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
                <div className="fx-content">
                  <div className="fx-column fx-left">
                    {sections.map((s, i) => (
                      <div
                        key={`L-${s.id ?? i}`}
                        className={`fx-static-item fx-left-item ${i === index ? "active" : ""}`}
                        ref={(el) => el && (leftItemRefs.current[i] = el)}
                      >
                        {s.leftLabel}
                      </div>
                    ))}
                  </div>

                  <div className="fx-column fx-right">
                    {sections.map((s, i) => (
                      <div
                        key={`R-${s.id ?? i}`}
                        className={`fx-static-item fx-right-item ${i === index ? "active" : ""}`}
                        ref={(el) => el && (rightItemRefs.current[i] = el)}
                      >
                        {s.rightLabel}
                      </div>
                    ))}
                  </div>
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
            letter-spacing: -0.02em;
          }

          .fx-fixed-section { height: ${total * 25}vh; position: relative; }
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
            opacity: 0;
            will-change: transform, opacity;
          }
          .fx-bg-overlay { position: absolute; inset: 0; background: var(--fx-overlay); }

          .fx-content {
            grid-column: 1 / 13;
            position: absolute; inset: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding: 0 var(--fx-grid-px);
          }

          .fx-column {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
          }

          .fx-left { flex: 1; justify-content: flex-start; }
          .fx-right { flex: 1; justify-content: flex-end; }

          .fx-static-item {
            position: absolute;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.7s ease;
          }

          .fx-left-item { left: 0; text-align: left; }
          .fx-right-item { right: 0; text-align: right; }

          .fx-static-item.active {
            opacity: 1;
            pointer-events: auto;
            position: relative;
          }

          @media (max-width: 900px) {
            .fx-content {
              flex-direction: column;
              justify-content: center;
              gap: 5vh;
            }
            .fx-column { height: auto; align-items: center; }
            .fx-left-item, .fx-right-item { text-align: center; }
          }
        ` }} />
      </div>
    );
  }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";
