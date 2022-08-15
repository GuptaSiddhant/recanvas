import { createElement } from "react"

import { ElementName } from "../dom/constants"
import type { ElementProps } from "../dom/types"

export interface TextProps extends ElementProps {}

export default function Text({ children, ...props }: TextProps) {
  return createElement(ElementName.Text, props, children)
}
