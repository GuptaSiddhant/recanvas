import type { Canvas } from "canvas"
import { createCanvas, Image } from "canvas"
import fetch from "@remix-run/web-fetch"

import { TEXT_NAME } from "../dom/constants"
import store from "../store"
import type { DOMElement } from "../dom"
import { generateFontString, wrapText } from "./text"

export function insertViewToCanvas(
  canvas: Canvas,
  node: DOMElement,
  x: number,
  y: number,
): void {
  const ctx = canvas.getContext("2d")
  const width = node.yogaNode.getComputedWidth()
  const height = node.yogaNode.getComputedHeight()
  const { backgroundColor } = node.style

  ctx.save()
  // const { width, height } = style
  // if (lineWidth) ctx.lineWidth = lineWidth
  // if (shadowBlur) ctx.shadowBlur = shadowBlur
  // if (shadowColor) ctx.shadowColor = shadowColor
  // if (corner) ctx.lineJoin = corner
  // if (color) {
  //   if (constiant === "stroke") ctx.strokeStyle = color
  //   else ctx.fillStyle = color
  // }
  if (backgroundColor) {
    ctx.fillStyle = backgroundColor
    ctx.fillRect(x, y, width, height)
  }
  ctx.restore()
}

export function insertTextToCanvas(
  canvas: Canvas,
  node: DOMElement,
  x: number,
  y: number,
): void {
  const ctx = canvas.getContext("2d")
  const { style = {}, yogaNode } = node

  const maxWidth = yogaNode.getComputedWidth()
  const color = style.color || store.font.color

  const child = node.childNodes?.[0]
  if (child.nodeName === TEXT_NAME) {
    const { text } = wrapText(child.nodeValue, maxWidth, style, false, node.dpr)

    ctx.save()
    ctx.textBaseline = "top"
    ctx.font = generateFontString(style, node.dpr)
    if (color) ctx.fillStyle = color

    ctx.fillText(text, x, y)
    ctx.restore()
  }
}

export function clearCanvas(canvas: Canvas) {
  const ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export function resizeCanvas(canvas: Canvas, multiplier: number) {
  const cw = canvas.width
  const ch = canvas.height

  const tempCanvas = createCanvas(cw, ch)
  const tempCtx = tempCanvas.getContext("2d")

  tempCanvas.width = cw
  tempCanvas.height = ch
  tempCtx.drawImage(canvas, 0, 0)
  canvas.width *= multiplier
  canvas.height *= multiplier

  const ctx = canvas.getContext("2d")
  ctx.drawImage(
    tempCanvas,
    0,
    0,
    cw,
    ch,
    0,
    0,
    cw * multiplier,
    ch * multiplier,
  )
}

export async function insertImageToCanvas(
  canvas: Canvas,
  node: DOMElement,
  x: number,
  y: number,
) {
  const src = node.style.backgroundImage
  if (!src) return

  const ctx = canvas.getContext("2d")
  const width = node.yogaNode.getComputedWidth()
  const height = node.yogaNode.getComputedHeight()

  try {
    const image = await loadImage(src)

    console.log("image", {
      x,
      y,
      width,
      height,
      image: image.complete,
    })

    ctx.save()
    ctx.drawImage(image, x, y, width, height)
    ctx.restore()
  } catch (e) {
    console.log("Image error:", e)
  }
}

async function loadImage(src: string): Promise<Image> {
  return new Promise(async (resolve, reject) => {
    const image = new Image()

    const cleanup = () => {
      image.onload = null
      image.onerror = null
    }

    image.onerror = (err) => {
      cleanup()
      reject(err)
    }
    image.onload = () => {
      cleanup()
      resolve(image)
    }

    if (!src.startsWith("http")) {
      // local
      image.src = src
    } else {
      // remote
      const res = await fetch(src)
      const arrayBuffer = await res.arrayBuffer()
      const base64 = Buffer.from(arrayBuffer).toString("base64")
      const fileB64 = "data:image/jpeg;base64," + base64
      image.src = fileB64
    }
  })
}
