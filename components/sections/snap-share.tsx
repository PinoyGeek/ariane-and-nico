"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Instagram, Facebook, Twitter, Share2, Copy, Download, Check } from "lucide-react"
import { Section } from "@/components/section"
import { QRCodeCanvas } from "qrcode.react"
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

export function SnapShare() {
  const [copiedHashtagIndex, setCopiedHashtagIndex] = useState<number | null>(null)
  const [copiedAllHashtags, setCopiedAllHashtags] = useState(false)
  const [copiedDriveLink, setCopiedDriveLink] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const driveLink = siteConfig.snapShare?.googleDriveLink ?? ""
  const hashtags = siteConfig.snapShare?.hashtag ? [siteConfig.snapShare.hashtag] : []
  const allHashtagsText = hashtags.join(" ")
  const groomNickname = siteConfig.couple.groomNickname
  const brideNickname = siteConfig.couple.brideNickname
  const sanitizedGroomName = groomNickname.replace(/\s+/g, "")
  const sanitizedBrideName = brideNickname.replace(/\s+/g, "")

  const shareText = `Celebrate ${groomNickname} & ${brideNickname}'s wedding! Explore the details and share your special memories: ${websiteUrl} ${allHashtagsText} ✨`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const qrWebsiteSize = isMobile ? 140 : 260
  const qrDriveSize = isMobile ? 130 : 240


  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    }

    const target = urls[platform]
    if (target) {
      window.open(target, "_blank", "width=600,height=400")
    }
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `${sanitizedGroomName.toLowerCase()}-${sanitizedBrideName.toLowerCase()}-wedding-qr.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const downloadDriveQRCode = () => {
    const canvas = document.getElementById("drive-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "drive-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const copyHashtag = async (hashtag: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hashtag)
      setCopiedHashtagIndex(index)
      setTimeout(() => setCopiedHashtagIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyAllHashtags = async () => {
    try {
      await navigator.clipboard.writeText(allHashtagsText)
      setCopiedAllHashtags(true)
      setTimeout(() => setCopiedAllHashtags(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyDriveLink = async () => {
    if (driveLink) {
      try {
        await navigator.clipboard.writeText(driveLink)
        setCopiedDriveLink(true)
        setTimeout(() => setCopiedDriveLink(false), 2000)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

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

      <Section id="snap-share" className="relative z-10 overflow-hidden py-8 sm:py-16 md:py-20 lg:py-24 xl:py-28">
      {/* Corner decorations — deep brown tint (hero style) */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[280px] opacity-20 scale-y-[-1]" priority={false} style={{ filter: DECO_FILTER }} />
      </div>
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <Image src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[280px] opacity-20 scale-x-[-1] scale-y-[-1]" priority={false} style={{ filter: DECO_FILTER }} />
      </div>
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[280px] opacity-20" priority={false} style={{ filter: DECO_FILTER }} />
      </div>
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image src="/decoration/flower-decoration-left-bottom-corner2.png" alt="" width={300} height={300} className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[280px] opacity-20 scale-x-[-1]" priority={false} style={{ filter: DECO_FILTER }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.div
          className="text-center mb-5 sm:mb-10 lg:mb-12 xl:mb-14"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] sm:text-xs lg:text-sm tracking-[0.3em] uppercase" style={{ borderColor: `${palette.sage}50`, backgroundColor: `${palette.sage}18`, color: palette.medium }}>
            Share Your Memories
          </div>
          <h2 className={`${cinzel.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mt-2 sm:mt-4 lg:mt-5`} style={{ color: palette.deep }}>
            Capture & Share the Celebration
          </h2>
          <p className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl lg:max-w-3xl mx-auto mt-2 sm:mt-4 lg:mt-5 leading-relaxed px-2`} style={{ color: palette.medium }}>
            Capture the beautiful moments of {groomNickname} & {brideNickname}&apos;s wedding day. Share your favorite memories so our keepsake gallery glows with every smile, embrace, and celebration from this special day.
          </p>
          <div className="mx-auto mt-3 sm:mt-5 lg:mt-6 h-px w-20 sm:w-24 lg:w-28 opacity-50" style={{ backgroundColor: palette.sage }} />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8 xl:gap-x-16 xl:gap-y-10 w-full max-w-4xl sm:max-w-5xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto items-stretch"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Left on desktop / second on mobile: Share on Social Media */}
          <motion.div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8 order-2 lg:order-1 min-w-0" variants={fadeInUp}>
            <div className="rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-7 lg:p-8 xl:p-9 shadow-xl border" style={{ backgroundColor: `${palette.cream}ee`, borderColor: `${palette.terracotta}35` }}>
              <h5 className={`${cinzel.className} text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-center`} style={{ color: palette.medium }}>
                Share on Social Media
              </h5>
              <p className={`${cormorant.className} text-xs sm:text-sm lg:text-base text-center mb-3 sm:mb-4 lg:mb-5 leading-relaxed`} style={{ color: palette.medium }}>
                Help spread the word about {groomNickname} & {brideNickname}&apos;s wedding celebration. Share the event across your favorite platforms.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                <button
                  onClick={() => shareOnSocial("instagram")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-2.5 bg-white border px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-lg lg:rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  style={{ borderColor: `${palette.terracotta}40`, color: palette.medium }}
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm lg:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>Instagram</span>
                </button>
                <button
                  onClick={() => shareOnSocial("facebook")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-2.5 bg-white border px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-lg lg:rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  style={{ borderColor: `${palette.terracotta}40`, color: palette.medium }}
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm lg:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>Facebook</span>
                </button>
                <button
                  onClick={() => shareOnSocial("tiktok")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-2.5 bg-white border px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-lg lg:rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  style={{ borderColor: `${palette.terracotta}40`, color: palette.medium }}
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm lg:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>TikTok</span>
                </button>
                <button
                  onClick={() => shareOnSocial("twitter")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-2.5 bg-white border px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 rounded-lg lg:rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  style={{ borderColor: `${palette.terracotta}40`, color: palette.medium }}
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm lg:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>Twitter</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right on desktop / first on mobile: Upload Your Photos & Videos */}
          <motion.div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-8 order-1 lg:order-2 min-w-0" variants={fadeInUp}>
            {driveLink && (
              <div className="rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-7 lg:p-8 xl:p-9 shadow-xl text-center border" style={{ backgroundColor: `${palette.cream}ee`, borderColor: `${palette.terracotta}35` }}>
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border bg-white px-2.5 py-1 text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.25em] sm:tracking-[0.32em] mb-2 sm:mb-3 lg:mb-4" style={{ borderColor: `${palette.terracotta}40`, color: palette.medium }}>
                  Upload Your Photos & Videos
                </div>
                <p className={`${cormorant.className} text-xs sm:text-sm lg:text-base leading-relaxed mb-3 sm:mb-4 lg:mb-5 px-1`} style={{ color: palette.medium }}>
                  Help us capture {groomNickname} & {brideNickname}&apos;s special day! Scan the QR or use the actions below to drop your photos and videos into our shared {groomNickname} & {brideNickname} Albums folder.
                </p>
                <div className="mx-auto inline-flex flex-col items-center bg-white/95 backdrop-blur-sm p-2.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-md border mb-3 sm:mb-4 lg:mb-5" style={{ borderColor: `${palette.terracotta}30` }}>
                  <div className="mb-2 sm:mb-3 lg:mb-4 p-1.5 sm:p-3 rounded-lg sm:rounded-xl bg-white border" style={{ borderColor: `${palette.terracotta}25` }}>
                    <div className="bg-white p-1.5 sm:p-3 lg:p-4 rounded-lg shadow-sm border" style={{ borderColor: `${palette.terracotta}20` }}>
                      <QRCodeCanvas id="drive-qr" value={driveLink} size={qrDriveSize} includeMargin className="bg-white" />
                    </div>
                  </div>
                  <p className={`${cormorant.className} text-xs sm:text-sm`} style={{ color: palette.medium }}>📱 Scan with your camera app</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
                  <button
                    onClick={copyDriveLink}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-white border shadow-sm hover:shadow-md text-xs sm:text-sm transition-all ${copiedDriveLink ? "bg-green-600 border-green-600" : ""}`}
                    style={!copiedDriveLink ? { backgroundColor: palette.terracotta, borderColor: palette.terracotta } : undefined}
                  >
                    {copiedDriveLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Copy Link</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadDriveQRCode}
                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-white border shadow-sm hover:shadow-md text-xs sm:text-sm transition-all font-semibold"
                    style={{ backgroundColor: palette.terracotta, borderColor: palette.terracotta }}
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Download QR</span>
                  </button>
                  <a
                    href={driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white border shadow-sm hover:shadow-md text-xs sm:text-sm transition-all"
                    style={{ borderColor: `${palette.terracotta}40`, color: palette.medium }}
                  >
                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Open Drive</span>
                  </a>
                </div>
                <p className={`${cormorant.className} text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed`} style={{ color: palette.medium }}>or tap &quot;Open Google Drive Folder.&quot;</p>
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-5 sm:mt-10 lg:mt-12 xl:mt-14" variants={fadeInUp}>
          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 lg:p-8 xl:p-10 shadow-lg border max-w-3xl lg:max-w-4xl mx-auto backdrop-blur-xl" style={{ backgroundColor: `${palette.cream}ee`, borderColor: `${palette.terracotta}35`, boxShadow: `0 25px 80px ${palette.deep}15` }}>
            <p className={`${cormorant.className} text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-3 sm:mb-4 lg:mb-5 px-2`} style={{ color: palette.medium }}>
              Thank you for helping make {groomNickname} & {brideNickname}&apos;s wedding celebration memorable. Your photos and messages create beautiful memories
              that will last a lifetime—keep sharing the joy throughout the evening.
            </p>
            <div className={`${cormorant.className} flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base tracking-[0.25em] sm:tracking-[0.32em] uppercase`} style={{ color: palette.medium }}>
              <span>See you in the celebration</span>
            </div>
          </div>
        </motion.div>
      </div>
      </Section>
    </div>
  )
}