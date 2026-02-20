"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"

const GCASH_NUMBER = "+63 969 296 9854"

// Warm brown palette to match hero/details
const REGISTRY_ACCENT = "#9B6A41"
const REGISTRY_DARK = "#624630"
const REGISTRY_DARKER = "#3E2914"
const REGISTRY_CREAM = "#F8F4EE"

type RegistryMethod = "gcash" | "zelle"

export function Registry() {
  const [activeMethod, setActiveMethod] = useState<RegistryMethod>("gcash")

  const isGCash = activeMethod === "gcash"
  const qrSrc = isGCash ? "/QR/GcashQR.png" : "/QR/Zelle.png"
  const label = isGCash ? "GCash" : "Zelle"

  return (
    <Section
      id="registry"
      className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
        </div>
        
        <h2 className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-2 sm:mb-3 md:mb-4">
          Gift Guide
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
          With all that we have we are truly blessed. Your Presence and prayer are that we request, but if you are thinking of giving a gift, to help us on our way a monetary or if you prefer to purchase a gift, feel free to surprise as on your on way.
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
 

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-white/90 italic">
            Thank you from the bottom of our hearts.
          </p>
        </div>
      </div>
    </Section>
  )
}
