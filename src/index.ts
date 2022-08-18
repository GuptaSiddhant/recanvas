import renderNodeToCanvas from "./canvas"
import renderDom from "./dom"

export function renderCanvas(
  element: React.ReactNode,
  width: number,
  height: number = width,
  quality = 1,
) {
  const node = renderDom(element, { width, height }, quality)

  return renderNodeToCanvas(node)
}

// Components
export { type TextProps, Text } from "./components/Text"
export { type ViewProps, View } from "./components/View"

// Enums and Types
export * from "./types"
