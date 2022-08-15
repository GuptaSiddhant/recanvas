import { createCanvas } from "canvas"

export interface RecanvasFont {
  size?: number
  family?: RecanvasFontFamily
  weight?: RecanvasFontWeight
  style?: RecanvasFontStyle
  variant?: RecanvasFontVariant
  lineHeight?: number
}

export enum RecanvasFontFamily {
  Monospace = "monospace",
  Serif = "serif",
  SansSerif = "sans-serif",
  // Named
  Arial = "Arial",
  Verdana = "Verdana",
  Times = "Times New Roman",
  Georgia = "Georgia",
  BrushScript = "Brush Script MT",
  Courier = "Courier New",
}

export enum RecanvasFontWeight {
  Normal = "normal",
  Bold = "bold",
  Bolder = "bolder",
  Lighter = "lighter",
}

export enum RecanvasFontStyle {
  Normal = "normal",
  Italic = "italic",
  Oblique = "oblique",
}

export enum RecanvasFontVariant {
  Normal = "normal",
  SmallCaps = "small-caps",
}

const DEFAULT_FONT: Required<RecanvasFont> = {
  size: 16,
  family: RecanvasFontFamily.SansSerif,
  weight: RecanvasFontWeight.Normal,
  style: RecanvasFontStyle.Normal,
  variant: RecanvasFontVariant.Normal,
  lineHeight: 1.25,
}

export function generateFontString(font: RecanvasFont = {}) {
  const {
    family = DEFAULT_FONT.family,
    size = DEFAULT_FONT.size,
    style = DEFAULT_FONT.style,
    variant = DEFAULT_FONT.variant,
    weight = DEFAULT_FONT.weight,
  } = font

  return `${style} ${variant} ${weight} ${size}px "${family}"`
}

export function wrapText(
  text: string,
  maxWidth: number,
  font?: RecanvasFont,
  truncate: boolean = false,
): { text: string; width: number; height: number } {
  const textMeasure = measureText(text, font)
  if (textMeasure.width < maxWidth) return { text, ...textMeasure }

  const lines = splitTextInLines(text, maxWidth, font)

  if (truncate) {
    const truncatedText = lines[0] + "..."
    return { text: truncatedText + "...", ...measureText(truncatedText, font) }
  }

  // Wrap
  let width: number = 0
  let height: number = 0

  lines.forEach((line) => {
    const { width: w, height: h } = measureText(line, font)
    width = Math.max(width, w)
    height += h
  })

  return { text: lines.join("\n"), width, height }
}

export interface TextMeasure {
  width: number
  height: number
}

export function measureText(text: string, font?: RecanvasFont): TextMeasure {
  if (text.length === 0) return { width: 0, height: 0 }

  const { lineHeight = DEFAULT_FONT.lineHeight } = font || {}
  const canvas = createCanvas(1000, 1000)
  const context = canvas.getContext("2d")
  context.font = generateFontString(font)
  context.textBaseline = "top"
  const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } =
    context.measureText(text)

  return {
    width,
    height: (actualBoundingBoxAscent + actualBoundingBoxDescent) * lineHeight,
  }
}

// Helpers

function splitTextInLines(text: string, maxWidth: number, font?: RecanvasFont) {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    const width = measureText(currentLine + word, font).width
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
