import renderNodeToCanvas from "./canvas"
import renderDom from "./dom"
import store from "./store"
import type { RecanvasFont } from "./types"

export interface RenderCanvasOptions {
  width: number
  height: number
  quality?: number
  font?: RecanvasFont
}

export function renderCanvas(
  element: React.ReactNode,
  options: RenderCanvasOptions,
) {
  const { height, width, font, quality } = options

  if (quality) store.quality = quality
  if (font) store.font = font

  const node = renderDom(element, { width, height })

  return renderNodeToCanvas(node)
}

// Components
export { type TextProps, Text } from "./components/Text"
export { type ViewProps, View } from "./components/View"

// Enums and Types
export {
  type LayoutStyle,
  type RecanvasFont,
  type ThemeStyle,
  RecanvasFontFamily,
  RecanvasFontStyle,
  RecanvasFontVariant,
  RecanvasFontWeight,
} from "./types"
