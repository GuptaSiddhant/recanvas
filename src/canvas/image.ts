import { type CanvasRenderingContext2D, loadImage } from "canvas"
import type { DOMElement } from "../dom"

export async function insertImageToCanvas(
  ctx: CanvasRenderingContext2D,
  node: DOMElement,
  x: number,
  y: number,
) {
  const src = node.attributes.src as string | Buffer | undefined
  if (!src) return

  const width = node.yogaNode.getComputedWidth()
  const height = node.yogaNode.getComputedHeight()

  try {
    const image = await loadImage(src)

    ctx.drawImage(image, x, y, width, height)
  } catch (e) {
    console.log("Image error:", e)
  }
}

// async function loadImage(src: string): Promise<Image> {
//   return new Promise(async (resolve, reject) => {
//     const image = new Image()

//     const cleanup = () => {
//       image.onload = null
//       image.onerror = null
//     }

//     image.onerror = (err) => {
//       cleanup()
//       reject(err)
//     }
//     image.onload = () => {
//       cleanup()
//       resolve(image)
//     }

//     if (!src.startsWith("http")) {
//       // local
//       image.src = src
//     } else {
//       // remote
//       const res = await fetch(src)
//       const arrayBuffer = await res.arrayBuffer()
//       const base64 = Buffer.from(arrayBuffer).toString("base64")
//       const fileB64 = "data:image/jpeg;base64," + base64
//       image.src = fileB64
//     }
//   })
// }
