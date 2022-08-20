import { type Canvas, createCanvas, CanvasRenderingContext2D } from "canvas"

export function clearCanvas(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
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
