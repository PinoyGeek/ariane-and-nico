"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Cinzel } from "next/font/google"
import { siteConfig } from "@/content/site"

// Wedding palette: deep brown, medium brown, sage-gold, cream, terracotta
const palette = {
  deep: "#45301F",   // primary text, strong accents
  medium: "#875F2C", // secondary text, borders
  sage: "#A2976A",   // subtle accents, dividers
  cream: "#F5D8B0", // background, soft surfaces
  terracotta: "#8F553D", // CTAs, highlights
} as const

// Corner florals tinted to match deep brown
const DECO_FILTER = "brightness(0) saturate(100%) invert(18%) sepia(35%) saturate(1200%) hue-rotate(15deg) brightness(92%) contrast(88%)"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  const ceremonyDay = siteConfig.ceremony.day ?? "Saturday"
  const ceremonyTime = siteConfig.ceremony.time
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyVenue = siteConfig.ceremony.venue
  const groomName = siteConfig.couple.groomNickname ?? siteConfig.couple.groom
  const brideName = siteConfig.couple.brideNickname ?? siteConfig.couple.bride

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: palette.cream }}
    >
      {/* Layered background: soft gradient + subtle texture feel */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            background: `linear-gradient(165deg, ${palette.cream} 0%, ${palette.sage}18 40%, ${palette.medium}08 70%, ${palette.deep}06 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ background: `radial-gradient(ellipse 80% 50% at 50% 20%, ${palette.terracotta} 0%, transparent 60%)` }}
        />
      </div>

      {/* Date watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="text-[clamp(5.5rem,18vw,12rem)] font-extralight tracking-[0.25em] opacity-[0.07]"
          style={{ fontFamily: '"Cinzel", serif', color: palette.deep }}
        >
          04 18 26
        </span>
      </div>

      {/* Corner floral decoration */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 left-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20"
          style={{ transform: "scaleY(-1)", filter: DECO_FILTER }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 right-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20"
          style={{ transform: "scaleX(-1) scaleY(-1)", filter: DECO_FILTER }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 left-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20"
          style={{ filter: DECO_FILTER }}
          priority={false}
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 right-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-20"
          style={{ transform: "scaleX(-1)", filter: DECO_FILTER }}
          priority={false}
        />
      </div>

      <div className="relative z-10 w-full container mx-auto px-5 sm:px-8 md:px-10 flex flex-col items-center justify-center min-h-screen pt-20 sm:pt-24 pb-20 sm:pb-24">
        <div
          className={`w-full max-w-xl text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Invitation line — refined copy */}
          <p
            className={`${cinzel.className} text-[0.65rem] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.32em] font-light`}
            style={{ color: palette.medium }}
          >
            Together with their families, they request the pleasure of your company
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 my-6 sm:my-8" aria-hidden>
            <span
              className="h-px w-12 sm:w-16 rounded-full"
              style={{ backgroundColor: palette.sage }}
            />
            <span
              className="text-[0.5rem] sm:text-[0.55rem] tracking-[0.4em] uppercase"
              style={{ color: palette.sage }}
            >
              at the celebration of their marriage
            </span>
            <span
              className="h-px w-12 sm:w-16 rounded-full"
              style={{ backgroundColor: palette.sage }}
            />
          </div>

          {/* Couple names — hero focal point */}
          <h1
            className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-[0.14em] sm:tracking-[0.18em] font-semibold leading-tight`}
            style={{ color: palette.deep }}
          >
            <span className="block">{groomName}</span>
            <span
              className="block text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.35em] my-2 sm:my-3"
              style={{ color: palette.terracotta }}
            >
              &amp;
            </span>
            <span className="block">{brideName}</span>
          </h1>

          {/* Venue & occasion */}
          <div className="mt-8 sm:mt-10 space-y-2 sm:space-y-2.5" style={{ color: palette.medium }}>
            <p className={`${cinzel.className} text-[0.65rem] sm:text-xs uppercase tracking-[0.18em] leading-relaxed max-w-sm mx-auto`}>
              {ceremonyVenue}
            </p>
            <p className={`${cinzel.className} text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.22em]`}>
              Ceremony &amp; Reception
            </p>
          </div>

          {/* Date & time — clear hierarchy */}
          <div
            className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t"
            style={{ borderColor: `${palette.sage}50`, color: palette.deep }}
          >
            <p className={`${cinzel.className} text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] font-medium`}>
              {ceremonyDay} · {ceremonyTime}
            </p>
            <p className={`${cinzel.className} text-[0.65rem] sm:text-xs uppercase tracking-[0.24em] mt-1.5`} style={{ color: palette.medium }}>
              {ceremonyDate}
            </p>
          </div>

          {/* CTA — terracotta for warmth and emphasis */}
          <div className="mt-10 sm:mt-12">
            <a
              href="#guest-list"
              className={`${cinzel.className} inline-block px-10 sm:px-14 py-3.5 sm:py-4 text-[0.65rem] sm:text-xs uppercase tracking-[0.22em] rounded-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5D8B0] focus-visible:ring-[#45301F]`}
              style={{
                color: palette.cream,
                backgroundColor: palette.terracotta,
                border: `2px solid ${palette.terracotta}`,
                boxShadow: `0 4px 14px ${palette.deep}25`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = palette.deep
                e.currentTarget.style.borderColor = palette.deep
                e.currentTarget.style.transform = "translateY(-1px)"
                e.currentTarget.style.boxShadow = `0 6px 20px ${palette.deep}35`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = palette.terracotta
                e.currentTarget.style.borderColor = palette.terracotta
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = `0 4px 14px ${palette.deep}25`
              }}
            >
              Confirm your attendance
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
