import { createElement } from "react"
import { RecanvasFont } from "src/types"

import { ElementName } from "../dom/constants"

export interface TextProps {
  children?: React.ReactNode
  style?: RecanvasFont
}

export function Text({ children, ...props }: TextProps) {
  return createElement(ElementName.Text, props, children)
}
