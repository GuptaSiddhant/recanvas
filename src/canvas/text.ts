import { createCanvas } from "canvas"
import store from "../store"
import { type RecanvasFont } from "../types"

export function generateFontString(font: RecanvasFont = {}, dpr: number = 1) {
  const {
    family = store.font.family,
    size = store.font.size,
    style = store.font.style,
    variant = store.font.variant,
    weight = store.font.weight,
  } = font

  return `${style} ${variant} ${weight} ${size * dpr}px "${family}"`
}

export function wrapText(
  text: string,
  maxWidth: number,
  font: RecanvasFont = {},
  truncate: boolean = false,
  dpr: number,
): { text: string; width: number; height: number } {
  const textMeasure = measureText(text, font, dpr)

  if (textMeasure.width < maxWidth) return { text, ...textMeasure }

  const lines = splitTextInLines(text, maxWidth, font, dpr)

  if (truncate) {
    const truncatedText = lines[0] + "..."
    return {
      text: truncatedText + "...",
      ...measureText(truncatedText, font, dpr),
    }
  }

  // Wrap
  let width: number = 0
  let height: number = 0

  lines.forEach((line) => {
    const { width: w, height: h } = measureText(line, font, dpr)
    width = Math.max(width, w)
    height += h
  })

  return { text: lines.join("\n"), width, height }
}

export interface TextMeasure {
  width: number
  height: number
}

export function measureText(
  text: string,
  font: RecanvasFont = {},
  dpr: number,
): TextMeasure {
  if (text.length === 0) return { width: 0, height: 0 }

  const lineHeight = (font?.lineHeight || store.font.lineHeight) * dpr
  const canvas = createCanvas(1000, 1000)
  const context = canvas.getContext("2d")
  context.font = generateFontString(font, dpr)

  context.textBaseline = "top"
  const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } =
    context.measureText(text)
  const height =
    (actualBoundingBoxAscent + actualBoundingBoxDescent) * lineHeight

  return { width: Math.round(width), height: Math.round(height) }
}

// Helpers

function splitTextInLines(
  text: string,
  maxWidth: number,
  font: RecanvasFont = {},
  dpr: number,
) {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    const width = measureText(currentLine + word, font, dpr).width
    if (width < maxWidth) {
      currentLine += word + " "
    } else {
      lines.push(currentLine)
      currentLine = word + " "
    }
  }
  lines.push(currentLine)

  return lines
}
