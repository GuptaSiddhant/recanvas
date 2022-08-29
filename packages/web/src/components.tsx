import { createElement } from "react"

import type { LayoutStyle, ThemeStyle, RecanvasFont } from "./types"
import { NodeName, DOMNodeProps } from "./renderer/types"

// View

export interface ViewProps extends DOMNodeProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLCanvasElement>) => void
}

export function View({ children, ...props }: ViewProps) {
  return createElement(NodeName.View, props)
}

// Text

// export interface TextProps {
//   children?: React.ReactNode
//   style?: RecanvasFont
// }

// export function Text({ children, ...props }: TextProps) {
//   return createElement(ElementName.Text, props, children)
// }

// // Image

// export interface ImageProps extends ViewProps {
//   src: string | Buffer
// }

// export function Image({ children, ...props }: ImageProps) {
//   return createElement(ElementName.Image, props, children)
// }
