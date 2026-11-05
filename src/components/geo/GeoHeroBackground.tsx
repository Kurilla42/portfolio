'use client';
import { useEffect, useRef, useState } from 'react';

/** Original footage plays automatically across the hero and its following section. */
export function GeoHeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const desktop = matchMedia('(min-width: 768px)');
    const motion = matchMedia('(prefers-reduced-motion: no-preference)');
    const update = () => {
      setCanAnimate(motion.matches);
      setCanPlayVideo(desktop.matches && motion.matches);
    };
    update();
    desktop.addEventListener('change', update);
    motion.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) video.pause();
    else {
      video.muted = true;
      void video.play().catch(() => setVideoFailed(true));
    }
  }, [paused, canPlayVideo]);

  return <div className={`geo-motion-layer${paused ? ' geo-motion-paused' : ''}`}>
    <div className="geo-hero-background" aria-hidden="true">
      <img src="/geo/hero-poster.webp" srcSet="/geo/hero-people-mobile.webp 640w, /geo/hero-poster.webp 1600w" sizes="100vw" alt="" width="1600" height="2441" fetchPriority="high" />
      {canPlayVideo && !videoFailed && <video ref={videoRef} src="/hero-bg.mp4" autoPlay muted loop playsInline preload="metadata" onError={() => setVideoFailed(true)} />}
    </div>
    {canAnimate && <button className="geo-motion-pause" type="button" aria-label={paused ? 'Продолжить анимацию фона' : 'Приостановить анимацию фона'} title={paused ? 'Продолжить анимацию фона' : 'Приостановить анимацию фона'} aria-pressed={paused} onClick={() => setPaused(!paused)}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{paused ? <path d="M5 3 13 8 5 13Z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}</svg>
    </button>}
  </div>;
}
