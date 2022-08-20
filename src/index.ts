import renderNodeToCanvas from "./canvas"
import renderDom from "./dom"
import store from "./store"

export interface RenderOptions {
  /**
   * Device Pixel Ratio (dpr) determines the quality.
   * It is 1 by default, increase it for better quality (min: 0.1).
   */
  dpr?: number
}

/**
 * Generate Canvas by rendering the provided React Element.
 *
 * Asynchronous function. Must be awaited to get the Canvas.
 */
export async function renderCanvas(
  element: React.ReactElement,
  options: RenderOptions = {},
  callback?: () => void,
) {
  store.dpr = options.dpr || 1

  const node = renderDom(element, callback)

  return renderNodeToCanvas(node)
}

// Components
export * from "./components"

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

export type { Canvas } from "canvas"
