import { createCanvas } from "canvas"
import {
  type RecanvasFont,
  RecanvasFontFamily,
  RecanvasFontStyle,
  RecanvasFontVariant,
  RecanvasFontWeight,
} from "../types"

export const DEFAULT_FONT: Required<RecanvasFont> = {
  size: 16,
  family: RecanvasFontFamily.SansSerif,
  weight: RecanvasFontWeight.Normal,
  style: RecanvasFontStyle.Normal,
  variant: RecanvasFontVariant.Normal,
  lineHeight: 1.25,
  truncate: false,
}

export function generateFontString(
  font: RecanvasFont = {},
  quality: number = 1,
) {
  const {
    family = DEFAULT_FONT.family,
    size = DEFAULT_FONT.size,
    style = DEFAULT_FONT.style,
    variant = DEFAULT_FONT.variant,
    weight = DEFAULT_FONT.weight,
  } = font

  return `${style} ${variant} ${weight} ${size * quality}px "${family}"`
}

export function wrapText(
  text: string,
  maxWidth: number,
  font: RecanvasFont = {},
  truncate: boolean = false,
  quality: number,
): { text: string; width: number; height: number } {
  const textMeasure = measureText(text, font, quality)

  if (textMeasure.width < maxWidth) return { text, ...textMeasure }

  const lines = splitTextInLines(text, maxWidth, font, quality)

  if (truncate) {
    const truncatedText = lines[0] + "..."
    return {
      text: truncatedText + "...",
      ...measureText(truncatedText, font, quality),
    }
  }

  // Wrap
  let width: number = 0
  let height: number = 0

  lines.forEach((line) => {
    const { width: w, height: h } = measureText(line, font, quality)
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
  quality: number,
): TextMeasure {
  if (text.length === 0) return { width: 0, height: 0 }

  const lineHeight = (font?.lineHeight || DEFAULT_FONT.lineHeight) * quality
  const canvas = createCanvas(1000, 1000)
  const context = canvas.getContext("2d")
  context.font = generateFontString(font, quality)

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
  quality: number,
) {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    const width = measureText(currentLine + word, font, quality).width
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
