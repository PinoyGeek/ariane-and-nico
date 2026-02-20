'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Countdown boxes with color photos - numbers show days, hours, minutes
const COUNTDOWN_BOXES = [
  { src: '/mobile-background/couple (6).webp' },
  { src: '/mobile-background/couple (10).webp' },
  { src: '/mobile-background/couple (3).webp' },
];

const MAIN_BW_IMAGE = '/mobile-background/couple (15).webp';
const STAGGER_DELAY_MS = 4000; // Each image appears every 4 seconds
const BOX_TRANSITION_MS = 1200; // Slow, smooth transition
const TOTAL_DURATION_MS = COUNTDOWN_BOXES.length * STAGGER_DELAY_MS + 3000;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const [now, setNow] = useState(() => new Date());

  // Live countdown: days, hours, minutes until wedding
  const countdown = useMemo(() => {
    const wedding = new Date('2026-04-18T13:30:00');
    const diff = wedding.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  }, [now]);

  const countdownText = useMemo(() => {
    const { days } = countdown;
    if (days === 0) return 'TODAY IS THE DAY';
    if (days === 1) return 'ONE DAY TO GO';
    if (days >= 28 && days <= 31) return 'ONE MONTH TO GO';
    if (days >= 58 && days <= 62) return 'TWO MONTHS TO GO';
    if (days >= 88 && days <= 93) return 'THREE MONTHS TO GO';
    if (days >= 118 && days <= 123) return 'FOUR MONTHS TO GO';
    if (days >= 148 && days <= 153) return 'FIVE MONTHS TO GO';
    return `${days} DAYS TO GO`;
  }, [countdown.days]);

  // Wedding date: 04.18.26 (month, day, year)
  const countdownNumbers = ['04', '18', '26'];
  const countdownLabels = ['MONTH', 'DAY', 'YEAR'];

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    COUNTDOWN_BOXES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleBoxes((prev) => [...prev, i]), i * STAGGER_DELAY_MS)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
      setProgress(pct);
    }, 50);

    const timer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, TOTAL_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`;
  const hashtag = '#GLENNsHeartForCLARENCE';
  const productionCredit = '';

  // Palette tuned to requested hues
  const palette = {
    deep: '#994524',
    medium: '#C0531C',
    accent: '#E69A41',
    cream: '#FFF7ED',
    soft: '#FBE5D6',
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src={MAIN_BW_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay for readability and warmth */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${palette.deep}40 0%, transparent 25%, transparent 75%, ${palette.deep}55 100%)`,
          }}
        />
      </div>

      <div className="relative flex flex-col flex-1 min-h-0">
        {/* Top: headline + hashtag + countdown (readable over photo, no container) */}
        <div className="flex flex-col items-center justify-center w-full pt-12 sm:pt-16 md:pt-24 px-4 sm:px-6 flex-shrink-0">
          <div className="w-full max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span
                className="hidden sm:block h-px w-12 flex-shrink-0"
                style={{ backgroundColor: palette.accent }}
              />
              <p className="text-center">
                <span
                  className="inline-block text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.36em] font-[family-name:var(--font-crimson)] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm border"
                  style={{
                    color: '#800A06',
                    backgroundColor: 'rgba(255, 247, 237, 0.86)',
                    borderColor: 'rgba(128, 10, 6, 0.18)',
                    textShadow: '0 1px 0 rgba(255,255,255,0.7)',
                  }}
                >
                  Your invitation is on its way
                </span>
              </p>
              <span
                className="hidden sm:block h-px w-12 flex-shrink-0"
                style={{ backgroundColor: palette.accent }}
              />
            </div>

            <p className="text-center mb-4 sm:mb-5">
              <span
                className="inline-block text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] font-[family-name:var(--font-crimson)] px-3 py-1.5 rounded-full backdrop-blur-sm border"
                style={{
                  color: '#800A06',
                  backgroundColor: 'rgba(255, 247, 237, 0.86)',
                  borderColor: 'rgba(128, 10, 6, 0.18)',
                  textShadow: '0 1px 0 rgba(255,255,255,0.7)',
                }}
              >
                {hashtag}
              </span>
            </p>

            <h2 className="text-center">
              <span
                className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[0.08em] sm:tracking-[0.12em] uppercase max-w-md mx-auto leading-tight px-2"
                style={{
                  fontFamily: '"Cinzel", serif',
                  color: '#FFFFFF',
                  textShadow:
                    '0 2px 14px rgba(0,0,0,0.55), 0 0 22px rgba(230,154,65,0.55), 0 0 44px rgba(192,83,28,0.25)',
                }}
              >
                {countdownText}
              </span>
            </h2>
          </div>
        </div>

        {/* Spacer - lets B&W image dominate (upper 2/3) */}
        <div className="flex-1 min-h-[12vh]" />

        {/* Middle: Three color countdown boxes - staggered reveal */}
        <div className="flex items-stretch justify-center gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 py-4 flex-shrink-0">
          {COUNTDOWN_BOXES.map((item, i) => {
            const isVisible = visibleBoxes.includes(i);
            return (
              <div
                key={i}
                className="relative flex-1 max-w-[28vw] sm:max-w-[140px] md:max-w-[160px] aspect-[3/4] overflow-hidden"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
                  transition: `opacity ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <Image
                  src={item.src}
                  alt={`${coupleNames}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 28vw, 160px"
                />
                {/* Bold wedding date number + label - right corner */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex flex-col items-end">
                  <span
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black select-none leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    style={{
                      fontFamily: 'var(--font-granika), sans-serif',
                      color: palette.cream,
                    }}
                  >
                    {countdownNumbers[i]}
                  </span>
                  <span
                    className="text-[8px] sm:text-[9px] tracking-widest uppercase mt-0.5"
                    style={{ color: palette.soft }}
                  >
                    {countdownLabels[i]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: Names + production credit + progress bar */}
        <div className="flex flex-col items-center justify-center w-full py-6 sm:py-8 px-4 flex-shrink-0">
          <p
            className="text-center text-sm sm:text-base tracking-[0.18em] uppercase text-[family-name:var(--font-crimson)] mb-2"
            style={{ color: palette.soft }}
          >
            Almost ready for
          </p>
          <div
            className="text-center text-2xl sm:text-3xl md:text-4xl mb-2"
            style={{
              fontFamily: 'var(--font-crimson)',
              color: palette.cream,
              textShadow: '0 2px 10px rgba(0,0,0,0.35)',
            }}
          >
            {coupleNames}
          </div>
          {productionCredit && (
            <p
              className="text-[10px] sm:text-xs font-sans tracking-wider"
              style={{ color: palette.soft }}
            >
              {productionCredit}
            </p>
          )}
          {/* Preparing message + progress bar */}
          <p
            className="text-xs sm:text-sm tracking-[0.22em] mt-6 mb-3 font-[family-name:var(--font-crimson)] uppercase font-semibold"
            style={{ color: '#FFFFFF', textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}
          >
            Crafting your invitation experience
          </p>
          <div className="w-full max-w-xs mx-auto">
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                style={{
                  width: `${progress}%`,
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
