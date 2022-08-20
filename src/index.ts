import renderNodeToCanvas from "./canvas"
import renderDom from "./dom"
import store from "./store"
import { Text, View, Stage } from "./components"

export default {
  render: renderCanvas,
  Text,
  View,
  Stage,
}

export interface RenderOptions {
  dpr?: number
}

export async function renderCanvas(
  element: React.ReactNode,
  options: RenderOptions = {},
) {
  store.dpr = options.dpr || 1

  return renderNodeToCanvas(renderDom(element))
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
