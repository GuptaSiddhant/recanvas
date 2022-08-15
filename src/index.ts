import renderNodeToCanvas from "./canvas"
import type { RecanvasFont } from "./canvas/text"
import renderDom from "./dom"
import type { Styles } from "./dom/style"

export function renderCanvas(
  element: React.ReactNode,
  style: Styles & { width: number; height: number },
  font?: RecanvasFont,
  callback?: () => void,
) {
  const node = renderDom(element, style, font, callback)

  return renderNodeToCanvas(node)
}

// Components
export { type TextProps, default as Text } from "./components/Text"
export { type ViewProps, default as View } from "./components/View"

// Enums and Types
export {
  type RecanvasFont,
  RecanvasFontFamily,
  RecanvasFontStyle,
  RecanvasFontVariant,
  RecanvasFontWeight,
} from "./canvas/text"
export { type Styles } from "./dom/style"
