import type { Canvas } from "canvas"
import { createCanvas } from "canvas"

import { TEXT_NAME } from "../dom/constants"
import store from "../store"
import type { DOMElement } from "../dom"
import { generateFontString, wrapText } from "./text"

export function insertViewNode(
  canvas: Canvas,
  node: DOMElement,
  x: number,
  y: number,
): void {
  const ctx = canvas.getContext("2d")
  const width = node.yogaNode.getComputedWidth()
  const height = node.yogaNode.getComputedHeight()
  const { backgroundColor } = node.style

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
}

export function insertTextNode(
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
    const { text } = wrapText(
      child.nodeValue,
      maxWidth,
      style,
      false,
      node.quality,
    )

    ctx.textBaseline = "top"
    ctx.font = generateFontString(style, node.quality)
    if (color) ctx.fillStyle = color
    ctx.fillText(text, x, y)
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
