import { createElement } from "react"
import { LayoutStyle, ThemeStyle } from "src/types"

import { ElementName } from "../dom/constants"

export interface ViewProps {
  children?: React.ReactNode
  style?: LayoutStyle & ThemeStyle
}

export function View({ children, ...props }: ViewProps) {
  return createElement(ElementName.View, props, children)
}
