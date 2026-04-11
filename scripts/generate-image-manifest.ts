/**
 * Generates lib/generated/image-manifest.json by scanning public/mobile-background-new
 * and public/desktop-background-new for images and extracting their dimensions.
 *
 * Run:  pnpm run generate-manifest
 * Auto: runs as "prebuild" before every `next build` (including Vercel deploys).
 */

import fs from "fs"
import path from "path"
import { imageSize } from "image-size"

const VALID_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"])

type ImageEntry = {
  src: string
  width: number
  height: number
  category: "mobile" | "desktop"
  orientation: "portrait" | "landscape"
}

async function getLocalImages(folder: string, category: "mobile" | "desktop"): Promise<ImageEntry[]> {
  const dirPath = path.join(process.cwd(), "public", folder)

  let filenames: string[]
  try {
    filenames = await fs.promises.readdir(dirPath)
  } catch {
    console.warn(`  ⚠ Could not read ${dirPath} — skipping`)
    return []
  }

  const imageFilenames = filenames.filter((f) =>
    VALID_EXTENSIONS.has(path.extname(f).toLowerCase())
  )

  const results = await Promise.all(
    imageFilenames.map(async (filename) => {
      const filePath = path.join(dirPath, filename)
      try {
        const buffer = await fs.promises.readFile(filePath)
        const { width, height } = imageSize(buffer)
        if (!width || !height) return null
        return {
          src: `/${folder}/${filename}`,
          width,
          height,
          category,
          orientation: (height >= width ? "portrait" : "landscape") as "portrait" | "landscape",
        }
      } catch {
        return null
      }
    })
  )

  return results
    .filter((img): img is ImageEntry => img !== null)
    .sort((a, b) => {
      const numA = parseInt(a.src.match(/\((\d+)\)/)?.[1] ?? "0", 10)
      const numB = parseInt(b.src.match(/\((\d+)\)/)?.[1] ?? "0", 10)
      return numA - numB
    })
}

async function main() {
  console.log("Generating image manifest...")

  const [mobileImages, desktopImages] = await Promise.all([
    getLocalImages("mobile-background-new", "mobile"),
    getLocalImages("desktop-background-new", "desktop"),
  ])

  const images = [...mobileImages, ...desktopImages]

  const outDir = path.join(process.cwd(), "lib", "generated")
  await fs.promises.mkdir(outDir, { recursive: true })

  const outPath = path.join(outDir, "image-manifest.json")
  await fs.promises.writeFile(outPath, JSON.stringify(images, null, 2))

  console.log(
    `✓ Manifest written to lib/generated/image-manifest.json` +
    ` (${mobileImages.length} mobile, ${desktopImages.length} desktop)`
  )
}

main().catch((err) => {
  console.error("Failed to generate image manifest:", err)
  process.exit(1)
})
