/**
 * Generates lib/generated/image-manifest.json by scanning public/mobile-background-new
 * and public/desktop-background-new for images and extracting their dimensions.
 *
 * Strategy:
 *  1. Try scanning local public/ folders (works in dev and if images are committed).
 *  2. If no local images are found AND Cloudinary credentials are available,
 *     fetch the manifest from the Cloudinary API instead (needed on Vercel where
 *     large image folders are gitignored but all assets live on Cloudinary).
 *
 * Run:  pnpm run generate-manifest
 * Auto: runs as "prebuild" before every `next build` (including Vercel deploys).
 */

import fs from "fs"
import path from "path"
import { imageSize } from "image-size"
import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET
const PROJECT_PREFIX = "wedding-projects/ariane-and-nico"

const VALID_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"])

type ImageEntry = {
  src: string
  width: number
  height: number
  category: "mobile" | "desktop"
  orientation: "portrait" | "landscape"
}

// ---------------------------------------------------------------------------
// Local scanning (used in dev when images are present in public/)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Cloudinary API fallback (used on Vercel where local images are gitignored)
// ---------------------------------------------------------------------------

async function getCloudinaryImages(
  folder: string,
  category: "mobile" | "desktop"
): Promise<ImageEntry[]> {
  const prefix = `${PROJECT_PREFIX}/${folder}`

  const response = await cloudinary.api.resources({
    type: "upload",
    prefix,
    max_results: 500,
    resource_type: "image",
  })

  const resources: ImageEntry[] = []

  for (const resource of response.resources) {
    const { public_id, format, width, height } = resource
    if (!width || !height) continue

    // Reconstruct the local-style src path from the Cloudinary public_id.
    // e.g. "wedding-projects/ariane-and-nico/mobile-background-new/couple (1)" + "jpg"
    //   → "/mobile-background-new/couple (1).jpg"
    const relativePath = public_id.replace(`${PROJECT_PREFIX}/`, "")
    const src = `/${relativePath}.${format}`

    resources.push({
      src,
      width,
      height,
      category,
      orientation: (height >= width ? "portrait" : "landscape") as "portrait" | "landscape",
    })
  }

  return resources.sort((a, b) => {
    const numA = parseInt(a.src.match(/\((\d+)\)/)?.[1] ?? "0", 10)
    const numB = parseInt(b.src.match(/\((\d+)\)/)?.[1] ?? "0", 10)
    return numA - numB
  })
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Generating image manifest...")

  const [mobileImages, desktopImages] = await Promise.all([
    getLocalImages("mobile-background-new", "mobile"),
    getLocalImages("desktop-background-new", "desktop"),
  ])

  let images = [...mobileImages, ...desktopImages]

  // If local folders are empty (e.g. on Vercel where they are gitignored),
  // fall back to fetching the asset list from the Cloudinary API.
  if (images.length === 0 && CLOUD_NAME && API_KEY && API_SECRET) {
    console.log("  ℹ No local images found — fetching manifest from Cloudinary API...")

    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
      secure: true,
    })

    const [cloudMobile, cloudDesktop] = await Promise.all([
      getCloudinaryImages("mobile-background-new", "mobile"),
      getCloudinaryImages("desktop-background-new", "desktop"),
    ])

    images = [...cloudMobile, ...cloudDesktop]
    console.log(
      `  ✓ Cloudinary: ${cloudMobile.length} mobile, ${cloudDesktop.length} desktop`
    )
  }

  const outDir = path.join(process.cwd(), "lib", "generated")
  await fs.promises.mkdir(outDir, { recursive: true })

  const outPath = path.join(outDir, "image-manifest.json")
  await fs.promises.writeFile(outPath, JSON.stringify(images, null, 2))

  console.log(
    `✓ Manifest written to lib/generated/image-manifest.json` +
    ` (${mobileImages.length || images.filter(i => i.category === "mobile").length} mobile,` +
    ` ${desktopImages.length || images.filter(i => i.category === "desktop").length} desktop)`
  )
}

main().catch((err) => {
  console.error("Failed to generate image manifest:", err)
  process.exit(1)
})
