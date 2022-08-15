import type { Canvas } from "canvas"
import { createCanvas } from "canvas"
import { TEXT_NAME } from "src/dom/constants"

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
  const color = (node.style as any).backgroundColor

  // const { width, height } = style
  // if (lineWidth) ctx.lineWidth = lineWidth
  // if (shadowBlur) ctx.shadowBlur = shadowBlur
  // if (shadowColor) ctx.shadowColor = shadowColor
  // if (corner) ctx.lineJoin = corner
  // if (color) {
  //   if (constiant === "stroke") ctx.strokeStyle = color
  //   else ctx.fillStyle = color
  // }
  if (color) {
    ctx.fillStyle = color
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
  const color = (node.style as any).color
  const font = node.font
  const maxWidth = node.yogaNode.getComputedWidth()
  const backgroundColor = (node.style as any).backgroundColor
  if (backgroundColor) {
    insertViewNode(canvas, node, x, y)
  }

  const child = node.childNodes?.[0]
  if (child.nodeName === TEXT_NAME) {
    console.log(color, x, y)
    ctx.font = generateFontString(font)
    if (color) ctx.fillStyle = color

    const { text } = wrapText(child.nodeValue, maxWidth, font)

    ctx.textBaseline = "top"
    ctx.fillText(text, x, y)
  }
}

export function resizeCanvas(canvas: Canvas, pct: number) {
  const cw = canvas.width
  const ch = canvas.height

  const tempCanvas = createCanvas(cw, ch)
  const tempCtx = tempCanvas.getContext("2d")

  tempCanvas.width = cw
  tempCanvas.height = ch
  tempCtx.drawImage(canvas, 0, 0)
  canvas.width *= pct
  canvas.height *= pct

  const ctx = canvas.getContext("2d")
  ctx.drawImage(tempCanvas, 0, 0, cw, ch, 0, 0, cw * pct, ch * pct)
}
