"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Heart, Music2 } from "lucide-react"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond, Cinzel } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

// Wedding motif — align with hero, gallery, details
const palette = {
  deep: "#45301F",
  medium: "#875F2C",
  sage: "#A2976A",
  cream: "#F5D8B0",
  terracotta: "#8F553D",
} as const

const DECO_FILTER =
  "brightness(0) saturate(100%) invert(18%) sepia(35%) saturate(1200%) hue-rotate(15deg) brightness(92%) contrast(88%)"

// Helper function to convert text to title case (first letter of each word uppercase)
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function Footer() {
  const year = new Date().getFullYear()
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTime = siteConfig.ceremony.time
  const receptionTime = siteConfig.reception.time
  const ceremonyVenue = siteConfig.ceremony.venue
  const receptionVenue = siteConfig.reception.venue
  // Combined venue when same for both (e.g. Altamers Mountain Resort)
  const isSameVenue = ceremonyVenue === receptionVenue
  const combinedVenue = isSameVenue ? ceremonyVenue : null

  const quotes = [
    `"I have found the one whom my soul loves." – Song of Solomon 3:4`,
    "Welcome to our wedding website! We've found a love that's a true blessing, and we give thanks to God for writing the beautiful story of our journey together.",
    "Thank you for your love, prayers, and support. We can't wait to celebrate this joyful day together!",
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
      }, 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      } else {
        setIsDeleting(false)
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
      }
    } else {
      const currentQuote = quotes[currentQuoteIndex]
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(typeTimeout)
      } else {
        setIsPaused(true)
        setIsDeleting(true)
      }
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const nav = [
    { label: "Home", href: "#home" },
    { label: "Events", href: "#details" },
    { label: "Gallery", href: "#gallery" },
    { label: "RSVP", href: "#guest-list" },
  ] as const

  const brideNickname = siteConfig.couple.brideNickname
  const groomNickname = siteConfig.couple.groomNickname

  return (
    <div className="relative w-full" style={{ backgroundColor: palette.cream }}>
      {/* Full-bleed layered background — same as hero, gallery, details */}
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

      <footer className="relative z-10 mt-12 sm:mt-16 overflow-hidden">
      {/* Corner decorations — deep brown tint (hero style) */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] opacity-20 scale-y-[-1]" priority={false} style={{ filter: DECO_FILTER }} />
      </div>
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <Image src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] opacity-20 scale-x-[-1] scale-y-[-1]" priority={false} style={{ filter: DECO_FILTER }} />
      </div>
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] opacity-20" priority={false} style={{ filter: DECO_FILTER }} />
      </div>
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] opacity-20 scale-x-[-1]" priority={false} style={{ filter: DECO_FILTER }} />
      </div>
      
      {/* Monogram / Couple Illustration - centered at top */}
      <div className="relative z-10 flex flex-col items-center pt-6 sm:pt-8 md:pt-10 mb-5 sm:mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 opacity-95">
            <Image
              src="/monogram/monogram.png"
              alt={`${groomNickname} & ${brideNickname} monogram`}
              fill
              className="object-contain"
              priority={false}
              style={{ filter: DECO_FILTER }}
            />
          </div>
        </motion.div>

        {/* Names & Date below illustration — dark text on white */}
        <div className="mt-3 sm:mt-4 md:mt-5 text-center">
          <p className={`${cormorant.className} tracking-[0.25em] sm:tracking-[0.3em] text-xs sm:text-sm md:text-base uppercase`} style={{ color: palette.deep }}>
            {groomNickname} & {brideNickname}
          </p>
          <p className={`${cormorant.className} text-sm sm:text-base md:text-lg mt-1 sm:mt-2`} style={{ color: palette.medium }}>
            {ceremonyDate}
          </p>
          <p className={`${cormorant.className} text-xs sm:text-sm md:text-base mt-1 sm:mt-2`} style={{ color: palette.medium }}>
            {combinedVenue ?? ceremonyVenue}
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pb-6 sm:pb-8 md:pb-10">
        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10" variants={staggerChildren} initial="initial" animate="animate">
          {/* Couple Info */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-5 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center border flex-shrink-0 shadow-md" style={{ backgroundColor: `${palette.terracotta}18`, borderColor: `${palette.terracotta}40` }}>
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 flex-shrink-0" style={{ color: palette.terracotta }} fill={palette.terracotta} />
                </div>
                <h3 className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal`} style={{ color: palette.deep }}>{groomNickname} & {brideNickname}</h3>
              </div>
              <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                <div className={`flex items-center gap-2 sm:gap-2.5 md:gap-3 ${cormorant.className}`} style={{ color: palette.medium }}>
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 flex-shrink-0" style={{ color: palette.terracotta }} />
                  <span className="text-sm sm:text-base md:text-lg font-medium">{ceremonyDate}</span>
                </div>
                <div className={`flex items-center gap-2 sm:gap-2.5 md:gap-3 ${cormorant.className}`} style={{ color: palette.medium }}>
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 flex-shrink-0" style={{ color: palette.terracotta }} />
                  <span className="text-xs sm:text-sm md:text-base leading-relaxed">{toTitleCase(ceremonyVenue)}</span>
                </div>
              </div>
            </div>

            <motion.div className="backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border shadow-lg" style={{ backgroundColor: `${palette.cream}ee`, borderColor: `${palette.terracotta}35`, boxShadow: `0 18px 45px ${palette.deep}12` }} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <blockquote className={`${cormorant.className} italic text-sm sm:text-base md:text-lg leading-relaxed min-h-[60px] sm:min-h-[70px] md:min-h-[80px]`} style={{ color: palette.deep }}>
                &quot;{displayedText}
                <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 ml-1 animate-pulse" style={{ backgroundColor: palette.terracotta }}>|</span>&quot;
              </blockquote>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: palette.terracotta }} />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full opacity-60" style={{ backgroundColor: palette.terracotta }} />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: palette.terracotta }} />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles — Ceremony & Reception combined when same venue */}
          <motion.div className="space-y-3 sm:space-y-4 md:space-y-5" variants={fadeInUp}>
            {isSameVenue ? (
              <motion.div className="backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border transition-all duration-300 shadow-lg hover:shadow-xl" style={{ backgroundColor: `${palette.cream}ee`, borderColor: `${palette.sage}50`, boxShadow: `0 18px 45px ${palette.deep}12` }} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-2.5 sm:mb-3 md:mb-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center border flex-shrink-0" style={{ borderColor: `${palette.terracotta}40` }}>
                    <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 flex-shrink-0" style={{ color: palette.terracotta }} />
                  </div>
                  <h4 className={`${cinzel.className} font-semibold text-base sm:text-lg md:text-xl`} style={{ color: palette.deep }}>Ceremony & Reception</h4>
                </div>
                <div className={`space-y-2 sm:space-y-2.5 md:space-y-3 ${cormorant.className} text-xs sm:text-sm leading-relaxed`} style={{ color: palette.medium }}>
                  <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" style={{ color: palette.terracotta }} />
                    <span>{toTitleCase(combinedVenue ?? ceremonyVenue)}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: palette.terracotta }} />
                    <span>Ceremony {ceremonyTime} · Reception {receptionTime}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div className="backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border transition-all duration-300 shadow-lg hover:shadow-xl" style={{ backgroundColor: `${palette.cream}ee`, borderColor: `${palette.terracotta}35` }} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-2.5 sm:mb-3 md:mb-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center border flex-shrink-0" style={{ borderColor: `${palette.terracotta}40` }}>
                      <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 flex-shrink-0" style={{ color: palette.terracotta }} />
                    </div>
                    <h4 className={`${cinzel.className} font-semibold text-base sm:text-lg md:text-xl`} style={{ color: palette.medium }}>Ceremony</h4>
                  </div>
                  <div className={`space-y-2 sm:space-y-2.5 md:space-y-3 ${cormorant.className} text-xs sm:text-sm leading-relaxed`} style={{ color: palette.medium }}>
                    <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" style={{ color: palette.terracotta }} />
                      <span>{toTitleCase(ceremonyVenue)}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: palette.terracotta }} />
                      <span>{ceremonyTime}</span>
                    </div>
                  </div>
                </motion.div>
                <motion.div className="backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border transition-all duration-300 shadow-lg hover:shadow-xl" style={{ backgroundColor: `${palette.cream}ee`, borderColor: `${palette.terracotta}35` }} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-2.5 sm:mb-3 md:mb-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center border flex-shrink-0" style={{ borderColor: `${palette.terracotta}40` }}>
                      <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 flex-shrink-0" style={{ color: palette.terracotta }} fill={palette.terracotta} />
                    </div>
                    <h4 className={`${cinzel.className} font-semibold text-base sm:text-lg md:text-xl`} style={{ color: palette.medium }}>Reception</h4>
                  </div>
                  <div className={`space-y-2 sm:space-y-2.5 md:space-y-3 ${cormorant.className} text-xs sm:text-sm leading-relaxed`} style={{ color: palette.medium }}>
                    <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" style={{ color: palette.terracotta }} />
                      <span>{toTitleCase(receptionVenue)}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: palette.terracotta }} />
                      <span>{receptionTime}</span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            <motion.div className="backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border transition-all duration-300 shadow-lg hover:shadow-xl" style={{ backgroundColor: `${palette.cream}ee`, borderColor: `${palette.terracotta}35` }} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-2.5 sm:mb-3 md:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center border flex-shrink-0" style={{ borderColor: `${palette.terracotta}40` }}>
                  <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 flex-shrink-0" style={{ color: palette.terracotta }} />
                </div>
                <h4 className={`${cinzel.className} font-semibold text-base sm:text-lg md:text-xl`} style={{ color: palette.medium }}>RSVP Deadline</h4>
              </div>
              <div className={`space-y-2 sm:space-y-2.5 md:space-y-3 ${cormorant.className} text-xs sm:text-sm leading-relaxed`} style={{ color: palette.medium }}>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: palette.terracotta }} />
                  <span>{siteConfig.details.rsvp.deadline}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <span className="text-xs sm:text-sm leading-relaxed opacity-90">Please confirm your attendance by this date.</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-5 sm:space-y-6 md:space-y-7" variants={fadeInUp}>
            <div>
              <h4 className={`${cinzel.className} font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-5 flex items-center gap-2 sm:gap-2.5 md:gap-3`} style={{ color: palette.deep }}>
                <div className="w-1.5 sm:w-2 h-6 sm:h-7 md:h-8 rounded-full" style={{ backgroundColor: palette.terracotta }} /> Follow Us
              </h4>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full ring-1 transition-all duration-200 hover:scale-110" style={{ backgroundColor: `${palette.terracotta}15`, color: palette.terracotta }} aria-label="Facebook">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full ring-1 transition-all duration-200 hover:scale-110" style={{ backgroundColor: `${palette.terracotta}15`, color: palette.terracotta }} aria-label="Instagram">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full ring-1 transition-all duration-200 hover:scale-110" style={{ backgroundColor: `${palette.terracotta}15`, color: palette.terracotta }} aria-label="YouTube">
                  <Music2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full ring-1 transition-all duration-200 hover:scale-110" style={{ backgroundColor: `${palette.terracotta}15`, color: palette.terracotta }} aria-label="Twitter">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            <div>
              <h5 className={`${cinzel.className} font-semibold text-sm sm:text-base md:text-lg mb-2.5 sm:mb-3 md:mb-4`} style={{ color: palette.deep }}>Quick Links</h5>
              <div className="space-y-1.5 sm:space-y-2">
                {nav.map((item) => (
                  <a key={item.href} href={item.href} className={`block transition-colors duration-200 ${cormorant.className} text-xs sm:text-sm leading-relaxed hover:opacity-80`} style={{ color: palette.medium }}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row — dark text on white */}
        <motion.div className="border-t pt-5 sm:pt-6 md:pt-7" style={{ borderColor: `${palette.sage}40` }} variants={fadeInUp}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-5">
            <div className="text-center md:text-left">
              <p className={`${cormorant.className} text-xs sm:text-sm leading-relaxed`} style={{ color: palette.medium }}>
                © {year} {groomNickname} & {brideNickname} — crafted with love, prayers, and gratitude.
              </p>
              <p className={`${cormorant.className} text-xs sm:text-sm mt-1 leading-relaxed opacity-90`} style={{ color: palette.medium }}>
                This celebration site was designed to share our story and joy with you.
              </p>
            </div>
            <div className="text-center md:text-right space-y-1">
              <p className={`${cormorant.className} text-xs sm:text-sm opacity-90`} style={{ color: palette.medium }}>
                Developed by{" "}
                <a href="https://lance28-beep.github.io/portfolio-website/" target="_blank" rel="noopener noreferrer" className="underline transition-colors duration-200 hover:opacity-80" style={{ color: palette.terracotta }}>
                  Lance Valle
                </a>
              </p>
              <p className={`${cormorant.className} text-xs sm:text-sm opacity-90`} style={{ color: palette.medium }}>
                Want a website like this? Visit{" "}
                <a href="https://www.facebook.com/WeddingInvitationNaga" target="_blank" rel="noopener noreferrer" className="underline transition-colors duration-200 hover:opacity-80" style={{ color: palette.terracotta }}>
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
      </footer>
    </div>
  )
}
