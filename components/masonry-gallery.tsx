"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { CloudinaryImage } from "@/components/ui/cloudinary-image"

type ImageItem = {
  src: string
  category: "desktop" | "mobile" | "front" | "gallery"
  width: number
  height: number
  orientation: "portrait" | "landscape"
}

export default function MasonryGallery({ images }: { images: ImageItem[] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const topRef = useRef<HTMLDivElement | null>(null)

  // Keep images in sequence (no shuffling)
  const filtered = useMemo(() => {
    return images
  }, [images])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx == null) return
      if (e.key === "Escape") setLightboxIdx(null)
      if (e.key === "ArrowRight") setLightboxIdx((idx) => (idx == null ? null : (idx + 1) % filtered.length))
      if (e.key === "ArrowLeft") setLightboxIdx((idx) => (idx == null ? null : (idx - 1 + filtered.length) % filtered.length))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [filtered.length, lightboxIdx])

  const getCardAspect = (image: ImageItem) => {
    return image.category === "desktop" ? "aspect-[4/3]" : "aspect-[4/5]"
  }

  return (
    <div ref={topRef} className="relative">
      {/* Header */}
      <div className="mb-6 flex justify-end">
        <div className="text-[#606C60]/90 text-sm font-sans">
          {filtered.length} photos
        </div>
      </div>

      {/* Masonry grid */}
      {filtered.length === 0 ? (
        <div className="text-center text-[#606C60]/80 font-sans">No images to display.</div>
      ) : (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
          {filtered.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            className="group mb-3 sm:mb-4 block break-inside-avoid w-full text-left"
            onClick={() => setLightboxIdx(idx)}
            aria-label="Open image"
          >
            <div className={`relative w-full overflow-hidden rounded-xl border border-[#606C60]/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#606C60]/60 ${getCardAspect(img)} bg-[#E1D5C7]/30`}>
              <CloudinaryImage
                src={img.src}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="rounded-xl transition-transform duration-300 group-hover:scale-[1.02] object-cover object-top"
                quality={90}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#606C60]/40 via-transparent to-transparent z-10" />
            </div>
          </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx != null && filtered[lightboxIdx] && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div className="relative max-w-6xl w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-[#E1D5C7] bg-[#606C60]/80 hover:bg-[#606C60] border border-[#606C60]/50 hover:border-[#606C60] rounded-full px-4 py-2.5 transition-all duration-200 shadow-lg hover:scale-110"
              onClick={() => setLightboxIdx((i) => (i == null ? null : (i - 1 + filtered.length) % filtered.length))}
            >
              ‹
            </button>
            <div className="flex items-center justify-center">
              <CloudinaryImage
                src={filtered[lightboxIdx].src}
                alt=""
                width={filtered[lightboxIdx].width}
                height={filtered[lightboxIdx].height}
                className="rounded-xl shadow-2xl border border-[#606C60]/30 object-contain"
                style={{
                  maxHeight: "80vh",
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                }}
                quality={95}
                priority={true}
              />
            </div>
            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-[#E1D5C7] bg-[#606C60]/80 hover:bg-[#606C60] border border-[#606C60]/50 hover:border-[#606C60] rounded-full px-4 py-2.5 transition-all duration-200 shadow-lg hover:scale-110"
              onClick={() => setLightboxIdx((i) => (i == null ? null : (i + 1) % filtered.length))}
            >
              ›
            </button>
            <button
              className="absolute top-3 right-3 text-[#E1D5C7] bg-[#606C60]/80 hover:bg-[#606C60] border border-[#606C60]/50 hover:border-[#606C60] rounded-full px-4 py-2 transition-all duration-200 shadow-lg hover:scale-105 font-sans text-sm"
              onClick={() => setLightboxIdx(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Back to top */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E1D5C7] to-[#E1D5C7]/90 text-[#606C60] font-semibold border border-[#606C60] hover:from-[#E1D5C7]/90 hover:to-[#E1D5C7] hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-sans"
          onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Back to top
        </button>
      </div>
    </div>
  )
}


