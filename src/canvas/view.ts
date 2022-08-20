import { type CanvasRenderingContext2D } from "canvas"

import type { DOMElement } from "../dom"

export function insertViewToCanvas(
  ctx: CanvasRenderingContext2D,
  node: DOMElement,
  x: number,
  y: number,
): void {
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
